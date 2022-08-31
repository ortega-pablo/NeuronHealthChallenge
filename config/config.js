module.exports = {
  PORT: process.env.PORT || 3000,
  DB: {
    URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/NeuronChallenge',
  },
};
