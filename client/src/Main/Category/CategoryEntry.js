/*
1. 카테고리 목록을 mapping하여 갯수만큼 출력
2. 카테고리 목록을 클릭했을때 해당 카테고리에 해당하는 글들만 모아서 Contents.js에 출력
3. 전체보기 버튼은 모든 글을들 Contents.js에 출력
*/

import React from 'react';
import axios from "axios";

class CotegoryEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category : "" //{cateory, contentsList, handleInputCategory}
    }
  }

  //클릭하면 state 변경 여기 state를 변경해서
  //post로 보내고 컨텐츠 받아서 = handleContentList
  //리다이렉트 하기?
  //클라이언트 측에서 url을 파라미터 형식으로 보낼 수 있는 방법은?
  //state 끌어올리기
  handleCategory = (e) => {
    this.setState({ category: e.target.value });
    console.log(this.state.category)
  };

  render(){
    //const {cateory, contentsList, handleInputCategory, handleContentList} = this.props
    return (
      //추후에 확인해보고 map으로 돌리기
      <div className="category_list">
        <div 
          className="category_listName" 
          onClick={this.props.handleInputCategory
              //this.props.handleContentList()
            }
            //.then(res => this.props.handleContentList)
            //}}
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
