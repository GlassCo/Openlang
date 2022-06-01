import React from "react";
import { confirm } from "../../components/task/task"; // Import Functions
//import "./texttranslate.css";

class Texttranslate extends React.Component {
  constructor(props) {
    super(props);

    // -
    this.confirm = this.confirm.bind(this);
  }

  confirm(event) {
    this.props.confirm();
  }
  
  render() {
    return (
      <section className="hero is-white is-fullheight-with-navbar">
        <div className="hero-body columns is-centered">
          <div className="column has-text-centered is-narrow is-vcentered">
            <div className="box px-6 pt-6">
              <p className="title">- <span className="is-underlined">Text Translation</span> -</p>
              <p className="prompt">Translate the following:</p>
              <p className="label" id="input"></p>
              <textarea className="textarea has-fixed-size" placeholder="Type your answer here."></textarea> <br />
              <button className="button is-rounded is-success" onClick={this.confirm}>
                <span>Confirm</span>
                <span className="icon has-text-white">
                  <i className="mdi mdi-check-bold"></i>
                </span>
              </button>
              <div className="box is-hidden" id="result-box"> <br />
                <span class="underlined">Result:</span> <span id="result">Correct!</span> <br /><br />
                <span class="underlined">Answer:</span><span id="answer"></span> <br /><br />
                <span class="correction">[ Override as correct. | Override as incorrect. ]</span>
              </div>
            </div>
          </div>

        </div>
      </section>
    );
  }
}

export default Texttranslate;
