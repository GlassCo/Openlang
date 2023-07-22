import eel
import os
import json
import re

eel.init("src")

@eel.expose
def RefreshCourses():
    coursedir = sorted(os.listdir("Courses"))
    courseArray = []
    courseCache = open("src/Cache/courses.json", "w+")
    courseArray.append(coursedir)
    for i in coursedir:
        js = open("Courses/"+i+"/course.json", "r")
        courseArray.append(json.load(js))
    courseCache.write(json.dumps(courseArray))
    courseCache.close()

def RefreshLanguages():
    langdir = sorted(os.listdir("src/Lang"))
    langsArray = []
    langCache = open("src/Cache/langs.json", "w+")
    for i in langdir:
        js = open("src/Lang/"+i, "r")
        langsArray.append(json.load(js))
    langCache.write(json.dumps(langsArray))
    langCache.close()

def App():
    RefreshCourses()
    RefreshLanguages()
    print("Application Running...")

App()

eel.start("HTML/main.html", size=(500, 600))
