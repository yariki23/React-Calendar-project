import React, { useEffect, useState } from "react";
import Header from "./components/header/Header.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import { createEventServer } from "./gateway/eventsGateway";
import moment from "moment";
import { deleteTask, fetchData } from "./gateway/eventsGateway";
import { getWeekStartDate, generateWeekRange } from "../src/utils/dateUtils.js";
import "./common.scss";
import Modal from "./components/modal/Modal.jsx";

const App = () => {
  const [date, setDate] = useState(moment());
  const [count, setCount] = useState(0);
  const [isOpenCreateEvent, setIsOpenCreateEvent] = useState(false);
  const [listEvents, setListEvents] = useState([{}]);

  useEffect(() => {
    fetchData().then((res) => setListEvents(res));
  }, []);
  console.log(listEvents);
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
    const allEvents = createEventServer(dataEvent);
    allEvents.then((res) => setListEvents(res));
  };

  const deleteEvent = (id) => {
    deleteTask(id);
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
