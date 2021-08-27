import React, { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import dateFnsFormat from "date-fns/format";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import { addDays } from "date-fns";

const FORMAT = "dd/MM/yyyy";
function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

const AddTask = (props) => {
  var { onCancel, onAddTask } = props;
  const [task, setTask] = useState("");
  const [date, setDate] = useState(null);

  // console.log(date);
  return (
    <div className="add-task-dialog">
      <input
        value={task}
        onChange={function (event) {
          setTask(event.target.value);
        }}
      />
      <div className="add-task-actions-container">
        <div className="btns-container">
          <button
            disabled={!task}
            className="add-btn"
            onClick={function () {
              onAddTask(task, date);
              onCancel();
              setTask("");
            }}
          >
            Add Task
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              onCancel();
              setTask("");
            }}
          >
            Cancel
          </button>
        </div>
        {/* calendar */}
        <div className="icon-container">
          <DayPickerInput
            onDayChange={(day) => setDate(day)}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
              //accessing the props of dayPicker component
              //passing props to dayPicker component provided by dayPicker lib
              modifiers: {
                //key
                disabled: [{ before: new Date() }],
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

const taskHeaderMapping = {
  //key will be value of selectedTab & value will be printed as heading
  inbox: "Inbox",
  today: "Today",
  next_7: "Next 7 days",
};

function TaskItem(props) {
  const { tasks, selectedTab } = props;
  // tasks.map((task) => console.log(task.task));
  if (selectedTab === "next_7") {
    return tasks
      .filter(
        (task) =>
          // isAfter(task.date, new Date())
          !isToday(task.date, new Date()) &&
          isBefore(task.date, addDays(new Date(), 7))
      )
      .map((task) => (
        <p>
          {task.task} {dateFnsFormat(new Date(task.date), FORMAT)}
        </p>
      ));
  }
  if (selectedTab === "today") {
    return tasks
      .filter((task) => isToday(task.date, new Date()))
      .map((task) => (
        <p>
          {task.task} {dateFnsFormat(new Date(task.date), FORMAT)}
        </p>
      ));
  }

  return (
    <div className="task-items-container">
      {tasks.map((task) => (
        <div className="task-item">
          <p>{task.task}</p>
          <p>{dateFnsFormat(new Date(task.date), FORMAT)}</p>
        </div>
      ))}
    </div>
  );
}

const Tasks = ({ selectedTab }) => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  // console.log(tasks);
  return (
    <div className="tasks">
      <h1>{taskHeaderMapping[selectedTab]}</h1>
      {selectedTab === "inbox" ? (
        <div
          className="add-task-btn"
          onClick={function () {
            setShowAddTask(!showAddTask); //toogle add btn
          }}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task</span>
        </div>
      ) : null}
      {showAddTask ? (
        <AddTask
          onAddTask={function (task, date) {
            const newTaskItem = { task, date: date || new Date() };
            //function to add task in tasks array
            var newTasks = [...tasks, newTaskItem];
            setTasks(newTasks);
          }}
          onCancel={function () {
            //function to show and hide dialog box of inputs element
            setShowAddTask(false);
          }}
        />
      ) : null}
      {tasks.length > 0 ? (
        <TaskItem tasks={tasks} selectedTab={selectedTab} />
      ) : (
        <p>No tasks yet</p>
      )}
    </div>
  );
};

export default Tasks;
