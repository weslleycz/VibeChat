cd frontend
ionic build --prod
cd dist
pm2 start /usr/bin/http-server --name frontend -- -p 8080 -d false