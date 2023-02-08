const express = require('express');
const router = express.Router()
const db = require('../database');

router.get('/', (req, res) =>{
    //res.send('hola mundo')
    res.render('login/page');
});

router.post('/ingresar', async(req, res) =>{
    console.log(req.body);
    const {username, password} = req.body;

    const usuarios = await db.query('SELECT users.id, users.fullname, areas.area FROM users inner join areas on areas.id = users.fk_area WHERE username <> "admin"');
    
    
    //res.send('Credenciales recividas')
    res.redirect('/admin')
})




module.exports = router;