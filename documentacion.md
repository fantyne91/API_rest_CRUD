

## `- Config: `

## connectDB

Conexión a la base de datos MongoDB utilizando Mongoose.

##### Descripción

- Importa el módulo `mongoose`.
- Define la función asíncrona `connectDB` para conectar a la base de datos.
- Utiliza `mongoose.connect()` con la URL de la base de datos definida en las variables de entorno (`process.env.DB_URL`).
- Maneja errores de conexión mediante un bloque `try/catch`.
- Exporta la función para poder usarla en otros módulos como `index.js`.
## connectCloudinary

Configura la conexión con Cloudinary para gestionar almacenamiento y manipulación de imágenes en la nube.

##### Descripción

- Importa el módulo `cloudinary`.
- Define la función `connectCloudinary` para establecer la configuración.
- Utiliza las variables de entorno:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Maneja errores mediante un bloque `try/catch`.
- Exporta la función para usarla en otros módulos. 

## `-Funciones: `

## getInterest(req, res) `Promise.<void>`
* Obtiene todos los datos de la base de datos. Sirve como catalogo para el front-end.

**Kind**: global function
**Returns**: `Promise.<void>` - Envía un array de intereses o un mensaje de error.

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |

## postInterest(req, res) `Promise.<void>`
* Crea un nuevo interés si no existe previamente y solo si es Admin. Debe autentificarse con Token JWT

**Kind**: global function
**Returns**: `Promise.<void>` 
**Throws**:

- `400` Si el interés ya existe.
- `500` Si ocurre un error en la creación.

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |
| req.body.name | `string` | Nombre del interés a crear. |

## deleteInterest(req, res)  `Promise.<void>`
* Elimina un interes por Id en la base de datos.

**Kind**: global function
**Returns**: `Promise.<void>` el interés eliminado o un error.

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |
| req.params.id | `string` | ID del interés a eliminar. |

## getUsers(req, res, next) `Promise.<void>`
*Obtiene todos los usuarios de la base de datos

**Kind**: global function
**Returns**: `Promise.<void>` - Respuesta JSON con todos los usuarios.
**Permission**: admin

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |


**Example**
```js
Llamada a la ruta (token de admin)
GET /users
```

## login(req, res, next) `Promise.<void>`
* Inicia sesión de usuario. Valida email y ccontraseña usando bcrypt.

**Kind**: global function
**Returns**: `Promise.<void>` - Devuelve token JWT si las credenciales son correctas.

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |


**Example**
```js
POST /login
Body:
{
 "email": "example@email.com",
 "password": "123456"
}
```

## postUsers(req, res, next) `Promise.<void>`
* Crea un nuevo usuario. Verifica si el email ya existe antes de crear.

**Kind**: global function
**Returns**: `Promise.<void>` - Devuelve el usuario creado o error.

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |


**Example**
```js
POST /users
Body:
{
 "name": "Maria",
 "email": "maria@email.com",
 "password": "secret"
}
```

## updateUsers(req, res, next)  `Promise.<void>`
* Actualiza datos user por ID.
Si el usuario no es admin, no puede cambiar el rol.

**Kind**: global function
**Returns**: `Promise.<void>` - Devuelve el usuario actualizado.
**Permission**: admin | user

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |


**Example**
```js
PATCH /users/664cabc123456789
Body:
{
 "name": "Maria Updated"
}
```

## deleteUsers(req, res)`Promise.<void>`
* Elimina un usuario por su ID y elimina la imagen asociada en Cloudinary.

**Kind**: global function
**Returns**: `Promise.<void>` - Env├¡a una respuesta JSON con el usuario eliminado o un error.
**Permission**: admin | user

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |

## postUserInterest(req, res)  `Promise.<void>`
* Añade un interés a un usuario.
* Funciona en el mismo user o si es admin.

**Kind**: global function
**Returns**: `Promise.<void>` - Envía una respuesta JSON con el usuario actualizado o un error.
**Throws**:

- `404` Si el usuario no existe o el interés no está en la base de datos.
- `400` Si el usuario ya tiene ese interés.

**Permission**: user | admin

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |
| req.params.id | `string` | ID del usuario a introducir interest. |
| req.body.interest | `string` | Nombre del interés a añadir. |

## `-Middlewares: `

## isAdmin(req, res) `void`
Middleware. Si el usuario tiene rol "admin", permite continuar la ejecución
de la ruta. De lo contrario, devuelve un error 403 (No autorizado).

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |

## isAuth(req, res, next)  `void`
* Middleware que verifica si el usuario esta autentificado.
- Obtiene el token JWT del header Authorization.
- Verifica el token y obtiene el ID del usuario.
- Busca el usuario en la base de datos y lo adjunta a `req.user`.
- Elimina el campo `password` del objeto usuario por seguridad.

Si la autenticación falla, devuelve un error 401 (No autorizado).

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |
| next | `function` | Función middleware siguiente. |

## isSameUserOrAdmin(req, res, next)  `void`
* Middleware que verifica si el usuario autentificado es :
 el mismo que el solicitado en los parámetros de la ruta / admin


Si no cumple ninguna condición, devuelve un error 403 (No autorizado).

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| req | `Object` | Objeto de solicitud HTTP (Express). |
| res | `Object` | Objeto de respuesta HTTP (Express). |
| next | `function` | Función middleware siguiente. |

## `-Utils: `

## deleteFile(url)  `void`
* Elimina un archivo almacenado en Cloudinary, dado su URL completo.

Obtiene el `public_id` a partir de la ruta de la URL con split y realiza
la eliminación del recurso en Cloudinary.

**Kind**: global function

| Param | Type | Description |
| --- | --- | --- |
| url | `string` | URL completa de la imagen o recurso en Cloudinary. |

## generateJWT(id) `string`
* Genera un token JWT con el Id usuario.

**Kind**: global function
**Returns**: `string` - Token JWT generado.

| Param | Type | Description |
| --- | --- | --- |
| id | `string` | El ID del usuario que se incluirá en el token. |

## verifyJWT(token)  `Object`
* Verifica un token JWT y devuelve decodificado.

**Kind**: global function
**Returns**: `Object` - El payload decodificado si el token es válido.
**Throws**:

- `Error` Si el token es inválido o ha expirado.

| Param | Type | Description |
| --- | --- | --- |
| token | `string` | El token JWT que se desea verificar. |