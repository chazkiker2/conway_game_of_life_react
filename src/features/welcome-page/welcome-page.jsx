import { Link } from "../common";


const WelcomePage = props => {
  return (
    <div>
      <h2>Welcome Page</h2>
      <Link to="/game">Play the Game!</Link>
    </div>
  );
}


export default WelcomePage;