import React from "react";

const AnswerCard = ({ item }) => {
  return (
    <div className="my-3 p-3 list-group-item list-group-item-dark">
      <div className="d-flex w-100 justify-content-between">
        <small>{new Date(item.createdOn).toLocaleDateString()}</small>
      </div>
      <p className="mb-1">{item.description}</p>
    </div>
  );
};

export default AnswerCard;
