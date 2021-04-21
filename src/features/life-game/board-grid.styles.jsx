import styled, { css } from "styled-components";

const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
`;

const BoardContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: space-evenly;
`;

const Container = styled.div`
  width: 96vw;
	max-width: 900px;
	max-height: 900px;
	justify-content: center;
	display: grid;
  grid-template-columns: ${props => `repeat(${props.num_col}, minmax(${props.num_col}%, 1fr))`};
  grid-template-rows: ${props => `repeat(${props.num_rows}, minmax(${props.num_rows}%, 1fr))`};
  /* grid-auto-rows; */
  grid-auto-rows: 1fr;
	&::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
	}
	& > *:first-child {
    grid-row: 1 / 1;
		grid-column: 1 / 1;
	}
	justify-items: center;
	align-items: center;
	gap: 0;
`;

const Cell = styled.div`
  display: flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	/* background-color: ${props => props.cell}; */
	/* border: 1px solid white; */
  border: 1px solid ${props => props.cell !== 0 ? "var(--pDarkest)" : "white"};
	height: 100%; 
	width: 100%;
  position: relative;
`;

const CellContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	border: 1px solid ${props => props.cell !== 0 ? "var(--pDarkest)" : "white"};
  background-color: ${props => props.cell !== 0 ? "white" : "var(--pDarkest)"};
  position: relative;
`;

const AltCell = styled.div`
  background-color: black;

`;

const Board = styled.div`
width: 100vw;
/* max-width: 900px; */
display: flex;
flex-flow: column nowrap;
align-items: center; justify-content: center;
`;




const AltContainer = styled.div
  .attrs(pr => ({
    grid_px: `calc(90vw / ${pr.num_col})`
  }))`
  display: grid;
  grid-template-columns: ${pr => `repeat(${pr.num_col}, ${pr.grid_px})`};
  //grid-template-columns: ${pr => `repeat(${pr.num_col}, ${pr.num_col}px))`};
  div {
    border: 1px solid black;
    // width: 20px;
    // height: 20px;
    width: ${pr => pr.grid_px};
    height: ${pr => pr.grid_px};
    /* width: ${pr => `calc(100% / ${pr.num_col}px)`}; */
    /* height: ${pr => `calc(width / ${pr.num_col}px)`}; */
  }
`;

const Cell2 = styled.div`
background-color: ${pr => pr.active ? "white" : "transparent"};
cursor: pointer;
`;


const Styled = {
  BoardContainer,
  Page,
  Container,
  Cell,
  CellContainer,
  AltCell,
  AltContainer,
  Board,
  Cell2
};


export default Styled;
