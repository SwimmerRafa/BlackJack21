const express = require('express');
const router = express.Router();
const jugadorController = require('../controllers/jugador_controller');

router.get("/pedir-carta", jugadorController.getPedirCarta);
router.get("/cartas", jugadorController.getCartas);