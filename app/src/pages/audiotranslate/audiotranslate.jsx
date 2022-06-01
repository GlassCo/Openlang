import React from "react";

class Audiotranslate extends React.Component {
  render() {
    return (
      <section className="mainsection">
        <div className="centercontainer">
          <h1 class="title">- <span class="underlined">Text Translation</span> -</h1>
          <p class="prompt">Translate the following:</p>
          <p class="input"><span id="input"></span></p>
          <textarea class="answer" id="answer" oninput="confirm()"></textarea> <br />
          <button class="confirm" id="confirm" onclick="confirm()">Confirm</button>
          <div hidden class="result" id="resultbox"> <br />
            <span class="underlined">Result:</span> <span id="result">Correct!</span> <br /><br />
            <span class="underlined">Answer:</span><span id="answer"></span> <br /><br />
            <span class="correction">[ Override as correct. | Override as incorrect. ]</span>
          </div>
        </div>
      </section>
    );
  }
}

export default Audiotranslate;
