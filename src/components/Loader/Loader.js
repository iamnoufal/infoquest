import './Loader.css'


const Loader = ({ loading, children }) => {
  return loading ? (
    <div className="loader-container">
      	  <div className="spinner"></div>
          <br/>
          <h1 style={{color:'black',fontFamily:'Gill Sans MT'}}>Loading...</h1>
    </div>
  ) : (
    children
  );
};

export default Loader;
