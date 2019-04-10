import React, { Component } from 'react';

const Temp = ({cl, prim, val}) => {
  return (
    <div className={cl}>
      <div className={prim ? "big-value" : "value"}>{val}</div>
      <p className={prim ? "big-degree" : "degree"}>&#176;</p>
    </div>
  );
}

export default Temp;