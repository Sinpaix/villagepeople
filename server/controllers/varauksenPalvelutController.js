const sql = require('../db/varauksenPalvelutSQL');

module.exports = {

    haeVarauksenPalvelut: async (req, res) => {
        try {
            let asiakas_id = req.params.asiakas_id;

            let v = await sql.getVarauksenPalvelut(asiakas_id);

            res.statusCode = 200;
            res.json(v);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },
    lisaaVarauksenPalvelut: async (req, res) => {
        try {
            let varaus_id = req.body.varaus_id;
            let palvelu_id = req.body.palvelu_id;
            let lkm = req.body.lkm;

            let v = await sql.insertVarauksenPalvelut(varaus_id, palvelu_id, lkm);

            res.statusCode = 200;
            res.json(v);
        }
        catch (err) {
            console.log("Error in server")
            res.statusCode = 400;
            res.json({msg : err});
        }
    },

    poistaVarauksenPalvelut: async (req, res) =>{
        let varaus_id = req.params.varaus_id;

        try {
            console.log("poistetaan palveluvaraus: " + varaus_id);
            let c = await sql.deleteVarauksenPalvelu(varaus_id);

            res.status = 200;
            res.json(c);
        }
        catch (err) {
            console.log("Error in server")
            res.status = 400;
            res.json({ status: "NOT OK", msg: err });
        }
    },
 
}