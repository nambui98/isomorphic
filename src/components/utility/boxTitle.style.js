import styled from "styled-components";
import { palette } from "styled-theme";

const BoxTitle = styled.h3`
  font-size: 22px;
  font-weight: 500;
  color: ${palette("text", 0)};
  margin: 0;
  margin-bottom: 5px;
`;

const BoxSubTitle = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: ${(props) => (!props.primary ? palette("text", 3) : "white")};
  line-height: 24px;
`;

export { BoxTitle, BoxSubTitle };
