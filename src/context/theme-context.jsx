import React from "react";
import PropTypes from "prop-types";

// style
import styled, { ThemeProvider, css } from "styled-components";
import theme from "styled-theming";
import { rootVars } from "../styles/theme";

const wrapTheme = theme("mode", {
  dark: css`
		background-color: var(--pBase);
		color: var(--pText);
	`,
  light: css`
		background-color: var(--pBase);
		color: var(--pText);
	`,
});

const ThemeWrapper = styled.div`
  ${rootVars};
  ${wrapTheme};
  max-width: 100vw;
	min-height: 100vh;
  h2 {
    font-size: 2rem;
  }
`;

const ThemeContextProvider = props => {
  return (
    // hard-coding mode for the moment.
    // eventually, I may add in a light-mode toggle
    <ThemeProvider theme={{ mode: "dark" }}>
      <ThemeWrapper>
        {props.children}
      </ThemeWrapper>
    </ThemeProvider>
  )
};

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}

export default ThemeContextProvider;