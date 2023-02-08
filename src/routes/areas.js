const express = require('express');
const router = express.Router()
const db = require('../database');

router.get('/addArea', (req, res) =>{
    res.render('areas/addArea');
});

router.post('/addArea', async (req, res) =>{
    console.log(req.body);
    const { area} = req.body;
    const newarea = {
        area
    }
    
    await db.query('INSERT INTO areas set ?', [newarea]);
    
    res.redirect('/areas')
});

router.get('/', async (req, res) =>{
    const areas = await db.query('SELECT * FROM areas')
    //console.log(areas);
    //res.send('listado de areas')
    res.render('areas/areas', {areas});
});

router.get('/delete/:id', (req, res) =>{
    const {id} = req.params
    console.log(id);
    db.query('DELETE FROM areas WHERE id = ?', [id]);
    //res.send('eliminado')
    res.redirect('/areas');
});


module.exports = router;