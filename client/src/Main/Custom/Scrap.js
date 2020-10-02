/* eslint-disable no-unused-vars */
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
class Scrap extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return <div className="">scrap</div>;
  }
}

export default Scrap;

/*

<Switch>
            <Route
              exact
              path="/custom/scrap"
              render={() => (
                <Scrap
                  userInfo={userInfo}
                  token={token}
                  customListOp={customListOp}
                />
              )}
            />
          </Switch>




          // <Route exact path="/main/post" />



return (
      <div className="container" id="custom">
        <form>
          <div>Custom List</div>
          <label>
            <input
              type="radio"
              name="radioGroup"
              value="Scrap"
              checked={this.state.radioGroup["Scrap"]}
              onChange={this.handleRadio}
            />
            Scrap
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="radioGroup"
              value="Posts"
              checked={this.state.radioGroup["Posts"]}
              onChange={this.handleRadio}
            />
            Posts
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="radioGroup"
              value="Tagged"
              checked={this.state.radioGroup["Tagged"]}
              onChange={this.handleRadio}
            />
            Tagged
          </label>
        </form>
        <CustomEntry
          customListOp={customListOp}
          handleInputCategory={handleInputCategory}
        />
      </div>
    );





  //custom list default -> scrap list 호출
  handleCustomDefault = () => {
    axios.post(`http://localhost:4000/custom/scrap`, {
      option: this.state.customListOp,
    });
  };

  handleCustomList = (value) => {};

  handleInputCustom = (e) => {};


*/
