import React from "react";
import axios from "axios";
import { Redirect, Route, withRouter } from "react-router-dom";
import styled from "styled-components";
axios.defaults.withCredentials = "include";
export const Poststyle = styled.div`
  grid-column: 2 / 3;
`;

class Update extends React.Component {
  constructor(props) {
    super();
    this.state = {
      names: [],
      tags: [],
      blank: [1, 2, 3],
    };
    this.handleInputValue = this.handleInputValue.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount() {
    this.setState({ names: [...this.props.memberList] });
    this.setState({ tags: [...this.props.tagList] });
  }

  handleInputValue = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleEdit() {
    this.setState({
      names: this.state.blank.map((ele) => {
        const index = this.state.blank.indexOf(ele);
        return this.state["member" + ele]
          ? this.state["member" + ele]
          : this.state.names[index];
      }),
    });
    this.setState({
      tags: this.state.blank.map((ele) => {
        const index = this.state.blank.indexOf(ele);
        return this.state["tag" + ele]
          ? this.state["tag" + ele]
          : this.state.tags[index];
      }),
    });
    setTimeout(() => {
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
            this.props.handleContentList(0);
            alert("수정이 완료되었습니다.");
            this.props.handleResetClickedContent();
            this.props.clickEditPost();
          }
        });
    }, 0);
  }

  render() {
    const { categoryList, clickedContent } = this.props;
    const list = categoryList.slice(1);
    const { blank } = this.state;

    return (
      <Poststyle className="container" id="post">
        {this.state.isPost ? <Redirect to="/main" /> : ""}
        <div className="inputArea">
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
          {blank.map((n) => {
            const index = blank.indexOf(n);
            return (
              <input
                type="tag"
                placeholder={"태그" + n}
                defaultValue={this.state.tags[index]}
                key={"tag" + n}
                onChange={this.handleInputValue("tag" + n)}
              ></input>
            );
          })}
        </div>

        <div className="memberTagArea">
          {blank.map((n) => {
            const index = blank.indexOf(n);
            return (
              <input
                type="member"
                placeholder={"멤버" + n}
                defaultValue={this.state.names[index]}
                key={"멤버" + n}
                onChange={this.handleInputValue("member" + n)}
              ></input>
            );
          })}
        </div>
        <div className="btnArea">
          <button
            className="postCancelBtn"
            type="submit"
            onClick={() => {
              this.props.clickEditPost();
              // this.props.history.push("/main");
            }}
          >
            취소
          </button>
          <button
            className="postUpdateBtn"
            type="submit"
            onClick={() => {
              this.handleEdit();
            }}
          >
            수정
          </button>
        </div>
      </Poststyle>
    );
  }
}
export default withRouter(Update);
