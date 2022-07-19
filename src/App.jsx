import React, { useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import moment from "moment";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import "./common.scss";
import Modal from "./components/modal/Modal.jsx";
import events from "./gateway/events.js";

const App = () => {
  const [date, setDate] = useState(moment());
  const [count, setCount] = useState(0);
  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState(false);
  const [listEvents, setListEvents] = useState([...events]);

  const handlerWeekBack = () => {
    setDate(date.subtract(7, "days"));
    setCount(count + 1);
  };
  const handlerWeekNext = () => {
    setDate(date.add(7, "days"));
    setCount(count - 1);
  };

  const handleToDay = () => {
    setDate(moment());
  };

  const hideModalCreateEvent = () => {
    setIsOpenCreateEvent(false);
  };

  const showModalCreateEvent = () => {
    setIsOpenCreateEvent(true);
  };

  const addEvent = (dataEvent) => {
    setListEvents((arrEvents) => [...arrEvents, dataEvent]);
  };

  const deleteEvent = (id) => {
    setListEvents(listEvents.filter((event) => event.id !== id));
  };

  const weekDates = generateWeekRange(getWeekStartDate(date._d));

  return (
    <>
      <Header
        handlerWeekBack={handlerWeekBack}
        handlerWeekNext={handlerWeekNext}
        handleToDay={handleToDay}
        weekDates={weekDates}
        showModalCreateEvent={showModalCreateEvent}
      />
      <Calendar
        weekDates={weekDates}
        listEvents={listEvents}
        deleteEvent={deleteEvent}
      />

      <Modal
        trigger={isOpenCreateEvent}
        hideModalCreateEvent={hideModalCreateEvent}
        addEvent={addEvent}
        listEvents={listEvents}
      ></Modal>
    </>
  );
};

export default App;
