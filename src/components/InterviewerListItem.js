import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {
  let liClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  let handleClick = () => {
    if (props.setInterviewer) {
      props.setInterviewer();
    }
  };

  return (
    <li className={liClass} onClick={handleClick}>
      <img
        className={"interviewers__item-image"}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
