const express = require("express");

const indexRouter = require('./routes/indexRoute.js');
const noteRouter = require("./routes/noteRoute.js");

const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

//GET request to view notes.html page
app.use('/api', noteRouter)
app.use('/', indexRouter);


app.listen(process.env.PORT || 3001
  //  () =>
  // console.log(`App listening at http://localhost:${PORT} 🚀`)
);
