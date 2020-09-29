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
      categoryId: "",
      userId: "",
      title: "",
      message: "",
      names: [],
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
  //     clickEditBtn:false
  //   })
  handlePost = async () => {
    await this.handleInputValue("message");
    await axios
      .post("http://localhost:4000/posts/create", this.state)
      //.post("http://devyeon.com/posts/create", this.state)
      .then((res) => {
        if (res.status === 200) {
          this.props.handleGetDefault();
          this.props.history.push("/main");
        }
        //   this.props.getUserData(res.data);
      });
  };

  handleEdit = async () => {
    await this.handleInputValue("message");
    await axios
      .put("http://localhost:4000/posts/update", this.state)
      //.put("http://devyeon.com/posts/update", this.state)
      .then((res) => {
        if (res.status === 200) {
          this.props.handleGetDefault();
          alert("수정이 완료되었습니다");
          this.props.history.push("/main");
        }
      });
  };
  render() {
    //만약 새글쓰기를 클릭해서 들어왔을때는 취소,게시
    //수정하기 버튼을 클릭해서 들어왔을때는 취소,수정

    return (
      <div className="post">
        <center>
          <select
            className="post_tag"
            value={this.state.categoryId}
            onChange={this.handleInputValue("categoryId")}
          >
            <option></option>
            <option value="1">Grapefruit</option>
            <option value="2">Lime</option>
            <option value="3">Coconut</option>
            <option value="4">Mango</option>
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
          {this.props.editBtn ? (
            <button
              className="post_btnEdit"
              type="submit"
              onClick={() => {
                //클릭했을때 post요청 후 main으로 이동
                this.handleEdit();
                console.log(this.props);
              }}
            >
              수정
            </button>
          ) : (
            <button
              className="post_btnPost"
              type="submit"
              onClick={() => {
                //클릭했을때 post요청 후 main으로 이동
                this.handlePost();
              }}
            >
              게시
            </button>
          )}
        </center>
      </div>
    );
  }
}

export default withRouter(Post);
