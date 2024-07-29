import React, { memo } from "react";

const Item = ({ name }) => {
  return <div>{name}</div>;
};

export default memo(Item);
