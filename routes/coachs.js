const router = require("express").Router();

const getCoachsController = require("../controllers/coachs");

const {isAuthenticated} = require("../middleware/authenticate");

router.get("/", getCoachsController.getAllCoachs);
router.get("/:id", getCoachsController.getCoach);
router.post("/", isAuthenticated, getCoachsController.postCoach);
router.put("/:id", isAuthenticated, getCoachsController.putCoach);
router.delete("/:id", isAuthenticated, getCoachsController.deleteCoach);

module.exports = router;
