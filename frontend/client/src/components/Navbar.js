import {Link} from "react-router-dom";
// import '../styling/Navbar.css'
 const NavBar = () => {
    return(
        <nav className="site-title">
            <Link to="/" className="site-title">
                NGO CONNECT
            </Link>
            <ul>
                <li>
                <Link to="/signup">Signup</Link>
                </li>
                <li>
                <Link to="/Userlogin">Login</Link> 
                </li>
                <li>
                <Link to="/register">NGORegister</Link>
                </li>
                <li>
                <Link to="/ngologin">Ngologin</Link>
                </li>
                <li>
                <Link to="/ngolist">Ngolist</Link>
                </li>
                
            </ul>
        </nav>
            
    );
};
export default NavBar;