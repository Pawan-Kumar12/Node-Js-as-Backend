//This Js code will store user inputted form data into an file named formData.txt using Express js, PUG etc
const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;  //perks of using 80 is we don't need to write port no after localhost 

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())  //To extract the data from the website to the index.js file

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//End point
app.get('/', (req, res)=>{
    const params = {'title': 'Delhi Fitness Club'}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res)=>{
    Name = req.body.Name
    Age = req.body.Age
    Gender = req.body.Gender
    Address = req.body.Address
    Email = req.body.Email
    Contact_No = req.body.Contact_No
    console.log(req.body);

    let outputToWrite = `

    Name: ${Name}, 
    Age: ${Age},
    Gender: ${Gender},
    Email: ${Email}, 
    Contact: ${Contact_No}. `;
    
    console.log(fs.existsSync('formData.txt'));

    if(!fs.existsSync('formData.txt')){
        fs.writeFileSync('formData.txt', outputToWrite);
    }
    else
    {
        fs.appendFileSync('formData.txt',outputToWrite);
    }


    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('index.pug', params);
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

