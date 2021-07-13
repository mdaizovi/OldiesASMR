import React from 'react';

export default Context = React.createContext({
  tasks: [],
  addNewTask : (task) => {},
  deleteTask : (taskId) => {}
});