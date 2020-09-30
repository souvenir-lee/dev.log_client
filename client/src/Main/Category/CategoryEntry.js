import React from 'react';
import { withRouter } from "react-router-dom";

class CotegoryEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category : "" //{cateory, contentsList, handleInputCategory, handleContentList}
    }
  }

  render(){
    const {el, handleInputCategory} = this.props
    return (
      <div className="category_list">
        <div 
          className="category_listName" 
          onClick={handleInputCategory}
          >
          {el}
        </div>
      </div>
    )
  }
}

export default withRouter(CotegoryEntry)
