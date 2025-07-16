# REST API con Node.js, Express y MongoDB

1. **Clonar el repositorio:**
```bash
git clone https://github.com/PieroLan/restapi-mongodb.git
cd restapi-mongodb
```

2. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:
```env
MONGODB_URI=<URL de tu base de datos de mongo>
PORT=6000
BASE_URL=http://localhost:6000
```

3. **Crea la carpeta uploads en el directorio raiz**
```bash
mkdir uploads
```

4. **Ejecutar el servidor:**
```bash
# Modo desarrollo (con nodemon)
npm run server

# Modo producción
npm start
```