
const jwt = require('jsonwebtoken');
const config=require('config')


function auth(req, res ,next){
    const token=req.header('x-auth-token');
    if(!token) return res.status(401).send('mafamech dkhoul ya gholi')
    try{
        const decoded= jwt.verify(token,config.get('jwtPrivteKey'))
        req.user=decoded;
        next()
}
catch(ex){
    res.status(400).send('thb tpirati ya m3alm')
}
    
}

module.exports = auth;