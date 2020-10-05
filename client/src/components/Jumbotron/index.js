import React from "react";

function Jumbotron({ children }) {
  return (
    <div
      style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center", color:"white", backgroundImage:`url(https://freerangestock.com/sample/87961/man-crafting-wood.jpg)`}}
      className="jumbotron" 
    >
      {children}
    </div>
  );
}

export default Jumbotron;
