import React from "react"
import { Nav, NavLink, Bars, NavMenu } from "./navbarElements"

const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
                <NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/contact" activeStyle>
                        Contact
                    </NavLink>
                    <NavLink to="/youtube" activeStyle>
                        Youtube
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    )
}

export default Navbar;