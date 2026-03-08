import React from "react";
import { Video, Phone } from "lucide-react";

const Calls = ({ mode = "recent" }) => {
  const allCalls = [
    {
      id: 1,
      name: "John Doe",
      type: "Incoming",
      time: "3 March, 7:03 PM",
      status: "missed",
    },
    {
      id: 2,
      name: "Jane Smith",
      type: "Outgoing",
      time: "4 March, 10:15 AM",
      status: "recent",
    },
    {
      id: 3,
      name: "Alex Roy",
      type: "Scheduled",
      time: "7 March, 9:00 PM",
      status: "scheduled",
    },
    {
      id: 4,
      name: "Nadim Ahmed",
      type: "Incoming",
      time: "2 March, 11:40 AM",
      status: "recent",
    },
  ];

  const titleMap = {
    recent: "Recent Calls",
    missed: "Missed Calls",
    scheduled: "Scheduled Calls",
  };

  const calls =
    mode === "recent"
      ? allCalls
      : allCalls.filter((call) => call.status === mode);

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{titleMap[mode] || "Calls"}</h2>

      {calls.length === 0 ? (
        <div className="p-6 text-center opacity-70 bg-base-200 rounded-md">
          No calls found in this section.
        </div>
      ) : (
        <ul className="space-y-3">
          {calls.map((call) => (
            <li
              key={call.id}
              className="flex justify-between items-center p-3 bg-base-200 rounded-md hover:bg-base-300 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary/15 text-primary flex items-center justify-center font-semibold">
                  {call.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold">{call.name}</p>
                  <p className="text-sm opacity-70">
                    {call.type} • {call.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="btn btn-sm btn-primary flex items-center gap-1">
                  <Phone size={16} />
                  Call
                </button>
                <button className="btn btn-sm btn-secondary flex items-center gap-1">
                  <Video size={16} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Calls;
