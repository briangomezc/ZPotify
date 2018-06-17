'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave secreta';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({messaje: 'La petición no tiene la cabecera de autenticación.'});
    }
    
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({messaje: 'El token ha expirado.'});
        }
    }catch(ex){
        //console.log(ex);
        return res.status(404).send({messaje: 'El token no es válido.'});
    }

    req.user = payload;
    
    next()
};