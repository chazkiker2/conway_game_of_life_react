import { Header } from ".";


const Wrapper = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
};


export default Wrapper;
