import Courses

    # Course Details
COURSE = Courses.course(
    TITLE= "Basic Deutsch",
    SETTINGS= SETTINGS,
    LESSONS= LESSONS)

    # Course Settings
SETTINGS = Courses.settings(
    API= Courses.API(
        TRANSLATOR= "libre",    # Preferred Translator API
        TTS= "mozilla",         # Preferred Text-to-Speech API
        STT= "mozilla"          # Preferred Speech-to-Text API
        ),

    LANG= Courses.lang(
        NATIVE= "en",   # Two-letter Abbreviation for the Native Language
        TARGET= "de"    # Two-letter Abbreviation for the Target Language
        ))

    # Course Lessons
LESSONS = [
    Courses.lesson(
        TITLE= "Basics 1", 
        ICON = "check", 
        CHECKPOINT= 0, 
        LEVEL= 0, 
        MEDIA= Courses.media(
                # -NOTE- : All media but images are grouped together based on when they come in the list.
                # The first native sentence and audio must always be the translation of the first target sentence and audio, and so on.
            NATIVESENTENCES= [      # List of Native Sentences
                "Hello! I'm Melanie!"
                "What was there?"
            ],
            NATIVEAUDIO= [          # List of Native Audio File Paths
                # Enter Paths Here
            ],
            TARGETSENTENCES= [      # List of Target Sentences
                "Hallo! Ich bin Melanie!"
                "Was war da?"
            ],
            TARGETAUDIO= [          # List of Audio File Paths
                # Enter Paths Here
            ],
            IMAGES= [               # List of Image Classes
                # Enter Images Here
                """
                Courses.image(
                    PATH= "./images/apple.png", 
                    NATIVETEXT= "Apple",
                    TARGETTEXT= "Apfel"
                )
                """
            ]))
]
