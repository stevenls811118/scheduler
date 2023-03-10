import React, { useEffect } from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "components/hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [props.interview, transition, mode]);

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE, true));
  };

  const confirm = () => {
    transition(CONFIRM);
  };

  const cancel = () => {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  };

  const edit = () => {
    transition(EDIT);
  };

  return (
    <article className="appointment" data-testid="appointment">
      {mode === SHOW && props.interview && (
        <>
          <Header time={props.time} />
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer.name}
            onDelete={confirm}
            onEdit={edit}
          />
        </>
      )}
      {mode === EMPTY && props.interview === null && (
        <>
          <Header time={props.time} />
          <Empty onAdd={() => transition(CREATE)} />
        </>
      )}
      {props.id === "last" && (
        <>
          <Header time={props.time} />
        </>
      )}
      {mode === CREATE && (
        <>
          <Header time={props.time} />
          <Form
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        </>
      )}
      {mode === SAVING && (
        <>
          <Header time={props.time} />
          <Status message="Saving" />
        </>
      )}
      {mode === DELETING && (
        <>
          <Header time={props.time} />
          <Status message="Deleting" />
        </>
      )}
      {mode === CONFIRM && (
        <>
          <Header time={props.time} />
          <Confirm onConfirm={cancel} onCancel={back} />
        </>
      )}
      {mode === EDIT && (
        <>
          <Header time={props.time} />
          <Form
            student={props.interview.student}
            interviewer={props.interview.interviewer.id}
            interviewers={props.interviewers}
            onCancel={back}
            onSave={save}
          />
        </>
      )}
      {mode === ERROR_SAVE && (
        <>
          <Header time={props.time} />
          <Error message="Could not save appointment." onClose={back} />
        </>
      )}
      {mode === ERROR_DELETE && (
        <>
          <Header time={props.time} />
          <Error message="Could not delete appointment." onClose={back} />
        </>
      )}
    </article>
  );
}
