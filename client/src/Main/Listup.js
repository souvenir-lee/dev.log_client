import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Nav from "../Main/Nav/Nav";
import Category from "../Main/Category/Category";
import Contents from "../Main/Content/ContentList/Contents";
//import Scrap from "../src/Main/Scrap";
/*
1.state:{
    category:null(데이타베이스에서 가져와야함),
    contetn:null(데이타베이스에서 가져와야함)
}
*/
class Listup extends React.Component {
  constructor(props) {
    super(props); //isLogin, userinfo, handleIsLoginChange
    this.state = {
      category: null,
      contentsList: {}
    };
    this.handleInputCategory = this.handleInputCategory.bind(this);
  }

  //category에서 올라온 state
  handleInputCategory = (e) => {
    console.log('target',e.target.innerHTML)
    this.setState({ category: e.target.innerHTML});
    console.log('state', this.state) //두번 클릭해야 이해하는것인가?
  };

  //contentsList도 채워지는 함수

  render() {
    console.log(this.props)
    const { category, contentsList } = this.state

    return (
      <div className ="listup_body">
        Listup에서 'Hello World'
        <Nav />  
        <Category category={category} handleInputCategory={this.handleInputCategory}/>
        <Contents cateory={category} />
        {/*
        <Scrap />*/}
      </div>
    );
  }
}

export default Listup;
