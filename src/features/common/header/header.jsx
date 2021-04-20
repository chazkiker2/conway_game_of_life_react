import React from "react";
import styled from "styled-components";

import MenuBurger from "./menu-burger";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Link } from "../";


const Header = props => {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const toggleNav = () => setNavOpen(!isNavOpen);
  return (
    <>
      <StyledHeader>
        <div className="container">
          <div>
            <RouterLink to="/">
              <Heading h1 noMargin>Game of Life</Heading>
            </RouterLink>
          </div>
          <div>
            <MenuBurger onClick={toggleNav} />
          </div>
        </div>
      </StyledHeader>

      <NavContainer show={isNavOpen}>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
        </nav>
      </NavContainer>
    </>
  );
}


const StyledHeader = styled.header`
	width: 100vw;
	background-color: var(--pDark);
	color: var(--pText);
	padding: 0 2rem;
	div.container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
	}
	div {
		display: flex;
		flex-flow: row nowrap;
		align-items: center;
	}
	font-family: 'Alegreya', serif;
`;



const NavContainer = styled.nav`
	display: ${pr => pr.show ? "flex" : "none"};
	width: 100vw;
	background-color: var(--pDarker);
	flex-flow: row nowrap;
	justify-content: center;
	nav {
		display: flex;
		width: 100%;
		flex-flow: row nowrap;
		justify-content: center;
	}
`;


export default Header;