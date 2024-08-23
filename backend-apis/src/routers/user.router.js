const UserController = require('../controllers/user.controller');

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');
const {validateRegisterUser,validateDeleteUser}= require('../middleware/validators/userValidator.middleware');

router.post('/register',upload.single('image'),validateRegisterUser,awaitHandlerFactory(UserController.registerUser));
router.delete('/delete/:id',validateDeleteUser,awaitHandlerFactory(UserController.delete));
router.patch('/update/:id',upload.single('image'),awaitHandlerFactory(UserController.update));
router.get('/all',awaitHandlerFactory(UserController.getAllUsers));
router.get('/:id',awaitHandlerFactory(UserController.getUserById));
module.exports = router;