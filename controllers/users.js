const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require ('../models/user');


     const usersGet= async (req=request, res= response) => {
        const { limit = 5,from =0} = req.query;
        const query = {status:true };
  
    
  
        const [total,users] = await Promise.all([
  
        User.count(query),
  
        User.find ({ query })
            .skip( Number( from ))
            .limit(Number(limit))
        ])
  
    res.json({
      total,
      users
      //total,
        //users
      });
  
    }
  
    const usersPut= async (req, res= response) => {
  
        // const errors = validationResult;
  
        const {id}=req.params;
        const { _id,password,google,email, ...resto } = req.body;
  
        //TODO validar contra base de datos
  
        if ( password) {
  
          //encriptar la contraseña
  
          const salt = bcryptjs.genSaltSync();
          resto.password = bcryptjs.hashSync( password, salt);
  
        }
  
        const user = await User.findByIdAndUpdate(id, resto) 
      
        res.json( user);
    
      }
        const usersPatch=(req, res= response) => {
        res.json({
           
            msg: 'patch API - usersPatch'
          });
      
        }
  
        const usersDelete= async(req, res= response) => {
  
          const { id } = req.params;
          
          const user= await User.findByIdAndUpdate(id,{ status: false});

          res.json({ user});
          }

        const usersPost= async(req, res= response) => {
  
            const {name,email,password,role} = req.body;  
            const user= new User ( { name,email,password,role});

            //encriptar la contraseña
  
            const salt = bcryptjs.genSaltSync();
            user.password = bcryptjs.hashSync( password, salt);
  
            //guardar en BD
  
            await user.save();
            
            
            res.json({
                user
              });
          
            }
  
    module.exports = {
      usersGet,
      usersPut,
      usersPatch,
      usersDelete,
      usersPost
    }