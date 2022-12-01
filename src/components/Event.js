import React from "react";

const Event = () => {
  let eventName;
  let hostName;
  let placeID;

  fetch("/event", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoia2l0IiwidXNlcklkIjoia0k4c2F6T0hqXyIsInJlZ2lzdGVyVGltZSI6IjIwMjItMTEtMTRUMDk6NDY6MTEuMTU3WiIsImlhdCI6MTY2ODQxOTI0M30.rJ5k9LG36A_F2c9s2QsaQqVjQOwhoqzb7q5T8wqGu3A",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      eventName: "nana dancing",
      username: "nana",
      placeId: "p01",
      maxNumOfTeamMember: 5,
      startTime: Date.now(),
      startPoint: POINT(47.651, -122.349, 4326),
      endPoint: (47.651, -122.349, 4326),
      path: 1,
      difficulty: "easy",
      distance: 1,
      description: "1",
      isFinish: false,
      hikingTime: 1,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });

  return (
    <div>
      <div className="input-event-name">
        <span> Event name</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="input-max-number">
        <span> Max Number</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="input-start-time">
        <span> Start Time</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="input-hiking-time">
        <span> Hiking Time</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="input-start-point">
        <span> Start point</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="input-end-point">
        <span> End point</span>
        <input
          type="text"
          onChange={(e) => {
            eventName = e.target.value;
          }}
        />
      </div>

      <div className="select-page">
        <span>place:</span>
        <select
          name="place"
          id="place"
          onChange={(e) => {
            placeID = e.target.value;
            console.log(placeID);
          }}
        >
          <option value="p01">Hong Kong Trail</option>
          <option value="p02">Lantau Trail</option>
          <option value="p03">Wilson Trail</option>
          <option value="p04">Maclehose Trail</option>
        </select>
      </div>
    </div>
  );
};

export default Event;
