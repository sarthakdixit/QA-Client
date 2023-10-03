import React from "react";
import ListItem from "./ListItem";

const ListGroup = ({ questions, action, deleteQuestion }) => {
  return (
    <div className="list-group">
      {questions.map((item, key) => {
        return (
          <ListItem
            key={key}
            item={item}
            action={action}
            deleteQuestion={deleteQuestion}
            id={key}
          />
        );
      })}
    </div>
  );
};

export default ListGroup;
