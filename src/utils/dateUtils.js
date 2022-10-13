import moment from "moment";

export const getWeekStartDate = (date) => {
  const dateCopy = new Date(date);
  const dayOfWeek = dateCopy.getDay();
  const difference =
    dayOfWeek === 0
      ? -6 // for Sunday
      : 1 - dayOfWeek;

  const monday = new Date(dateCopy.setDate(date.getDate() + difference));
  return new Date(monday.getFullYear(), monday.getMonth(), monday.getDate());
};

export const generateWeekRange = (startDate) => {
  const result = [];
  for (let i = 0; i < 7; i += 1) {
    const base = new Date(startDate);
    result.push(new Date(base.setDate(base.getDate() + i)));
  }
  return result;
};

export const eventDuration = (event) => {
  const msEventLenght = event.dateTo - event.dateFrom;
  return msEventLenght > 21600000;
};

export const calculateMinTime = (date) => {
  let isToday = moment(date).isSame(moment(), "day");
  if (isToday) {
    return moment(new Date()).toDate();
  }
  return moment().startOf("day").toDate();
};

export const getTimeFromDate = (date) => {
  return `${date.getHours()}:${formatMins(date.getMinutes())}`;
};

export const getDateTime = (date, time) => {
  if (time === undefined) return;
  const [hours, minutes] = time.split(":");
  const withHours = new Date(new Date(date).setHours(Number(hours)));
  const withMinutes = new Date(new Date(withHours).setMinutes(Number(minutes)));
  return withMinutes;
};

export const getQuarter = (date) => {
  const minutes = date.getMinutes();
  if (minutes > 0 && minutes <= 15) {
    return new Date(date.setMinutes(date.getMinutes() + (15 - minutes)));
  } else if (minutes > 15 && minutes <= 30) {
    return new Date(date.setMinutes(date.getMinutes() + (30 - minutes)));
  } else if (minutes > 30 && minutes <= 45) {
    return new Date(date.setMinutes(date.getMinutes() + (45 - minutes)));
  } else {
    return new Date(date.setMinutes(date.getMinutes() + (60 - minutes)));
  }
};

export const checkOverlayEvent = (allEvents, event) => {
  return allEvents.some((elemEvent) => {
    return (
      (String(new Date(elemEvent.dateFrom)) >= String(event.dateFrom) &&
        String(new Date(elemEvent.dateFrom)) <= String(event.dateTo)) ||
      (String(new Date(elemEvent.dateTo)) >= String(event.dateFrom) &&
        String(new Date(elemEvent.dateTo)) <= String(event.dateTo)) ||
      (String(new Date(elemEvent.dateFrom)) <= String(event.dateFrom) &&
        String(new Date(elemEvent.dateTo)) >= String(event.dateFrom))
    );
  });
};

export const checkOnDel = (allEvents, id) => {
  const selectedEvent = allEvents.filter((event) => event.id === id);

  return (
    getQuarter(new Date()).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }) ===
    new Date(selectedEvent[0].dateFrom).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    })
  );
};

export const formatMins = (mins) => {
  return mins < 10 ? `0${mins}` : mins;
};

export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
