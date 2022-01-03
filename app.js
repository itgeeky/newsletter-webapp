const client = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//Using bod-parser
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//The public folder which holds the CSS
app.use(express.static("public"));
//Listening on port 3000 and if it goes well then logging a message saying that the server is running
app.listen(process.env.PORT||3000,function () {
 console.log("Server is running at port 3000");
});
//Sending the signup.html file to the browser as soon as a request is made on localhost:3000
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/index.html");
});
//Setting up MailChimp
client.setConfig({
 apiKey: process.env.API_KEY,
 server: "us5"
});

app.post("/", function (req,res) {
const firstName = req.body.fName;
const secondName = req.body.lName;
const email = req.body.email;

const listId = "d5993e0c09";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};

const run = async () => {
  try {
    const response = await client.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });
    console.log(response);
    res.sendFile(__dirname + "/success.html");;
  } catch (err) {
    console.log(err.status);
    console.log(err);
    res.sendFile(__dirname + "/failure.html");

  }
};

run();
});

app.post('/failure', function(req, res){
    res.redirect('/');
})
