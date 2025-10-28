import React, { useState } from "react";
import axios from "axios";

function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email };

    axios.post("http://172.21.14.105:3000/users", newUser)
      .then(res => {
        alert("Thêm user thành công!");
        setName("");
        setEmail("");
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Thêm User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          required 
        />
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
}

export default AddUser;
