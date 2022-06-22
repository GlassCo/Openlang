
// Outdated JS File for Courses- Kept for Documentation

class API {
    constructor(TRANSLATOR, TTS, STT) {
        this.TRANSLATOR = TRANSLATOR    // Preferred Translator API
        this.TTS = TTS                  // Preferred Text-to-Speech API
        this.STT = STT                  // Preferred Speech-to-Text API
    }
}

class lang {
    constructor(NATIVE, TARGET, NATIVENAME, TARGETNAME) {
        this.NATIVE = NATIVE    // Two-letter Abbreviation for the Native Language
        this.TARGET = TARGET    // Two-letter Abbreviation for the Target Language
        this.NATIVENAME = NATIVENAME    // Two-letter Abbreviation for the Native Language
        this.TARGETNAME = TARGETNAME    // Two-letter Abbreviation for the Target Language
    }
}

class settings {
    constructor(API, LANG) {
        this.API = API      // API Class containing API Selections
        this.LANG = LANG    // Language Class containing Native and Target Languages
    }
}

class image {
    constructor(PATH, NATIVETEXT, TARGETTEXT) {
        this.PATH = PATH                // Path to image file
        this.NATIVETEXT = NATIVETEXT    // Description of image in Native Language
        this.TARGETTEXT = TARGETTEXT    // Description of image in Target Language
    }
}

class mediasettings {
    constructor(TEXTTASK, AUDIOTASK, AUDIOTYPE) {
        this.TEXTTASK = TEXTTASK        // Text Task Status
        this.AUDIOTASK = AUDIOTASK      // Audio Task Status
        this.AUDIOTYPE = AUDIOTYPE      // String of Audio Type (custom/tts/none)
    }
}

class media {
    constructor(MEDIASETTINGS, NATIVESENTENCES, NATIVEAUDIO, TARGETSENTENCES, TARGETAUDIO, IMAGES) {
        this.MEDIASETTINGS = MEDIASETTINGS
        this.NATIVESENTENCES = NATIVESENTENCES  // List of Native Sentences
        this.NATIVEAUDIO = NATIVEAUDIO          // List of Audio File Paths
        this.TARGETSENTENCES = TARGETSENTENCES  // List of Target Sentences
        this.TARGETAUDIO = TARGETAUDIO          // List of Audio File Paths
        this.IMAGES = IMAGES                    // List of Image Classes
    }
}

class lesson {
    constructor(TITLE, ICON, CHECKPOINT, LEVEL, MEDIA) {
        this.TITLE = TITLE              // Lesson Title
        this.ICON = ICON                // Icon Name (Default is Material Design Icons)
        this.CHECKPOINT = CHECKPOINT    // Checkpoint of Lesson (STARTS AT 0)
        this.LEVEL = LEVEL              // Level Within Checkpoint (STARTS AT 0)
        this.MEDIA = MEDIA              // Media Class containing Sentences, Audio, and Images
    }
}

class course {
    constructor(TITLE, SETTINGS, LESSONS) {
        this.TITLE = TITLE          // Course Title
        this.SETTINGS = SETTINGS    // Settings
        this.LESSONS = LESSONS      // Lessons
    }
}

export { API, lang, settings, image, mediasettings, media, lesson, course }
