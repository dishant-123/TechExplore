
const mongoose = require('mongoose');
require('dotenv/config');
//connect to db
mongoose.connect(process.env.DB_CONNECTION, ({
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}));

let db = mongoose.connection;
db.once('open',()=>{
    console.log('Connected to db');
});

db.on('error',(err)=>{
    console.log('There was an error'+err);
})