const validateCourse = require("../validators");

class CourseController {

  courses = [
    { id: 1, name: "Angular" },
    { id: 2, name: "Node" },
    { id: 3, name: "Express" },
    { id: 4, name: "MongoDB" },
  ];

  getAllCourses(req, res) {
    try {
      res.send({ courses: this.courses });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ status: "error", err });
    }
  }

  createCourse(req, res) {
    const { error } = validateCourse(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    const course = {
      id: this.courses.length + 1,
      name: req.body.name,
    };
    this.courses.push(course);
    res.send(course);
  }

  getCourse(req, res) {
    const course = this.courses.find((c) => c.id === parseInt(req.params.id));
    if (course) {
      res.send(this.courses[req.params.id]);
    } else {
      res.status(404).send({
        status: "error",
        message: `There is no course with id: ${req.params.id}`,
      });
    }
  }

  updateCourse(req, res) {
    const course = this.courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      res.status(404).send({
        status: "error",
        message: `There is no course with id: ${req.params.id}`,
      });
    const { error } = validateCourse(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    course.name = req.body.name;
    res.send(course);
  }

  deleteCourse(req, res) {
    const courseIndex = this.courses.findIndex(
      (c) => c.id === parseInt(req.params.id)
    );
    if (!courseIndex)
      res.status(404).send({
        status: "error",
        message: `There is no course with id: ${req.params.id}`,
      });
    this.courses.splice(courseIndex, 1);
    res.send(this.courses);
  }
}

module.exports = new CourseController();
