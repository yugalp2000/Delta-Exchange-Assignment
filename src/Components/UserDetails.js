import React, { Fragment } from "react";
import swal from "sweetalert";
import Sidebar from "./Sidebar";
import "./UserDetails.css";
import AddMembers from "./AddTeamMember";

const Users = [
  {
    id: 1,
    name: "Wayne Rooney",
    company: "DC United",
    Status: "Active",
    LastUpdated: "7/07/2017",
    Notes: "ManUtd Highest scorer",
  },
  {
    id: 2,
    name: "Ryan Giggs",
    company: "Manchester United",
    Status: "Closed",
    LastUpdated: "3/08/2011",
    Notes: "Most matches played",
  },
  {
    id: 3,
    name: "Ziatan Ibrahimovic",
    company: "LA Galaxy",
    Status: "Active",
    LastUpdated: "3/09/2018",
    Notes: "I am 'ZLATAN'",
  },
];

class SelectTableComponent extends React.Component {
  
 
  constructor(props) {
    super(props);
    this.state = {
      List: Users,
      MasterChecked: false,
      SelectedList: [],
      showModalPopup: false
    };
  }

  // Select/ UnSelect Table rows
  onMasterCheck(e) {
    let tempList = this.state.List;
    // Check/ UnCheck All Items
    tempList.map((user) => (user.selected = e.target.checked));

    //Update State
    this.setState({
      MasterChecked: e.target.checked,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });

    //Popup Modal
     AddMembers.isShowPopup = (status) => {
       this.setState({ showModalPopup: status });
     }; 
  }

  delItem(id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this  file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(+id, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((json) => {
            this.getData();
          });
      }
    });
  }
  // Update List Item's state and Master Checkbox State
  onItemCheck(e, item) {
    let tempList = this.state.List;
    tempList.map((user) => {
      if (user.id === item.id) {
        user.selected = e.target.checked;
      }
      return user;
    });

    //To Control Master Checkbox State
    const totalItems = this.state.List.length;
    const totalCheckedItems = tempList.filter((e) => e.selected).length;

    // Update State
    this.setState({
      MasterChecked: totalItems === totalCheckedItems,
      List: tempList,
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  // Event to get selected rows(Optional)
  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  render() {
    return (
      <div>
        <div className="container-fluid dashboardBackground">
          <div className="row">
            <div className="col-md-3 profileDashboard">
              <Sidebar />
            </div>
            <div className="col-md-9 quotes">
              <Fragment>
                <h3 align="center">Team Member</h3>
                <header align="center">
                  <Fragment>
                    <div
                      className="nav-item"
                      onClick={() => this.isShowPopup(true)}
                    >
                      <button>Add Team Member</button>
                    </div>
                  </Fragment>
                </header>
                <AddMembers
                  showModalPopup={this.state.showModalPopup}
                  onPopupClose={this.isShowPopup}
                ></AddMembers>
              </Fragment>
              <br />
              <div className="table table-hover table-dark">
                <br />
                <br />
                <table className="table-style">
                  <thead>
                    <tr>
                      <th scope="col">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={this.state.MasterChecked}
                          id="mastercheck"
                          onChange={(e) => this.onMasterCheck(e)}
                        />
                      </th>
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Status</th>
                      <th scope="col">Last Updated</th>
                      <th scope="col">Notes</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.List.map((user) => (
                      <tr
                        key={user.id}
                        className={user.selected ? "selected" : ""}
                      >
                        <th scope="row">
                          <input
                            type="checkbox"
                            checked={user.selected}
                            className="form-check-input"
                            id="rowcheck{user.id}"
                            onChange={(e) => this.onItemCheck(e, user)}
                          />
                        </th>
                        <td>{user.name}</td>
                        <td>{user.company}</td>
                        <td>{user.Status}</td>
                        <td>{user.LastUpdated}</td>
                        <td>{user.Notes}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-warning"
                            onClick={() => {
                              this.delItem(user.id);
                            }}
                          >
                            DELETE
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button
                  className="btn btn-primary button-style"
                  onClick={() => this.getSelectedRows()}
                >
                  Get Selected Items {this.state.SelectedList.length}
                </button>
                <br />
                {/*<div className="row">
              <b>All Row Items:</b>
              <code>{JSON.stringify(this.state.List)}</code>
            </div>*/}
                <div className="container-fluid">
                  <b>Selected Row Items(Click Button To Get):</b>
                  <br />
                  <code>{JSON.stringify(this.state.SelectedList)}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectTableComponent;
