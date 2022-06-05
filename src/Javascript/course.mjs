import * as filterGen from "./filtergenerator.mjs"
import { getCourses } from "../../Courses/Courses.py"

//  Elements
var lessons = document.getElementById("lessons");

//  Event Listeners
document.addEventListener("DOMContentLoaded", LoadCourse);

//  Functions
function LoadCourse() {
    lessons.innerHTML = "test"
    lessons.innerHTML = `${getCourses()}`
}