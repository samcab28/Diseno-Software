#######################################################################################

# INSTALACION DE BASES DE DATOS 
cd ../charts/databases
Remove-Item -Path Chart.lock -Force
#Remove-Item -Path charts -Force
helm dependency update
cd ..
helm upgrade --install design-databases databases
sleep 10

#seteo de nodeport forzado, en caso de no funcionar
kubectl patch svc design-databases-postgresql -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 5432, \"nodePort\": 30200}]}}'
kubectl patch svc design-databases-mongodb -p '{\"spec\": {\"type\": \"NodePort\", \"ports\": [{\"port\": 27017, \"nodePort\": 30500}]}}'
#######################################################################################

# INSTALACION DE API

cd ../charts/backend

helm dependency update
cd ..
helm upgrade --install design-backend backend
sleep 10

#######################################################################################

# INSTALACION DE UI

cd ../charts/ui
helm dependency update
cd ..
helm upgrade --install design-frontend ui

#######################################################################################

cd ../autoscripts