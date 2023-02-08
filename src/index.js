const express = require('express');
const morgan = require('morgan');
const {create} = require('express-handlebars');
const path = require('path')


//inicializaciones
const app = express()

//seting
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

const exhbs = create({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./lib/handlebars'),

});
app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Variables globales
app.use((req, res, next) =>{
    next();
});


//Rutas
app.use('/', require('./routes/login'));
app.use(require('./routes/autenticacion'));
app.use('/links', require('./routes/links'));
app.use('/areas', require('./routes/areas'));
app.use('/admin', require('./routes/admin'));

//public
app.use(express.static(path.join(__dirname, 'public')));

//Empezar servidor
app.listen(app.get('port'), () => {
    console.log('SERVER ON PORT: ', app.get('port') );
});