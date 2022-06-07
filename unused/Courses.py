
class API():
    def __init__(self, TRANSLATOR, TTS, STT):
        self.TRANSLATOR = TRANSLATOR    # Preferred Translator API
        self.TTS = TTS                  # Preferred Text-to-Speech API
        self.STT = STT                  # Preferred Speech-to-Text API

class lang():
    def __init__(self, NATIVE, TARGET):
        self.NATIVE = NATIVE    # Two-letter Abbreviation for the Native Language
        self.TARGET = TARGET    # Two-letter Abbreviation for the Target Language

class settings():
    def __init__(self, API, LANG):
        self.API = API      # API Class containing API Selections
        self.LANG = LANG    # Language Class containing Native and Target Languages

class image():
    def __init__(self, PATH, NATIVETEXT, TARGETTEXT):
        self.PATH = PATH                # Path to image file
        self.NATIVETEXT = NATIVETEXT    # Description of image in Native Language
        self.TARGETTEXT = TARGETTEXT    # Description of image in Target Language

class media():
    def __init__(self, NATIVESENTENCES, NATIVEAUDIO, TARGETSENTENCES, TARGETAUDIO, IMAGES):
        self.NATIVESENTENCES = NATIVESENTENCES  # List of Native Sentences
        self.NATIVEAUDIO = NATIVEAUDIO          # List of Audio File Paths
        self.TARGETSENTENCES = TARGETSENTENCES  # List of Target Sentences
        self.TARGETAUDIO = TARGETAUDIO          # List of Audio File Paths
        self.IMAGES = IMAGES                    # List of Image Classes

class lesson():
    def __init__(self, TITLE, ICON, CHECKPOINT, LEVEL, MEDIA):
        self.TITLE = TITLE              # Lesson Title
        self.ICON = ICON                # Icon Name (Default is Material Design Icons)
        self.CHECKPOINT = CHECKPOINT    # Checkpoint of Lesson (STARTS AT 0)
        self.LEVEL = LEVEL              # Level Within Checkpoint (STARTS AT 0)
        self.MEDIA = MEDIA              # Media Class containing Sentences, Audio, and Images

class course():
    def __init__(self, TITLE, SETTINGS, LESSONS):
        self.TITLE = TITLE          # Course Title
        self.SETTINGS = SETTINGS    # Settings
        self.LESSONS = LESSONS      # Lessons