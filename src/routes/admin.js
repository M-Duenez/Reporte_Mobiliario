const express = require('express');
const router = express.Router()
const db = require('../database');

router.get('/', async (req, res) =>{
    const usuarios = await db.query('SELECT users.id, users.fullname, areas.area FROM users inner join areas on areas.id = users.fk_area WHERE username <> "admin"');
    console.log(usuarios);
    //res.send('listado de usuarios')
    res.render('admin/index', {usuarios});
});

/*router.post('/addArea', async (req, res) =>{
    console.log(req.body);
    const { area} = req.body;
    const newarea = {
        area
    }
    
    await db.query('INSERT INTO areas set ?', [newarea]);
    
    res.send('mensaje recivido')
});

router.get('/', async (req, res) =>{
    const areas = await db.query('SELECT * FROM areas')
    //console.log(areas);
    //res.send('listado de areas')
    res.render('areas/areas', {areas});
});*/


module.exports = router;