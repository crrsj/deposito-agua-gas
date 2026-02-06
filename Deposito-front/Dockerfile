FROM nginx:alpine
# Copia todos os seus arquivos (index.html, script.js, etc) para a pasta do Nginx
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]