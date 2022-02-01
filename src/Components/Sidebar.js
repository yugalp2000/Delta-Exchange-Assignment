import React from "react";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";
import { logout } from "../utils";
class Sidebar extends React.Component {
  logout = e => {
    logout();
    swal("Successfully Logout");
  };
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 imageContainer">
            <img
              className="profile"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ63h_yORZPB_ZNWqMIm5u-1CS9BYQ6FxSHqSrGTCa0jASRtAgRtQ&s"
              alt="Profile"
            ></img>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 imageContainer1">
            <h5 className="name"> Admin </h5>
          </div>
        </div>
        <hr />
        <hr />
        <div className="row">
          <div className="col-md-12 imageContainer1">
            <NavLink
              to="/Dashboard/UserDetails"
              exact={true}
              activeClassName="is-active"
            >
              <button className=" btn btn-info commonButton">
                User Details &nbsp;
                <img  className="changePasswordImage" src="http://cdn.onlinewebfonts.com/svg/img_386652.png" alt="userdetailslogo"></img>
              </button>
            </NavLink>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12 imageContainer1 ">
            <NavLink to="/" exact={true} activeClassName="is-active">
              <button
                className="btn btn-danger commonButton"
                onClick={this.logout}
              >
                Logout Admin&nbsp;
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
export default Sidebar;
