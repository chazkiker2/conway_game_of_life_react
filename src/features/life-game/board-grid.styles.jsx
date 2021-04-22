import styled from "styled-components";

const Styled = {};

Styled.Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

Styled.Board = styled.div`
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;

Styled.Grid = styled.div.attrs(pr => ({
  px_w: `calc(90vmin / ${pr.num_col})`,
}))`
  display: grid;
  grid-auto-flow: row column;
  grid-template-columns: ${pr => `repeat(${pr.num_col}, ${pr.px_w})`};
  div {
    border: 1px solid black;
    width: ${pr => pr.px_w};
    height: ${pr => pr.px_w};
  }
`;

Styled.Cell = styled.div`
  background-color: ${pr => pr.active ? "white" : "transparent"};
  cursor: pointer;
`;

Styled.Toolbar = styled.div`
  /* height: 10vh; */
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    display: flex;
    flex-flow: row nowrap;
    height: 100%;
    align-items: center;
    justify-content: space-evenly;
    width: 50%;
    &.toolbar--two {
      flex-flow: column nowrap;
      justify-content: space-between;
      div {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
      }
      label {
        font-size: 1.6rem;
        font-weight: bold;
        line-height: 1;
        margin: 0.5rem;
      }
      select, input {
        display: block;
        background-color: var(--white);
        color: var(--pDark);
        border: none;
      }
    }
    button {
      width: none;
      height: none;
      margin: 1rem 0;
      border-radius: none;

    }
    select {
      display: block;
      height: inherit;
      background-color: var(--pLightest);
      color: var(--pDark);
      border: none;
    }
    input {
    }
  }
`;


export default Styled;
