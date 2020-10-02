import React from "react";
import { Redirect, withRouter } from "react-router-dom";
// axios.defaults.withCredentials = "include";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchValue: "",
    };

    this.handleInputValue = this.handleInputValue.bind(this);
  }
  //input 마다 상태가 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  render() {
    const { searchValue } = this.state;
    const { handleSearchList } = this.props;
    return (
      <div className="navSearch">
        <input
          type="text"
          className="searchValue"
          onChange={this.handleInputValue("searchValue")}
        />
        <input
          type="button"
          className="searchBtn"
          value="검색"
          onClick={() => {
            handleSearchList(searchValue);
          }}
        />
      </div>
    );
  }
}

export default withRouter(Search);
