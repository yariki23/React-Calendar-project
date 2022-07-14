import React from "react";

import "./header.scss";

const Header = (props) => {
  const showMonthHeader = () => {
    const firstDayCheckMonth = props.weekDates[0].toLocaleString("default", {
      month: "long",
    });
    const lastDayCheckMonth = props.weekDates[6].toLocaleString("default", {
      month: "long",
    });
    const monthSelection =
      firstDayCheckMonth === lastDayCheckMonth
        ? `${lastDayCheckMonth}`
        : `${firstDayCheckMonth} - ${lastDayCheckMonth}`;

    return monthSelection;
  };
  
  return (
    <header className="header">
      <button className="button create-event-btn">
        <i className="fas fa-plus create-event-btn__icon"></i>Create
      </button>
      <div className="navigation">
        <button
          className="navigation__today-btn button"
          onClick={props.handleToDay}
        >
          Today
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={props.handlerWeekBack}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="icon-button navigation__nav-icon"
          onClick={props.handlerWeekNext}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
        <span className="navigation__displayed-month">{showMonthHeader()}</span>
      </div>
    </header>
  );
};

export default Header;
