const express = require("express");
const bodyparser =  require("body-parser");
const pool = require("../db");
const passwordHash = require('password-hash');
const jwt = require("jsonwebtoken");
const Auth = require("./Auth");

const app = express();
app.use(bodyparser.json());

app.use((request , response , next) => {
  response.setHeader("Access-Control-Allow-Origin" , "*");
  response.setHeader("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type, Accept , Authorization");
  response.setHeader("Access-Control-Allow-Methods" , "GET, POST, PATCH, DELETE, OPTIONS");

  next();
});

app.post("/api/user/signup",(request , response , next) => {
  const user_email = request.body.email;
  const user_password = passwordHash.generate(request.body.password);

  const CheckEmailQuery = pool.query("SELECT id FROM users where email = $1;" ,
    [user_email],
    (err, res) =>{
      if(err){
        response.json({
          message : err.message
        });
      }

      else{
        if(res.rowCount > 0){
          response.json({
            message : "exists"
          });
        }

        else{
          var date = new Date();
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0');
          var yyyy = date.getFullYear();

          date = yyyy + '-' + mm + '-' + dd;

          const InsertQuery =  pool.query("INSERT INTO users(email,password,created_at,updated_at,is_deleted) VALUES ($1 , $2 , $3 , $3 , $4);" ,
            [user_email,user_password,date,false] ,
            (err, res) => {
            if(err){
              response.json({
                message : err.message
              });
            }

            else{
              response.json({
                message : "success"
              });
            }
          });
        }
        return;
      }
    }, (error) => {
      response.json({
        message : error
      });
    });
});


app.post("/api/user/login",(request , response , next) => {
  const user_email = request.body.email;
  const user_password = request.body.password;

  const CheckEmailQuery = pool.query("SELECT id,password FROM users where email = $1;" ,
    [user_email],
    (err, res) =>{
      if(err){
        response.json({
          message : err.message
        });
      }

      else{
        if(res.rowCount > 0){
          if(passwordHash.verify(user_password , res.rows[0].password)){
            const token = jwt.sign({email : user_email , id : res.rows[0].id},
                                  "TO_YEET_OR_TO_YEEHAW",
                                  {expiresIn: "1h"});

            response.json({
              message : "success",
              token : token,
              expiresIn: 3600
            });
          }

          else{
            response.json({
              message : "wrong password"
            });
          }
        }

        else{
          response.json({
            message : "not found"
          });
        }

        return;
      }
    }, (error) => {
      response.json({
        message : error
      });
    });
});

app.get("/api/devices" , Auth , (request,response,next) =>{
  var devices = [];
  const GetDevicesQuery = pool.query("SELECT device_id,device_number,device_name,latitude,longitude,to_char(created_at,'YYYY-MM-DD') AS created_at FROM devices WHERE is_deleted = false ORDER BY created_at DESC;" ,
  (err, res) =>{
    if(err){
      response.json({
        message : err.message
      });
    }

    else{
      if(res.rowCount == 0){
        response.json({
          message : "empty"
        });
      }

      else{
        for(let i = 0 ; i < res.rowCount ; ++i){
          let row = {
            id : res.rows[i].device_id,
            number : res.rows[i].device_number,
            name : res.rows[i].device_name,
            latitude : res.rows[i].latitude,
            longitude : res.rows[i].longitude,
            created_at : res.rows[i].created_at
          };

          devices.push(row);
        }

        response.json({message : "success" , devices : devices});
      }
    }
  })
});


app.post("/api/devices/create", Auth ,(request , response , next) => {
  const number = request.body.number;
  const name = request.body.name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;

  const CheckNumberQuery = pool.query("SELECT id FROM devices where device_number = $1 AND is_deleted = false;" ,
    [number],
    (err, res) =>{
      if(err){
        response.json({
          message : err.message
        });
      }

      else{
        if(res.rowCount > 0){
          response.json({
            message : "exists"
          });
        }

        else{
          var id = "";

          for(let i = 0 ; i < 2 ; ++i){
            ascii = Math.floor(Math.random() * (122 - 65)) + 65;

            if(ascii >= 91 && ascii <=96){
              i--;
              continue;
            }

            id+=  String.fromCharCode(ascii);
          }

          id+= "-";

          for(let i = 0 ; i < 4 ; ++i){
            id+= Math.floor(Math.random() * 10);
          }

          var date = new Date();
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0');
          var yyyy = date.getFullYear();

          date = yyyy + '-' + mm + '-' + dd;

          const InsertQuery =  pool.query("INSERT INTO devices(device_id,device_number,device_name,latitude,longitude,created_at,updated_at,is_deleted) VALUES ($1 , $2 , $3 , $4 , $5 , $6 , $6 , $7) RETURNING device_id,device_number,device_name,latitude,longitude,to_char(created_at,'YYYY-MM-DD') AS created_at;" ,
            [id,number,name,latitude,longitude,date,false] ,
            (err, res) => {
            if(err){
              response.json({
                message : err.message
              });
            }

            else{
              response.json({
                message : "success",
                device: {
                  id : res.rows[0].device_id,
                  number : res.rows[0].device_number,
                  name : res.rows[0].device_name,
                  latitude : res.rows[0].latitude,
                  longitude : res.rows[0].longitude,
                  created_at : res.rows[0].created_at
                }
              });
            }
          });
        }
        return;
      }
    }, (error) => {
      response.json({
        message : error
      });
    });
});

app.post("/api/devices/delete", Auth ,(request ,response , next) => {
  let ReturnedIDs = [];
  let condition = "";
  const IDs = request.body.IDs;

  for(let i = 0 ; i < IDs.length-1 ; ++i){
    condition+= "'"+IDs[i]+"',";
  }
  condition+= "'"+IDs[IDs.length-1]+"'";

  const CheckIdsQuery = pool.query("SELECT id FROM devices WHERE device_id in ("+condition+") AND is_deleted = false;" ,
  (err, res) =>{
    if(err){
      response.json({
        message : err.message
      });
    }

    else{
      if(res.rowCount !== IDs.length){
        response.json({
          message : "not found"
        });
      }

      else{
        var date = new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();

        date = yyyy + '-' + mm + '-' + dd;

        const DeleteQuery = pool.query("UPDATE devices SET is_deleted = true , updated_at = $1 WHERE device_id in ("+condition+")",
        [date],
        (err,res) => {
          if(err){
            response.json({
              message : err.message
            });
          }

          else{
            response.json({
              message : "success"
            });
          }
        });
      }

      return;
    }
  }, (error) => {
    response.json({
      message : error
    });
  });
});


app.post("/api/devices/edit" , Auth , (request , response , next) => {
  const id = request.body.id;
  const number = request.body.number;
  const name = request.body.name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;

  const CheckNumberQuery = pool.query("SELECT id FROM devices where device_number = $1 AND device_id != $2 AND is_deleted = $3;" ,
    [number,id,false],
    (err, res) =>{
      if(err){
        response.json({
          message : err.message
        });
      }

      else{
        if(res.rowCount > 0){
          response.json({
            message : "exists"
          });
        }

        else{
          var date = new Date();
          var dd = String(date.getDate()).padStart(2, '0');
          var mm = String(date.getMonth() + 1).padStart(2, '0');
          var yyyy = date.getFullYear();

          date = yyyy + '-' + mm + '-' + dd;

          const UpdateQuery =  pool.query("UPDATE devices SET device_number = $1 , device_name = $2 , latitude = $3 , longitude = $4 , updated_at = $5 WHERE device_id = $6;" ,
            [number,name,latitude,longitude,date,id] ,
            (err, res) => {
            if(err){
              response.json({
                message : err.message
              });
            }

            else{
              response.json({
                message : "success"
              });
            }
          });
        }
        return;
      }
    }, (error) => {
      response.json({
        message : error
      });
    });
});


app.post("/api/devices/search" , Auth , (request,response,next) =>{
  var devices = [];
  const value = request.body.SearchValue;

  const GetSearchQuery = pool.query("SELECT device_id,device_number,device_name,latitude,longitude,to_char(created_at,'YYYY-MM-DD') AS created_at FROM devices WHERE is_deleted = false AND (device_id LIKE '%"+value+"%' OR device_number LIKE '%"+value+"%' OR LOWER(device_name) LIKE LOWER('%"+value+"%')) ORDER BY created_at DESC;" ,
  (err, res) =>{
    if(err){
      response.json({
        message : err.message
      });
    }

    else{
      if(res.rowCount == 0){
        response.json({
          message : "empty",
          devices : []
        });
      }

      else{
        for(let i = 0 ; i < res.rowCount ; ++i){
          let row = {
            id : res.rows[i].device_id,
            number : res.rows[i].device_number,
            name : res.rows[i].device_name,
            latitude : res.rows[i].latitude,
            longitude : res.rows[i].longitude,
            created_at : res.rows[i].created_at
          };

          devices.push(row);
        }

        response.json({message : "success" , devices : devices});
      }
    }
  })
});

module.exports = app;
