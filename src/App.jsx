import { main } from "./features/life"


function App() {
  const runGame = () => {
    main()
  };

  return (
    <div className="App">
      App
      <button onClick={runGame}>Run Game</button>
    </div>
  );
}


export default App;
