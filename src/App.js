import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: {
        name: "",
        current_balance: "0.00"
      },
      branchList: []
    };
  }
  componentDidMount() {
    this.refreshList();
  }
  refreshList = () => {
    axios
      .get("http://localhost:8000/v1/branches/")
      .then(res => this.setState({ branchList: res.data }))
      .catch(err => console.log(err));
  };
  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    alert("save" + JSON.stringify(item));
  };
  handleDelete = item => {
    alert("delete" + JSON.stringify(item));
  };
  createItem = () => {
    const item = { name: "", currenct_balance: "" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  showPayments = item => {
    return null;
  };

  renderItems = () => {
    const newItems = this.state.branchList;
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>
          {item.name}
        </span>
        <span>
          <button
            onClick={() => this.showPayments(item)}
            className="btn btn-success mr-2"
          >
            Show payments
          </button>
          <button
            onClick={() => this.editItem(item)}
            className="btn btn-secondary mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDelete(item)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Bakery branches</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add branch
                </button>
              </div>
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;