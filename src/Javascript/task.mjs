import * as filterGen from "./filtergenerator.mjs"

//  Elements
var check = document.getElementById("check-mark");
var textinput = document.getElementById("text-input");
var confirm = document.getElementById("confirm");
var result = document.getElementById("result");
var resultheader = document.getElementById("result-header");
var resultbox = document.getElementById("result-box");
var correctoverride = document.getElementById("correct-override")
var incorrectoverride = document.getElementById("incorrect-override")

//  Event Listeners
confirm.addEventListener("click", Confirm);
correctoverride.addEventListener("click", ToggleCorrectOverride);
incorrectoverride.addEventListener("click", ToggleIncorrectOverride);
confirm.addEventListener("mouseover", ButtonHover);
confirm.addEventListener("mouseout", ButtonUnhover);

//  Functions
function Confirm() {
    // get RESULT
    let resultColor = ActResult("incorrect");

    //let resultColor = "success";

    if (resultColor === "success") {
        correctoverride.disabled = true;
        result.innerHTML = "Correct";
    } else if (resultColor === "danger") {
        incorrectoverride.disabled = true;
        result.innerHTML = "Incorrect";
    } else {
        result.innerHTML = "Unknown";
    }
    
    resultheader.classList.add(`has-background-${resultColor}`);
    resultheader.classList.add(`has-background-${resultColor}`);
    textinput.classList.add(`is-${resultColor}`);
    
    check.style.filter = filterGen.hexToStyle("#9FDEC2").filter;

    textinput.disabled = true;

    resultbox.classList.remove("is-hidden");
    confirm.disabled = true;
}

function ActResult(RESULT) {
    if (RESULT === "correct") {
        let resultColor = "success";
        return resultColor;
    } else if (RESULT === "incorrect") {
        let resultColor = "danger";
        return resultColor;
    } else {
        let resultColor = "link";
        return resultColor;
    }
}

function ToggleCorrectOverride() {
    incorrectoverride.classList.add("is-selected");
}

function ToggleIncorrectOverride() {
    incorrectoverride.classList.add("is-selected");
}

function ButtonHover() {
    CheckRecolor(true);
}

function ButtonUnhover() {
    CheckRecolor(false);
    confirm.blur();
}

function CheckRecolor(INVERT) {
    if (INVERT) {
        check.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
    } else {
        check.style.filter = filterGen.hexToStyle("#48C774").filter;
    }
}