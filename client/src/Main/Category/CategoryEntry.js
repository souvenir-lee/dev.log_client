import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

class CategoryEntry extends React.Component {
  constructor(props) {
    super();
    this.handleAddCategory = this.handleAddCategory.bind(this);
  }

  handleAddCategory() {
    const inputCategory = prompt("카테고리를 입력해주세요.");
    axios
      .post(`http://localhost:4000/category`, { title: inputCategory })
      .then(() => {
        this.props.handleCategoryEntry();
        alert(`${inputCategory}가 추가되었습니다.`);
      });
  }

  render() {
    const { categoryList, handleInputCategory } = this.props;
    return (
      <>
        {categoryList.map((ele) => {
          return (
            <div
              className="categoryBox"
              onClick={handleInputCategory}
              key={`category${categoryList.indexOf(ele)}`}
            >
              {ele}
            </div>
          );
        })}
        <button
          className="addCategory"
          onClick={() => {
            this.handleAddCategory();
          }}
        >
          + 추가하기
        </button>
      </>
    );
  }
}
export default withRouter(CategoryEntry);
