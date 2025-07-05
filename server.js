const app = require('./app');
const connectDB = require('./config/db');

const PORT = 3001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Adoption Request Service running on port ${PORT}`);
  });
});
