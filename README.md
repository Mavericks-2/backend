# ShelfMate Backend

## Equipo 1 - CEM
Integrantes: 
* A01751655 Cortés Olvera Gabriela 
* A01745865 García Gómez José Ángel 
* A01745096 González de la Parra Pablo 
* A01751580 Islas Montiel Zaide
* A01745371 Sánchez Bahnsen Elisa
* A01382889 Ana Martínez Barbosa
* A01706870 José María Ibarra Pérez
* A01745158 García Sánchez Erika Marlene

## Tecnologías utilizadas
* [Node JS](https://nodejs.org/es/) - v18.15.0
* [Express](https://expressjs.com/es/) - v4.17.1
* [TypeScript](https://www.typescriptlang.org/) - v4.4.4
* [Aws-sdk](https://www.npmjs.com/package/aws-sdk) - v2.1038.0

## Requisitos del sistema
* [Node JS](https://nodejs.org/es/)  - v18.15.0
* [NPM](https://www.npmjs.com/) - v10.1.0
* [Git](https://git-scm.com/)
* [MySQL](https://www.mysql.com/) - v8.0.27
* [Python](https://www.python.org/) - v3.9.7
* Variables de entorno:
    * DB_TYPE
    * DB_HOST
    * DB_PORT
    * DB_USERNAME
    * DB_PASSWORD
    * DB_DATABASE
    * IMAGE_BASE_URL
    * AWS_REGION
    * AWS_ACCESS_KEY
    * AWS_SECRET_ACCESS_KEY
    * AWS_SESSION_TOKEN
    * COGNITO_APP_CLIENT_ID
    * COGNITO_APP_SECRET_HASH
    * COGNITO_USER_POOL_ID

## Instalación
1. Clonar el repositorio
```bash
git clone git@github.com:Mavericks-2/backend.git
```
2. Instalar las dependencias
```bash
npm install
```
3. Correr el proyecto
```bash
npm run build:start
```
4. Abrir el navegador en la dirección [http://localhost:8080](http://localhost:8080)

## Documentación de rutas

### Rutas de autenticación
### POST /signup
- **Body:**
  ```json
  {
      "email": "string",
      "password": "string",
      "name": "string",
      "lastName": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### POST /verify
- **Body:**
  ```json
  {
      "email": "string",
      "verifyCode": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### POST /signin
- **Body:**
  ```json
  {
      "email": "string",
      "password": "string"
  }
  ```
- **Response:**
  ```json
  {
      // ... AuthenticationResult properties
  }
  ```

### POST /getUser
- **Body:**
  ```json
  {
      "email": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "okay",
      "user": {
          // ... User properties
      }
  }
  ```

### POST /signupAcomodador
- **Body:**
  ```json
  {
      "email": "string",
      "password": "string",
      "name": "string",
      "lastName": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### POST /verifyAcomodador
- **Body:**
  ```json
  {
      "email": "string",
      "verifyCode": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### POST /signinAcomodador
- **Body:**
  ```json
  {
      "email": "string",
      "password": "string"
  }
  ```
- **Response:**
  ```json
  {
      // ... AuthenticationResult properties
  }
  ```

### POST /getUserAcomodador
- **Body:**
  ```json
  {
      "email": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "okay",
      "user": {
          // ... Acomodador properties
      }
  }
  ```

### POST /forgotPassword
- **Body:**
  ```json
  {
      "email": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "string"
  }
  ```

### POST /confirmForgotPassword
- **Body:**
  ```json
  {
      "email": "string",
      "code": "string",
      "newPassword": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "okay"
  }
  ```

## Rutas de modelo

### POST /postAccuracyModel
- **Body:**
  ```json
  {
      "accuracy": "string",
      "matrizProductosE": "string",
      "id_admin": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### GET /getAccuracyModel
- **Response:**
  ```json
  {
      // ... Model properties
  }
  ```

## Rutas de planograma

### POST /postPlanogramConfig
- **Body:**
  ```json
  {
      "url_imagen": "string",
      "id_manager": "string",
      "coordenadas": "string",
      "matriz_productos": "string",
      "lineas": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### GET /getPlanogramConfig/:id_acomodador
- **Response:**
  ```json
  {
      "planogram": {
          // ... Planogram properties
      },
      "message": "ok"
  }
  ```

### POST /postPlanogramToCloud
- **Body:**
  ```json
  {
      "base_64_image": "string",
      "type": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok",
      "url": "string"
  }
  ```

## Rutas de status
### POST /postComparedPhotos
- **Body:**
  ```json
  {
      "estado": "string",
      "matrizDiferencias": "string",
      "matrizProductosF": "string",
      "id_acomodador": "string",
      "id_planogram": "string"
  }
  ```
- **Response:**
  ```json
  {
      "message": "ok"
  }
  ```

### GET /getIntentosPrevAcomodo
- **Response:**
  ```json
  [
      {
          "id_acomodador": "string",
          "conteo": "string",
          "fecha": "string",
          "statusAcomodador": {
              "nombre": "string"
          }
      }
      // ... Additional entries
  ]
  ```

### GET /getMatrizDiferencias
- **Response:**
  ```json
  [
      {
          "fecha": "string",
          "matricesDiferencias": "string",
          "matricesProductosF": "string"
      }
      // ... Additional entries
  ]
  ```

### GET /getFechasStatus
- **Response:**
  ```json
  [
      {
          "fecha": "string",
          "primerDesacomodado": {
              "fecha": "string",
              "estado": "string"
          },
          "primerAcomodado": {
              "fecha": "string",
              "estado": "string"
          },
          "timestamp": "number"
      }
      // ... Additional entries
  ]
  ```
