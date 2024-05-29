import { useState } from 'react';
//custom hooks
import useLocalStorage from './hooks/useLocalStorage';
// custom components
import CustomForm from './components/CustomForm';
import EditForm from './components/EditForm';
import Tasklist from './components/Tasklist';

function App() {
  const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  const [previousFocuseEl, setPreviousFocuseEl] = useState(null);
  const [editedTask, setEditedTasks] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addTask = (task) => {
    setTasks((prevState) => [...prevState, task]);
  };

  const deleteTask = (id) => {
    setTasks((prevState) => prevState.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task.id === id) {
          return { ...task, checked: !task.checked };
        }
        return task;
      })
    );
  };

  const updateTask = (task) => {
    setTasks((prevState) =>
      prevState.map((t) => (t.id === task.id ? { ...t, name: task.name } : t))
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocuseEl.focus();
  }

  const enterEditMode = (task) => {
    setEditedTasks(task);
    setIsEditing(true);
    setPreviousFocuseEl(document.activeElement);
  };

  return (
    <div className='container'>
      <header>
        <h1>Todo App</h1>
      </header>
      {isEditing && (
        <EditForm 
        editedTask={editedTask} 
        updateTask={updateTask}
        closeEditMode={closeEditMode} />
      )}
      <CustomForm addTask={addTask} />
      {tasks && (
        <Tasklist
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          enterEditMode={enterEditMode}
        />
      )}
    </div>
  );
}

export default App;
