import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";

import "./SpotDetails.css";

import format from "date-fns/format";
import { addDays } from "date-fns";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function Calendar({ range, setRange, editBooking }) {
  const [open, setOpen] = useState(false);
  const [calendarClass, setCalendarClass] = useState("calendarElement");

  const refOne = useRef(null);

  useEffect(() => {
    if (editBooking) {
      setCalendarClass("calendarElementEdit");
    }

    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, [editBooking]);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap">
      <div className="calendar_date_selection">
        <input
          value={
            range[0].startDate
              ? `CHECK-IN ${format(range[0].startDate, "MM/dd/yyyy")}`
              : "Add Check In Date"
          }
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />
        <input
          value={
            range[0].startDate
              ? `CHECKOUT ${format(range[0].endDate, "MM/dd/yyyy")}`
              : "Add Check Out Date"
          }
          readOnly
          className="inputBox"
          onClick={() => setOpen((open) => !open)}
        />
      </div>

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={
              range[0].endDate
                ? range
                : [
                    {
                      startDate: new Date(),
                      endDate: addDays(new Date(), 1),
                      key: "selection",
                    },
                  ]
            }
            months={1}
            direction="horizontal"
            className={calendarClass}
            rangeColors={["#f33e5b", "#3ecf8e", "#fed14c"]}
          />
        )}
      </div>
    </div>
  );
}
