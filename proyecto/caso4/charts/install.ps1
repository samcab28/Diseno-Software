cd .\databases
helm install minchapp-databases . -f values.yaml
Start-Sleep -Seconds 10 

kubectl patch svc minchapp-databases-postgresql -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 5432, \"nodePort\": 30100}]}}'
kubectl patch svc minchapp-databases-redis-master -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 6379, \"nodePort\": 30102}]}}'

cd ..