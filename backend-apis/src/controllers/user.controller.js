const userRepository = require('../repositories/user.repository');
const UserRepository = require('../repositories/user.repository');

class UserController{
    registerUser = async (req,res,next)=>{
        await UserRepository.registerUser({...req.body,image:req.file});
        res.send('user is regiseterd !');
    }

    update = async (req,res,next)=>{
        await UserRepository.update({...req.body,image:req.file},req.params);
        res.send('user updated successfully !');
    }

    delete = async(req,res,next)=>{
        await UserRepository.deleteUser(req.params);
        res.send('user deleted successfully');
    }

    getAllUsers =async(req,res,next)=>{
        const users = await UserRepository.getAllUser();
        res.send(users);
    }

    getUserById = async (req,res,next)=>{

        const user = await userRepository.getUserById(req.params);
        res.send(user);
    }
}

module.exports = new UserController;