import {Link, Outlet} from "react-router-dom";
import {Fragment} from "react";
import './navigation-bar.style.scss'
import {ReactComponent as CrwnLogo} from "../../assets/crown.svg";

const NavigationBar = () => {
    return (
        <Fragment>
            <div className="navigation">
                <Link className='logo-container' index to="/">
                    <CrwnLogo/>
                </Link>
                <div className="nav-links-container">
                    <Link className='nav-link' to="/shop">SHOP</Link>
                </div>
            </div>
            <Outlet/>
        </Fragment>
    )
}

export default NavigationBar