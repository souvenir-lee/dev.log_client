import React from 'react';
import { withRouter } from "react-router-dom";

class CotegoryEntry extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      categoryId : "" //{cateory, contentsList, handleInputCategory, handleContentList}
    }
  }

  render(){
    const {el, handleInputCategory} = this.props
    return (
      <>
        <div 
          className="categoryBox" 
          onClick={handleInputCategory}
          >
          {el}
        </div>
      </>
    )
  }
}

export default withRouter(CotegoryEntry)
