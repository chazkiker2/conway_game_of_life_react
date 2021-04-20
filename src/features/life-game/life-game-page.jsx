import { main } from "../life";

const LifeGamePage = props => {
  const runGame = () => main();

  return (
    <div>
      <h2>Life Game Page</h2>
      <button onClick={runGame}>Run Game</button>
    </div>
  );
}

export default LifeGamePage;