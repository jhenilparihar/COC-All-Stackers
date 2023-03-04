import React, { useState } from "react";
import Loading from "../Loading/Loading";
import "./styles.css";

function RegisterPage({ registerUser, loading }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [loading, setLoading] = useState(fa);

  const setAccount = async () => {
    registerUser(name, phone);
  };

  return (
    <>
      {!loading ? (
        <>
          <input
            className="input-text"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input-text"
            type="text"
            placeholder="Phone no."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <br />
          <br />
          <button onClick={setAccount}>Verify</button>
          <br />
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  );
}

export default RegisterPage;
