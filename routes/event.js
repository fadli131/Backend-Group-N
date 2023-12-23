const eventController = require("../controllers/eventController");
const permission = require("../permissions");
const { Router } = require("express");
const router = Router();

const { validateEvent } = require('../middleware/validator');

//create event (admin & staff)
router.post("", permission.is_adminOrStaff, validateEvent, eventController.createEvent);
//get all events
router.get("", eventController.getAllEvent);
//get event by id (admin, staff & member) 
router.get("/:id", permission.is_authenticated, eventController.getEventById);
//update event (admin & staff)
router.put("/:id", permission.is_adminOrStaff, validateEvent, eventController.updateEvent);
//delete event (admin & staff)
router.delete("/:id", permission.is_adminOrStaff, eventController.deleteEvent);


module.exports = router;