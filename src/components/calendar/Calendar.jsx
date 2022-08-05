import React from "react";
import Navigation from "./../navigation/Navigation";
import Week from "../week/Week";
import Sidebar from "../sidebar/Sidebar";
import "./calendar.scss";

const Calendar = ({ weekDates, listEvents, deleteEvent }) => {
  return (
    <section className="calendar">
      <Navigation weekDates={weekDates} />
      <div className="calendar__body">
        <div className="calendar__week-container">
          <Sidebar />
          <Week
            weekDates={weekDates}
            listEvents={listEvents}
            deleteEvent={deleteEvent}
          />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
