const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs')
var xlsx = require("xlsx");
// var db = require('./config/mysql_config')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

function moveFile(f){
    fs.rename('./data/'+f, './reads/'+f, (err)=>{
        if(err)return console.log('the '+f+ ' file did´t can read ');
        console.log('the '+f+ ' file has been read succesfull ');
    })
}

function fileMap(list, x, xlsx){
    list.push(x)
    console.log('wait list ',list);
    console.log('reading ',x);
    
    var wb = xlsx.readFile('data/'+x) 
    var fileRead = wb.Sheets['Hoja1']
    list.splice(x, 1)
    console.log('update list ',list);

    var data = xlsx.utils.sheet_to_json(fileRead)
    console.log('data readed ' ,data);
    moveFile(x);
   
}
function openFolder(){
    fs.readdir('./data/','utf8', (err, files)=>{
        if(err) return console.log('error ',err)

        var xls = files.filter(f => f.split('.')[1] == 'xlsx')
        var list =[]

        if(xls.length>0  && list.length===0){
            console.log('there are files for read');

            xls.forEach(x=>{
              setInterval(fileMap(list,x,xlsx),10000)
            })
        }
        else{
            console.log('there are not files for read');
        }
    })
}

(function read(){
    setInterval(openFolder, 2000)
})()



app.listen(9002, console.log('running server port 9002'))