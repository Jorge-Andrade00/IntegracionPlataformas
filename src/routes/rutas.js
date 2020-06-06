const { Router } = require('express');
const router = Router();
const path = require('path');
const passport = require('passport');
const helpers = require('../lib/helpers');



//**ALL 

//** GET **
router.get('/index', async (req, res) => {
    const array = await helpers.getProduct();
    res.render('index.html', {array: array});
});
router.get('/api/products',async (req, res)=>{
    const array = await helpers.getProduct();
    //CONVERTIR LA DATA A JSON
    const jsonString = JSON.stringify(array);
    //SE ENVIA EL JSON
    res.json(jsonString);
});

/*
router.get('/signin', (req, res) => {
    res.render('signin.html');
});

router.get('/signup', (req, res) => {
    //res.send('hello world');
    if(req.isUnauthenticated()){
    res.render('signup.html');
    }else{
        res.redirect('/perfil');
    }
});
*/
router.get('/perfil', (req, res) => {
    
    if (req.isAuthenticated()) {
        res.render('perfil.html');
    }else{
        res.redirect('/index');
    }
});
router.get('/logout',(req, res)=>{
    req.logOut();
    res.redirect('/index');
});

router.get('/orden', (req, res, next)=>{
    res.render('order.html');
});



//** POST **
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/index',
    failureRedirect: '/signup',
    failureFlash: true
}));

//router.post('/signin', passport.authenticate('local-signin', {
//    successRedirect: '/perfil',
//    failureRedirect: '/signup',
//    failureFlash: true,
//    successFlash: true
//}));

router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', {
        successRedirect: '/perfil',
       failureRedirect: '/signup',
       failureFlash: true
    })(req,res,next)    
});

router.post('/api/productsVerification',(req, res, next)=>{
    var array = new Array()
    for (let i = 0; i < req.body.length; i++) {
        array.push(JSON.parse(req.body[i]))
    }
    helpers.verification(array)

    console.log(req.body)//HAY QUE CREAR UN METODO PARA DEVOLVER LA SI SE APRUEBA O NO LA TRANSACCION
    var respuesta = true
    res.send(JSON.stringify(respuesta))
});












module.exports = router;