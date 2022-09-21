import React from "react";
import { BoxTitle, BoxSubTitle } from "./boxTitle.style";

export default (props) => {
  return (
    <div>
      {props.title ? <BoxTitle className="isoBoxTitle"> {props.title} </BoxTitle> : ""}
      {props.subtitle ? (
        <BoxSubTitle className="isoBoxSubTitle" primary={props.primary ? true : false}>
          {" "}
          {props.subtitle}{" "}
        </BoxSubTitle>
      ) : (
        ""
      )}
    </div>
  );
};
