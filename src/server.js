const db = require('./config/db/database.sqlite');
const app = require('./app');

db.config()
  .then(() => {
    app.listen(3000, () => {
      console.log('App Start, PORT: 3000 ');
    });
  })
  .catch((err) => {
    console.log('DB Error: ', err)
  });
