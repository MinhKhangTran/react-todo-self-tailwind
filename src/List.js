import React from "react";
import { FcFullTrash, FcEditImage } from "react-icons/fc";

export default function List({ list, removeItem, editItem }) {
  return (
    <article>
      {list.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className="flex items-center my-3">
            <h1 className="flex-auto md:text-xl">{title}</h1>
            <button
              className=""
              onClick={() => {
                editItem(id);
              }}>
              <FcEditImage className="mr-4 md:text-3xl" />
            </button>
            <button
              onClick={() => {
                removeItem(id);
              }}>
              <FcFullTrash className="md:text-3xl" />
            </button>
          </div>
        );
      })}
    </article>
  );
}
