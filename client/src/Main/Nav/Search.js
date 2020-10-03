import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// axios.defaults.withCredentials = "include";

const SearchStyle = styled.div`
  display: flex;
  justify-content: center; ;
`;
const SearchValue = styled.input`
  width: 400px;
  height: 30px;
  letter-spacing: 1px;
  margin-left: auto;
  margin-right: auto;
`;
const SearchBtn = styled.button`
  background: #02380e;
  font-size: 24px;
  color: white;
  border: none;
  width: 50px;
  height: 30px;
  border-radius: 2px;
  padding-left: 0px;
`;

class Search extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchValue: "",
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.inputEnter = this.inputEnter.bind(this);
  }
  //input 마다 상태가 변경
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  //검색창에서 Enter시 검색어로 검색
  inputEnter = (handleSearchList, searchValue) => (e) => {
    if (e.charCode === 13) {
      handleSearchList(searchValue);
    }
  };

  render() {
    const { searchValue } = this.state;
    const { handleSearchList } = this.props;
    return (
      <SearchStyle className="navSearch">
        <SearchValue
          type="text"
          className="searchValue"
          onChange={this.handleInputValue("searchValue")}
          onKeyPress={this.inputEnter(handleSearchList, searchValue)}
        >
        </SearchValue>
        <SearchBtn
          type="button"
          className="searchBtn"
          value="검색"
          onClick={() => {
            handleSearchList(searchValue);
          }}
        >
          <FontAwesomeIcon icon={faSearch} />
        </SearchBtn>
      </SearchStyle>
    );
  }
}

export default withRouter(Search);
