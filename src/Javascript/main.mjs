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

// Variable-Related Functions
function StripString(INPUT) {
  let RESULT = INPUT.toLowerCase();
  RESULT = RESULT.replace(/[\/\\#,+()$~%.":*?<>{}@!^`_=;[\]\| ]/g, '');
  RESULT = RESULT.replace(/\&/g, "and")
  return RESULT
}

function RandomRange(MIN, MAX) {
  return Math.floor(Math.random() * (MAX - MIN + 1) + MIN);
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
  if (PAGE === Math.floor((courseList.length / 10))) {
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
  let LESSONLENGTH = 10; // Typically 17 Tasks on Duolingo?
  let TASKSENTENCES = [];
  let CURRENTTASK = 0;

  // Generate Random Tasks
  for (let i = 0; i <= LESSONLENGTH; i++) {
    TASKSENTENCES[i] = RandomRange(0, (COURSEMEDIA.NATIVESENTENCES.length-1));
  }

  // Instantiate Next Button
  document.getElementById("next-btn-area").innerHTML = `
    <div class="buttons is-right">
      <span class="icon is-medium mt-2 p-0">
        <img src="../Icons/svg/arrow-right-thick.svg" id="next-icon" />
      </span>
    </div>
  `

  // Elements
  let next = document.getElementById("next-icon");
  let back = document.getElementById("back-icon");
  let progressBar = document.getElementById("progress-bar");
  let textInput = document.getElementById("text-input");

  // Filter Initialization
  next.style.filter = filterGen.hexToStyle("#B5B5B5").filter;

  // Add Event Listeners
  next.addEventListener("click", function(){
    // Post-Lesson Return
    if (CURRENTTASK === -1) {
      CoursePage(COURSENUM);
    }

    // Task-Based Responses
    if ((CURRENTTASK+1) === LESSONLENGTH || CURRENTTASK === LESSONLENGTH) {   // Last Task
      CURRENTTASK = -1;
      progressBar.value = 100
      back.classList.add("is-hidden");
      textInput.value = "LESSON COMPLETE! Please proceed to return to course.";
    } else {  // Non-Last Tasks
      CURRENTTASK += 1;
      progressBar.value = (100 / LESSONLENGTH) * CURRENTTASK - 1
      document.getElementById("next-btn-area").classList.add("is-hidden");
      TextTask(COURSEMEDIA.NATIVESENTENCES[TASKSENTENCES[CURRENTTASK]], COURSEMEDIA.TARGETSENTENCES[TASKSENTENCES[CURRENTTASK]], COURSENUM, RandomRange(0, 1));
    }
  });
  next.addEventListener("mousedown", function(){
    next.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
  });
  next.addEventListener("mouseup", function(){
    next.style.filter = filterGen.hexToStyle("#48C774").filter;
  });
  next.addEventListener("mouseover", function(){
    next.style.filter = filterGen.hexToStyle("#48C774").filter;
  });
  next.addEventListener("mouseout", function(){
    next.style.filter = filterGen.hexToStyle("#B5B5B5").filter;
  });

  // Initial Task
  TextTask(COURSEMEDIA.NATIVESENTENCES[TASKSENTENCES[CURRENTTASK]], COURSEMEDIA.TARGETSENTENCES[TASKSENTENCES[CURRENTTASK]], COURSENUM, RandomRange(0, 1));
}

function TextTask(NATIVESENTENCE, TARGETSENTENCE, COURSENUM, BACKWARDS) {
  // Variables
  let translateTo;

  // Backwards = Native to Target
  if (BACKWARDS) {
    translateTo = courseData[COURSENUM].SETTINGS.LANG.TARGETNAME;
  } else {
    translateTo = courseData[COURSENUM].SETTINGS.LANG.NATIVENAME;
  }
  
  document.getElementById("taskbox").innerHTML = `
    <h1 class="subtitle has-text-dark has-text-weight-bold is-small m-0" id="prompt">- <span class="is-underlined">Translate to ${translateTo}</span> -</h1>
    <div class="label" id="prompt-material"></div>
    <textarea class="textarea has-fixed-size" id="text-input" placeholder="Type your answer here."></textarea> <br />
    <button class="button is-success is-rounded is-outlined" id="confirm">
      <span>Confirm</span>
      <span class="icon">
        <img src="../Icons/svg/check.svg" id="check-mark" />
      </span>
    </button>
    <div class="is-hidden" id="result-box">
      <article class="message mb-0 mx-0 mt-4 px-0 pt-0 is-small">
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
      </article>
    </div>
  `

  // Elements
  let answerBox = document.getElementById("text-input");
  let promptMaterial = document.getElementById("prompt-material");
  let answer = document.getElementById("answer");
  let confirm = document.getElementById("confirm");
  let checkMark = document.getElementById("check-mark");
  let correctOverride = document.getElementById("correct-override");
  let incorrectOverride = document.getElementById("incorrect-override");

  // Swap Goal
  if (BACKWARDS) {
	CreateGoal(NATIVESENTENCE, TARGETSENTENCE, COURSENUM);
  } else {
    CreateGoal(TARGETSENTENCE, NATIVESENTENCE, COURSENUM);
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
  correctOverride.addEventListener("click", function(){SubmitAnswer("", "", "correct", COURSENUM, BACKWARDS)});
  incorrectOverride.addEventListener("click", function(){SubmitAnswer("", "", "incorrect", COURSENUM, BACKWARDS)});
}

function CreateGoal(PROMPT, ANSWER, COURSENUM, BACKWARDS) {
	let answerBox = document.getElementById("text-input");
	let promptMaterial = document.getElementById("prompt-material");
	let answer = document.getElementById("answer");
	let confirm = document.getElementById("confirm");
	promptMaterial.innerText = PROMPT;
    answer.innerText = ANSWER;
    confirm.addEventListener("click", function(){SubmitAnswer(answerBox.value, ANSWER, "", COURSENUM, BACKWARDS)});
    document.addEventListener("keypress", function(e){
      if (answerBox === document.activeElement && e.key === "Enter") {
        SubmitAnswer(answerBox.value, ANSWER, "", COURSENUM, BACKWARDS);
      }
    });
}

function CompareAnswer(ANSWER, CORRECTANSWER, COURSENUM, BACKWARDS) {
	let normalisedAnswer = ANSWER;
	let normalisedCorrectAnswer = CORRECTANSWER;
	// Get the substitution lists from the course JSON
	let substituteSets;
	if (BACKWARDS) {
		substituteSets = courseData[COURSENUM].SETTINGS.SUBSTITUTIONS.TARGET;
	} else {
		substituteSets = courseData[COURSENUM].SETTINGS.SUBSTITUTIONS.NATIVE;
	}
	let regexp = new RegExp();
	for (var setID = 0; setID < substituteSets.length; setID++) {
		let set = substituteSets[setID];
		for (var substituteID = 1; substituteID < set.length; substituteID++) {
			// Match only individual words/phrases to avoid false catches
			regexp.compile("\\b" + set[substituteID] + "\\b", "gi");
			normalisedAnswer = normalisedAnswer.replaceAll(regexp, set[0]);
			normalisedCorrectAnswer = normalisedCorrectAnswer.replaceAll(regexp, set[0]);
		}
	}
	// Strip and clean string to avoid false negatives (double spaces, capitalisation)
	normalisedAnswer = StripString(normalisedAnswer);
	normalisedCorrectAnswer = StripString(normalisedCorrectAnswer);
	return normalisedAnswer === normalisedCorrectAnswer;
}

function SubmitAnswer(ANSWER, CORRECTANSWER, OVERRIDE, COURSENUM, BACKWARDS) {
  document.getElementById("answer").classList.remove("is-hidden");

  // Variables
  var RESULT;
  let resultDisplay;
  let resultColor;

  // Elements
  let textInput = document.getElementById("text-input");
  let confirm = document.getElementById("confirm");
  let result = document.getElementById("result");
  let resultHeader = document.getElementById("result-header");
  let resultBox = document.getElementById("result-box");
  let next = document.getElementById("next-btn-area");

  // Decide Answer
  if (OVERRIDE === null || OVERRIDE === "") {
    if (CompareAnswer(ANSWER, CORRECTANSWER, COURSENUM, BACKWARDS)) {
      RESULT = "correct";
    } else {
      RESULT = "incorrect";
    }
  } else {
    // Override Results
    RESULT = OVERRIDE

    // Revert Old Result
    if (OVERRIDE = "correct") {
      // Remove Old Colors
      resultHeader.classList.remove("has-background-danger");
      textInput.classList.remove("is-danger");
    } else if (OVERRIDE = "incorrect") {
      // Remove Old Colors
      resultHeader.classList.remove("has-background-success");
      textInput.classList.remove("is-success");
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

  // Change Result Text
  result.innerText = resultDisplay
  
  // Change Highlight Colors
  resultHeader.classList.add(`has-background-${resultColor}`);
  textInput.classList.add(`is-${resultColor}`);

  // Unhide Elements
  next.classList.remove("is-hidden");
  resultBox.classList.remove("is-hidden");

  // Disable Answer Input
  textInput.disabled = true;
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
              <button class="button is-small mt-3" disabled>
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
            <div class="box mb-4" id="course">
            </div>
            <span class="icon is-medium mt-0 mb-1">
              <img src="../Icons/svg/arrow-left-thick.svg" id="back-icon" />
            </span>
          </div>
        </div>
      </div>
    </section>
  `;

  // Elements
  let back = document.getElementById("back-icon");

  // Event Listeners
  back.addEventListener("click", function(){
    CourseSelectionPage(0);
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

  LoadCourse(COURSENUM);
}

function TaskPage(COURSENUM, LESSONNUMBER) {
  docBody.innerHTML = `
    <section class="hero is-dark is-fullheight is-clipped">
      <div class="hero-body columns m-0 p-0">
        <div class="column is-full">
          <div class="columns is-centered m-6 p-6">
            <div class="column has-text-centered is-two-fifths is-narrow is-vcentered">
              <div class="box has-background-light px-5 pt-5 pb-4 m-0">
                <div id="taskbox"></div>
                <div class="is-hidden" id="next-btn-area"></div>
              </div>
            </div>
          </div>
          <div class="columns is-centered">
            <div class="column is-align-content-center m-0 p-0">
              <div class="buttons is-right">
                <span class="icon is-medium mr-3 ml-0 mt-2 mb-0 p-0">
                  <img src="../Icons/svg/arrow-left-thick.svg" id="back-icon" />
                </span>
              </div>
            </div>
            <div class="column is-four-fifths m-0 p-0">
              <progress class="progress is-success mx-0 my-4 p-0" value="0" max="100" id="progress-bar"></progress>
            </div>
            <div class="column m-0 p-0"></div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Elements
  let back = document.getElementById("back-icon");

  // Filter Initialization
  back.style.filter = filterGen.hexToStyle("#F5F5F5").filter

  // Event Listeners
  back.addEventListener("click", function(){
    CoursePage(COURSENUM);
  });
  back.addEventListener("mousedown", function(){
    back.style.filter = filterGen.hexToStyle("#FFFFFF").filter;
  });
  back.addEventListener("mouseup", function(){
    back.style.filter = filterGen.hexToStyle("#48C774").filter;
  });
  back.addEventListener("mouseover", function(){
    back.style.filter = filterGen.hexToStyle("#48C774").filter;
  });
  back.addEventListener("mouseout", function(){
    back.style.filter = filterGen.hexToStyle("#F5F5F5").filter;
  });

  StartLesson(COURSENUM, LESSONNUMBER);
}
