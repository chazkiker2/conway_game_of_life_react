import styled from "styled-components";


const Container = styled.div`
  padding: 5rem;
  display: flex;
  flex-flow: column nowrap;
  em {
    font-style: oblique;
    &.theme {
      color: var(--tBase);
    }
  }
  h2 {
    font-size: 4.2rem;
    font-weight: 800;
    margin-bottom: 25px;
    color: var(--pText);
    max-width: 100%;
    text-align: center;

    @media (max-width: 480px) {
        font-size: 40px;
    }
  }
  p {
    font-size: 1.8rem;
    text-align: center;
  }
`;


const Styled = {
  Container,
}


export default Styled;
