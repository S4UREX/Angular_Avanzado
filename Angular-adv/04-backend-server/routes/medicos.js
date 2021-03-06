/*
    Médicos
    path: /api/medicos
 */

const {validarJWT} = require ("../middlewares/validar-jwt");
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { actualizarMedico,
    borrarMedico,
    crearMedico,
    leerMedico,
    getMedicoById } = require('../controllers/medicos');

const router = Router();

router.get('/', validarJWT, leerMedico);

// El segundo argumento son middlewares los cuales son funciones que se ejecutan antes de otras
// Si son varios usamos [] en caso contrario los omitimos
router.post(
    '/',
    [
        validarJWT,
        check('x-token', 'El token no es válido').isJWT(),
        check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id',
    [
        validarJWT,
        check('x-token', 'El token no es válido').isJWT(),
        check('nombre', 'El nombre del médico es requerido').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarMedico
)

router.delete('/:id',
    [validarJWT],
    borrarMedico
);

router.get('/:id',
    [validarJWT],
    getMedicoById
);

module.exports = router;


