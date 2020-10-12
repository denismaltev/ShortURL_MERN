import React from "react";
import { Link } from "react-router-dom";

export const LinksList = ({ links }) => {
  if (!links || links.length === 0) {
    return <p className="center bold">No links yet.</p>;
  }
  return (
    <table className="striped">
      <thead>
        <tr>
          <th>N</th>
          <th>Original URL</th>
          <th>Short URL</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => {
          return (
            <tr key={link._id}>
              <td>{index + 1}</td>
              <td>{link.originalUrl}</td>
              <td>{link.shortUrl}</td>
              <td>
                <Link to={`/detail/${link._id}`}>Open</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
