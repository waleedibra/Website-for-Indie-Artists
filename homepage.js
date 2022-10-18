const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const request = require('request')
const session = require('express-session');
const flash = require('connect-flash');
const app = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use(express.static(__dirname + '/public/'));
app.use(session({
  secret: 'secret',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}))

app.use(flash())


app.get('/', function(req, res) {
  res.render('homepage');
})

app.get('/music', function(req, res) {
  const userName = req.flash('user')
  res.render('music', {
    userName
  });
})

app.get('/fanmail', function(req, res) {
  res.render('fanmail');
})

app.get('/8Daudio', function(req, res) {
  const userName = req.flash('user')
  res.render('8Daudio', {
    userName
  });
})

app.get('/about', function(req, res) {
  res.render('about');
})

//post req

app.post('/music', function(req, res) {
  let fName = req.body.fname;
  let lName = req.body.lname;
  let eMail = req.body.email;
  console.log(fName, lName, eMail)

  if (eMail.includes('.com') === false) {
    // res.sendFile(__dirname + '/failure2.html')
    req.flash('user', 'Error please enter email with ".com"')
    res.redirect('/music')
  }
  const data = {
    members: [{
      email_address: eMail,
      status: 'subscribed',
      merge_fields: {
        FNAME: fName,
        LNAME: lName,
      }

    }]
  }
  const formatData = JSON.stringify(data)
  const url = 'https://us5.api.mailchimp.com/3.0/lists/7cbc753ab8'
  const options = {
    method: 'POST',
    auth: 'solomon:432bcb0969d56b3fcac375193a094945-us5'
  }

  const request = https.request(url, options, function(resp) {
    if (resp.statusCode === 200) {

      req.flash('user', 'Thank you ' + fName + ' for joining the tribe of survivors I will send you the full album to your email, stay tuned')
      res.redirect('/music')

    }
    resp.on('data', function(data) {
      //log the data but parse first using json parser
      console.log(JSON.parse(data))
    })
  })
  request.write(formatData)
  request.end()

  //   // the api key: 432bcb0969d56b3fcac375193a094945-us5
  // // audeince id : 7cbc753ab8
  //
  // // https://us5.api.mailchimp.com/3.0/lists/


})


app.listen(7000, function(req, res) {
  console.log('server is up')
})
