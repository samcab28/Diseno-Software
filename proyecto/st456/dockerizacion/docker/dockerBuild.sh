#instalacion del backend 
cd ./backend
docker buildx build --tag pamreth/backend_diseno .
cd ..

#instalacion del frontend
cd ./frontend
docker buildx build --tag pamreth/frontend_diseno .
cd ..
