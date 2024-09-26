helm uninstall minchapp-databases

kubectl delete pvc --selector="app.kubernetes.io/instance=minchapp-databases"