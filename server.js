var express= require('express')
var app=express();

const {MongoClient}=require('mongodb')
const connection="mongodb+srv://salsabeel:salsabeel@cluster0.txjvuea.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client= new MongoClient(connection)
const mydb= client.db('mydb')

const collection= mydb.collection('users')

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})


app.get("/", function(req,res)
{
     res.send("root page")
})

app.get("/login", function(req,res) ///done
{
    res.sendFile(__dirname+'/login.html') 
})

app.get("/users", async(req,res)=>{ //done
    const users= await collection.find({}).toArray()
    ///const users= await collection.find({'name' : req.params.name}) //find specefic element
    res.send(users)
})


app.get("/user/:username", async(req,res)=>{  //done
    const users= await collection.findOne({'username': req.params.username})
    res.send(users)
})


app.post("/login", urlEncoded, async (req, res) => {
     const findUser = await collection.findOne({'username': req.body.username },{ 'password': req.body.password }, {'email': req.body.email });

    if (findUser) {
        res.send(userinfo.html);
    } else {
        res.sendFile(__dirname + '/register.html');
    }
});



app.post("/register",urlEncoded, async(req,res)=>
{    //find 
     const createuser= await collection.insertOne({'username': req.body.username, 'password': req.body.password ,'email': req.body.email })
     res.end("User Added Successfully")
})





var server= app.listen(9000,function()
{
     var host = server.address().address
     var port=server.address().port

     console.log("start my one")
})