# BlackJack21
Eric Gómez Vázquez <----> A01378838 </br>
Rafael Moreno Cañas <----> A01378916 </br>
Ricardo Velazquez Rios <----> A01746958 </br>

## Descripción 
Desarollo de una aplicación web que implemente el juego de BlackJack21 (ver reglas más adelante). El juego debe permitir que uno o más grupos de jugadores, jueguen de forma simultánea.

## Instalación y ejecución del proyecto
Una vez descargado el repositorio sigue estos pasos.
### FRONTEND
Para inicializarlo se debe estar dentro de "frontend/" y correr el comando:
`npm start`
### BACKEND
Para inicializarlo se debe estar dentro de "backend/" y correr el comando:
`npx nodemon index.js`

## Servidor web (backend)
Se implemento como un conjunto de servicios Web escritos en Node y el framework de Express.

El estado de cada juego se almacena en una base de datos de MonogoDB y su acceso se hace mediante el ODM(Object-Document Mapper) Mongoose.

El servidor es responsable de contener y administrar todo el estado de los juegos. Los clientes pueden solicitar en cualquier momento al servidor toda la información que tengan permitido conocer (cuáles son sus cartas, cuál es su puntaje, de quién es el turno actual, el puntaje de la casa, etc.)

Se crea dentro del folder "backend/" con el comando: 
`npm init -y`

## Cliente web (frontend)
Se desarrollo una SPA (Single-Page Application) responsiva usando HTML, W3.CSS, JavaScript y React.

Durante el juego la interacción del cliente con el servidor se realiza utilizando React. Como formato de intercambio de datos se usa JSON.

Se crea dentro de la raiz del proyecto con el comando: 
`npx create-react-app frontend`