if [ ! -d "/Volumes/homes/Florian" ]; then
  echo "Volume homes is not mounted!";
  exit 1;
fi

echo "Install and build";

unset GRAPHQL_API
unset GRAPHQL_WS
rm -Rf packages/app/dist

echo "GRAPHQL_API=https://exreplay.synology.me:4001/graphql\nGRAPHQL_WS=wss://exreplay.synology.me:4001/subscriptions" > ./packages/frontend/app/.env;

yarn install

echo "Build Frontend Image";
yarn workspace @edibl/urql build
yarn workspace @edibl/app build

docker buildx build --platform linux/amd64 --pull -t edibl .
docker save edibl -o edibl.tar

echo "Build Backend Image";
yarn workspace @edibl/auth build
yarn workspace @edibl/graphql build
yarn workspaces focus @edibl/auth @edibl/graphql --production

docker buildx build --platform linux/amd64 -f Dockerfile.backend --pull -t edibl:backend .
docker save edibl:backend -o edibl_backend.tar

echo "Copy Images to NAS";

cp ./edibl.tar /Volumes/homes/Florian
cp ./edibl_backend.tar /Volumes/homes/Florian

echo "PORT=3000\nGRAPHQL_API=http://localhost:4000/graphql\nGRAPHQL_WS=ws://localhost:4000/subscriptions" > ./packages/frontend/app/.env;
