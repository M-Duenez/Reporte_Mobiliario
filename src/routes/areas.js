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
    const areas =  await db.query('SELECT * FROM areas');
    const des = await db.query('SELECT id, fullname FROM users WHERE fk_area = 1');
    const red = await db.query('SELECT id, fullname FROM users WHERE fk_area = 2');
    const sop = await db.query('SELECT id, fullname FROM users WHERE fk_area = 3');
    
    //areas.usuario = {};
    class Datos {
        constructor(id, area, usuarios) {
            this.id = id
            this.area = area;
            this.usuarios = usuarios;
          }


    }

    //areas.usuario.append(des);
    const final = []

    areas.forEach(element => {
        if(element.id == 1){
            console.log(element['area'])
            
            // console.log(datos);
            final.push(new Datos(element.id, element.area, des))
        }
        else if(element.id == 2){
            // console.log(datos);
            final.push(new Datos(element.id, element.area, red))
        }
        else{
            // console.log(datos);
            final.push(new Datos(element.id, element.area, sop))
        }
    });
    //const valor = areas.concat(des);
    console.log(areas)
    console.log(final)
    // res.send('listado de areas')
    res.render('areas/areas', {final});
});

router.get('/delete/:id', (req, res) =>{
    const {id} = req.params
    console.log(id);
    db.query('DELETE FROM areas WHERE id = ?', [id]);
    //res.send('eliminado')
    res.redirect('/areas');
});

router.get('/list_user/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    //const resp = await db.query('SELECT id, fullname, username FROM users WHERE fk_area = ?', [id]);
    //console.log(resp);
    res.send('recivido')
});


module.exports = router;