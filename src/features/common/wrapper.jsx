import { Header } from ".";


const Wrapper = props => (
  <>
    <Header />
    {props.children}
  </>
)


export default Wrapper;
