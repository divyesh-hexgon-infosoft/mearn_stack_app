const UserModel = require('../models/user.model');
const path = require('path');
const fs = require('fs').promises;
const {Config} = require('../config/config')


class UserRepository {
    registerUser = async(params)=>{
        const image_name =await this.#storeImage(params.image);
        await UserModel.createUser({...params,image_name});
        return ;
    }


    update = async (body,filters)=>{
        if(body.image){
            let image_name = await this.#storeImage(body.image);
            body.image = image_name;
            await UserModel.update(body,filters);

        }
        else{
            await UserModel.update(body,filters);
        }
        return;
    }

    deleteUser = async (params)=>{
        await UserModel.delete(params);
    }

    getAllUser = async (params)=>{
        const users = await UserModel.findAll();
        const newUserData = this.#addUserImagePath(users);
        return newUserData;
    }

    getUserById = async (params)=>{
        const User = await UserModel.findOne(params);
        User.password = undefined;
        User.image = `${Config.API_PATH}/${User.image}`;
        return User;
    }

    #addUserImagePath = (users)=>{
        let newUserData = users.map((data)=>{
            data.password = undefined;
            data.user_image = `${Config.API_PATH}/${data.image}`;
            return data;
        });
        return newUserData;
    }

    #storeImage = async (image)=>{

        const IMAGE_ALLOWED_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'];
        const IMAGE_MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        if (!IMAGE_ALLOWED_MIME_TYPES.includes(image?.mimetype)) {
            throw new Error(`File is not an image of an allowed type (${image?.mimetype})`);
        } else if (image.size > IMAGE_MAX_FILE_SIZE) {
            throw new Error(`Image is too big`);
        }

        console.log("store image : ",image);
        const originalname = image.originalname;
        const extname = path.extname(originalname);
        const currentTimeStamp = Math.floor(new Date()/1000);

        const image_name = `${currentTimeStamp}${extname}`;
        const filePath = path.join(__dirname, '../', 'uploads',image_name);
        console.log("filepath :",filePath,image.buffer);
        fs.writeFile(filePath,image.buffer);
        return image_name;

    }
}

module.exports = new UserRepository;