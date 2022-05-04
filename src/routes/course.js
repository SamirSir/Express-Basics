const express = require("express");
const courseController = require("../controllers/course.controller");

const courseRoute = express.Router();

courseRoute.get("/", courseController.getAllCourses);
courseRoute.post("/", courseController.createCourse);
courseRoute.get("/:id", courseController.getCourse);
courseRoute.put("/:id", courseController.updateCourse);
courseRoute.delete("/:id", courseController.deleteCourse);

module.exports = courseRoute;
