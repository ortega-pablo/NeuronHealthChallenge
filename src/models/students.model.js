const { Schema, model } = require('mongoose');

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    deletedAt: {
      type: Date,
    },
  },
  { versionKey: false },
);

const Student = model('Student', studentSchema);

module.exports = Student;
