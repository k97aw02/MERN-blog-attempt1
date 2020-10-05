const express = require("express");
// require('dotenv').config();
const mongoose = require("mongoose");
// const routes = require("./routes");
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');

//routes users
const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

// database config
const db = require("./config/keys").mongoURI;

// connect to mongoDB
mongoose
    .connect(
        db,
         { useNewUrlParser: true }
        )
        .then(() => console.log("MongoDB successfully connected"))
        .catch(err => console.log(err));

// Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// Serve up static assets (usually on heroku)  -- (not sure if can use vvv)
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));
// }

//Connect to the Mongo DB  -- (not sure if we can use this if trying to connect user to db first)
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/woodcrafters", { useNewUrlParser: true });
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);

// passport middleware
app.use(passport.initialize());

// Add routes, both API and view
// app.use("/api/users", users);
app.use(routes);

const PORT = process.env.PORT || 3001;

// Start the API server
app.listen(PORT, function () {
    console.log(`API Server now listening on PORT ${PORT}!`);
});
