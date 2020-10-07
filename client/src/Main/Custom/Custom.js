import React from "react";
import CustomEntry from "./CustomEntry";
import styled from "styled-components";
import axios from "axios";
axios.defaults.withCredentials = "include";

const ListForm = styled.form`
  height: 70px;
  border-bottom: 1px solid black;
`;

const CustomStyled = styled.div`
  grid-area: custom;
  border-left: 1px solid;
  margin: 20px;
  padding: 0px 30px;
`;
const H3 = styled.h3`
  //Custom List 라는 글자 감싸기
  font-size: 1.13em;
  font-weight: bold;
  margin-bottom: 10px;
`;

class Custom extends React.Component {
  render() {
    const {
      token,
      userInfo,
      clickedContent,
      handleClickedContent,
      getContentDetail,
      isDetail,
      handleIsDetail,
      selectedOption,
      listCustom,
    } = this.props;
    const list = Object.keys(this.props.radioGroup);
    return (
      <CustomStyled className="container" id="custom">
        <ListForm>
          <H3>{selectedOption} List</H3>
          {list.map((ele) => {
            return (
              <label key={`label${list.indexOf(ele)}`}>
                <input
                  key={`input${list.indexOf(ele)}`}
                  type="radio"
                  name="radioGroup"
                  value={ele}
                  checked={this.props.radioGroup[ele]}
                  onChange={this.props.handleRadio}
                />
              </label>
            );
          })}
        </ListForm>
        <CustomEntry
          selectedOption={selectedOption}
          token={token}
          userInfo={userInfo}
          isDetail={isDetail}
          handleIsDetail={handleIsDetail}
          clickedContent={clickedContent}
          listCustom={listCustom}
          handleClickedContent={handleClickedContent}
          getContentDetail={getContentDetail}
        />
      </CustomStyled>
    );
  }
}

export default Custom;
