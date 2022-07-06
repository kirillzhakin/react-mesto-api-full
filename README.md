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




