#!/bin/bash

# Listar todos los releases de Helm
helm list

#desinstalacion de helm
helm uninstall design-backend
helm uninstall design-databases
helm uninstall design-ui

#desintalacion de pvc
kubectl delete pvc --selector="app.kubernetes.io/instance=design-backend"
kubectl delete pvc --selector="app.kubernetes.io/instance=design-databases"


# Esperar unos segundos para asegurarse de que los recursos se eliminen correctamente
Write-Output "Esperando 10 segundos para asegurarse de que los recursos sean eliminados..."
sleep 10





