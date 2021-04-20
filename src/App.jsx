import { Switch, Route } from "react-router-dom";
import { LifeGamePage, WelcomePage, NotFound } from "./features/pages";
import { main } from "./features/life"


function App() {
  const runGame = () => {
    main()
  };

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

      App
      <button onClick={runGame}>Run Game</button>
    </div>
  );
}


export default App;
