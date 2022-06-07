import eel
import os
import json

eel.init("src")

@eel.expose
def RefreshCourses():
    courseCatalog = open("src/Cache/courses.json", "w+")
    courses = sorted(os.listdir("Courses"))
    courseCatalog.write(json.dumps(courses))

def App():
    RefreshCourses()
    print("Application Running...")

App()

eel.start("HTML/index.html", size=(500, 600))
