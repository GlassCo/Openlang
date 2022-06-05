import eel
import os
import Courses

eel.init("src")

@eel.expose
def getCourses():
    LIST = os.listdir("Courses/")
    LIST.remove("Courses.py")
    return LIST

@eel.expose
def App():
    print("Application Running...")

print(getCourses())
App()

eel.start("HTML/index.html", size=(500, 600))
