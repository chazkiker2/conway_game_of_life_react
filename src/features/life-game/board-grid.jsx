import React from "react";
import { Generation, seeds } from "../life";
import Styled from "./board-grid.styles";


const BoardGrid = props => {
  const [gen, setGen] = React.useState(null);

  React.useEffect(() => {
    setGen(new Generation(...seeds[1]));
  }, []);

  return (
    <Styled.BoardContainer>
      <Styled.Page>
        {
          gen &&
          <Styled.Container num_col={gen.m} num_rows={gen.n}>
            {gen?.current?.map(row => row.map(cell => (
              <Styled.Cell>
                <Styled.CellContainer cell={cell} />
              </Styled.Cell>
            )))}
          </Styled.Container>
        }
      </Styled.Page>
    </Styled.BoardContainer>
  )
};


export default BoardGrid;
