import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  
  let InterviewersArray = props.interviewers.map(i => {
    if (props.onChange) {
      return (
        <InterviewerListItem
          key={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={i.id === props.value}
          setInterviewer={() => props.onChange(i.id)}
        />
      );
    } else {
      return (
        <InterviewerListItem
          key={i.id}
          name={i.name}
          avatar={i.avatar}
          selected={i.id===props.value}
        />
      );
    }
    
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {InterviewersArray}
      </ul>
    </section>
  )
}