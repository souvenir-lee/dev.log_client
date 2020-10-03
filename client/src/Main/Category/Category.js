import React from "react";
import CategoryEntry from "./CategoryEntry";
const Category = ({
  handleCategoryEntry,
  categoryList,
  handleInputCategory,
}) => (
  <div className="container" id="category">
    <CategoryEntry
      handleCategoryEntry={handleCategoryEntry}
      categoryList={categoryList}
      handleInputCategory={handleInputCategory}
    />
  </div>
);
export default Category;
