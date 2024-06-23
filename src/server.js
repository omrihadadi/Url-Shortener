const app = require('./app');
const sequelize = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.sync(); // comment
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();
