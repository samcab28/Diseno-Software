# Usa la imagen oficial de nginx
FROM nginx:alpine

# Elimina la configuración por defecto de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu archivo de configuración nginx personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el contenido de build/ al directorio de nginx
COPY build/ /usr/share/nginx/html/

# Exponer el puerto 3000 para la app
EXPOSE 3000

# Comando por defecto para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]