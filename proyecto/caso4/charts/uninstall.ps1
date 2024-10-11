helm uninstall minchapp-api

helm uninstall minchapp-databases

kubectl delete pvc --selector="app.kubernetes.io/instance=minchapp-databases"

helm uninstall grafana-config 

kubectl delete pvc --selector="app.kubernetes.io/instance=grafana-config"

helm uninstall monitoring-stack 

kubectl delete pvc --selector="app.kubernetes.io/instance=monitoring-stack"