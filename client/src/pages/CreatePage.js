import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  const { loading, request, error, clearError } = useHttp();
  const message = useMessage();
  const history = useHistory();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, clearError, message]);

  // POST URL and redirect to detail page
  const clickHandler = async () => {
    try {
      const body = JSON.stringify({ originalUrl: link });

      // POST request to server
      const response = await request("api/link/generate", "POST", body);

      // check if URL was created and redirect to the detail page
      if (response._id) {
        history.push(`detail/${response._id}`);
      }
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="input-field link-input">
        <input
          id="link"
          type="text"
          name="link"
          className="green-input"
          required
          onChange={(event) => {
            setLink(event.target.value);
          }}
        />
        <label htmlFor="link">Your link</label>
        <button
          className="btn waves-effect waves-light link-submit-button"
          type="submit"
          name="action"
          onClick={clickHandler}
          disabled={loading}
        >
          Send
          <i className="material-icons right">send</i>
        </button>
      </div>
    </div>
  );
};
