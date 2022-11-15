const { response } = require( 'express');

const isAdminRole = (req, res = response, next) => {

    if ( !req.user){
        return res.status(500).json({
            msg: 'Check the role without validating the token first.'
        });
    }

   const {role, name} = req.user;
   if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:`${name} is not administrator - Can't do that.` 
        });
   }
    next();
}

const haveRole = (...role) =>{
    return (req, res = response, next) => {
        
        if (!req.user){
            return res.status(500).json({
                msg: 'Check the role without validating the token first.'
            });
        }

        if (!role.includes(req.user.role)){
            return res.status(401).json({
                msg:`The service requires one of these roles ${role}.` 
            });
        }
        next();
    }
}

module.exports={
    isAdminRole,
    haveRole
}