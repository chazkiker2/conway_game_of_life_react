import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { Heading } from ".";


const Header = () => (
  <>
    <StyledHeader>
      <div>
        <RouterLink to="/">
          <Heading h2 noMargin>Game of Life</Heading>
        </RouterLink>
      </div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/game">Game</RouterLink>
      </nav>
    </StyledHeader>
  </>
)


const StyledHeader = styled.header`
  width: 100vw;
  background-color: var(--pDark);
  color: var(--pText);
  padding: 1rem 2rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  div, nav {
    display: flex;
    flex-flow: row nowrap;
    align-items: space-evenly;
    align-items: space-between;
  }
  nav {
    width: 14rem;
    a {
      margin: 1rem;
      font-size: 2rem;
      color: var(--pText);
      display: inline-block;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: var(--tBase);
      }
    }
  }
`;


export default Header;
