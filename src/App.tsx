import React from "react";
import { Routes, Route } from "react-router-dom";
import Note from "./pages/Note";
import Welcome from "./pages/welcome";
import { useSelector, useDispatch } from "react-redux";
import Signup from "./pages/signup";
import Login from "./pages/login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/note/:username" element={<Note />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
