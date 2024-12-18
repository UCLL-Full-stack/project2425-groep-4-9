import { StatusMessage } from "@types";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useState } from "react";

const UserLoginForm: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<String | null>(null);

  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);

  const clearErrors = () => {
    setNameError(null);
    setStatusMessages([]);
  };

  const validate = (): boolean => {
    let result = true;

    if (!name && name.trim() === "") {
      setNameError("name is required");
      result = false;
    }

    return result;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();
    if (!validate()) {
      return;
    }
    setStatusMessages([
      ...statusMessages,
      {
        type: "success",
        message: "Login successful, redirecting to home page...",
      },
    ]);
    sessionStorage.setItem("loggedInUser", name);

    setTimeout(() => router.push("/"), 2000);
  };

  return (
    <>
      <h3 className="px-0">Login</h3>
      {statusMessages && (
        <div className="row">
          <ul className="list-none mb-3 mx-auto ">
            {statusMessages.map(({ message, type }, index) => (
              <li
                key={index}
                className={classNames({
                  "text-red-800": type === "error",
                  "text-green-800": type === "success",
                })}
              >
                {message}
              </li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="nameInput" className="block mb-2 text-sm font-medium">
          Username:
        </label>
        <div className="block mb-2 text-sm font-medium">
          <input
            id="nameInput"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue:500 block w-full p-2.5"
          />
          {nameError && <div className="text-red-800">{nameError}</div>}
        </div>

        <button
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          Login
        </button>
      </form>
      {/* <p id="test-tag">name: {name}</p> */}
    </>
  );
};

export default UserLoginForm;