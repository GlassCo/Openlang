import React from "react";
import { Switch, Route } from "react-router";
import ROUTES from "Constants/routes";
import loadable from "@loadable/component";

// Load bundles asynchronously so that the initial render happens faster
const Home = loadable(() =>
  import(/* webpackChunkName: "HomeChunk" */ "Pages/home/home")
);
const Texttranslate = loadable(() =>
  import(/* webpackChunkName: "TexttranslateChunk" */ "Pages/texttranslate/texttranslate")
);
const Audiotranslate = loadable(() =>
  import(/* webpackChunkName: "AudiotranslateChunk" */ "Pages/audiotranslate/audiotranslate")
);
const About = loadable(() =>
  import(/* webpackChunkName: "AboutChunk" */ "Pages/about/about")
);
const Motd = loadable(() =>
  import(/* webpackChunkName: "MotdChunk" */ "Pages/motd/motd")
);
const Localization = loadable(() =>
  import(
    /* webpackChunkName: "LocalizationChunk" */ "Pages/localization/localization"
  )
);
const UndoRedo = loadable(() =>
  import(/* webpackChunkName: "UndoRedoChunk" */ "Pages/undoredo/undoredo")
);
const ContextMenu = loadable(() =>
  import(/* webpackChunkName: "ContextMenuChunk" */ "Pages/contextmenu/contextmenu")
);

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path={ROUTES.HOME} component={Home}></Route>
        <Route path={ROUTES.TEXTTRANSLATE} component={Texttranslate}></Route>
        <Route path={ROUTES.AUDIOTRANSLATE} component={Audiotranslate}></Route>

        <Route path={ROUTES.ABOUT} component={About}></Route>
        <Route path={ROUTES.MOTD} component={Motd}></Route>
        <Route path={ROUTES.LOCALIZATION} component={Localization}></Route>
        <Route path={ROUTES.UNDOREDO} component={UndoRedo}></Route>
        <Route path={ROUTES.CONTEXTMENU} component={ContextMenu}></Route>
      </Switch>
    );
  }
}

export default Routes;
