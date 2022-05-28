// Imported Objects
const {translator} = require("./Courses/Template.js");
const {targetSentences} = require("./Courses/Template.js");
const {nativeSentences} = require("./Courses/Template.js");


// Document Objects
let input = document.getElementById("input");
let answer = document.getElementById("answer");

let resultbox = document.getElementById("resultbox");

// Variables
var sentenceNumber = 1;
input.textContent = targetSentences.indexOf(string, sentenceNumber);
function confirm() {
  resultbox.hidden = false;
  answer.textContent = nativeSentences.indexOf(string, sentenceNumber);
  alert("test");
}
