import React from "react";
import axios from "axios";
import { Redirect, withRouter } from "react-router-dom";
import styled from "styled-components";
axios.defaults.withCredentials = "include";
export const Poststyle = styled.div`
  grid-column: 2 / 3;
`;
class PostUpdate extends React.Component {
  constructor(props) {
    super();
    this.state = {
      names: [],
      tags: [],
      isPost: false,
      isUpdate: false,
    };
    this.handleInputValue = this.handleInputValue.bind(this);
  }
  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };
  handleEdit() {
    // this.handleInputValue("message");
    this.setState({
      names: this.state.names.push(
        this.state.member1 ? this.state.member1 : false,
        this.state.member2 ? this.state.member2 : false,
        this.state.member3 ? this.state.member3 : false
      ),
    });
    this.setState({
      tags: this.state.tags.push(
        this.state.tag1 ? this.state.tag1 : false,
        this.state.tag2 ? this.state.tag2 : false,
        this.state.tag3 ? this.state.tag3 : false
      ),
    });
    axios
      .post("https://devyeon.com/posts/update", {
        token: this.props.token,
        categoryId: this.state.categoryId,
        title: this.state.title,
        message: this.state.message,
        names: this.state.names,
        tags: this.state.tags,
        id: this.props.clickedContent.id,
      })
      .then((res) => {
        if (res.status === 200) {
          //
          alert("수정이 완료되었습니다");
          this.props.handleContentList(0);
          //새글 쓰고 main으로 이동
          this.setState({ isUpdate: !this.state.isPost });
        }
      });
  }
  render() {
    //만약 새글쓰기를 클릭해서 들어왔을때는 취소,게시
    //수정하기 버튼을 클릭해서 들어왔을때는 취소,수정
    const { categoryList, clickedContent } = this.props;
    const list = categoryList.slice(1);
    return (
      <Poststyle className="container" id="post">
        {this.state.isPost ? <Redirect to="/main" /> : ""}
        <div
          className="inputArea"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* 인라인 style 부분은 실 CSS 작업 때 지우시면 됩니다 */}
          <select
            className="postCategorySelect"
            value={this.state.categoryId}
            onChange={this.handleInputValue("categoryId")}
          >
            <option key="selectCategory0">카테고리 선택</option>
            {list.map((ele) => (
              <option
                value={categoryList.indexOf(ele)}
                key={`selectCategory${categoryList.indexOf(ele)}`}
              >
                {ele}
              </option>
            ))}
          </select>
          <input
            className="postTitle"
            type="title"
            placeholder="title"
            defaultValue={clickedContent.title}
            onChange={this.handleInputValue("title")}
          />
          <textarea
            className="postMessage"
            type="message"
            placeholder="message"
            defaultValue={clickedContent.message}
            onChange={this.handleInputValue("message")}
          ></textarea>
        </div>
        <div className="postTagArea">
          <input
            type="tag"
            placeholder="태그1"
            key="태그1"
            onChange={this.handleInputValue("tag1")}
          ></input>
          <input
            type="tag"
            placeholder="태그2"
            key="태그2"
            onChange={this.handleInputValue("tag2")}
          ></input>
          <input
            type="tag"
            placeholder="태그3"
            key="태그3"
            onChange={this.handleInputValue("tag3")}
          ></input>
        </div>
        <div className="memberTagArea">
          <input
            type="member"
            placeholder="멤버1"
            key="멤버1"
            onChange={this.handleInputValue("member1")}
          ></input>
          <input
            type="member"
            placeholder="멤버2"
            key="멤버2"
            onChange={this.handleInputValue("member2")}
          ></input>
          <input
            type="member"
            placeholder="멤버3"
            key="멤버3"
            onChange={this.handleInputValue("member3")}
          ></input>
        </div>
        <div className="btnArea">
          <button
            className="postCancelBtn"
            type="submit"
            onClick={() => {
              //클릭했을때 /main으로 이동
              this.props.clickNewMessage();
              this.props.history.push("/main");
            }}
          >
            취소
          </button>
          <button
            className="postUpdateBtn"
            type="submit"
            onClick={() => {
              //클릭했을때 post요청 후 main으로 이동
              this.handleEdit();
              console.log(this.props);
            }}
          >
            수정
          </button>
        </div>
      </Poststyle>
    );
  }
}
export default withRouter(PostUpdate);
