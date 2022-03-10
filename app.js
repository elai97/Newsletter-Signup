const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
const port = 3000

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/b17b12f5f5";

    const Options = {
        method: "POST",
        auth: "elai:9f0a50712bc6a10daaf1e4f7550b097a-us14"
    }

    const request = https.request(url, Options, function(response) {
        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        } else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

    // request.write(jsonData);
    request.end();

})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Mailchimp API key
// 9f0a50712bc6a10daaf1e4f7550b097a-us14

// lists id
// b17b12f5f5