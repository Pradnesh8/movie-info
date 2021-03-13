import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../../actions/authActions";
import PropTypes from "prop-types";

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };
    logout=()=>{
        this.props.logout();
        window.location.replace("/"); 
    }
    render() {
        return(
            <Fragment>
                <NavLink onClick={this.logout} href="#">
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect (null, { logout })(Logout);