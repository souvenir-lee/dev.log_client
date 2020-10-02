import React from "react";
import CategoryEntry from "./CategoryEntry";
const Category = ({
  handleCategoryEntry,
  categoryList,
  categoryId,
  handleInputCategory,
}) => (
  <div className="container" id="category">
    <CategoryEntry
      categoryList={categoryList}
      categoryId={categoryId}
      handleInputCategory={handleInputCategory}
      handleCategoryEntry={handleCategoryEntry}
    />
  </div>
);
export default Category;
