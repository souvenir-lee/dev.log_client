/*
CategoryEntry.js를 import한다.
카테고리 개수만큼 map으로 돌리기
참고하세요.
*/
import React from 'react';
import CatgeoryEntry from "./CategoryEntry"

const Catgeory = ({cateory, handleInputCategory}) => (
  <div className="listup_cateory">
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


