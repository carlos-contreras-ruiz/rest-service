## Enviroment variables needed

PORT=8081
MONGO_URL=mongodb://user:example@localhost:27017/mydb?authSource=admin
PRIVATEKEYJWT=
GOOGLE_CLIENT_ID=
GOOGLE_SECRET_ID=

## En el caso de docker

El usuario esta solo en la base de datos admin de mongo, por eso se dbe agregar
?authSource=admin para authenticar
