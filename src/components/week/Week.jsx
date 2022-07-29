import React from "react";
import Day from "../day/Day";
import moment from "moment";

import "./week.scss";

const Week = ({ weekDates, listEvents, deleteEvent }) => {
  const toDay = moment().format("ddd MMM DD YYYY");

  return (
    <div className="calendar__week">
      {weekDates.map((dayStart) => {
        const dayEnd = new Date(dayStart.getTime()).setHours(
          dayStart.getHours() + 24
        );

        const redLine =
          toDay === dayStart.toDateString()
            ? (margin) => {
                return (
                  <div
                    className="red-line"
                    style={{ marginTop: `${margin}px` }}
                  ></div>
                );
              }
            : null;
        //getting all events from the day we will render
        const dayEvents = listEvents.filter(
          (event) =>
            new Date(event.dateFrom) > dayStart &&
            new Date(event.dateTo) < dayEnd
        );

        return (
          <Day
            redLine={redLine}
            weekDates={weekDates}
            key={dayStart.getDate()}
            dataDay={dayStart.getDate()}
            dayEvents={dayEvents}
            deleteEvent={deleteEvent}
          />
        );
      })}
    </div>
  );
};

export default Week;
