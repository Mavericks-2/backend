# ShelfMate Backend

## Equipo 1 - CEM

Integrantes:

- A01751655 Cortés Olvera Gabriela
- A01745865 García Gómez José Ángel
- A01745096 González de la Parra Pablo
- A01751580 Islas Montiel Zaide
- A01745371 Sánchez Bahnsen Elisa
- A01382889 Ana Martínez Barbosa
- A01706870 José María Ibarra Pérez
- A01745158 García Sánchez Erika Marlene

## Tecnologías utilizadas

- [Node JS](https://nodejs.org/es/) - v18.15.0
- [Express](https://expressjs.com/es/) - v4.17.1
- [TypeScript](https://www.typescriptlang.org/) - v4.4.4

## Requisitos del sistema

- [Node JS](https://nodejs.org/es/) - v18.15.0
- [NPM](https://www.npmjs.com/) - v10.1.0
- [Git](https://git-scm.com/)
- [MySQL](https://www.mysql.com/) - v8.0.27
- [Python](https://www.python.org/) - v3.9.7

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

### POST /auth/signup

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

### POST /auth/verify

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

### POST /auth/signin

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
    "AccessToken": "string",
    "ExpiresIn": "number",
    "TokenType": "string",
    "RefreshToken": "string",
    "IdToken": "string"
  }
  ```

### POST /auth/getUser

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
      // ... User properties (Depends on the user type)
    }
  }
  ```

### POST /auth/signupAcomodador

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

### POST /auth/verifyAcomodador

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

### POST /auth/signinAcomodador

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
    "AccessToken": "string",
    "ExpiresIn": "number",
    "TokenType": "string",
    "RefreshToken": "string",
    "IdToken": "string"
  }
  ```

### POST /auth/getUserAcomodador

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
      "id_acomodador": "string",
      "nombre": "string",
      "apellido": "string",
      "correo": "string",
      "awsCognitoId": "string",
      "role": "string",
      "id_manager": "UUID"
    }
  }
  ```

### POST /auth/forgotPassword

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

### POST /auth/confirmForgotPassword

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

### POST /model/postAccuracyModel

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

### GET /model/getAccuracyModel

- **Response:**
  ```json
  {
    "id_model": "UUID",
    "accuracy": "number",
    "fecha": "Date",
    "matrizProductosE": "JSON",
    "id_admin": "UUID"
  }
  ```

## Rutas de planograma

### POST /planogram/postPlanogramConfig

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

### GET /planogram/getPlanogramConfig/:id_acomodador

- **Response:**

  ```json
  {
    "planogram": {
      "id_planogram": "UUID",
      "url_imagen": "string",
      "fecha_creacion": "Date",
      "coordenadas": "JSON",
      "id_manager": "UUID",
      "matriz_productos": "JSON",
      "lineas": "JSON"
    },
    "message": "ok"
  }
  ```

### POST /planogram/postPlanogramToCloud

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

### POST /status/postComparedPhotos

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

### GET /status/getIntentosPrevAcomodo

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
  ]
  ```

### GET /status/getMatrizDiferencias

- **Response:**
  ```json
  [
    {
      "fecha": "string",
      "matricesDiferencias": "string",
      "matricesProductosF": "string"
    }
  ]
  ```

### GET /status/getFechasStatus

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
  ]
  ```

### GET /status/getMostFailedProduct/:idAcomodador

- **Response:**
  ```json
  {
    "product": "most_failed_product"
  }
  ```

### GET /status/getNumberScanns/:idAcomodador

- **Response:**
  ```json
  {
    "numberScanns": "number"
  }
  ```

### GET /status/getNumberScannsProducts/:idAcomodador

- **Response:**
  ```json
  {
    "numberScannsProducts": "number"
  }
  ```

### GET /status/getAccuracy/:idAcomodador

- **Response:**
  ```json
  {
    "accuracy": "number"
  }
  ```

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

La licencia de este proyecto es MIT, por lo que es de código abierto y puede ser utilizado por cualquier persona que lo desee.
