import React, {useState}  from "react"
import LoginModal from "../LoginModal/LoginModal";
import { useAuth } from "../../context/AuthContext";

import "./Navbar.css";

function NavBar(){

    const [showLogin,setShowLogin] = useState(false);
    const {user,logout} = useAuth();

    const scrollToSection = (id) => {
         document.getElementById(id)?.scrollIntoView({behavior: "smooth"})   
    }
    const openLoginModal = () => setShowLogin(true);
    const closeLoginModal = () => setShowLogin(false);

        
    return (
        <>
        <nav className="navbar">
            <div className="nav-left">
                <div className="logo">My Logo</div>
                <ul className="nav-menu">
                    <li onClick={() => scrollToSection("home")}>Home</li>
                    <li onClick={() => scrollToSection("services")}>Services</li>
                    <li onClick={() => scrollToSection("faq")}>FAQ</li>
                </ul>
            </div>

            <div className="nav-right">
                {user ? (
                    <> 
                        <span style={{marginRight: "1rem"}}>Hello, {user.name}</span>
                        <button className="login-btn" onClick={logout}>Logout</button>                    
                    </>
                ) : (<button className="login-btn" onClick={openLoginModal}>Login</button>
                    
                )}
                
            </div>
        </nav>
        {showLogin && <LoginModal onClose={closeLoginModal} />}
        </>
    );
}

export default NavBar;