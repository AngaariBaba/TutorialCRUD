const express = require('express');
const bodyparser = require('body-parser');
const sql = require('sqlite3').verbose();
const app = express();

app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended:true}));

//ESTABLISH DATABASE
const db = new sql.Database('./database.db',(err)=>{
    if(err)
    {
        console.log("Error while creating database");
    }
    else
    {
        console.log("Database created successfully!");
    }
});

//CREATING CLASS OF PRODUCTS
db.run("CREATE TABLE IF NOT EXISTS PRODUCTS (ID INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,price Number,amount Number)");

//POST REQUEST KO HANDLE KARNE K LIE

app.post("/add_product",(req,res)=>{
    console.log(req.body);
    const product_name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;

    db.run("INSERT INTO PRODUCTS (name,price,amount) VALUES(?,?,?)",[product_name,price,quantity],(err)=>{
        if(err)
        {
            console.log("Error while inserting");
        }
        else
        {
            console.log("Insertion successfull");
        }
    })

    res.send("Form submit hogya ....Data server par agya hai");
});


//UPDATE WALA PART HERE  

app.post("/update",(req,res)=>{
    console.log("UPDATING DATA");
    const product_name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const ID = req.body.ID;

    db.run("UPDATE PRODUCTS SET name=?,price=?,amount=? WHERE ID=?",[product_name,price,quantity,ID],(err)=>{
        if(err)
        {
            console.log("Error while updating");
        }
        else
        {
            console.log("Updation successfull");
        }
    })

    res.send("update hogya beedu");
});

app.post('/delete',(req,res)=>{

    const ID = req.body.ID;
    console.log(ID);

    db.run("DELETE FROM PRODUCTS WHERE ID=?",[ID],(err)=>{
        if(err)
        {
           console.log("Error while deleting");
        }
        else
        {
            res.send("Record deleted");
        }
    })

})






app.get('/products',(req,res)=>{

    db.all("SELECT * FROM PRODUCTS",(err,rows)=>{
        if(err)
        {
            console.log("error on getting rows");
        }
        else
        {
            res.json(rows);
        }
    })

})






app.listen(3000,()=>{
    console.log("Server started");
})