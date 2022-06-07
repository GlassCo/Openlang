import eel
import os

# from Courses.Courses import *

@eel.expose
def getCourses():
    LIST = os.listdir("Courses/")
    LIST.remove("Courses.py")
    return LIST