import React from "react";
import CategoryEntry from "./CategoryEntry";
import styled from "styled-components";

export const CategoryStyle = styled.div`
  grid-area: category;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid;
  margin: 20px;
`;
const Category = ({
  handleCategoryEntry,
  categoryList,
  handleInputCategory,
}) => (
  <CategoryStyle className="container" id="category">
    <CategoryEntry
      handleCategoryEntry={handleCategoryEntry}
      categoryList={categoryList}
      handleInputCategory={handleInputCategory}
    />
  </CategoryStyle>
);
export default Category;
