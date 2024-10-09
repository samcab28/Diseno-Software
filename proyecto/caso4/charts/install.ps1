cd monitoring-stack
Remove-Item -Path Chart.lock -Force
#Remove-Item -Path charts -Force
helm dependency update
cd ..
helm upgrade --install monitoring-stack monitoring-stack
sleep 20

cd grafana-config
#Remove-Item -Path Chart.lock -Force
#Remove-Item -Path charts -Force
helm dependency update
cd ..
helm upgrade --install grafana-config grafana-config

cd .\databases
helm upgrade --install minchapp-databases . -f values.yaml
Start-Sleep -Seconds 10

kubectl patch svc minchapp-databases-postgresql -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 5432, \"nodePort\": 30100}]}}'
kubectl patch svc minchapp-databases-redis-master -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 6379, \"nodePort\": 30102}]}}'

cd ..

cd .\api
helm upgrade --install minchapp-api . -f values.yaml
Start-Sleep -Seconds 10

cd ..
