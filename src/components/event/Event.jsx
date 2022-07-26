import React from "react";

import "./event.scss";

const Event = ({
  height,
  marginTop,
  title,
  time,
  isOpenDelEvent,
  triggerModalDel,
  deleteEvent,
  id,
}) => {
  const eventStyle = {
    height,
    marginTop,
  };

  return (
    <>
      <div style={eventStyle} className="event" onClick={triggerModalDel}>
        <div className="event__title">{title}</div>
        <div className="event__time">{time}</div>
      </div>
      <div>
        {isOpenDelEvent && (
          <button
            style={{marginTop}}
            className="delete-event-btn"
            onClick={() => {
              triggerModalDel();
              deleteEvent(id);
            }}
          >
            Удалить
          </button>
        )}
      </div>
    </>
  );
};

export default Event;
