const router = require('express').Router();
const Test = require('../db/models/test');
const Student = require('../db/models/student');

router.get('/', async (req, res, next) => {
  try {
    const tests = await Test.findAll();
    res.json(tests);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findById(req.params.id);
    res.json(test);
  } catch (error) {
    next(error);
  }
});

router.post('/student/:id', async (req, res, next) => {
  try {
    const testCreated = await Test.create(req.body);
    await testCreated.setStudent(await Student.findById(req.params.id));
    res.status(201).json(testCreated);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const rowsAffected = await Test.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
