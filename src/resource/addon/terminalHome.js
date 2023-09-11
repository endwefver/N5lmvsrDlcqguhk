let userInput, terminalOutput;
let projAsk = false;
let thisDir= null;
var socket = io(); 
let lastCommands = [];
let position=[];
let thisL=[]; 
let userAccess = [];

const f= "/directories/";
const g=".html";
const COMMANDS = {
  help: 'Try command to navigate like ls | exit '
  //command1: `You can use <pre style="color:red">HTML, CSS, and JavaScript</tags> for commands! Try clicking on <h1 onclick="alert('hihi')">me<img src="https://media.giphy.com/media/3o7bu0ZQQp2QQQQQQQ/giphy.gif" alt="" width=50px height=50px></h1>`,
};

const app = () => {
  userInput = document.getElementById("userInput");
  terminalOutput = document.getElementById("terminalOutput");
  document.getElementById("keyboard").focus(); 
  window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);
};

const execute = function executeCommand(input) {
  input = input.toLowerCase();
  lastCommands.push(input);
  let output;
  if (input.length === 0) {
    return;
  }
  if (input.indexOf("sudo") >= 0) {
    input = "sudo";
  }
 if (input === "clear" || input === "cls") {
    clearScreen();
  } else if (input === "history") {
    showHist();
  } else if (input === "ls") {
    if(thisDir!=null && thisDir.l){ 
        terminalOutput.innerHTML = `${
          terminalOutput.innerHTML
        }<div class="terminal-line">> ls ${positions()}:<br> ./${["0","1","2","3","4","5","6","7","8","9"].join("<br> ./")}</div>`;
       
    }else{
      showDir();
    }
  }else if(thisDir && thisDir.l){
    if (input === "exit" || input === "../") {
      if(position.length>0){
        position.pop();
      }
      output = '<div class="terminal-line"><span class="success">> inside directory '+positions()+'</div>'; 
      if(position.length>0 && thisL.length==0){
        navigateTo(position);
      }else if(thisL.length>0){
        thisL.pop();
      }else{ 
          window.frames["pageShow"].location = "/empty.html"; 
          thisDir = null;
      }
      terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    } else if(["0","1","2","3","4","5","6","7","8","9"].includes(input)){
      var y = position;
      y.push(input);
      thisL.push(input);
      if(thisDir.l===thisL.length){ 
        sendVector();
      }else{
        
        output = '<div class="terminal-line"><span class="success">> inside directory '+positions()+'</div>';
        terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
  
    }else{
        
      var input = lastCommands[lastCommands.length-1];
      output = `<div class="terminal-line"><span class="success">></span> ${input}</div>`;
      if (!COMMANDS.hasOwnProperty(input)) {
        output += `<div class="terminal-line">command not found: ${input}</div>`;
      } else {
        output += COMMANDS[input];
      }
    
      terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
     
  } else if (input === "exit" || input === "../") {
    if(position.length>0){
      position.pop();
    }
    output = '<div class="terminal-line"><span class="success">> inside directory '+positions()+'</div>';
    if(position.length>0){
      navigateTo(position);
    }else{
       window.frames["pageShow"].location = "/empty.html";
       thisDir = null;
    }
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  } else {
    var y = position;
    y.push(input);
    checkPath(y);

  }
   
  window.setTimeout(function(){
    document.getElementById("bottomscroll").scrollIntoView()
  }, 50); 
};

const key = (e) => {
  const input = userInput.innerHTML;

  if (e.key === "Enter") {
    execute(input);
    userInput.innerHTML = "";
    return;
  }

  userInput.innerHTML = input + e.key;
};

const backspace = (e) => {
  if (e.keyCode !== 8 && e.keyCode !== 46) {
    return;
  }
  userInput.innerHTML = userInput.innerHTML.slice(
    0,
    userInput.innerHTML.length - 1
  );
};
socket.on('g', function(b) { 
  
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">> ls ${positions()}:<br> ./${b.join("<br>  ./")}</div>`;
});

function showDir() {
  socket.emit('g', position); 
}
function showHist() {
  terminalOutput.innerHTML = `${
    terminalOutput.innerHTML
  }<div class="terminal-line">${lastCommands.join(", ")}</div>`;
}
function positions(){
  var actualPosition="./";
  for (const key in position) {
    actualPosition+=position[key]+"/";
  }
  return actualPosition;
}
socket.on('c', function(b) {
  thisDir= b;
  var a = "./"+thisDir.psw+f+thisDir.name+g;   
  window.frames["pageShow"].location = a;

  if(thisDir!=null && thisDir.pswCheck){
    user = prompt("User")
    psw = prompt("Psw")
    var t ={
      position: position,
      key: thisDir.key,
      sequence: [user,psw]
    }
    socket.emit('t',t);
  }
});

function navigateTo(a){
  socket.emit('c', a); 
}

socket.on('z', function(y) {
  if(y!=null){
    navigateTo(position);
    output = '<div class=""><span class="success">> inside directory '+positions()+'</div>';
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }else{
    var input = lastCommands[lastCommands.length-1];
    if(position.length>0){
      position.pop();
    }
    output = `<div class=""><span class="success">></span> ${input}</div>`;
    if (!COMMANDS.hasOwnProperty(input)) {
      output += `<div class="">command not found: ${input}</div>`;
    } else {
      output += COMMANDS[input];
    }
  
    terminalOutput.innerHTML = `${terminalOutput.innerHTML}<div class="terminal-line">${output}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
});
function checkPath(y){
  socket.emit('z', y); 
}
socket.on('t', function(y) {
  if(y!==null){
    position.push(y.name);
    navigateTo(position);
  }else{
    clearScreen()
  }
});
function sendVector(t){
  for (let index = 0; index < thisL.length; index++) {
    position.pop();
  }
  var t ={
    position: position,
    key: thisDir.key,
    sequence: thisL
  }
  socket.emit('t',t);
  thisL=[]; 
}
let iter = 0;
const up = (e) => {
  if (e.key === "ArrowUp") {
    if (lastCommands.length > 0 && iter < lastCommands.length) {
      iter += 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }

  if (e.key === "ArrowDown") {
    if (lastCommands.length > 0 && iter > 1) {
      iter -= 1;
      userInput.innerHTML = lastCommands[lastCommands.length - iter];
    }
  }
};

function clearScreen() {
  location.reload();
}
document.addEventListener("keydown", up);

document.addEventListener("keydown", backspace);
document.addEventListener("keypress", key);
document.addEventListener("DOMContentLoaded", app);


class Terminal extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    this.innerHTML = `
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://kit.fontawesome.com/3f2db6afb6.js" crossorigin="anonymous"></script>
    <div class="terminal_window" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"></div>
    <div class="fakeScreen">
      <div class="terminal-window primary-bg" onclick="document.getElementById('dummyKeyboard').focus();">
        <div class="terminal-output" id="terminalOutput">
          <div class="terminal-line">
            <span class="help-msg">Type <span class="help">Help</span> to get started</span>
              commands.<br>
          </div>
        </div>
        <div class="terminal-line">
          <span class="success">></span> 
          <span class="user-input" id="userInput"></span>
          <span class="line anim-typewriter"></span>
          <input type="text" id="keyboard" class="dummy-keyboard" />
        </div>
        <span id="bottomscroll"></span>
      </div>
    </div>
  </div>
  `
  }
}

customElements.define("terminal-js", Terminal);