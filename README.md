# react-mesto-api-full
Репозиторий для приложения проекта `Mesto`, включающий фронтенд и бэкенд части приложения со следующими возможностями: авторизации и регистрации пользователей, операции с карточками и пользователями. Бэкенд расположите в директории `backend/`, а фронтенд - в `frontend/`. 
  
IP-адрес сервера: 130.193.55.178
Бэкэнд: api.kirillzhakin.mesto.nomoreparties.sbs
Ссылка на сайт: http://kirillzhakin.mesto.nomoredomains.xyz
Ссылка на сайт: https://kirillzhakin.mesto.nomoredomains.xyz

# Команды
ssh kirillzhakin@130.193.55.178
sudo nano /etc/nginx/sites-available/defaultc
sudo nano ./.ssh/authorized_keys
sudo nano ./.ssh/config
git clone git@github.com:kirillzhakin/react-mesto-api-full.git
sudo nginx -t
sudo systemctl reload nginx
git pull origin main 
pm2 restart app

cd react-mesto-api-full
git add -A
git commit -m "ПР15"
git push -u origin main
scp -r ./express-mesto-gha/* kirillzhakin@130.193.55.178:/home/kirillzhakin/react-mesto-api-full/backend
cat id_rsa.pub

server {
      listen 80;
      
      server_name api.kirillzhakin.mesto.nomoreparties.sbs;

      location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
      }
}
server {
      listen 80;

      server_name kirillzhakin.mesto.nomoredomains.xyz;

      root /home/kirillzhakin/react-mesto-api-full/frontend;

      location / {

                try_files $uri $uri/ /index.html;

      }
}
