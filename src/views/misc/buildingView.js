import React from "react";
import '../../style/404-building.scss'


export default function Building() {

  document.title = "Page building"

  return (
    <div className="building-view">
      <h1>Page building</h1>
      <p>This page is currently under construction. Come back later!</p>
      <img src="https://i.gifer.com/757X.gif" alt="Construction gif"></img>
    </div>
  );
}