import './leftbar.css';

export default function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        
        <h2 className="leftbarTitle">Description</h2>

        <p className="descriptionText">
          Web app built with <strong> React</strong>, <strong> Node.js </strong> and 
          <strong> MySQL </strong> demonstrating JWT authentication. 
        </p>
        <p className="descriptionText">
          Register a new user to log in and out of your account. 
        </p>
        <p className="descriptionText">
          Delete your account by clicking the corresponding 
          button after logging in.
        </p>
        
        <h2 className="leftbarTitle">Source Code</h2>

        <div className="codeLinksContainer">
          <a className="codeLink" 
             href="https://github.com/danebulat/react-jwt-demo-frontend" 
             target="_blank">
            Frontend
          </a>
          <span>&middot;</span>
          <a className="codeLink" 
             href="https://github.com/danebulat/react-jwt-demo-backend" 
             target="_blank">
            Backend
          </a>
        </div>
      </div>
    </div>
  );
}
