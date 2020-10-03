import React from "react";
import CategoryEntry from "./CategoryEntry";
import styled from "styled-components";

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
export const CategoryStyle = styled.div`
  grid-column: 1 / 2;
`;
