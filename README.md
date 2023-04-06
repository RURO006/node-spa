# 產生ssl憑證
```bash
mkdir app/key
cd app/key
openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=localhost' -keyout server.key -out server.crt -days 365
```

# 清除docker舊資料
```bash
sudo docker container rm node-spa
sudo docker image rm node-spa
```

# 執行
```bash
sudo docker-compose -f docker-compose-node-spa.yml up
```
