import { useCallback, useEffect, useState } from "react";

function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*(){}[]";
    let allowedChar = "";

    if (numberAllowed && !charAllowed) {
      allowedChar = numbers;
    } else if (!numberAllowed && charAllowed) {
      allowedChar = specialChars;
    } else if (!numberAllowed && !charAllowed) {
      allowedChar = letters;
    } else if (numberAllowed && charAllowed) {
      allowedChar = letters + numbers + specialChars;
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allowedChar.length);
      pass += allowedChar.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed, passwordgenerator]);

  const copypasswordgenerator = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="text-white text-center bg-gray-600 w-full max-w-md mx-auto rounded-xl px-4 py-4 my-9">
        <h1 className="my-4">Password Generator</h1>
        <div className="flex shadow-lg rounded-lg overflow-hidden  mb-4">
          <input
            type="text"
            value={password}
            placeholder="Password"
            className="outline-none w-full px-3 py-1 text-orange-600"
            readOnly
          />
          <button
            className="bg-blue-700 text-white"
            onClick={copypasswordgenerator}
          >
            Copy
          </button>
        </div>
        <div>
          <input
            type="range"
            value={length}
            min={0}
            max={15}
            className="outline-none"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label htmlFor=""> Length {length} </label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor=""> Number </label>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor=""> Characters</label>
        </div>
      </div>
    </>
  );
}

export default App;
