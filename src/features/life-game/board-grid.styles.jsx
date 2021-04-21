import styled from "styled-components";

const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const Board = styled.div`
  width: 100vw;
  display: flex;
  flex-flow: column nowrap;
  align-items: center; justify-content: center;
`;

const Grid = styled.div.attrs(pr => ({
  grid_px: `calc(90vw / ${pr.num_col})`
}))`
  display: grid;
  grid-template-columns: ${pr => `repeat(${pr.num_col}, ${pr.grid_px})`};
  div {
    border: 1px solid black;
    width: ${pr => pr.grid_px};
    height: ${pr => pr.grid_px};
  }
`;

const Cell = styled.div`
  background-color: ${pr => pr.active ? "white" : "transparent"};
  cursor: pointer;
`;


const Styled = {
  Page,
  Board,
  Grid,
  Cell,
};


export default Styled;
