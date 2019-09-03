require('dotenv').config(); //this will load the .env variables

const server = require('./api/server.js');

const PORT = process.env.PORT || 3300;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}.`);
});
