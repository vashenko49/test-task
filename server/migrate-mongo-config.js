const dotenv = require('dotenv');

dotenv.config();


const config = {
  mongodb: {
    url: process.env.DATABASE_URL,
    databaseName: process.env.DATABASE_NAME,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'src/migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js'
};

module.exports = config;
