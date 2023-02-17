const bcrypt = require('bcryptjs')
const helpers = {};

helpers.encrypPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    const passwordhash = await bcrypt.hash(password, salt);
    return passwordhash;

};

helpers.matchPassword = async (password, dbpassword) =>{
    try{
        await bcrypt.compare(password, dbpassword);
    } catch (e){
        console.log(e);
    }
}

module.exports = helpers;