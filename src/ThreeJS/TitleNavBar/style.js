import styled from "styled-components";

const FlexElement = styled.section`
  flex: 1;
  text-align: center;
  minwidth: ${props => (props.minWidth ? props.minWidth : 0)}vw;
  padding: 10px;

  position: relative;
`;
const FlexElementTitle = styled.section`
  flex: 1;
  text-align: center;

  @media (max-width: 600px) {
    min-width: ${props => (props.contactInfo ? 90 : 60)}vw;
  }
  @media (min-width: 601px) {
    text-align: ${props => (props.textAlign ? props.textAlign : "center")};
    min-width: 40vw;
  }
`;
const FlexRow = styled.section`
  display: flex;
  flex-direction: row;
`;
const Title = styled.section`
position:relative;

  border-radius: ${props => (props.borderRadius ? props.borderRadius : 0)}  
  color: ${props => (props.color ? props.color : "white")}
  background: ${props => (props.background ? props.background : "transparent")}
  display: inline-block;
  margin-top: ${props => (props.marginTop ? props.marginTop : 0)}vh;

  font-family: "Fira Sans", sans-serif;
  font-weight:bold;
  text-align: ${props => (props.textAlign ? props.textAlign : "center")};

  @media (max-width: 600px) {
  
    font-size: 46px;
    }
    @media (min-width: 601px) {
      font-size: ${props => (props.fontSize ? props.fontSize : 3)}em;
     
    }

`;

const Brace = styled.hr``;
export { Brace, FlexElement, FlexRow, FlexElementTitle, Title };
