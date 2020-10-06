import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

const CategoryBox = styled.div`
  //className = categoryBox
  margin: 10px;
`;
const AddCategory = styled.button`
  //className = addCategory
  text-align: center;
  width: 104px;
  height: 30px;
  background: #f1c40f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: none;
  margin: 10px;
`;

class CategoryEntry extends React.Component {
  constructor(props) {
    super();
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }

  handleAddCategory() {
    const inputCategory = prompt("카테고리를 입력해주세요.");
    if (inputCategory !== "") {
      axios
        .post(`https://devyeon.com/category`, { title: inputCategory })
        .then(() => {
          this.props.handleCategoryEntry();
          alert(`${inputCategory}가 추가되었습니다.`);
        });
    }
  }

  render() {
    const { categoryList, handleInputCategory } = this.props;
    return (
      <>
        {categoryList.map((ele) => {
          return (
            <CategoryBox
              className="categoryBox"
              onClick={handleInputCategory}
              key={`category${categoryList.indexOf(ele)}`}
            >
              {ele}
            </CategoryBox>
          );
        })}
        <AddCategory
          className="addCategory"
          onClick={() => {
            this.handleAddCategory();
          }}
        >
          + 추가하기
        </AddCategory>
      </>
    );
  }
}
export default withRouter(CategoryEntry);
