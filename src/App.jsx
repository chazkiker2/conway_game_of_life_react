// dependencies
import { Switch, Route } from "react-router-dom";

// pages
import { Wrapper } from "./features/common";
import { WelcomePage } from "./features/welcome-page";
import { LifeGamePage } from "./features/life-game";
import { NotFound } from "./features/not-found";


const App = () => {
  return (
    <div className="App">
      <Switch>

        <Route path="/game">
          <Wrapper>
            <LifeGamePage />
          </Wrapper>
        </Route>

        <Route exact path="/">
          <Wrapper>
            <WelcomePage />
          </Wrapper>
        </Route>

        <Route path="*">
          <Wrapper>
            <NotFound />
          </Wrapper>
        </Route>

      </Switch>
    </div>
  );
}


export default App;
