const UserModel = require('../models/user')
const bcrypt = require('bcrypt');

class UserController {

    //Modify the user email
    async changeMail(req) {
        let result = {httpCode : 204};

        try {
            const _email = req.body.email;
            const _userId = req.user._id;

            const emailUsed = await UserModel.findOne({ email: _email });
            if (emailUsed){
                return {
                    httpCode: 409,
                    message: "An account with this email already exists."
                }
            }            
            await UserModel.updateOne({ _id: _userId }, {$set: { email: _email }});
        } 
        catch (error) {
            result.httpCode = 500;
        }
        return result;
    }

    //Modify the user name
    async changeUsername(req){
        let result = {httpCode : 204};

        try {
            const _username = req.body.username
            const _userId = req.user._id

            const usernameUsed = await UserModel.findOne({ username: _username });
            if (usernameUsed){
                return {
                    httpCode: 409,
                    message: "This username is already taken."
                }
            }
            await UserModel.updateOne({ _id: _userId }, {$set: { username: _username }});
        } 
        catch (error) {
            result.httpCode = 500;
        }   
        return result;
    }

    //Modify the user password
    async changePassword(req){
        let result = {httpCode : 204};
     
        try {
            const _password = req.body.password
            const hash = await bcrypt.hash(_password, 10);

            const _userId = req.user._id
            await UserModel.updateOne({ _id: _userId }, {$set: { password: hash }});
        } 
        catch (error) {
            result.httpCode = 500;
        }
        return result;
    }

    //Return the user name
    async getUsername(req){
        let result = {httpCode : 200};
        
        try {
            const user = await UserModel.findOne({ _id: req.user._id });
            result.username = user.username;
        }
        catch (error) {
            result.httpCode = 500;
        }
        return result;
    }

    //Set the user's role to admin
    async setAdmin(req){
        let result = {httpCode : 200};
        
        try {
            const _username = req.body.username
            const user = await UserModel.findOne({ _id: req.user._id });

            if (user.role != "admin"){
                result.httpCode = 403;
                result.message = "Forbidden";
                return result;
            }
            await UserModel.updateOne({ username: _username }, {$set: { role: "admin" }}); 
        }
        catch (error) {
            result.httpCode = 500;
        }
        return result;
    }

    async getAllUsers(){
        let result = {httpCode : 200};

        try {
            const users = await UserModel.find();
            result.body = users;
        }
        catch (error) {
            result.httpCode = 500;
        }
        return result;
    }
}

module.exports = UserController;