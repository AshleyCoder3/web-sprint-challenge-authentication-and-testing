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
        const {username} = req.body;
        const {password} = req.body;
        if(!password || !username){
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


module.exports = {
    checkUserNameTaken,
    validateInput,

}
