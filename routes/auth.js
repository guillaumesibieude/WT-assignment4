const express = require('express');
const AuthController = require('../controllers/auth')

const router = express.Router();

router
/* Create a new account
    POST http://[server_URI]/api/auth/signup
    Body: {
        email: String - REQUIRED
        username: String - REQUIRED
        password: String - REQUIRED
    }
*/
.post('/signup',
    async (req, res) => {
        const authController = new AuthController();
        let result = await authController.signup(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
)
/* Log the user in
    POST http://[server_URI]/api/auth/login
    Body: {
        username: String - REQUIRED
        password: String - REQUIRED
    }
    Return: A JWT token, to use as a Bearer Token
*/
.post('/login',
    async (req, res) => {
        const authController = new AuthController();
        let result = await authController.login(req);

        let httpCode = result.httpCode;
        delete (result.httpCode);

        return (res.status(httpCode).send(Object.keys(result).length ? result : null));
    }
);

module.exports = router;