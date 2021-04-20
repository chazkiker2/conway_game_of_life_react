import StyledLink from "./link.styles";


const Link = ({ children, secondary = false, ...props }) => {
  return (
    <StyledLink secondary={secondary} {...props}>
      {children}
    </StyledLink>
  )
}


export default Link;
