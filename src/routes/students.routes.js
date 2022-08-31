const router = require('express').Router();
const { check } = require('express-validator');

// import controllers
const studentsController = require('../controllers/students.controller');

// import middlewares
const validates = require('../middlewares/validates.middleware');

// Get all students => http://localhost:3000/students
router.get('/', studentsController.getAll);

// Get student by id => http://localhost:3000/students/:id
router.get('/:id', studentsController.getOne);

// Create a new student => http://localhost:3000/students
router.post(
  '/new',
  [
    check('firstName', 'El nombre es obligatorio y debe ser un string.')
      .not()
      .isEmpty()
      .isString(),
    check('lastName', 'El apellido es obligatorio y debe ser un string.')
      .not()
      .isEmpty()
      .isString(),
    check('birthDate', 'La fecha de cumpleños es obligatoria y debe ser Date.')
      .not()
      .isEmpty()
      .isDate(),
    check('group', 'El grupo es obligatorio y puede ser A, B o C.')
      .not()
      .isEmpty()
      .isIn(['A', 'B', 'C']),
    validates,
  ],
  studentsController.new,
);

// Update a student => http://localhost:3000/students/:id
router.put(
  '/:id',
  [
    check('firstName', 'El nombre debe ser un string.').optional().isString(),
    check('lastName', 'El apellido debe ser un string.').optional().isString(),
    check('birthDate', 'La fecha de cumpleños debe ser Date.')
      .optional()
      .isDate(),
    check('group', 'El grupo puede ser A, B o C.')
      .optional()
      .isIn(['A', 'B', 'C']),
    validates,
  ],
  studentsController.upgrade,
);

// Get ordered students => http://localhost:3000/students/?order=order
router.get('/order/:order', [
  check(
    'order',
    'El orden sólo puede tomar los valores, asc y dsc',
  )
    .not()
    .isEmpty()
    .isIn(['asc', 'dsc']),
  validates,
], studentsController.getAllOrderedByDate);

// Get all students in a group => http://localhost:3000/students/?group=group
router.get('/group/:group', studentsController.getGroupStudents);

// Add school grads => http://localhost:3000/students/schoolGrades/:studentId
router.put(
  '/schoolGrades/:studentId',
  [
    check('english', 'english debe ser un número').optional().isNumeric(),
    check('spanish', 'spanish debe ser un número').optional().isNumeric(),
    check('mathematics', 'mathematics debe ser un número')
      .optional()
      .isNumeric(),
    check('history', 'history debe ser un número').optional().isNumeric(),
    validates,
  ],
  studentsController.addSchoolGrades,
);

// Get the best student => http://localhost:3000/students/highestScore/:comparison
router.get(
  '/highestScore/:comparison',
  [
    check(
      'comparison',
      'La materia a evaluar sólo puede ser history, mathematics, spanish, english',
    )
      .not()
      .isEmpty()
      .isIn(['history', 'mathematics', 'spanish', 'english']),
    validates,
  ],
  studentsController.theBest,
);
module.exports = router;
