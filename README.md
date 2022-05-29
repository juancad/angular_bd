# Angular firebase

## Contenidos 
1. [Introducción](#intro)
  1.1. [Link web](#link-web)
2. [Requisitos](#requisitos)
3. [Usuario de prueba](#user-prueba)
4. [Descripción del trabajo realizado](#descripcion)

### 1. Introducción <a name="intro"/>
Se trata de crear una aplicación en Angular que acceda a la información en una base de datos en Firebase (Realtime o Firestore) y realice las operaciones: Crear, Leer, Actualizar y Borrar -CRUD-. La aplicación debe hacer uso de servicios, enrutamiento y navegación.

### 1.1 Link web <a name="link-web"/>
https://juancad.github.io/angular_bd/

## 2. Requisitos<a name="requisitos"/>
Para poder ejecutar el proyecto será necesario:
- Tener instalado [Node.js](https://nodejs.org/es/download/).
- Para este proyecto se ha utilizado el IDE Visual Studio.
- Tener instalado npm, mediante el comando: `npm install -g @angular/cli`.
- Importar el proyecto e instalar las dependencias del fichero package.json mediante el comando `npm install`.
- Ejecutar el comando `ng serve` y abrir la dirección `http://localhost:4200/` en un navegador.

## 3. Usuario de prueba<a name="user-prueba"/>
Para probar la aplicación se puede iniciar sesión con las siguientes credenciales:
Correo: prueba@gmail.com
Contraseña: prueba

## 4. Descripción del trabajo realizado<a name="descripcion"/>
Al iniciar la aplicación aparece la ventana de registro, que hace uso de la autentificación de Firebase. Para registrarse un usuario debe indicar su correo electrónico y contraseña. Se ha implementado el registro o inicio de sesión por Google, haciendo uso del método [GoogleAuthProvider](https://firebase.google.com/docs/reference/node/firebase.auth.GoogleAuthProvider). Los métodos de registro e inicio de sesión de la aplicación se han implementado en el servicio "AuthService".

Una vez el usuario inicie sesión en la aplicación aparecerá la ventana de publicaciones. El usuario podrá crear una publicación, indicando un nombre, contenido y subiendo una imagen. Una vez realizada una publicación, se podrá ver en la lista de publicaiones, editar y/o eliminar. Las publicaciones se guardan en la base de datos en la colección "publicaciones". El servicio "PublicacionesService" es el que contiene los métodos para añadir una publicación a la base de datos, modificarla y/o elimnarla. Al guardar una publicación en la base de datos, se guarda también el uid del usuario que ha creao dicha publicación. Para mostrar las publicaciones se consultan las publicaciones de la base de datos donde el uid coincida con el uid del usuario que ha iniciado sesión (de ello se encarga el método getPublicaciones() del servicio).

Se ha implementado una forma de subir imágenes a la base de datos, tanto para las publicaciones como para el perfil del usuario. Las imágenes que suba un usuario se guardarán en la carpeta con el uid del usuario, en el storage de Firestore. Una vez se sube la imagen, se guarda su url para mostrarla donde corresponda.

El usuario puede editar su perfil, cambiando su nombre de usuario, correo electrónico y su imagen de perfil. Cuando modifica su perfil, se modifica la información de dicho usuario en la base de datos.

La aplicación es responsive, para ello se ha hecho uso del [Grid system de Boostrap](https://getbootstrap.com/docs/4.0/layout/grid/).

## 5. Referencias
[Firebase: Administra usuarios en Firebase](https://firebase.google.com/docs/auth/web/manage-users?hl=es#web-version-9_5)
[Firebase: Sube archivos con Cloud Storage en la web](https://firebase.google.com/docs/storage/web/upload-files?hl=es)
[Firestore: Consultar y filtrar datos](https://cloud.google.com/firestore/docs/query-data/queries?hl=es-419)

