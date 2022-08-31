const SchoolGrades = require('../models/schoolGrades.model');
const Student = require('../models/students.model');

const studentsController = {
  // eslint-disable-next-line consistent-return
  getAll: async (req, res, next) => {
    try {
      const allStudents = await Student.find({
        deletedAt: null,
      });

      if (!allStudents) {
        return res.status(404).json({
          status: 404,
          message: 'No students found',
        });
      }

      res.status(200).json({
        status: 200,
        total: allStudents.length,
        data: allStudents,
      });
    } catch (error) {
      next(error);
    }
  },

  getOne: async (req, res, next) => {
    try {
      const { id } = req.params;

      const studentById = await Student.findOne({
        _id: id,
      });

      if (!studentById) {
        res.status(404).json({
          status: 404,
          message: 'Student not found',
        });
      }

      res.status(200).json({
        status: 200,
        data: studentById,
      });
    } catch (error) {
      next(error);
    }
  },

  new: async (req, res, next) => {
    try {
      const {
        firstName, lastName, birthDate, group,
      } = req.body;

      const newStudent = await Student.create({
        firstName,
        lastName,
        birthDate,
        group,
      });

      res.status(201).json({
        status: 201,
        data: newStudent,
      });
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line consistent-return
  upgrade: async (req, res, next) => {
    try {
      const { id } = req.params;

      const oldStudent = await Student.findOne({
        _id: id,
      });

      if (!oldStudent) {
        return res.status(404).json({
          status: 404,
          message: 'Student not found',
        });
      }

      await Student.updateOne(
        { _id: id.toString() },
        { $set: req.body },
      );

      res.status(201).json({
        status: 201,
        message: 'Student updated correctly',
      });
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line consistent-return
  getAllOrderedByDate: async (req, res, next) => {
    try {
      const { order } = req.params;

      let sortedStudents = [];

      if (order === 'asc') {
        sortedStudents = await Student.find().sort({ birthDate: 1 });
      }
      if (order === 'dsc') {
        sortedStudents = await Student.find().sort({ birthDate: -1 });
      }

      if (!sortedStudents) {
        return res.status(404).json({
          status: 404,
          message: 'No students found',
        });
      }

      res.status(200).json({
        status: 200,
        total: sortedStudents.length,
        data: sortedStudents,
      });
    } catch (error) {
      next(error);
    }
  },

  getGroupStudents: async (req, res, next) => {
    try {
      const { group } = req.params;

      let studentsByGroup = [];

      switch (group) {
        case 'A':
          studentsByGroup = await Student.find({ group: 'A' });
          break;
        case 'B':
          studentsByGroup = await Student.find({ group: 'B' });
          break;
        case 'C':
          studentsByGroup = await Student.find({ group: 'C' });
          break;
        default:
          res.status(404).json({
            status: 404,
            message: 'Group can only be A, B or C',
          });
          break;
      }
      res.status(200).json({
        status: 200,
        total: studentsByGroup.length,
        data: studentsByGroup,
      });
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line consistent-return
  addSchoolGrades: async (req, res, next) => {
    try {
      const { studentId } = req.params;
      const {
        english, spanish, mathematics, history,
      } = req.body;

      if (!studentId) {
        res.status(400).json({
          status: 400,
          message: 'Student id is required',
        });
      }
      if (!english && !spanish && !mathematics && !history) {
        res.status(400).json({
          status: 400,
          message: 'No data to update',
        });
      }
      const studentById = await Student.findOne({
        _id: studentId,
      });

      if (!studentById) {
        return res.status(404).json({
          status: 404,
          message: 'Student not found',
        });
      }

      const oldSchoolGrades = await SchoolGrades.findOne({
        student: studentId,
      });

      if (oldSchoolGrades) {
        await SchoolGrades.updateOne(
          { student: studentId.toString() },
          { $set: req.body },
        );

        res.status(201).json({
          status: 201,
          message: 'School grades updated correctly',
        });
      } else {
        const newSchoolGrades = await SchoolGrades.create({
          student: studentId,
          english,
          spanish,
          mathematics,
          history,
        });
        res.status(201).json({
          status: 201,
          data: newSchoolGrades,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  // eslint-disable-next-line consistent-return
  theBest: async (req, res, next) => {
    const { comparison } = req.params;
    try {
      const allStudents = await SchoolGrades.find({
        [req.params]: { $exists: true },
      }).populate('student');

      allStudents.sort((a, b) => b[comparison] - a[comparison]);

      const maxScore = allStudents[0][comparison];
      if (maxScore === undefined) {
        return res.status(404).json({
          status: 404,
          message: 'There are no students with grades in this subject',
        });
      }
      const theBests = allStudents.filter(
        (student) => student[comparison] === maxScore,
      );

      res.status(200).json({
        status: 200,
        total: theBests.length,
        data: theBests,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = studentsController;
