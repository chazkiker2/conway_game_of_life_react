import PropTypes from "prop-types";


const NotFound = props => (
  <div>
    <h2>Page Not Found</h2>
    {props.children}
  </div>
);


NotFound.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
}


export default NotFound;
