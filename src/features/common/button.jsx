import styled from 'styled-components';
import Loader from './loader';
import { clickerStyles, secondaryClickerStyles, disabledClicker, baseStyles } from "./link.styles";


const Button = ({ secondary, loading, children, disabled, ...props }) => {
  return (
    <StyledButton secondary={secondary ? "true" : undefined} disabled={disabled} {...props}>
      {loading ? <Loader small white /> : children}
    </StyledButton>
  )
}


const StyledButton = styled.button`
	padding: 0;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	${baseStyles}
	${props => {
    if (props.disabled) {
      return disabledClicker;
    } else if (props.secondary) {
      return secondaryClickerStyles;
    } else {
      return clickerStyles;
    }
  }}
`;


export default Button;
