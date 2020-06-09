const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game_controller');

router.post("/crear-juego", gameController.postCrearJuego);
router.post("/unirse-juego", gameController.postUnirJuego);
router.post("/terminar-juego", gameController.postTerminarJuego);

module.exports = router;