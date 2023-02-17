const express = require('express');
const router = express.Router()
const db = require('../database');
const passport = require('passport');

router.get('/', (req, res) =>{
    //res.send('hola mundo')
    res.render('login/page');
});

router.post('/ingresar', async(req, res) =>{
    console.log(req.body);
    const {username, password} = req.body;
        
    //res.send('Credenciales recividas')
    res.redirect('/admin')
});

router.get('/registro', (req, res) =>{
    //res.send('hola mundo')
    res.render('login/registro');
});

/*router.post('/registro', ( req, res) =>{
    console.log(req.body);
    passport.authenticate('local.login', {
        successRedirect: '/perfil',
        failureRedirect: '/registro',
        failureFlash: true
    });
    res.send('recivido')
});*/

router.post('/registro', passport.authenticate('local.login', {
    successRedirect: '/',
    failureRedirect: '/registro',
    failureFlash: true
}));



module.exports = router;