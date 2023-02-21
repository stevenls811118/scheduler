import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "components/hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  
  const {mode, transition, back} = useVisualMode(props.interview ? SHOW : EMPTY);
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  const cancel = () => {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY));
  };

  return (
    <article className="appointment">
      {mode === SHOW &&
        <>
          <Header time={props.time}/>
          <Show 
            student={props.interview.student} 
            interviewer={props.interview.interviewer.name}
            onDelete={confirm}
          />     
        </>     
      }
      {mode === EMPTY &&
        <>
          <Header time={props.time}/>
          <Empty onAdd={() => transition(CREATE)}W/>
        </>  
      }
      {mode === CREATE &&
        <>
          <Form 
            interviewers={props.interviewers} 
            onCancel={back}
            onSave={save}
          />
        </>
      }
      {mode === SAVING &&
        <Status message="Saving"/>
      }
      {mode === DELETING &&
        <Status message="Deleting"/>
      }
      {mode === CONFIRM &&
        <Confirm 
          onConfirm={cancel}
          onCancel={back}
        />
      }
    </article>
  );
}