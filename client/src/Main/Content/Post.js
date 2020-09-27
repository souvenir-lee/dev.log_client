/*
1.e.target.value(onChage)
2.카테고리 선택(select)
3.title, content, tag를 작성
4.게시버튼을 누르면 서버에 post요청을 보낸 후 Listup.js로 추가된 데이터를 리다이렉트
*/

//http://dev.log/posts/create
import React from "react";
import axios from "axios";
import { Link, Route, Redirect, withRouter } from "react-router-dom";
import CKEditor from "ckeditor4-react";

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      title: "",
      message: "",
      tag: [],
      success: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }
  //   handleChange(e) {
  //     this.setState({ category: e.target.value });
  //   }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  //   axios.post('/user', {
  //     category: 'Fred',
  //     title: 'Flintstone'
  //     message:"",
  //     tag:[],
  //     success:true
  //   })
  handlePost = () => {
    axios.post("url", this.state).then((res) => {
      if (res.status === 200) {
        this.handleInputValue("message");
      }
      //   this.props.getUserData(res.data);
    });
  };
  render() {
    return (
      <div className="post">
        <center>
          <select
            className="post_tag"
            value={this.state.category}
            onChange={this.handleInputValue("category")}
          >
            <option></option>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>

          <div>
            <input
              className="post_title"
              type="title"
              placeholder="title"
              onChange={this.handleInputValue("title")}
            ></input>
          </div>

          <div>
            <CKEditor
              className="post_content"
              data="<p>Hello from CKEditor 4!</p>"
            />
            <input
              className="post_tag"
              type="tag"
              placeholder="태그를 입력해주세요(최대3개)"
              onChange={this.handleInputValue("tag")}
            ></input>
          </div>
          <button
            className="post_btnDelete"
            type="submit"
            onClick={() => {
              //클릭했을때 /main으로 이동
              this.props.history.push("/main");
            }}
          >
            취소
          </button>
          <button
            className="post_btnPost"
            type="submit"
            onClick={() => {
              //클릭했을때 post요청 후 main으로 이동
              this.handlePost();

              this.props.history.push("/main");
              //
            }}
          >
            게시
          </button>
        </center>
      </div>
    );
  }
}

export default withRouter(Post);
