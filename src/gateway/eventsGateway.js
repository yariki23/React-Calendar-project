const baseUrl = "https://628b1b037886bbbb37b052d2.mockapi.io/api/v1/events";

export const createEventServer = async (eventData) => {
  const settings = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Faild to create task");
      }
    })
    .catch(() => {
      alert("Internal Server Error. Can't display events");
    });

  const response = await fetch(baseUrl);
  const data = await response.json();
  console.log(data);
  return data;
};

export const fetchData = () => {
  return fetch(baseUrl)
    .then((response) => response.json())
    .catch(() => {
      alert("Internal Server Error. Can't display events");
    });
};

export const deleteTask = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create task");
      }
    })
    .catch(() => {
      alert("Internal Server Error. Can't display events");
    });
;
};
