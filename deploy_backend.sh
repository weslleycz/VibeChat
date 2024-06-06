docker-compose up -d
cd backend
yarn
yarn prisma generate
yarn build
pm2 start npm --name backend -- run start -- -p 3000
echo "✨ Deploy finalizado"