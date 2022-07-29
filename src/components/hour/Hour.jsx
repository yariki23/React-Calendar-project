import React, { useEffect, useState } from "react";
import Event from "../event/Event";
import { formatMins } from "../../../src/utils/dateUtils.js";
import "./hour.scss";

const Hour = ({ dataHour, hourEvents, deleteEvent, redLine }) => {
  const [isOpenDelEvent, setIsOpenDelEvent] = useState(false);
  const [redLineMargin, setRedLineMargin] = useState(new Date().getMinutes());

  const triggerModalDel = () => {
    setIsOpenDelEvent(!isOpenDelEvent);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      setRedLineMargin(new Date().getMinutes());
    }, 10000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="calendar__time-slot" data-time={dataHour + 1}>
      {typeof redLine === "function"
        ? new Date().getHours() === dataHour && redLine(redLineMargin)
        : redLine}

      {/* if no events in the current hour nothing will render here */}
      {hourEvents.map(({ id, dateFrom, dateTo, title }) => {
        const eventStart = `${new Date(dateFrom).getHours()}:${formatMins(
          new Date(dateFrom).getMinutes()
        )}`;
        const eventEnd = `${new Date(dateTo).getHours()}:${formatMins(
          new Date(dateTo).getMinutes()
        )}`;

        return (
          <Event
            key={id}
            id={id}
            triggerModalDel={triggerModalDel}
            //calculating event height = duration of event in minutes
            height={(new Date(dateTo).getTime() - new Date(dateFrom).getTime()) / (1000 * 60)}
            marginTop={new Date(dateFrom).getMinutes()}
            time={`${eventStart} - ${eventEnd}`}
            title={title}
            isOpenDelEvent={isOpenDelEvent}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Hour;
