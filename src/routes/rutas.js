const { Router } = require('express');
const router = Router();
const path = require('path');
const passport = require('passport');
const helpers = require('../lib/helpers');
const Transbank = require('transbank-sdk');
const { decodeBase64 } = require('bcryptjs');

const transaction = new Transbank.Webpay(
    Transbank.Configuration.forTestingWebpayPlusNormal()
).getNormalTransaction();



//**ALL 

//** GET **
router.get('/index', async (req, res) => {
    const array = await helpers.getProduct();
    res.render('index.html', { array: array });
});
router.get('/api/products', async (req, res) => {
    const array = await helpers.getProduct();
    //CONVERTIR LA DATA A JSON
    const jsonString = JSON.stringify(array);
    //SE ENVIA EL JSON
    res.json(jsonString);
});

router.get('/perfil', (req, res) => {

    if (req.isAuthenticated()) {
        res.render('perfil.html');
    } else {
        res.redirect('/index');
    }
});
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/index');
});

router.get('/orden', (req, res, next) => {
    res.render('order.html');
});




//** POST **
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/index',
    failureRedirect: '/signup',
    failureFlash: true
}));



router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', {
        successRedirect: '/perfil',
        failureRedirect: '/signup',
        failureFlash: true
    })(req, res, next)
});

router.post('/api/productsVerification', async (req, res, next) => {
    //respuesta al cliente
    var respuesta = {
        estado: true
    }
    var array = new Array()
    for (let i = 0; i < req.body.length; i++) {
        array.push(JSON.parse(req.body[i]))
    }

    
    var verification = await helpers.verification(array);



    //TEST WEBPAY
    const amount = array[array.length - 1];
    // Identificador que será retornado en el callback de resultado:
    const sessionId = 'mi-id-de-sesion';
    // Identificador único de orden de compra:
    const buyOrder = Math.round(Math.random() * 999999999);
    const returnUrl = 'http://localhost:5000/transaccion'//'https://callback/resultado/de/transaccion'
    var finalUrl = 'http://localhost:5000/thx'//'https://callback/final/post/comprobante/webpay'

    const x = await transaction.initTransaction(amount, buyOrder, sessionId, returnUrl, finalUrl)

    verificationLoop:
    for (let i = 0; i < verification.length; i++) {
        if (verification[i].estado == false) {
            respuesta = {
                estado: false,
                nombre: verification[i].producto
            }
            break verificationLoop
        } else {
            respuesta = {
                estado: true,
                link: x.url + '?token_ws=' + x.token
            }
        }
    }
    console.log(verification)


    res.send(JSON.stringify(respuesta))
});

router.post('/transaccion', (req, res, next) => {
    // Obtener el token desde el paraemtro token_ws recibido por POST
    // Si usas express, sería algo como esto: 
    const token = req.body.token_ws;

    console.log(token)

    transaction.getTransactionResult(token)
        .then((response) => {
            const output = response.detailOutput[0];
            if (output.responseCode === 0) {
                console.log(response)
                res.redirect(308, response.urlRedirection)
            }
        })
        .catch((error) => {
            console.log(error.toString())
            // Cualquier error durante la transacción será recibido acá
        });
})
router.post('/index', async(req,res,next)=>{
    //const array = await helpers.getProduct();
    res.render('index.html'/*, { array: array }*/);
})

router.post('/thx', (req, res, next) => {
    res.render('thx.html');
});












module.exports = router;