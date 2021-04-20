import { main } from "../life";
import { Button } from "../common";


const LifeGamePage = props => {
  
  const runGame = () => main();

  return (
    <div>
      <h2>Life Game Page</h2>
      <Button onClick={runGame}>Run Game</Button>
    </div>
  );
}


export default LifeGamePage;