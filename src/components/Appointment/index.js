import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "components/hooks/useVisualMode";
import Form from "./Form";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";

export default function Appointment(props) {
  
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  return (
    <article className="appointment">
      {mode === SHOW &&
        <>
          <Header time={props.time}/>
          <Show student={props.interview.student} interviewer={props.interview.interviewer.name}/>
        </>     
      }
      {mode === EMPTY &&
        <>
          <Header time={props.time}/>
          <Empty onAdd={() => transition(CREATE)}/>
        </>  
      }
      {mode === CREATE &&
        <>
          <Form 
            interviewers={[]} 
            onCancel={() => transition(EMPTY)}
            onSave={() => transition(SHOW)}
          />
        </>
      }
    </article>
  );
}