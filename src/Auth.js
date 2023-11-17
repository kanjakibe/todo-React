// AuthComponent.jsx
import React, { useState, useEffect } from 'react';

const authStyle = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-gray-900 to-gray-1500`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  input: `border p-2 w-full text-xl mt-4`,
  button: `border p-4 mt-4 bg-[#ff004f] text-slate-100`,
};

const AuthComponent = ({ onSuccess }) => {
  const [input, setInput] = useState('');
  const [firstNumber, setFirstNumber] = useState(0);
  const [secondNumber, setSecondNumber] = useState(0);
  const [thirdNumber, setThirdNumber] = useState(0);

  useEffect(() => {
    // Generate random numbers for the math problem
    const generateRandomNumbers = () => {
      setFirstNumber(Math.floor(Math.random() * 10) + 1); // Change the range as needed
      setSecondNumber(Math.floor(Math.random() * 10) + 1);
      setThirdNumber(Math.floor(Math.random() * 10) + 1);
    };

    generateRandomNumbers();
  }, []);

  const correctAnswer = thirdNumber * (firstNumber + secondNumber);

  const handleAuthentication = () => {
    const userAnswer = parseInt(input, 10);
    if (userAnswer === correctAnswer) {
      onSuccess();
    } else {
      alert('The answer is incorrect. Please try again.');
    }
  };

  return (
    <div className={authStyle.bg}>
      <div className={authStyle.container}>
        {/* <h2 className={authStyle.heading}>Authentication</h2> */}
        <p>
          <b>To access app solve me:</b>
        </p>

        <p>
        {thirdNumber} x ({firstNumber} + {secondNumber}) =
        </p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={authStyle.input}
          placeholder="I'm not a robot :-)"
        />
        <button onClick={handleAuthentication} className={authStyle.button}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AuthComponent;
