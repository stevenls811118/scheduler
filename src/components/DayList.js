import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  let itemsArray = props.days.map((i) => {
    return (
      <DayListItem
        key={i.id}
        name={i.name}
        spots={i.spots}
        selected={i.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  return <ul>{itemsArray}</ul>;
}
