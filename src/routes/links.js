const express = require('express');
const router = express.Router()
const db = require('../database');

router.get('/add', (req, res) =>{
    res.render('links/add');
});

router.post('/add', (req, res) =>{
    const { titulo} = req.body;
    const newlink = { titulo};
    res.send('mensaje recivido')
});

router.get('/delete/:id', (req, res) =>{
    const id =req.params.id
    console.log(id);
});


module.exports = router;