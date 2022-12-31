//This Js code will store user inputted form data into an file named formData.txt using Express js, PUG etc
const express = require("express");
var MongoClient = require('mongodb').MongoClient;
const path = require("path");
const fs = require("fs");
const app = express();
const port = 80;  //perks of using 80 is we don't need to write port no after localhost 
const uri = "mongodb+srv://itspk:pkPK321pk@cluster0.azkxsd2.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

 //Related to mongoDB Cluster
 async function main(){
    try {
        // Connect to the MongoDB cluster
        await client.connect();  
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
};

 async function dataUpload(client, Info) {
   const UserInfo = await client.db("DelhiFitness").collection("GymData").insertOne(Info);
    console.log("UserInfo data :",UserInfo);
};

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
    main().catch(console.error);

    const Info = ({   
        Name : req.body.Name,
        Age : req.body.Age,
        Gender : req.body.Gender,
        Address : req.body.Address,
        Email : req.body.Email,
        Contact_No : req.body.Contact_No,
    });
// Data to store in formData file(not required just including as different functionality)
    let outputToWrite = `

    Name: ${Info.Name}, 
    Age: ${Info.Age},
    Gender: ${Info.Gender},
    Email: ${Info.Email}, 
    Contact: ${Info.Contact_No}. `;
    
    console.log(fs.existsSync('formData.txt'));

    if(!fs.existsSync('formData.txt')){
        fs.writeFileSync('formData.txt', outputToWrite);
    }
    else
    {
        fs.appendFileSync('formData.txt',outputToWrite);
    }

      
     dataUpload(client, Info);
    res.status(200).render('index.pug');
 });