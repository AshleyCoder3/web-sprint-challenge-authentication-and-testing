const Users = require('../users/users-model')

const checkUserNameTaken = async (req,res,next) =>{
    try{
        const {username} = req.body
        const exists = await Users.findBy({username})
        if(exists.length >= 1){
            next({
                message: 'username taken',
                status: 422
            })
        } else {
            next()
        }
    } catch (err) {
        next(err);
    }
}
const validateInput = async (req, res, next)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            next({
                message: 'username and password are required',
                status: 422
            })
        } else{
            next()
        }
    } catch(err){
        next(err)
    }
}
const checkUserExisits = async (req,res,next) => {
  try{
      const {username} = req.body;


  }catch(err){
      next(err)
  }
}


module.exports = {
    checkUserNameTaken,
    validateInput,

}
