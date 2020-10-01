import React from 'react';
import CatgeoryEntry from "./CategoryEntry"

const Catgeory = ({cateory, handleInputCategory}) => (
  <div className="container" id="category">
  {["전체보기","Grapefruit", "Lime", "Coconut","Mango"].map( el => {
    return (
      <CatgeoryEntry 
        el={el}
        cateory={cateory} 
        handleInputCategory={handleInputCategory}          
        />
    )
  })}
  </div>
);

export default Catgeory;


