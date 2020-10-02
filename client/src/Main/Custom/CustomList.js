import React from "react";
import { Redirect, withRouter } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = "include";

class CustomList extends React.Component {
  constructor(props) {
    super();
    this.getCustomList = this.getCustomList.bind(this);
    this.state = {
      contentList: {},
    };
  }

  getCustomList() {
    const { userInfo, token } = this.props;
    axios
      .post(
        `https://devyeon.com/custom/${this.props.selectedOption.toLowerCase()}list`,
        //`http://localhost:4000/custom/${this.props.selectedOption.toLowerCase()}list`,
        {
          data: {
            userId: userInfo.id,
            token: token,
          },
        }
      )
      .then((result) => {
        if (Object.values(result).length !== 0) {
          this.setState({
            contentList: {
              ...result.data,
            },
          });
        }
      });
  }

  componentDidMount() {
    this.getCustomList();
  }

  render() {
    const { selectedOption } = this.props;
    const { contentList } = this.state;
    // console.log(selectedOption);
    console.log(contentList);

    return (
      <>
        <h3>{selectedOption} List</h3>
        {Object.values(contentList).length !== 0
          ? Object.values(contentList).map((ele) => (
              <div key={`customList${Object.values(contentList).indexOf(ele)}`}>
                <div>{ele["post.title"]}</div>
                <div>{ele["post.message"]}</div>
              </div>
            ))
          : ""}
      </>
    );
  }
}

export default withRouter(CustomList);
