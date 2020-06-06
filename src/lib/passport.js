const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database/pool');
const helpers = require('./helpers');

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, email, pass, done)=>{
    const arreglo = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    if(arreglo.length > 0 ){
        const user = arreglo[0];
        const ok = await helpers.matchPass(pass,  user.pass);
        if(ok){
           return done(null, user, req.flash('ok', 'bienvenido'));
        } else{
            return done(null, false, req.flash({'message':'user/pass incorrecto'}));
        }
    }else{
        return done(null, false, req.flash('message','Usuario no existe'));
    }
}));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, email, pass, done)=>{
    //console.log(req.body);
    const { fullname } = req.body;
    const newUser = {
        email,
        fullname,
        pass
    };
    newUser.pass = await helpers.encryptPass(pass);
    const resul = await pool.query('INSERT INTO usuario SET ?', [newUser]);
    newUser.id = resul.insertId;
    return done(null, newUser);
}));

passport.serializeUser((usr, done) => {
    done(null, usr.id);
});

passport.deserializeUser(async (id, done)=> {
   const arreglo = await pool.query('SELECT * FROM usuario WHERE id = ?', [id]);
   return done(null, arreglo[0]);
});

