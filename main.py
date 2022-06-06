import eel
import src.Python.course

eel.init("src")

@eel.expose
def App():
    print("Application Running...")

App()

eel.start("HTML/index.html", size=(500, 600))
