import {connect} from "react-redux";
import Login from "./Login";
import SignUp from "./SignUp";
import UserDropDown from "./UserDropDown";
import {bindActionCreators} from "redux";
import {setUserAction} from "../../store/actionCreators/actionCreators";
import {useEffect, useState} from "react";
import {getCookie} from "../../utills/cookies";

const NavbarWayd = (props) => {

    useEffect(() => {
        const token = getCookie('token')
        console.log(token)
        if (token && token.startsWith("Bearer ")) {
            const tokenArray = token.substring(7).split('.')
            const payload = JSON.parse(atob(tokenArray[1]))
            props.setUserDispatch({username: payload.username, roles: payload.roles})
        }
    }, [])

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a href="/" className="navbar-brand">Brand<b>Name</b></a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                <div className="navbar-nav">
                    <a href="/" className="nav-item nav-link">Home</a>
                    {props.user && props.user.roles.indexOf("ROLE_ADMIN") !== -1 &&
                        <a href="/categories" className="nav-item nav-link">Categories</a>
                    }
                    <a href="#" className="nav-item nav-link">About</a>
                    <div className="nav-item dropdown">
                        <a href="#" data-toggle="dropdown" className="nav-item nav-link dropdown-toggle">Services</a>
                        <div className="dropdown-menu">
                            <a href="#" className="dropdown-item">Web Design</a>
                            <a href="#" className="dropdown-item">Web Development</a>
                            <a href="#" className="dropdown-item">Graphic Design</a>
                            <a href="#" className="dropdown-item">Digital Marketing</a>
                        </div>
                    </div>
                    <a href="#" className="nav-item nav-link active">Pricing</a>
                    <a href="#" className="nav-item nav-link">Blog</a>
                    <a href="#" className="nav-item nav-link">Contact</a>
                </div>
                <form className="navbar-form form-inline">
                    <div className="input-group search-box">
                        <input type="text" id="search" className="form-control" placeholder="Search here..."/>
                        <div className="input-group-append">
					<span className="input-group-text">
						<i className="material-icons">&#xE8B6;</i>
					</span>
                        </div>
                    </div>
                </form>
                <div className="navbar-nav ml-auto action-buttons">
                    {!props.user &&
                    <>
                        <Login/>
                        <SignUp/>
                    </>
                    }
                    {props.user &&
                        <UserDropDown/>
                    }
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            setUserDispatch: setUserAction,
        },
        dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarWayd)