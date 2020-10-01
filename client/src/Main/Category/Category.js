import React from 'react';
import CatgeoryEntry from "./CategoryEntry"

const Catgeory = ({categoryId, handleInputCategory}) => (
  <div className="container" id="category">
  {["전체보기","Grapefruit", "Lime", "Coconut","Mango"].map( el => {
    return (
      <CatgeoryEntry 
        el={el}
        categoryId={categoryId} 
        handleInputCategory={handleInputCategory}          
        />
    )
  })}
  </div>
);

export default Catgeory;


