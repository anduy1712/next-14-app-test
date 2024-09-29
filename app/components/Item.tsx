import React, { memo } from "react";

const Item = ({ name }: any) => {
  return <div>{name}</div>;
};

export default memo(Item);
