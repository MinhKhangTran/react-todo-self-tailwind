import React from "react";
import Alert from "./Alert";
import List from "./List";
import { v4 as uuidv4 } from "uuid";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};

export default function App() {
  const [todo, setTodo] = React.useState("");
  const [alert, setAlert] = React.useState({
    show: false,
    type: "",
    msg: ""
  });
  const [list, setList] = React.useState(getLocalStorage());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(todo);
    if (!todo) {
      //alert
      showAlert(true, "red", "Dieses Feld darf nicht leer sein!");
    } else if (todo && isEditing) {
      //editing
      const newList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, title: todo };
        }
        return item;
      });
      setList(newList);
      setTodo("");
      setIsEditing(false);
      setEditID(null);
      showAlert(true, "green", "Erfolgreich geändert");
    } else {
      const newItem = { id: uuidv4(), title: todo };
      showAlert(true, "blue", "Eine neue Aufgabe wurde hinzugefügt");
      setList([...list, newItem]);
      setTodo("");
    }
  };
  const removeAll = () => {
    showAlert(true, "red", "Alles wurde gelöscht");
    setList([]);
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const removeItem = (id) => {
    showAlert(true, "red", "Diese Aufgabe wurde gelöscht!");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const uniqueItem = list.find((item) => item.id === id);
    //console.log(uniqueItem);
    setTodo(uniqueItem.title);

    setIsEditing(true);
    setEditID(id);
  };
  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="grid place-items-center h-screen">
      <article className="bg-gray-100 p-8 rounded-lg shadow-md md:w-1/3 w-11/12">
        {alert.show && (
          <Alert alert={alert} removeAlert={showAlert} list={list} />
        )}
        <div className="flex justify-center">
          <h1 className="inline-block text-lg mb-3 font-mono tracking-widest text-teal-700 border-b border-teal-200">
            Einkaufsliste
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="text"
            className="bg-gray-300 text-teal-500 rounded-l text-base pl-2 py-1 w-full"
            placeholder="todo"
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value);
            }}></input>
          <button className="bg-teal-500 text-teal-100 text-base px-2 py-1 rounded-r">
            {isEditing ? "Ändern" : "Hinzfügen"}
          </button>
        </form>
        <List list={list} removeItem={removeItem} editItem={editItem} />
        {!list.length <= 0 && (
          <div className="flex justify-center">
            <button
              className="text-red-100 bg-red-400 px-2 py-1 rounded-md mt-4 font-mono hover:text-red-700"
              onClick={removeAll}>
              Alles löschen
            </button>
          </div>
        )}
      </article>
    </section>
  );
}
