const { Schema, model } = require('mongoose');

const schoolGradesSchema = new Schema(
  {
    student: {
      type: Schema.ObjectId,
      ref: 'Student',
      required: true,
    },
    english: {
      type: Number,
    },
    spanish: {
      type: Number,
    },
    mathematics: {
      type: Number,
    },
    history: {
      type: Number,
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

const SchoolGrades = model('SchoolGrade', schoolGradesSchema);

module.exports = SchoolGrades;
