import * as filterGen from "./filtergenerator.mjs";
import languages from "../Cache/langs.json" assert {type: "json"};

// Event Listeners
document.addEventListener("DOMContentLoaded", function(){
    // Elements
    let back = document.getElementById("back-icon");
    let apply = document.getElementById("apply-icon");
    let applybutton = document.getElementById("apply");

    // Initial Style Changes
    apply.style.filter = filterGen.hexToStyle("#3273DC").filter;

    // Event Listeners
    back.addEventListener("click", function(){
        window.location.assign("main.html");
    });
    back.addEventListener("mousedown", function(){
        back.style.filter = filterGen.hexToStyle("#209CEE").filter;
    });
    back.addEventListener("mouseup", function(){
        back.style.filter = filterGen.hexToStyle("#3273DC").filter;
    });
    back.addEventListener("mouseover", function(){
        back.style.filter = filterGen.hexToStyle("#3273DC").filter;
    });
    back.addEventListener("mouseout", function(){
        back.style.filter = filterGen.hexToStyle("#000000").filter;
    });

    applybutton.addEventListener("mousedown", function(){
        apply.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
    });
    applybutton.addEventListener("mouseup", function(){
        apply.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
        applybutton.blur();
    });
    applybutton.addEventListener("mouseover", function(){
        apply.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
    });
    applybutton.addEventListener("mouseout", function(){
        apply.style.filter = filterGen.hexToStyle("#3273DC").filter;
    });

    // Load Dropdown Options and Selections
    LoadLanguages();
});

function LoadLanguages() {
    for (let i = 0; i < languages.length; i++) {
        document.getElementById("languages").innerHTML += `<option>${languages[i].NAME}</option>`
    }
}
