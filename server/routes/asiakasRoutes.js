var express = require('express');
var router = express.Router();

let ctrl = require('../controllers/asiakasController');


router.route('/api/asiakkaat').
    get(ctrl.haeAsiakkaat);

router.route('/api/asiakas/:asiakas_id').
    get(ctrl.haeAsiakkaat);

router.route('/api/asiakas').
    post(ctrl.lisaaAsiakas);

router.route('/api/asiakas/:asiakasid').
    delete(ctrl.poistaAsiakas);

router.route('/api/asiakas').
    put(ctrl.muokkaaAsiakasta);

// Julkaistaan ao. funktiot tämän js-filun ulkopuolelle
module.exports = router;