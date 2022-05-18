const express = require('express');
const UserController = require('../controllers/user');

const router = express.Router();

router
/* Modify the user email
    PUT http://[server_URI]/api/user/email
    Body: {
        email: String - REQUIRED
    }
*/
.put('/email',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.changeMail(req);
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send( Object.keys(result).length ? result : null ));
    }
)
/* Modify the user name
    PUT http://[server_URI]/api/user/username
    Body: {
        username: String - REQUIRED
    }
*/
.put('/username',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.changeUsername(req);
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send( Object.keys(result).length ? result : null ));
    }
)
/* Modify the user password
    PUT http://[server_URI]/api/user/password
    Body: {
        password: String - REQUIRED
    }
*/
.put('/password',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.changePassword(req);
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send( Object.keys(result).length ? result : null ));
    }
)

/* Modify the user email
    GET http://[server_URI]/api/user/whoami
*/
router
.get('/whoami',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.getUsername(req);
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send( Object.keys(result).length ? result : null ));
    }
)
.get('/all_users',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.getAllUsers();
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send(Object.keys(result.body).length ? result.body : null));
    }
)

/* Modify the user email
    PUT http://[server_URI]/api/user/set_admin
    Body: {
        username: String - REQUIRED
    }
*/
router
.put('/set_admin',
    async (req, res) => {
        const userController = new UserController();
        let result = await userController.setAdmin(req);
    
        let httpCode = result.httpCode;
        delete (result.httpCode);
    
        return (res.status(httpCode).send( Object.keys(result).length ? result : null ));
    }
)

module.exports = router;
