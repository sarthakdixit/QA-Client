import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ListItem = ({ item, action, deleteQuestion, id }) => {
  const navigate = useNavigate();

  const redirectTo = () => {
    navigate("/home/edit", {
      state: {
        question: item,
      },
    });
  };

  return (
    <Link
      to="/home/details"
      state={{ state: item }}
      style={{ textDecorationLine: "none" }}
    >
      <div className="my-3 list-group-item list-group-item-dark">
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">{item.heading}</h5>
          <small>{new Date(item.createdOn).toLocaleDateString()}</small>
        </div>
        <p className="mb-1">{item.description}</p>
        <small>{item.tag}</small>
        <div className="my-3">
          {action === "my" ? (
            <>
              <Link to="/home/edit" state={{ state: item }}>
                <button className="mx-2 btn btn-warning" onClick={redirectTo}>
                  Edit
                </button>
              </Link>
              <button
                className="mx-2 btn btn-danger"
                onClick={() => deleteQuestion(id)}
              >
                Delete
              </button>
            </>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ListItem;
