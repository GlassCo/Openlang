import * as Courses from "../Courses.mjs"

const TITLE = ""  // Course Title

    // Course Settings
const SETTINGS = new Courses.settings(
    new Courses.API(
        "",     // Preferred Translator API
        "",     // Preferred Text-to-Speech API
        ""      // Preferred Speech-to-Text API
    ),

    new Courses.lang(
        "aa",   // Two-letter Abbreviation for the Native Language
        "bb"    // Two-letter Abbreviation for the Target Language
    )
)

    // Course Lessons
const LESSONS = [
        // -Lesson 0-
    new Courses.lesson(
        "",                 // Title
        "",                 // Icon Name 
        0,                  // Checkpoint Level (DEFAULT=0) 
        0,                  // Level within Checkpoint (DEFAULT=0)
        new Courses.media(  // Media Object used in Lesson

        // -NOTE- : All media but images are grouped together based on when they come in the list.
        // The first native sentence and audio must always be the translation of the first target sentence and audio, and so on.
        
            /* List of Native Sentences */ [
    
                // Enter Sentences Here
    
            ],
    
            /* List of Native Audio File Paths */ [
    
                // Enter Paths Here
    
            ],
    
            /* List of Target Sentences */ [
    
                // Enter Sentences Here
    
            ],
    
            /* List of Audio File Paths */ [
    
                // Enter Paths Here
    
            ],
    
            /*List of Image Classes*/ [
    
                new Courses.image(
                    "", // Path to Image
                    "", // Native Description
                    ""  // Target Description
                )
            ]
        ) 
    )
]

    // Course Details
const COURSE = new Courses.course(
    TITLE,      // Course Title
    SETTINGS,   // Course Settings
    LESSONS     // Course Lessons
)

console.log(COURSE.TITLE)

export { COURSE }