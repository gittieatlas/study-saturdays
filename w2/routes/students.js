const router = require('express').Router();
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      res.status(404).send('Not Found');
    } else {
      res.json(student);
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const studentCreated = await Student.create(req.body);
    res.status(201).json(studentCreated);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, [affectedRows]] = await Student.update(
      { firstName: req.body.firstName },
      {
        returning: true,
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(affectedRows);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const numAffectedRows = await Student.destroy({
      where: {
        id: req.params.id
      }
    });

    console.log(numAffectedRows);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
