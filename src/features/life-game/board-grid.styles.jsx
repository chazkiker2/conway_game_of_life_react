import styled from "styled-components";

const Page = styled.div`
	display: flex;
	flex-flow: column nowrap;
	justify-content: center;
	align-items: center;
	overflow: hidden;
  /* position: absolute; */
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


const Styled = {
  BoardContainer,
  Page,
  Container,
  Cell,
  CellContainer,
};


export default Styled;
