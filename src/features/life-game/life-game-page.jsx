import { main } from "../life";
import { Button, Heading } from "../common";


const LifeGamePage = props => {

  const runGame = () => main();

  return (
    <>
      <Heading h2>Life Game Page</Heading>
      <Button onClick={runGame}>Run Game</Button>
    </>
  );
}


export default LifeGamePage;
