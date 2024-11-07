let express = require('express');
let app = express();

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

let http = require('http');
let server = http.Server(app);
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json({ limit: '10mb' }));

const uri = 'mongodb+srv://Mahesh:Mahesh123@cluster0.eqme0jn.mongodb.net/';
const client = new MongoClient(uri);
var db, collection, findResult, userDataCollection, findUserData;

async function createDb() {
  await client.connect();
  db = client.db("registerData");
  collection = db.collection('registerDataCollection');
  findResult = await collection.find({}).toArray();
}

// House Data 

async function createHouseDb() {
  await client.connect();
  console.log('mongoDB connecting..')
  db = client.db("HouseData");
  collection = db.collection('HouseDbCollection');
  findResult = await collection.find({}).toArray();
}

// SOCKET CONNECTION PORT

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});

// API CALL WITH MONGODB DATA 

app.get('/api/register', async (req, res) => {
  try {
    await createDb();
    await client.connect();
    res.json(findResult)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

//API CALL WITH MONGODB House Data>>>>

app.get('/api/house', async (req, res) => {
  try {
    await createHouseDb();
    await client.connect();
    res.json(findResult)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
});

// API POST CALL TO UPDATE MONGO DB DATA

app.post('/api/update/register', async (req, res) => {
  try {
    await createDb()
    console.log(req.body, '74::')
    let emailIsUsed = findResult.filter(res => res.Email === req.body.Email)
    if (emailIsUsed && emailIsUsed.length) {
      res.json({ valid: false })
    } else {
      collection.insertOne(req.body, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      })
      res.json({ valid: true })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// House POST CALL Data
app.post('/api/update/house', async (req, res) => {
  try {
    await createHouseDb()
    console.log(req.body, '2222::')
    // let emailIsUsed = findResult.filter(res=> res.Email === req.body.Email)
    // if(emailIsUsed.length){
    //    res.json({valid:false})
    // }else{
    collection.insertOne(req.body, function (err, res) {
      console.log(res, '102::::')
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    })
    res.json({ valid: true })
    // }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Fav...

app.post('/api/update/favdata', async (req, res) => {
  try {
    await createHouseDb()
    console.log(req.body, '2222::')
    collection.updateOne({ username: req.body.username }, { $set: { selectFav: req.body.selectFav } }, (err, result) => {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    })
    res.json({ valid: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// OTP Send TO Mail Forget Password.....

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'gmahesh8184@gmail.com', // replace with your email
    pass: 'osox wtfl qyju vchm', // replace with your email password
  },
});

app.post('/send-otp', (req, res) => {
    console.log(req.body.to,'21::::',req.body)
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP

  const mailOptions = {
    from: 'gmahesh8184@gmail.com',
    to:req.body.to.Login_Username,
    subject: 'Your OTP',
    text: `Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Failed to send OTP',OTP:'Otp not sended' });
    } else {
      console.log(`OTP sent: ${otp}`);
      res.json({ success: true, message: 'OTP sent successfully' ,OTP:`${otp}`});
    }
  });
});