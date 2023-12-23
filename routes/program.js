const programController = require("../controllers/programController");
const permission = require("../permissions");
const { Router } = require("express");
const router = Router();

const { validateProgram } = require('../middleware/validator');


//create program (staff)
router.post("", permission.is_adminOrStaff, validateProgram, programController.createProgram);
//get all program
router.get("", programController.getAllProgram);
//get program by id
router.get("/:id", programController.getProgramById);
//update program (admin & staff)
router.put("/:id", permission.is_adminOrStaff, validateProgram, programController.updateProgram);
//delete program (admin & staff)
router.delete("/:id", permission.is_adminOrStaff, programController.deleteProgram);


module.exports = router;