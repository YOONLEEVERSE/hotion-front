import React from "react";
import { Routes, Route } from "react-router-dom";
import Note from "./routes/Note";
import Welcome from "./routes/welcome";
import Signup from "./routes/signup";
import Login from "./routes/login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/note/:username/:currentPage" element={<Note />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
