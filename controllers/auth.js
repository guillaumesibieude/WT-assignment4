const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')

class AuthController{

    /*Create a new account
    Error if:   - Email already used
                - Username taken
    */
    async signup(req){
        let result = {httpCode: 201};

        try {
            const _username = req.body.username;
            const _password = req.body.password;
            const _email = req.body.email;
    
            const emailUsed = await UserModel.findOne({ email: _email });
            if (emailUsed){
                return {
                    httpCode: 409,
                    message: "An account with this email already exists."
                }
            }
            const usernameUsed = await UserModel.findOne({ username: _username });
            if (usernameUsed){
                return {
                    httpCode: 409,
                    message: "This username is already taken."
                }
            }

            await UserModel.create({ username: _username, email: _email, password: _password});
        }
        catch (error){
            result.httpCode = 500;
        }
        return result;
    }

    /*Return a login JWT token
    Error if:   - Wrong username
                - Wrong password
    */
    async login(req){
        let result = {httpCode: 200};

        try {
            const _username = req.body.username;
            const _password = req.body.password;
            
            const user = await UserModel.findOne({ username: _username });
            if (!user){
                return {
                    httpCode: 400,
                    message: "User doesn't exist"
                }
            }
            const validate = await user.isValidPassword(_password);
            if (!validate){
                return {
                    httpCode: 400,
                    message: "Wrong password"
                }
            }

            const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET);

            result.accessToken = token;
        }
        catch (error){
            result.httpCode = 500;
        }

        return result;
    }
}

module.exports = AuthController;