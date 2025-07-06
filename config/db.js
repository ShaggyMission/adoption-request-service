const mongoose = require('mongoose');

const connectDB = async () => {
  const mongoURI = 'mongodb://admin:Lis12345@54.156.27.209:27017/adoption_db?authSource=admin';

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected to adoption_db');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
