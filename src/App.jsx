import { useState } from "react";
import "./App.css";

function App() {
  var mainContainer = document.getElementById("mainContainer");
  const [color, setColor] = useState("");

  var bgColorChange = (newColor) => {
    setColor(newColor);
    if (mainContainer) {
      mainContainer.style.backgroundColor = newColor;
    }
  };

  var btns = document.querySelectorAll("button");
  btns.forEach((btn) => {
    btn.innerHTML = btn.innerHTML.toUpperCase();
  });

  console.log(color);
  return (
    <>
    wizard
    </>
  );
}

export default App;
