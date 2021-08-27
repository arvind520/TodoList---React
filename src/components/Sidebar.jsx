import React from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  // console.log(selectedTab);
  return (
    <div className="sidebar">
      <div
        className={selectedTab === "inbox" ? "active" : null}
        onClick={() => setSelectedTab("inbox")}
      >
        <FaInbox className="icon" />
        Inbox
      </div>
      <div
        className={selectedTab === "today" ? "active" : null}
        onClick={() => setSelectedTab("today")}
      >
        <FaRegCalendarAlt className="icon" />
        Today
      </div>
      <div
        className={selectedTab === "next_7" ? "active" : null}
        onClick={() => setSelectedTab("next_7")}
      >
        <FaRegCalendar className="icon" />
        Next 7 days
      </div>
    </div>
  );
};

export default Sidebar;
