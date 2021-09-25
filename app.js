
//npm install @mailchimp/mailchimp_marketing
const mailchimp = require("@mailchimp/mailchimp_marketing");
//Requiring express and body parser and initializing the constant "app"
const express = require("express");
const app = express();
//Using bod-parser
app.use(express.json());
app.use(express.urlencoded())
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
mailchimp.setConfig({

 apiKey: "fec0340402a536d1db6f97cfcfcc4592-us5",
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
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(`Successfully added contact as an audience member. The contact's id is ${response.id}.`
);

}
//Running the function and catching the errors (if any)
// So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.post('/failure', function(req, res){
    res.redirect('/');
})

// appid
// fec0340402a536d1db6f97cfcfcc4592-us5

// list Id d5993e0c09