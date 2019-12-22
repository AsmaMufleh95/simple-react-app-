const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const SELECT_ALL_data_Querry = 'SELECT * from hdb';
const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'asma'

});
connection.connect(err =>{
    if(err){
        return err;
    }
});
//console.log(connection)
app.use(cors());
/*
app.use(function(req, res, next) {
    res.sendData = function(obj) {
      if (req.accepts('json') || req.accepts('text/html')) {
        res.header('Content-Type', 'application/json');
        res.send(obj);
      } else if (req.accepts('application/xml')) {
        res.header('Content-Type', 'text/xml');
        var xml = easyxml.render(obj);
        res.send(xml);
      } else {
        res.send(406);
      }
    };
  
    next();
  });*/
app.get('/',(req,res)=>{
res.send('hello from data server')

});
app.get("/details/xml", (req, res)=> {
    // parsed response body as js object
   res.send('xml ')
});
app.get('/details',(req,res)=>{
    connection.query(SELECT_ALL_data_Querry,(err,results)=>{
        if(err){
            return res.send(err)
        }
        else 
        {
            return res.json({
                data :  results
            })
        }
       
       });


});
app.get('/details/add',(req,res)=>{
const{id,description,drugCode,diseaseCode,type} = req.query;
//console.log(id,description,drugCode,diseaseCode,type);
//const INSERT_DATA_Querry ='INSERT INTO hdb(description,drugCode,diseaseCode,type) values ( $description, $drugCode, $diseaseCode,$type)';
const INSERT_DATA_Querry = `INSERT INTO hdb(id,description,drugCode,diseaseCode,type) VALUES('${id}', '${description}', '${drugCode}','${diseaseCode}','${type}')`
//const INSERT_DATA_Querry =  'INSERT INTO  hdb (`id` ,`description`,`drugCode`,`diseaseCode`,`type`)VALUES ($id,$description,$drugCode,$diseaseCode,$type)';
//const INSERT_DATA_Querry = 'INSERT INTO hdb (id,description,drugCode,diseaseCode,type) VALUES($(id) ,$(description),$(drugCode),$(diseaseCode),$(type))';
//res.send('adding ');
connection.query(INSERT_DATA_Querry,(err,results)=>{
if(err){
    return res.send(err)
    
}else{
    return res.send('added successfully')
}
});
});
app.listen(3000,()=>{
    console.log('connect')
});