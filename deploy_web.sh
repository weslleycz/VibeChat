docker-compose up -d
cd backend
yarn
yarn prisma generate
yarn build
pm2 start npm --name backend -- run start -- -p 3000
cd ..
cd frontend
yarn
ionic build --prod
cd dist
pm2 start /usr/bin/http-server --name frontend -- -p 8080 -d false
echo "✨ Deploy finalizado"