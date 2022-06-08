import * as filterGen from "./filtergenerator.mjs"
import courseList from "../Cache/courselist.json" assert {type: "json"};
import courseData from "../Cache/courses.json" assert {type: "json"}

  // Document-Related
// Title
document.getElementById("doc-title").innerText = "Openlang";

// Elements
var docBody = document.getElementById("doc-body");

// Event Listeners
document.addEventListener("DOMContentLoaded", CourseSelectionPage);

  // Functions
// Page-Relation Functions
function NextPage() {
  let NEXTPAGE = document.getElementById("page-number").innerText;
  LoadCourses(parseInt(NEXTPAGE));
}

function PreviousPage() {
  let PREVPAGE = document.getElementById("page-number").innerText;
  LoadCourses(PREVPAGE-2);
}

  // Page-Builder Functions
// Course Loading
function LoadCourses(PAGE) {
  // Clear Previous Load
  document.getElementById("courses").innerHTML = ""
  
  // Load Courses
  for (let i = 0; i < 10; i++) {  // For Each Course
    if (courseList[i+(PAGE*10)] != null) {
      let courses = document.getElementById("courses");
      courses.innerHTML += `
      <div class="buttons is-centered m-0">
        <button class="button is-success is-fullwidth m-1" id="course${i}">${courseList[i+(PAGE*10)]}</button>
      </div>
      `;
    }
  }
    
  // Change Page Number
  document.getElementById("page-number").innerHTML = PAGE+1;

  // Visual Changes for No Pages
  if (courseList.length < 10) {
    document.getElementById("page-selection").classList.add("is-hidden");
  }

  // Disable Prev/Next
  if (PAGE === (Math.ceil((courseList.length / 10) - 1))) {
    document.getElementById("next-page").disabled = true;
  } else {
    document.getElementById("next-page").disabled = false;
  }
  if (PAGE === 0) {
    document.getElementById("prev-page").disabled = true;
  } else {
    document.getElementById("prev-page").disabled = false;
  }

  // Add Event Listeners
  if (courseList.length > 10) {
    for (let i = 0; i < 10; i++) {
      document.getElementById(`course${i}`).addEventListener("click", function(){CoursePage(i+(PAGE*10));});
    }
  } else {
    for (let i = 0; i < courseList.length; i++) {
      document.getElementById(`course${i}`).addEventListener("click", function(){CoursePage(i);});
    }
  }
}

function LoadCourse(COURSENUM) {
  let COURSE = courseData[COURSENUM]
  let CHECKPOINTS = COURSE.LESSONS[COURSE.LESSONS.length-1].CHECKPOINT  // Find Number of Checkpoints (Lessons Ordered Lowest to Highest)

  for (let i = 0; i <= CHECKPOINTS; i++) {    // Per Checkpoint
    let LEVEL = 0;

    // Start New Checkpoint
    document.getElementById("course").innerHTML += `
      <div id="checkpoint${i}">
        <div class="buttons is-centered my-1" id="level0c${i}"></div>
      </div>
    `;

    if (i != CHECKPOINTS) {   // For Non-Last Checkpoints
      document.getElementById(`course`).innerHTML +=`
      <div class="divider"></div>
      `
    }

    for (let j = 0; j < COURSE.LESSONS.length; j++) {   // Per Lesson
      if (COURSE.LESSONS[j].CHECKPOINT === i) {
        // Create New Level Div
        if (COURSE.LESSONS[j].LEVEL > LEVEL) {
          LEVEL += 1;
          document.getElementById(`checkpoint${i}`).innerHTML += `
            <div class="buttons is-centered my-1" id="level${LEVEL}c${i}"></div>
          `;
        }

        // Add Lesson Button
        document.getElementById(`level${LEVEL}c${i}`).innerHTML += `
          <button class="button is-info my-1" id="lesson${j}">${COURSE.LESSONS[j].TITLE}</button>
        `;
      }
    }
    // Checkpoint Test
    document.getElementById(`checkpoint${i}`).innerHTML += `
      <div class="buttons">
        <button class="button is-link is-fullwidth my-1" id="checkpoint-test${i}" disabled>Checkpoint ${i+1}</button>
      </div>
    `
  }

  // Lesson Once-Over
  for (let i = 0; i < COURSE.LESSONS.length; i++) {
    // Add Lesson Button Listener
    document.getElementById(`lesson${i}`).addEventListener("click", function(){TaskPage(COURSENUM, i)})
  }
}

// Tasks
function StartLesson(COURSENUM, LESSONNUMBER) {
  let COURSEMEDIA = courseData[COURSENUM].LESSONS[LESSONNUMBER].MEDIA;
  //let LESSONLENGTH; = 10 // Tasks #
  TranslationTask(COURSEMEDIA.NATIVESENTENCES[1], COURSEMEDIA.TARGETSENTENCES[1], false)
}

function TranslationTask(NATIVESENTENCE, TARGETSENTENCE, BACKWARDS) {
  // Backwards means Native to Target
  document.getElementById("taskbox").innerHTML = `
    <h1 class="subtitle has-text-dark has-text-weight-bold is-small m-0" id="prompt">- <span class="is-underlined">Translate the following</span> -</h1>
    <p class="label" id="prompt-material"></p>
    <textarea class="textarea has-fixed-size" id="text-input" placeholder="Type your answer here."></textarea> <br />
    <button class="button is-success is-rounded is-outlined" id="confirm">
      <span>Confirm</span>
      <span class="icon">
        <img src="../Icons/svg/check.svg" id="check-mark" />
      </span>
    </button>
    <article class="message mb-0 mx-0 mt-3 px-0 pt-0 is-small is-hidden" id="result-box">
      <div class="message-header has-text-weight-bold" id="result-header">
        Result: <span id="result"></span>
      </div>
      <div class="message-body has-background-white">
        <span class="underlined">Answer:</span>
        <div class="message is-small m-0">
          <div class="message-body has-text-weight-bold">
            <span id="answer"></span>
          </div>
        </div> <br />
          [ Override Results ]
          <div class="buttons is-small has-addons is-centered has-addons-centered">
            <button class="button is-success is-inverted is-rounded is-small pr-1 m-0" id="correct-override">  Correct</button>
            <button class="button is-danger is-inverted is-rounded is-small pl-1 m-0" id="incorrect-override">Incorrect</button>
          </div>
        </div>
        <span></span><br />
      </div>
    </article>
  `

  // Elements
  let answerBox = document.getElementById("text-input")
  let promptMaterial = document.getElementById("prompt-material")
  let answer = document.getElementById("answer")
  let confirm = document.getElementById("confirm")
  let checkMark = document.getElementById("check-mark")
  let correctOverride = document.getElementById("correct-override")
  let incorrectOverride = document.getElementById("incorrect-override")

  // Swap Goal
  if (BACKWARDS) {
    promptMaterial.innerText = NATIVESENTENCE
    answer.innerText = TARGETSENTENCE
    confirm.addEventListener("click", function(){SubmitAnswer(answerBox.value, TARGETSENTENCE, "")});
  } else {
    promptMaterial.innerText = TARGETSENTENCE
    answer.innerText = NATIVESENTENCE
    confirm.addEventListener("click", function(){SubmitAnswer(answerBox.value, NATIVESENTENCE, "")});
  }

  // Icon Defaults
  checkMark.style.filter = filterGen.hexToStyle("#48C774").filter;

  // Event Listeners
  confirm.addEventListener("mouseover", function(){
    checkMark.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
  });
  confirm.addEventListener("mouseout", function(){
    checkMark.style.filter = filterGen.hexToStyle("#48C774").filter;
    confirm.blur();
  });
  correctOverride.addEventListener("click", function(){SubmitAnswer("", "", "correct")});
  incorrectOverride.addEventListener("click", function(){SubmitAnswer("", "", "incorrect")});
}

function SubmitAnswer(ANSWER, CORRECTANSWER, OVERRIDE) {
  document.getElementById("answer").classList.remove("is-hidden");

  // Variables
  let RESULT = ""
  let resultDisplay = ""
  let resultColor = ""

  // Elements
  let checkMark = document.getElementById("check-mark");
  let textInput = document.getElementById("text-input");
  let confirm = document.getElementById("confirm");
  var result = document.getElementById("result");
  let resultHeader = document.getElementById("result-header");
  let resultBox = document.getElementById("result-box");

  if (OVERRIDE === null || OVERRIDE === "") {
    if (ANSWER === CORRECTANSWER) {
      RESULT = "correct"
    } else {
      RESULT = "incorrect"
    }
  } else {
    RESULT = OVERRIDE

    if (OVERRIDE = "correct") {
      // Remove Old Colors
      resultHeader.classList.remove("has-background-danger");
      textInput.classList.remove("is-danger");
    } else if (OVERRIDE = "incorrect") {
      // Remove Old Colors
      textInput.classList.remove("is-success");
      resultHeader.classList.remove("has-background-success");
    }
  }

  // Update Result-Dependent Variables
  if (RESULT === "correct") {
    resultDisplay = "Correct"
    resultColor = "success"
  } else {
      if (RESULT === "incorrect") {
        resultDisplay = "Incorrect"
        resultColor = "danger"
      } else {
        resultDisplay = "ERROR"
        resultColor = "dark"
    }
  }

  // Detect Result
  if (OVERRIDE != null && OVERRIDE != "") {
    resultDisplay = resultDisplay + " (Overridden)"
  }

  result.innerText = resultDisplay
  
  resultHeader.classList.add(`has-background-${resultColor}`);
  textInput.classList.add(`is-${resultColor}`);
  
  checkMark.style.filter = filterGen.hexToStyle("#9FDEC2").filter;

  textInput.disabled = true;

  resultBox.classList.remove("is-hidden");
  confirm.disabled = true;
}

  // Pages
function CourseSelectionPage() {
  docBody.innerHTML = `
    <section class="hero is-dark is-fullheight is-clipped">
      <div class="hero-body columns is-centered">
        <div class="column has-text-centered is-narrow is-vcentered">
          <div class="box has-background-light px-6 pt-6 pb-3">
            <h1 class="title has-text-dark">- <span class="is-underlined">Courses</span> -</h1>
            <div class="box has-background-white my-4 py-2">
              <span id="courses"></span>
              <div class="buttons is-centered mt-3 mb-1" id="page-selection">
                  <button class="button is-dark mr-6" id="prev-page"><</button> 
                  <button class="button" disabled><span id="page-number"></span></button>
                  <button class="button is-dark ml-6" id="next-page">></button>
              </div>
            </div>
            <div class="buttons is-right">
              <button class="button is-small mt-3">
                <span class="icon">
                  <img src="../Icons/svg/cog.svg" id="settings-icon" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  document.getElementById("next-page").addEventListener("click", NextPage);
  document.getElementById("prev-page").addEventListener("click", PreviousPage);
  LoadCourses(0)
}

function CoursePage(COURSENUM) {
  docBody.innerHTML = `
    <section class="hero is-dark is-fullheight is-clipped">
      <div class="hero-body columns is-centered">
        <div class="column has-text-centered is-narrow is-vcentered">
          <div class="box has-background-light px-6 pt-6 pb-3">
            <h1 class="title has-text-dark">- <span class="is-underlined">${courseData[COURSENUM].TITLE}</span> -</h1>
            <div class="box" id="course">

            </div>
          </div>
        </div>
      </div>
    </section>
  `;
  
  LoadCourse(COURSENUM);
}

function TaskPage(COURSENUM, LESSONNUMBER) {
  docBody.innerHTML = `
    <section class="hero is-dark is-fullheight is-clipped">
    <div class="hero-body columns is-centered">
      <div class="column has-text-centered is-two-thirds is-narrow is-vcentered">
        <div class="box has-background-light px-5 py-5 m-0" id="taskbox">
        </div>
      </div>
    </div>

    <div class="columns is-centered">
      <div class="column is-four-fifths is-narrow is-fixed-bottom">
        <progress class="progress is-success mb-6" value="0" max="100"></progress>
      </div>
    </div>
    </section>
  `;
  StartLesson(COURSENUM, LESSONNUMBER);
}

/*
// Elements
var check = document.getElementById("check-mark");
var textinput = document.getElementById("text-input");
var confirm = document.getElementById("confirm");
var result = document.getElementById("result");
var resultheader = document.getElementById("result-header");
var resultbox = document.getElementById("result-box");
var correctoverride = document.getElementById("correct-override")
var incorrectoverride = document.getElementById("incorrect-override")

// Event Listeners
correctoverride.addEventListener("click", ToggleCorrectOverride);
incorrectoverride.addEventListener("click", ToggleIncorrectOverride);


// Functions
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
*/