// load env variables from the .env file
require("dotenv").config();

// import the express configured instance
const app = require("./app");

// choose port (from env or default to 5000)
const PORT = process.env.PORT || 5000;

// start the server
app.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});