const express = require('express')
const router = express.Router()
const cors = require('cors');
const app  = express();
const CookieParser = require('cookie-parser')
const user = require('./routes/users')
const admin = require('./models/admin.js');
require('./db/mongoose')
const bodyParser = require('body-parser');
require('dotenv/config');
const path = require('path'); //for absolute path use instead of relative 
//Middleware 

app.use(bodyParser.json());
app.use(CookieParser())
// app.use(CookieParser.signedCookie)
app.use(cors());//so that from any site we can access our data...
app.use(user)





//Import Routes 
const postRoute = require('./routes/UserDetails');
app.use('/userDetails', postRoute);

const postRoute1 = require('./routes/GadgetPageDetails');
app.use('/gadgetDetails', postRoute1);

const postRoute2 = require('./routes/ContactUs');
app.use('/contactUs', postRoute2);

const postRoute3 = require('./routes/GadgetPageDetails');
app.use('/gadgetUserDescriptionLikesDetails',postRoute3);

const postRoute4 = require('./routes/Videos/VideoRoutes');
app.use('/video',postRoute4);

const postRoute5 = require('./routes/StartUp/StartUpPageDetails');
app.use('/startUpDetails',postRoute5);

//to cheeck user is suthorised to post.
app.get('/admin/checkAuthorized/:email',async(req,res) =>{
    // console.log(req.params.email);
    const response = await admin.findOne({email : req.params.email});
    console.log(response);
    if(response!=null)
    {
        return res.json({
            message : 'Successfully added post'
        })
    }
});
// 


//     // app.use(express.static( '../FrontEnd/build' ) );
//     console.log('HEllo')
//     app.get('*', (req,res) =>{
//         // res.sendFile(path.join(__dirname,'build', 'index.html'));
//         // res.sendFile('../FrontEnd/public/index.html', { root: __dirname });
//         res.sendFile(path.resolve('../FrontEnd/build/index.html'));
//     })
// }
// if(process.env.NODE_ENV)
// {
// app.use(express.static(path.join(__dirname, '../FrontEnd/build')));

// app.get('*', function (request, response){
//    response.sendFile(path.resolve(__dirname, '../FrontEnd/build', 'index.html'));
// });
// }
// app.use("/",express.static("public/build"));
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static( './FrontEnd/build' ) );

    app.get('*', (req,res) =>{
        res.sendFile(path.join(__dirname,'build', 'index.html'));
    })
}

//TO LISTEN THE SERVER...
const PORT = process.env.PORT || 3001 ;    //if 3001 is not availabe then use another
app.listen(PORT, () => console.log('this is running on port 3001'));




