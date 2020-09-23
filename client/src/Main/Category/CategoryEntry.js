/*
1. 카테고리 목록을 mapping하여 갯수만큼 출력
2. 카테고리 목록을 클릭했을때 해당 카테고리에 해당하는 글들만 모아서 Contents.js에 출력
3. 전체보기 버튼은 모든 글을들 Contents.js에 출력
*/

import React from 'react';

class CotegoryEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category : "" //{cateory, handleInputCategory}
    }
  }

  //클릭하면 state 변경
  //state 끌어올리기

  render(){
    return (
      //추후에 확인해보고 map으로 돌리기
      <div className="category_list">
        <div 
          className="category_listName" 
          onClick={this.props.handleInputCategory}
          >
          전체보기
        </div>
        <div
          className="category_listName" 
          onClick={this.props.handleInputCategory}>
          카테고리1
        </div>
        <div
          className="category_listName" 
          onClick={this.props.handleInputCategory}>
          카테고리2
        </div>
      </div>
    )
  }
}

export default CotegoryEntry
