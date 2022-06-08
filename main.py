import eel
import os
import json
import re

eel.init("src")

@eel.expose
def RefreshCourses():
    courseCatalog = open("src/Cache/courselist.json", "w+")
    courses = sorted(os.listdir("Courses"))
    courseCatalog.write(json.dumps(courses))
    courseCatalog.close()
    
    courseArray = []
    for i in courses:
        js = open("Courses/"+i+"/course.json", "r")
        courseArray.append(json.load(js))
    courseCache = open("src/Cache/courses.json", "w+")
    courseCache.write(json.dumps(courseArray))
    courseCache.close()

def App():
    RefreshCourses()
    print("Application Running...")

App()

eel.start("HTML/index.html", size=(500, 600))
