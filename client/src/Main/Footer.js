import React from "react";
import styled from "styled-components";
export const FooterStyled = styled.div`
  grid-area: footer;
  font-size: 5px;
  color: gray;
`;
const Footer = () => {
  return (
    <FooterStyled>
      <center>
        <div>CodeStates Imersive 22기 First-Project</div>
        <div>Knock Knock 팀</div>
        <div>이한슬 | 권수진 | 윤 연 | 김종환</div>
        <div>&lt;Copyright 2020. Knock Knock. All rights reserved&gt;</div>
      </center>
    </FooterStyled>
  );
};
export default Footer;
