import React, { Component } from "react";
export default class FormDataComponent extends Component {
  userData;
  date=new Date();
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeNotes = this.onChangeNotes.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      name: "",
      company: "",
      status: "",
      notes: "",
    };
  }
  // Form Events
  onChangeName(e) {
    this.setState({ name: e.target.value });
  }
  onChangeCompany(e) {
    this.setState({ company: e.target.value });
  }
  onChangeStatus(e) {
    this.setState({ status: e.target.value });
  }
  onChangeNotes(e) {
    this.setState({ notes: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    this.setState({
      name: "",
      company: "",
      status: "",
      notes: "",
    });
  }
  // React Life Cycle
  componentDidMount() {
    this.userData = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user")) {
      this.setState({
        name: this.userData.name,
        company: this.userData.company,
        status: this.userData.status,
        dates: this.setState({ date }),
        notes: this.userData.notes,
      });
    } else {
      this.setState({
        name: "",
        company: "",
        status: "",
        notes: "",
      });
    }
  }
  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("user", JSON.stringify(nextState));
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeName}
            />
          </div>
          <div className="form-group">
            <label>Company</label>
            <input
              type="text"
              className="form-control"
              value={this.state.company}
              onChange={this.onChangeCompany}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <input
              type="text"
              className="form-control"
              value={this.state.notes}
              onChange={this.onChangeNotes}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
