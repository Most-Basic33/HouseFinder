require('dotenv').config()
const express = require('express'),
path = require('path'),
  ctrl = require('./controller'),
  auth = require('./authController'),
  extra = require(`./extraController`),
  verify = require('./verify'),
  cors = require('cors'),
  aws = require('aws-sdk'),
  session = require('express-session'),
  { SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    S3_BUCKET,
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY
  } = process.env,
  massive = require('massive'),
  app = express()


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json())



app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7
  }

}))

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false }
}).then(db => {
  app.set('db', db);
  console.log('Hosted by DB Controller...rock on')
})

//AMAZON CONNECTION
app.get('/sign-s3', (req, res) => {
  console.log(res, "work son work!!!!!!!!!!")
  aws.config = {
    region: 'us-west-1',
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  }
  const s3 = new aws.S3({ signatureVersion: 'v4' });
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return res.send(returnData)
  });
});

//Hosting
app.use(express.static(__dirname + '/../build'))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

//auth
app.post('/api/register', auth.register)
app.post('/api/login', auth.login)
app.get('/api/logout', auth.logout)
app.get('/api/me', auth.logmein)

app.use((req, res, next) => {
  //console.log(req.session, "index.js")
  next();
})
//home
app.get(`/api/homes`, verify.user, ctrl.getHomes)
app.get(`/api/homes/:name`, verify.user, ctrl.findHome)
app.post(`/api/homes`, verify.user, ctrl.addHome)
app.delete(`/api/homes/:id`, verify.user, ctrl.deleteHome)
app.put(`/api/update/:id`, verify.user, ctrl.updateProfile)
app.put(`/api/rent/:id`, verify.user, ctrl.updatePrice)

//email
app.post(`/api/email`, extra.email)

//user
app.get(`/api/users`, verify.user, ctrl.getUsers)
app.delete(`/api/users/:id`, verify.user, ctrl.deleteUser)
app.get(`/api/users/:name`, verify.user, ctrl.findUser)

app.listen(SERVER_PORT, () => console.log(`Listening  to smooth sounds of ${SERVER_PORT}`))