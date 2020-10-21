import React from "react";

export default function Alert({ alert, removeAlert, list }) {
  const { msg, type } = alert;
  React.useEffect(() => {
    const alerti = setTimeout(() => {
      removeAlert();
    }, 2000);
    return () => clearTimeout(alerti);
  }, [list]);
  return (
    <div>
      <h1
        className={`bg-${type}-400 text-${type}-100 px-2 text-center mb-2 py-1 rounded`}>
        {msg}
      </h1>
    </div>
  );
}
