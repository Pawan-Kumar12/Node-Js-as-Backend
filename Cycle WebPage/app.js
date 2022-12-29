const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {'title':'Best India Bi-Cycles & Cycling Events'}
    res.status(200).render('home.pug', params);
})

app.post('/', (req, res)=>{
    Name = req.body.Name
    Email = req.body.Email
    Contact = req.body.Contact
    Intro = req.body.Intro
    console.log(req.body);

    let outputToWrite = `

    Name: ${Name}, 
    Email: ${Email},
    Contact: ${Contact},
    Intro: ${Intro}. `;
    
    console.log(fs.existsSync('formData.txt'));

    if(!fs.existsSync('formData.txt')){
        fs.writeFileSync('formData.txt', outputToWrite);
    }
    else
    {
        fs.appendFileSync('formData.txt',outputToWrite);
    }


    const params = {'message': 'Your form has been submitted successfully'}
    res.status(200).render('home.pug', params);
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});