import * as test from ("./test")

//  Elements
//var lessons = document.getElementById("lessons");

//  Event Listeners
//document.addEventListener("DOMContentLoaded", loadCourses);

//  Functions
function loadCourses() {
    //lessons.innerHTML = fs.readFile(__filename)
    /*
    var path = "./";
 
    fs.readdir(path, function(err, items) {
        for (var i=0; i<items.length; i++) {
            lessons.innerHTML += items[i];
        }
    });
    */
}

test.fs.readdir(__dirname, (err, files) => {
    if (err)
      console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach(file => {
        console.log(file);
      })
    }
  })