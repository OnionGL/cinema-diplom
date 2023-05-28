const express = require('express');
const cors = require('cors');
const router = require('./routes/routes');
const mongoDBConnect = require('./db');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/' , router)

mongoDBConnect();

const start = async () => {
   try {
      app.listen(PORT, () => console.log(`server started pn port ${PORT}`));
   } catch (e) {
      console.log(e);
   }
}

start();


