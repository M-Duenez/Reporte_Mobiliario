const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
}, async (req, username, password, done) => {
    console.log(req.body);
    const {fullname} = req.body;
    const newuser = {
        fullname,
        username,
        password
    };
    newuser.password = await helpers.encrypPassword(password);
    const result = await db.query('INSERT INTO users SET ?', [newuser]);
    //console.log(result);
    newuser.id = result.insertId;
    return done(null, newuser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async( id, done) =>{
    const ressult = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);

});
