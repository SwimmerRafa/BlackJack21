const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game_controller');

router.get("/crear-juego", gameController.postCrearJuego);
router.get("/unirse-juego", gameController.postUnirJuego);