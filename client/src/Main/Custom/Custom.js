import React from "react";
import CustomEntry from "./CustomEntry";
import axios from "axios";
axios.defaults.withCredentials = "include";

class Custom extends React.Component {
  constructor(props) {
    super();
    this.state = {
      radioGroup: {
        Scrap: true,
        MyPost: false,
        Tagged: false,
      },
      selectedOption: "Scrap",
      listCustom: [],
    };
    this.getCustomList = this.getCustomList.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  getCustomList() {
    const { userInfo } = this.props;
    axios
      .get(
        `https://devyeon.com/custom/${this.state.selectedOption.toLowerCase()}/${
          userInfo.id
        }`
      )
      .then((result) => {
        console.log(Object.values(result.data).length);
        if (Object.values(result.data).length !== 0) {
          console.log("----", result.data);
          this.setState(
            {
              listCustom: [...result.data],
            },
            () => {
              console.log(this.state.listCustom);
            }
          );
        }
      });
  }

  handleRadio(event) {
    let obj = {};
    Object.keys(this.state.radioGroup).map((ele) => {
      return (obj[ele] = false);
    });
    obj[event.target.value] = true;
    this.setState(
      {
        radioGroup: {
          ...obj,
        },
      },
      this.setState(
        {
          selectedOption: event.target.value,
        },
        () => {
          this.getCustomList();
        }
      )
    );
  }

  componentDidMount() {
    this.getCustomList();
  }

  render() {
    const { selectedOption, listCustom } = this.state;
    const {
      token,
      userInfo,
      clickedContent,
      handleClickedContent,
      getContentDetail,
      isDetail,
      handleIsDetail,
    } = this.props;
    const list = Object.keys(this.state.radioGroup);
    return (
      <div className="container" id="custom">
        <form>
          <h3>{selectedOption} List</h3>
          {list.map((ele) => {
            return (
              <label key={`label${list.indexOf(ele)}`}>
                <input
                  key={`input${list.indexOf(ele)}`}
                  type="radio"
                  name="radioGroup"
                  value={ele}
                  checked={this.state.radioGroup[ele]}
                  onChange={this.handleRadio}
                />
              </label>
            );
          })}
        </form>
        <CustomEntry
          selectedOption={selectedOption}
          token={token}
          userInfo={userInfo}
          isDetail={isDetail}
          handleIsDetail={handleIsDetail}
          clickedContent={clickedContent}
          listCustom={listCustom}
          handleClickedContent={handleClickedContent}
          getContentDetail={getContentDetail}
        />
      </div>
    );
  }
}

export default Custom;
