import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [passWord, setPassWord] = useState("");
  const [dispPassword, setDispPassword] = useState("");
  const passwordRef=useRef()


  const passwordGenerator = useCallback(() => {
    var passWord = "";
    var str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLNOPQRSTUVWXYZ";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "~!@#$%^&*()_+";
    
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      passWord += str.charAt(char);
    }
    setPassWord(passWord );
  }, [length, numAllowed, charAllowed, setPassWord]);

  useEffect(()=>{
    passwordGenerator();
  },[length, numAllowed, charAllowed, passwordGenerator])


  //using useRef Hook

  // const copyFn=()=>{
  //   console.log(document.getElementById('pField').value);
  //   setDispPassword(document.getElementById('pField').value);
  // }

  const copyFn=useCallback(()=>{
    let password=passwordRef.current.value;
    setDispPassword(password)
    window.navigator.clipboard.writeText(passWord);
    let passwordString=passWord.toString()
    console.log(passwordString)
    passwordRef.current?.select()
    
  } ,[passWord])
  
  return (
    <>
      <h1 className="text-4xl text-center mt-4 text-white">
        Password Generator
      </h1>
      <div className="w-full  py-4 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-indigo-600 ">
        {/* display field 
        
        */}
        <div className="w-full flex ">
          <h4>Password is {dispPassword}</h4>
        </div>
        {/* textfile and copy
        
        */}

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            id='pField'
            type="text"
            value={passWord}
            placeholder="PASSWORD "
            readOnly
            className="w-full py-1 px-3 outline-none mt-4 rounded-md "
            name=""
            ref={passwordRef}
        
          />
          <button onClick={copyFn} className="outline-none bg-blue-600 mt-4 rounded-md text-white px-3 py-0.5 shrink-0 ">
            COPY
          </button>
        </div>

        
        <div className="flex text-sm gap-x-2">

          {/* range and label
        
        */}
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
              className="cursor-pointer "
              name=""
              id=""
            />
            <label className="ml-2" htmlFor="">
              Length : {length}
            </label>
          </div>


          {/* 2 checkbox
          
          */}
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              name=""
              id="numberInput"
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              name=""
              id="charInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
