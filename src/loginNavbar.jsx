import './loginNavbar.css'; // Import your CSS for styling
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import OracleHomeLogo from './assets/oracle-logo.png';
import { Link } from 'react-router-dom';

const LoginNavbar = () => {
  return (
    <div className="navigation-bar-2">
        <div className="logo">
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <img src={OracleHomeLogo} alt="Logo" className="footer-image" width='60' height='60'/>
                  <h3 style={{ color:'black', paddingTop: '10px', fontWeight: 'bold', fontFamily: 'Montserrat, serif', paddingInlineStart: '10px', fontSize: '20px'}}>Oracle 23ai Select AI Demo for Libraries</h3>
          </Link>
        </div>
    </div>
  );
}

export default LoginNavbar;