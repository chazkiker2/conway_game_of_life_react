import Styled from "./welcome-page.styles";


const WelcomePage = props => {
  return (
    <>
      <Styled.Container>
        <h2>Conway's <em className="theme">Game of Life</em></h2>
        <div>
          <p>
            The <em>Game of Life</em> is not your typical game... partially
            because of the fact that you don't play it. Nobody does!
          </p>
          <br />
          <p>
            A longer explanation or whatever will live here eventually.
          </p>
        </div>
      </Styled.Container>
    </>
  );
}


export default WelcomePage;
