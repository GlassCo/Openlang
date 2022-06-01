import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
//import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <section className="hero is-white is-fullheight-with-navbar">
          <div className="hero-body columns is-centered">
            <div className="column has-text-centered is-narrow is-vcentered">
              <div className="box p-6">
              <h1 className="title is-1">- <span className="is-underlined">Home</span> -</h1>
                <div className="is-link">
                  <Link to={ROUTES.TEXTTRANSLATE}>Text Translation Task Test</Link> <br />
                  <Link to={ROUTES.AUDIOTRANSLATE}>Audio Translation Task Test</Link> <br />
                  <Link to={ROUTES.COURSETEST}>Course Test</Link> <br />
                  <Link to={ROUTES.COURSESELECTION}>Course Selection</Link> <br />
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

export default Home;
