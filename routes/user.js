const userController = require("../controllers/userController");
const permission = require("../permissions");
const { Router } = require("express");
const router = Router();

const { validateUpdateUserRole, validateUpdateUserData } = require('../middleware/validator');


//get user profile (admin, staff & member) 
router.get("/profile", permission.is_authenticated, userController.getUserProfile);
//update user data (admin, staff & member) 
router.put("/profile", permission.is_authenticated, validateUpdateUserData, userController.updateUserData);
//update user password (admin, staff & member) 
router.put("/update-password", permission.is_authenticated, userController.updateUserPassword);

//get all user (admin)
router.get("", permission.is_admin, userController.getAllUser);
//get user by id (admin) 
router.get("/:id", userController.getUserById);
//update user data (admin) 
router.put("/:id", permission.is_admin, validateUpdateUserData, userController.updateUserDataByAdmin);
//update user role (admin)
router.put("/add-role/:id", permission.is_admin, validateUpdateUserRole, userController.addUserRole);
//remove user role (admin)
router.put("/remove-role/:id", permission.is_admin, userController.removeUserRole);
//delete user (admin)
router.delete("/:id", permission.is_admin, userController.deleteUser);

module.exports = router;