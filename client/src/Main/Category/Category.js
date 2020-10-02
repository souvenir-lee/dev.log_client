import React from "react";
import CatgeoryEntry from "./CategoryEntry";
const Catgeory = ({ category, categoryId, handleInputCategory }) => (
  <div className="container" id="category">
    <CatgeoryEntry
      categoryId={categoryId}
      category={category}
      handleInputCategory={handleInputCategory}
    />
  </div>
);
export default Catgeory;