import './loginNavbar.css'; // Import your CSS for styling
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LoginNavbar = () => {
  return (
    <div className="navigation-bar-2">
        <div className="logo">
          <a href="/" aria-current="page">
              <img className="icon-brand" src="src/assets/NLB-home-coloured-logo.png" alt="NLB Logo" width="250" height="125"/> 
          </a> 
        </div>
    </div>
  );
}

export default LoginNavbar;