import React from "react";
import moment from "moment";

import { days } from "../../utils/dateUtils.js";

const Navigation = ({ weekDates }) => {
  const toDay = moment().format("ddd MMM DD YYYY");
  return (
    <header className="calendar__header">
      {weekDates.map((dayDate) => (
        <div
          key={dayDate}
          className={
            toDay === dayDate.toDateString()
              ? "calendar__day-label day-label calendar__day-label_bg"
              : "calendar__day-label day-label"
          }
        >
          <span className="day-label__day-name">{days[dayDate.getDay()]}</span>
          <span className="day-label__day-number">{dayDate.getDate()}</span>
        </div>
      ))}
    </header>
  );
};

export default Navigation;
