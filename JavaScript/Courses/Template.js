
var translator = {
    // Translator API to use
    //API: "mozilla",
    //TTS: "google",
    //STT: "mozilla",

    // Languages
    target: "DE",
    native: "EN"
}

// Sentence Pool
var targetSentences = [
        // Ordered By Target Word
    // "Hallo"
    "Hallo! Ich bin Melanie!",
    "Und dann ich sag hallo."
]

// Sentence Pool
var nativeSentences = [
        // Ordered By Target Word
    // "Hallo"
    "Hello! I am Melanie!",
    "And then I say hello."
]

module.exports = {translator, targetSentences, nativeSentences};