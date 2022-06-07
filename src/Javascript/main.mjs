import coursesData from "../Cache/courses.json" assert {type: "json"};

// Variables

//  Elements
var docTitle = document.getElementById("doc-title");
var docBody = document.getElementById("doc-body");

//  Event Listeners
document.addEventListener("DOMContentLoaded", CourseSelectionPage);
document.addEventListener("DOMContentLoaded", function(){LoadCourses(0)});


//  Functions
function LoadCourses(PAGE) {

  // Clear Previous LOad
  document.getElementById("courses").innerHTML = ""
  
  // Load Courses
  for (let i = 0; i < 10; i++) {  // For Each Course
    if (coursesData[i+(PAGE*10)] != null) {
      let courses = document.getElementById("courses");
      courses.innerHTML += `
      <div class="buttons is-centered m-0">
        <button class="button is-success is-fullwidth m-1" id="course${i}">${coursesData[i+(PAGE*10)]}</button>
      </div>
      `
    }
  }

  // Visual Changes for No Pages
  if (coursesData.length < 10) {
    document.getElementById("page-selection").innerHTML = ""
  }

  // Disable Prev/Next
  if (PAGE === (Math.ceil((coursesData.length / 10) - 1))) {
    document.getElementById("next-page").disabled = true
  } else {
    document.getElementById("next-page").disabled = false
  }
  if (PAGE === 0) {
    document.getElementById("prev-page").disabled = true
  } else {
    document.getElementById("prev-page").disabled = false
  }

  // Change Page Number
  document.getElementById("page-number").innerHTML = PAGE+1
}

function NextPage() {
  let NEXTPAGE = document.getElementById("page-number").innerText;
  LoadCourses(parseInt(NEXTPAGE))
}

function PreviousPage() {
  let PREVPAGE = document.getElementById("page-number").innerText;
  LoadCourses(PREVPAGE-2)
}

// Pages
function CourseSelectionPage() {
  docTitle.innerText = "Openlang - Courses";
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
}

function CoursePage() {
  docTitle = "Openlang -" + SELECTEDCOURSE;
  docBody.innerHTML = `
  <section class="hero is-dark is-fullheight is-clipped">
    <div class="hero-body columns is-centered">
      <div class="column has-text-centered is-narrow is-vcentered">
        <div class="box has-background-light px-6 pt-6 pb-3">
          <h1 class="title has-text-dark">- <span class="is-underlined"></span> -</h1>
        </div>
      </div>
    </div>
  </section>
  `;
}

function TaskPage() {
  docTitle = "Openlang - Task"
}
