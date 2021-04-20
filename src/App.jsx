// dependencies
import { Switch, Route } from "react-router-dom";

// pages
import { WelcomePage } from "./features/welcome-page";
import { LifeGamePage } from "./features/life-game";
import { NotFound } from "./features/not-found";


const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route path="/game">
          <LifeGamePage />
        </Route>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}


export default App;
