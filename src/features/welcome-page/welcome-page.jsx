import { Link, Heading } from "../common";


const WelcomePage = props => {
  return (
    <>
      <Heading h2>Welcome Page</Heading>
      <Link to="/game">Play the Game!</Link>
    </>
  );
}


export default WelcomePage;