const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugador_controller');

router.post("/pedir-carta", jugadorController.getPedirCarta);
router.post("/cartas", jugadorController.getCartas);
router.post("/terminar-turno", jugadorController.postTerminarTurno);

module.exports = router;