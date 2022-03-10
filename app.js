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

    // list id is censored so generate yours at mailchimp.com

    const url = "https://us14.api.mailchimp.com/3.0/lists/b1**12**f5";

    // API key is censored so generate yours at mailchimp.com

    const Options = {
        method: "POST",
        auth: "elai:9f0a****2bc6a1****f1e4f7550b****-us14"
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
