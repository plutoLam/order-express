var express = require('express');
var router = express.Router();
var PATH = './public/data/';
var fs = require("fs");
var mysql = require('mysql');
var conf = require('../conf/db'); // 引入数据库配置
var pool = mysql.createPool(conf.mysql); // 使用连接池
var connection  = mysql.createConnection(conf.mysql)

var multiparty = require('multiparty');

connection.connect()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/goods', function (req, res) {
  fs.readFile( PATH +  "goods.json", 'utf8', function (err, data) {
      console.log( data );
      res.send( data );
  });
})

router.get('/category', function (req, res) {
  fs.readFile( PATH +  "category.json", 'utf8', function (err, data) {
      console.log( data );
      res.send( data );
  });
})

router.get('/orderlist', function (req, res) {
  let sql = 'select * from orderlist'
  connection.query(sql,(err, result) => {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');  
    res.send(result)
  })
  
})

router.get('/getcart', function (req, res) {
  let orderNum = req.query.orderNum
  console.log(req.query);
  let sql = 'select * from cartlist where orderNum = ?'
  connection.query(sql,[orderNum],(err, result) => {
      if(err){
        console.log('[SELECT ERROR] - ',err.message);
        return;
      }
    console.log('--------------------------SELECT----------------------------');
    console.log(result);
    console.log('------------------------------------------------------------\n\n');  
    res.send(result)
  })
  
})


router.post('/orderlist',function (req, res) {
  let fields = req.body
  let Sql = 'insert into orderlist(id,orderNum,isOver,count,date,ALLMONEY) values (0,?,?,?,?,?)'
        connection.query(Sql,[fields.orderNum,fields.isOver,fields.count,fields.date,fields.ALLMONEY],function (err, result) {
          if(err){
          console.log('[INSERT ERROR] - ',err.message);
          return;
          }        

        console.log('--------------------------INSERT----------------------------');
        //console.log('INSERT ID:',result.insertId);        
        console.log('INSERT ID:',result);        
        console.log('-----------------------------------------------------------------\n\n');  
      })
    res.send('数据已接收');
  // let form = new multiparty.Form();
  // let data = {}
  //     form.parse(req, function(err,fields,file){
  //       console.log(fields);
  //       for (var variable in fields) {
  //         fields[variable] = fields[variable][0]
  //       }
  //       console.log(fields);

  //       let Sql = 'insert into orderlist(id,orderNum,isOver,count,date,ALLMONEY) values (0,?,?,?,?,?)'
  //       connection.query(Sql,[fields.orderNum,fields.isOver,fields.count,fields.date,fields.ALLMONEY],function (err, result) {
  //         if(err){
  //         console.log('[INSERT ERROR] - ',err.message);
  //         return;
  //         }        

  //       console.log('--------------------------INSERT----------------------------');
  //       //console.log('INSERT ID:',result.insertId);        
  //       console.log('INSERT ID:',result);        
  //       console.log('-----------------------------------------------------------------\n\n');  
  //     })
  //   res.send('数据已接收');
  // });
})


router.post('/cartlist',function (req, res) {
  console.log(req.body);
  let fields = req.body
  let addSql = 'insert into cartlist(id,name,image,price,count,orderNum) values (0,?,?,?,?,?)'
    connection.query(addSql,[fields.name,fields.image,fields.price,fields.count,fields.orderNum],function (err, result) {
      if(err){
       console.log('[INSERT ERROR] - ',err.message);
       return;
      }        

     console.log('--------------------------INSERT----------------------------');
     //console.log('INSERT ID:',result.insertId);        
     console.log('INSERT ID:',result);        
     console.log('-----------------------------------------------------------------\n\n');  
    })
    res.send('数据已接收');
  // let form = new multiparty.Form();
  // form.parse(req, function(err,fields,file){
  //   console.log(fields);
  //   for (var variable in fields) {
  //     fields[variable] = fields[variable][0]
  //   }
  //   console.log(fields);

  //   let addSql = 'insert into cartlist(id,name,image,price,count,orderNum) values (0,?,?,?,?,?)'
  //   connection.query(addSql,[fields.name,fields.image,fields.price,fields.count,fields.orderNum],function (err, result) {
  //     if(err){
  //      console.log('[INSERT ERROR] - ',err.message);
  //      return;
  //     }        

  //    console.log('--------------------------INSERT----------------------------');
  //    //console.log('INSERT ID:',result.insertId);        
  //    console.log('INSERT ID:',result);        
  //    console.log('-----------------------------------------------------------------\n\n');  
  //   })
  //   res.send('数据已接收');
  // });
})

module.exports = router;
