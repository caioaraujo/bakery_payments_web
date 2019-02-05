import React, { Component } from "react";
    import Modal from "./components/Modal";

    const branchItems = [
      {
        id: 1,
        name: "Branch A",
        current_balance: "5677.80",
        completed: false
      },
      {
        id: 2,
        name: "Branch B",
        current_balance: "33.77",
        completed: false
      },
      {
        id: 3,
        name: "Branch C",
        current_balance: "1111111111",
        completed: false
      },
      {
        id: 4,
        name: "Branch D",
        current_balance: "0.00",
        completed: false
      }
    ];
    class App extends Component {
      constructor(props) {
        super(props);
        this.state = {
          modal: false,
          activeItem: {
            name: "",
            current_balance: "0.00"
          },
          branchList: branchItems
        };
      }
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
      displayCompleted = status => {
        
        return this.setState({ viewCompleted: false });
        
      };
      renderTabList = () => {
        return (
          <div className="my-5 tab-list">
            <span
              onClick={() => this.displayCompleted(true)}
              className={this.state.viewCompleted ? "active" : ""}
            >
              complete
            </span>
            <span
              onClick={() => this.displayCompleted(false)}
              className={this.state.viewCompleted ? "" : "active"}
            >
              Incomplete
            </span>
          </div>
        );
      };
      renderItems = () => {
        const { viewCompleted } = this.state;
        const newItems = this.state.branchList.filter(
          item => item.completed === viewCompleted
        );
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
                  {this.renderTabList()}
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