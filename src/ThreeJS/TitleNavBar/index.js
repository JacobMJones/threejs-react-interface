import React, { Component } from "react";
import { FlexElement, Title, FlexElementTitle, FlexRow } from "./style.js";
import HomeButton from "../../Components/HomeButton";
import CallFunctionButton from "../../Components/CallFunctionButton";
import BackButton from "../../Components/BackButton";
import "./style.js";

class TitleNavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      showCode,
      flip,
      color,
      backArrow,
      contactInfo,
    } = this.props;
    return (
      <FlexRow>
        <FlexElement>
          {contactInfo ? <></> : backArrow ? <BackButton /> : <HomeButton />}
        </FlexElement>
        <FlexElementTitle contactInfo={contactInfo}>
          <Title color={color} fontSize={3.5}>
            {title}
          </Title>
        </FlexElementTitle>
        <FlexElement>
          {!contactInfo && (
            <CallFunctionButton
              style={{position:'absolute', left:0 }}
              functionToCall={() => {
                showCode();
              }}
              image={flip ? "images/page.png" : "/images/code.png"}
            />
          )}
        </FlexElement>
      </FlexRow>
    );
  }
}
export default TitleNavBar;
