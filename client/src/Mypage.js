/*
export function Mypage(props) {
  if (props.isLogin) {
    return (
      <div>
        <h1>Mypage</h1>
        <div className="username">{props.userinfo.username}</div>
        <div className="email">{props.userinfo.email}</div>
        <div className="mobile">{props.userinfo.mobile}</div>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="not_found">NOT FOUND</h1>
      </div>
    );
  }
}

*/

/**임시로 넣어두는 파일 */
import React from "react";
import { withRouter } from "react-router-dom"
class Mypage extends React.Component {
  constructor(props){
    super(props)
    this.status = {
      isLogin:null,
      userinfo:null
    } 
  }

  render(){
    const {isLogin, userinfo} = this.props
    // TODO : MYpage에 로그인 상태에 따라 username, email, mobile 의 정보를 구현하세요.
    if(isLogin){
      console.log('여기인가',this.props)
      return(
          <div>
            <h1>Mypage</h1>
            <div className="username">username : {userinfo.username}</div>
            <div className="email">email : {userinfo.email}</div>
            <div className="mobile">mobile : {userinfo.mobile}</div>
            <br></br>
            <button 
              id="logout" 
              type='submit' 
              onClick={(e) => {
                e.preventDefault();
                console.log('들어왔나')
                fetch('http://localhost:4000/signout',{
                  method: "POST",
                  body: JSON.stringify(this.props.userinfo),
                  headers: {
                    "Content-Type" : "application/json"
                  },
                  credentials: 'include',              
                })
                .then(res => {
                  //res.json()
                  this.props.handleLogin()
                  this.props.history.push('/')
                  })
              }}>Logout</button>
          </div>)
    } else {
      return (
      <div>
        <h1>NOT FOUND</h1>
      </div>
      )
    };
  }
}

export default withRouter(Mypage);