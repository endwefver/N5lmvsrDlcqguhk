/** MAIN */ 
  
import express from 'express';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchChannel, saveChannel, getAll }  from './manager.js' 
import { createServer } from "http";
import { Server } from "socket.io";


//INIT ENV VAR
const app = express();  
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const http = createServer(app);
const io = new Server(http);
if(!process || !process.env || !process.env.TOKEN){
    dotenv.config();
}
var port = process.env.PORT || 8080;
var token = process.env.TOKEN || '';
app.use(express.static(__dirname + '/dist/'));

//LOAD MODULE  
app.get("/mode/javascript/javascript.js", (request, response) => { 
    response.sendFile('javascript.js' , { root: './node_modules/codemirror/mode/javascript/' }) 
});  
app.get("/lib/codemirror.css", (request, response) => { 
    response.sendFile('codemirror.css' , { root: './node_modules/codemirror/lib/' }) 
});  
app.get("/lib/codemirror.js", (request, response) => { 
    response.sendFile('codemirror.js' , { root: './node_modules/codemirror/lib/' }) 
});   
app.get("/dist/hydra-synth.js", (request, response) => { 
    response.sendFile('hydra-synth.js' , { root: './node_modules/hydra-synth/dist/' }) 
});  
app.get("/dist/bootstrap.min.css", (request, response) => { 
    response.sendFile('bootstrap.min.css' , { root: './node_modules/bootstrap/dist/css/' }) 
});  
app.get("/dist/bootstrap.min.css.map", (request, response) => { 
    response.sendFile('bootstrap.min.css.map' , { root: './node_modules/bootstrap/dist/css/' }) 
});  

var themeCss = fs.readdirSync('./node_modules/codemirror/theme');
themeCss.forEach(file => {   
    app.get("/theme/"+file, (request, response) => { 
        response.sendFile(file , { root: './node_modules/codemirror/theme/' }) 
    });  
});

var filesJs = fs.readdirSync('./src/resource/addon/');
filesJs.forEach(file => {  
    console.log("/src/resource/addon/"+file);
    app.get("/src/resource/addon/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/addon/' }) 
    });  
});

//LOAD ASSETS
app.use('/src/assets', express.static(__dirname + '/src/assets/')); 

//LOAD HOMEPAGE ON MAIN LOCALHOST:8080
app.get("/", (request, response) => { 
    response.sendFile('home.html' , { root: './src/resource/html/' }) 
});  

app.get("/empty.html", (request, response) => { 
    response.sendFile('empty.html' , { root: './src/resource/html/' }) 
});  

app.get("/I.pdfr", (request, response) => { 
    response.sendFile('I.pdf' , { root: './src/resource/html/' }) 
});  

//LOAD FAVICON
app.get("/favicon.ico", (request, response) => { 
    response.sendFile('favicon.ico' , { root: './src/resource/' })
});  

//LOAD ALL HTML AND EXPOSE IT
var files = fs.readdirSync('./src/resource/html/');
files.forEach(file => { 
    var streetaddress= file.substr(0, file.indexOf('.')); 
    app.get("/"+streetaddress, (request, response) => { 
        response.sendFile(file , { root: './src/resource/html/' }) 
    });  
});

//LOAD ALL CSS AND EXPOSE IT
var filesCss = fs.readdirSync('./src/resource/css/');
filesCss.forEach(file => {  
    console.log("/src/resource/css/"+file);
    app.get("/src/resource/css/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/css/' }) 
    });  
});
var filesCss = fs.readdirSync('./src/resource/audio/');
filesCss.forEach(file => {  
    console.log("/src/resource/audio/"+file);
    app.get("/src/resource/audio/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/audio/' }) 
    });  
});

//LOAD ALL IMG AND EXPOSE IT
/*var filesCss = fs.readdirSync('./src/resource/img/');
filesCss.forEach(file => {  
    console.log("/src/resource/img/"+file);
    app.get("/src/resource/img/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/img/' }) 
    });  
});*/

app.get("/Dr0ghGHvNLz0myO5/", (request, response) => {   response.sendFile('0.png' , { root: './src/resource/img/' }) });  
app.get("/YU8HApm2flXBNwTu/", (request, response) => {   response.sendFile('1.jpg' , { root: './src/resource/img/' }) });  
app.get("/bioCmtGOmVgCZhVQ/", (request, response) => {   response.sendFile('-22.jpeg' , { root: './src/resource/img/' }) });  
app.get("/EZj9k4HSs019OVXU/", (request, response) => {   response.sendFile('2.jpg' , { root: './src/resource/img/' }) });  
app.get("/f25Vbgm9mzH6fzDF/", (request, response) => {   response.sendFile('3.png' , { root: './src/resource/img/' }) });  

app.get("/1oIHn5DY9UtgXaMD/", (request, response) => {   response.sendFile('3e004.png' , { root: './src/resource/img/' }) });  
app.get("/yKO9yIQHNZw0QunX/", (request, response) => {   response.sendFile('5.png' , { root: './src/resource/img/' }) });  
app.get("/SFAJPfkPXQMGRVbc/", (request, response) => {   response.sendFile('41.jpeg' , { root: './src/resource/img/' }) });  
app.get("/Es4MbXNam2IvvP8E/", (request, response) => {   response.sendFile('a3e0c.jpg' , { root: './src/resource/img/' }) });  
app.get("/qA6uOYPdwjJ3kHtJ/", (request, response) => {   response.sendFile('images.jpg' , { root: './src/resource/img/' }) });  

app.get("/0ZaOVm9CyLCf0zzo/", (request, response) => {   response.sendFile('img.jpg' , { root: './src/resource/img/' }) });  
app.get("/f4DfoZx4yz2rs3cC/", (request, response) => {   response.sendFile('PACIFIC_036.jpg' , { root: './src/resource/img/' }) });  
app.get("/LfL0lOvSiezLi6ey/", (request, response) => {   response.sendFile('IMG_9802.mov' , { root: './src/resource/img/' }) });  
app.get("/JAtjil6pkDcHVXHg/", (request, response) => {   response.sendFile('IMG_9804.MOV' , { root: './src/resource/img/' }) });  
app.get("/JAtjil6pkDcHVXHgeaster_egg.jpeg", (request, response) => {   response.sendFile('easter_egg.jpeg' , { root: './src/resource/img/' }) });  

//LOAD ALL JS AND EXPOSE IT
var filesJs = fs.readdirSync('./src/resource/js/');
filesJs.forEach(file => {  
    console.log("/src/resource/js/"+file);
    app.get("/src/resource/js/"+file, (request, response) => { 
        response.sendFile(file , { root: './src/resource/js/' }) 
    });  
});

const map ={
    page1: { name: 'page1', show: true, psw: "i6zJM6DHPu6QDFPUDARR0CrnWMb7XhDZhU4dZsLqRgm7qX8PRf",l: false,
                child: { 
                    a1: { name: 'a1', show: true, l: false, psw: "y" }, 
                    a2: { name: 'a2', show: true, l: false, psw: "y" }
                } 
            },
    page2: { name: 'page2', show: true,l: false, psw: "CrTA7OGwadSBRA05fbskQ8bevnKpBD334HumUhUu9EBf4s6F5j",
                child: { 
                    sectora: { name: 'sectorA', show: true,l: false, psw: "FaJHENMA6OoJm7YQFTc4rOkiclVrr5fvDlGxnZ9lJVUKLHzeQU" }, 
                    sectorb: { name: 'sectorB', show: true,l: false, psw: "Fo76fk6Q2nrahaYLKqnNTtdbONzinzpqNd8WZJmhPEITpYFI2o" }, 
                    sectorc: { name: 'sectorC', show: true,l: false, psw: "ErwoMuVvgdwrn2XKzz0JebyAJGGQYCcih0OBWAVAwAyNgxgM0x" }
                } 
            },
    page3: { name: 'page3', show: true, l: 24, psw: "XyJE0NM2HPbT1Wj9syUi1z8DU3vbssFToKqeYn5l8op3xyOdJg", result: "egg",
        child: {  
            egg: { name: 'egg', show: false, l: false, psw: "9f8uGjzozooGFOpLf0p4U5nsLE6MA5LwOO3MN36fKju2Ok7cun", 
            sequence:["0","1","1","0","0","1","0","1",  "0","1","1","0","0","1","1","1",  "0","1","1","0","0","1","1","1"] }
        }
    },
    page4: { name: 'page4', show: true, l: false, psw: "XVbEIJpgKIwIj4IWqaqNWOGzidGQZnZhbQKd5mC8kOtNHjjlPK", pswCheck: true, result: "memories1",
        child: { 
            memories1: { name: 'memories1', show: false, l: false, psw: "myjoQPhsojSjxKQPHO22JJomW5sQg204QZhqkVScalLxgF8DeE", sequence:["user","psw"] , result: "memories2",  
                child: { memories2: { name: 'memories2', show: true, l: false, psw: "59wNt8MlB4A731bUiskkovH8sxuCCEYJyRDwnBPTP3lYfK785y",  
                    child: { 
                        memories3: { name: 'memories3', show: true, l: false, psw: "dFw31UWZ67IZ0GTppfq3bkR03CCZflcZdk5mqIAEtv5xroJjJl"},
                        memories4: { name: 'memories4', show: true, l: 4, psw: "QptvPokgKVEFPlHszBaNNaEjDmhmaJYJHRyQVeXZq6ShxWlV3F", result: "memories5",
                            child: {memories5: { name: 'memories5', show: true, l: false, psw: "AX2BlYIiFFIlvcdZWuI7uWwVmSe41gUKiecjDsXeNcBGhestVn", sequence:["1","9","4","7"] }}
                        }, 
                        memories6: { name: 'memories6', show: true, l: false, psw: "e9j0wVBTeH4JRpAIWV3k0bAM7fOaQ7l5PY0pI9sYOMxZcj8QWh", 
                            child: {
                                memories7: { name: 'memories7', show: true, l: false, psw: "vOqCqhsjWAJ5Q0mQroYIdwHIywLcUVxtA1v9wKd0jPLNe6y3zN"},
                                memories8: { name: 'memories8', show: true, l: false, psw: "iaMVwe4FYyfWC6Z5oGhB6Bp1Lzc3KcIjZ8wP4XVDbqAQYL2CyH"},
                                memories11: { name: 'memories11', show: true, l: false, psw: "t30JY9q7FZz8cRjvtWBgOOSnJhR4JeBhyTeaPzprSrhnD1Lxmr"},
                            }
                        },
                        memories9: { name: 'memories9', show: true, l: 5, psw: "UCmEMN1uA8vvJNrI0cXHniTaRVv5sKd98fakYYC1PoZqKux6Fy", result: "memories10",
                            child: { memories10: { name: 'memories10', show: true, l: false, psw: "jMUDTUA8rhhIdALkb54c0DkAJVyYM10jmMafow76ycdWoYAqcC", sequence:["2","3","7","9","0"] , 
                                child: {
                                    memories12: { name: 'memories12', show: true, l: false, psw: "mYmRRqeDsAuslYkjlkpXfiC8Pa0oIEUifMPTnKHDYwU2tLbj8I"},
                                    memories13: { name: 'memories13', show: true, l: false, psw: "5FCP51HB8zQNIJngpTZ8IQgVRgBh8F9yXB0puLqS6rvZtqPjKl"},
                                    memories14: { name: 'memories14', show: true, l: false, psw: "ycUunMnHLpSjj8TbF38G7yw7HKLWViJav4uszJCEiOguCyWkk2n"},
                                    memories15: { name: 'memories15', show: true, l: false, psw: "PLlZTzjT4lVOwajgeH47yDX764Hd5v0LY0XGH6Ep1jhKe1bAXW", 
                                        child: {
                                            memories17: { name: 'memories17', show: true, l: false, psw: "kBsOKQSvSJ3DEs3Y4Jer9TovnNEpkP984rEFiSXXpsFUNJHjrC"},
                                            memories18: { name: 'memories18', show: true, l: false, psw: "qBSz0Ne5GdgXCB7wtcOKfTZSSibrsxX4WvA6frsWZ8n7MHbDdD"},
                                        }
                                    }
                                }}}
                        },  
                        memories16: { name: 'memories16', show: true, l: false, psw: "SFfekAlQQrOHZ6481tF7dMgZJ7BwEzA6xF7aAhymwpsMPn7f3d"},
                        memories19: { name: 'memories19', show: true, l: false, psw: "1MDytzPhuCPAzJtXuQNTK0x7DTcyhBfUDUklaDWbOkqB6VWfJO"}
                    }
                }}
            }
        }
    },
    page5: { name: 'page5', show: true, l: false, psw: "U3fGZAOjC8epLKC3kKC21Q6JmBRcjUOcJ3TDtBUwrMvwrHaBAU", result: "memories",
        child: { 
            memories: { name: 'memories', show: false, l: false, psw: "TDIpQqDmbtEX5bZF9CyClDlY7THVBinrevfQEU0ECuoNmvG4rw", sequence:["0","1","4","0","0","1","4","0","1","4","1","4","0","1","4","0","1","4","0","1","4","0","1","4","0","1","4","0","1","4"] }
        }
    }
  } 
  function maps(path){
      if(path){
          Object.keys(path).forEach(function(key) {
            if( path[key].child){
                maps(path[key].child);
            }
            console.log( "/"+path[key].psw+"/directories/"+path[key].name+".html");
            app.get("/"+path[key].psw+"/directories/"+path[key].name+".html", (request, response) => { 
                response.sendFile(path[key].name+".html" , { root: "./src/resource/directories/" })
            });  
          })
      }
  }
  maps(map);
   

// handle incoming connections from clients
io.sockets.on('connection', function(socket) {
    console.log("app: init connection");
  
    socket.on('c', function(variable) {   
        var path = map;
        var result = null;
        for (let index = 0; index < variable.length; index++) {
            const key = variable[index];
             
            if(path[key] && path[key] != undefined){
                result = path[key];
                path = path[key].child;
            }else{
                var result = null;
                break;
            }
        } 
        socket.emit('c',{name: result.name, psw: result.psw, l:result.l, pswCheck: result.pswCheck});
    });
    socket.on('t', function(variable) {   
        var path = map;
        var result = null;
        for (let index = 0; index < variable.position.length; index++) {
            const key = variable.position[index];
             
            if(path[key] && path[key] != undefined){
                result = path[key];
                path = path[key].child;
            }else{
                var result = null;
                break;
            }
        } 
        if(!result || !result.child || !result["result"] || !result.child[result["result"]]  || !result.child[result["result"]].sequence){
            socket.emit('t',null);
        }else{
            var tocheck = result.child[result["result"]].sequence;
            if(JSON.stringify(tocheck) !== JSON.stringify(variable.sequence)){
                socket.emit('t',null);
            }else{
                socket.emit('t',result.child[result["result"]]);
            }
        }
    });
    socket.on('g', function(variable) {     
        var path = map;
        var result = null;
        for (let index = 0; index < variable.length; index++) {
            const key = variable[index];
             
            if(path[key] && path[key] != undefined){
                path = path[key].child; 
                result = ["../"];
            }else{ 
                path=null;
                break;
            }
        }
        if(path) {
            result=[];
            Object.keys(path).forEach(function(key) {
                if(path[key].show){
                    result.push(key);
                }
            })
        }
        socket.emit('g',result);
    });
    socket.on('z', function(variable) {  
        var path = map;
        var result = null;
        for (let index = 0; index < variable.length; index++) {
            const key = variable[index];
             
            if(path!=undefined && path[key] && path[key] != undefined){
                result = key;
                path = path[key].child;
            }else{
                var result = null;
                break;
            }
        }
        socket.emit('z',result);
    });

});  

//ASCOLTA LA PORTA localhost per dire che il progetto è attivo
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});


/*

                            ▒▒▒▒▓▓▒▒▒▒▓▓▒▒░░                          
                      ▓▓▒▒▒▒▒▒░░▓▓░░▒▒▒▒░░▓▓▓▓▒▒▓▓                    
                  ░░░░░░░░▒▒    ▒▒  ░░    ░░▒▒▒▒▒▒▓▓▒▒░░              
              ░░░░░░                    ░░▒▒░░░░░░░░▒▒▓▓▒▒░░          
            ░░░░░░                          ░░    ░░░░▒▒░░▓▓          
          ░░░░░░                  ░░▒▒░░            ░░▒▒▒▒▒▒▓▓        
        ░░░░░░░░                    ░░                ░░▒▒░░▒▒▒▒      
        ░░░░                                      ▒▒    ▒▒░░░░░░      
      ░░░░░░    ░░                                        ▒▒▒▒░░      
    ░░░░░░░░        ░░                                      ▒▒░░░░    
    ░░░░░░░░    ▒▒  ▒▒      ░░▒▒▓▓▓▓▓▓▒▒▒▒░░        ▒▒  ▒▒░░░░▓▓░░░░  
  ░░░░░░  ░░      ▓▓  ░░░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓░░  ░░░░░░░░░░░░░░░░░░  
  ░░░░                ░░▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░▒▒▒▒░░  ▒▒░░        ░░░░░░
  ░░░░                ▒▒▒▒▒▒░░░░░░░░▒▒▒▒░░  ░░▒▒▒▒  ░░          ▒▒░░░░
  ░░            ░░  ▒▒▒▒▒▒▒▒░░░░░░██▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░            ░░░░░░
░░▒▒            ░░  ▒▒▒▒▒▒▒▒░░░░████▒▒██▒▒▒▒▒▒▒▒▒▒▒▒              ░░░░
▒▒                  ▒▒▒▒▒▒▒▒░░▒▒████  ██▓▓▒▒▒▒▒▒▒▒▒▒          ░░  ░░░░
░░░░        ▒▒      ▒▒░░▒▒▒▒▒▒▓▓██████████▒▒▒▒▒▒▒▒▒▒            ░░░░░░
░░░░░░      ▒▒  ▒▒  ▒▒░░░░▒▒▒▒▓▓██████████░░▒▒▒▒▒▒▒▒  ░░        ░░▒▒░░
░░░░            ░░  ▒▒░░░░  ░░▒▒▓▓██████░░░░▒▒▒▒▓▓▒▒  ░░░░        ░░░░
░░▒▒            ░░  ░░▒▒▒▒░░░░░░▒▒▒▒▒▒░░░░░░░░▒▒▒▒░░            ░░░░░░
  ░░░░░░░░            ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░▒▒▒▒▒▒▒▒▒▒░░          ░░▒▒▒▒░░
  ▒▒░░░░              ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒          ░░░░░░░░░░
  ▒▒░░▒▒░░            ▒▒░░▒▒▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒            ░░▒▒░░░░  
    ░░▒▒▒▒░░░░        ░░    ▒▒▓▓▒▒▒▒▒▒▒▒▒▒░░              ░░  ░░░░░░  
    ░░▓▓▒▒▒▒░░          ▒▒                                ░░░░░░░░    
      ▒▒▓▓░░░░░░░░░░░░▒▒  ░░░░                            ░░░░░░      
        ░░░░░░▒▒▒▒▒▒  ▒▒                                ░░  ░░        
          ▒▒▒▒▒▒▒▒░░░░░░                              ▒▒░░░░░░        
            ░░▒▒▒▒▒▒▒▒░░▒▒▒▒▒▒            ░░░░░░    ░░░░░░░░          
                ▓▓░░▒▒░░░░░░▒▒░░  ░░  ░░░░░░▒▒░░░░░░░░░░░░            
                  ░░▒▒▒▒▒▒░░▓▓▒▒▒▒░░░░▒▒░░░░░░░░░░░░                  
                        ▒▒▓▓▓▓▒▒▓▓▒▒░░░░░░░░░░                        
*/