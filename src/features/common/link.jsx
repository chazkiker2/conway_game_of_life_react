import StyledLink from "./link.styles";


const Link = ({ children, secondary = false, ...props }) => {
  return (
    <StyledLink secondary={secondary ? "true" : undefined} {...props}>
      {children}
    </StyledLink>
  )
}


export default Link;
