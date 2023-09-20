import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import "../../index.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState();
  const [collectedErrors, setCollectedErrors] = useState(null);
  const [isDisabled, setIsDisabled] = useState();
  const { closeModal } = useModal();

  useEffect(() => {
    if (credential.length < 4 || password.length < 6) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [credential, password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.message);
        }
        setCollectedErrors(data.message);
      });
  };

  const demoLogin = (e) => {
    e.preventDefault();
    setErrors({});
    const demoUser = {
      credential: "DemoUser",
      password: "demopass",
    };
    return dispatch(sessionActions.login(demoUser)).then(closeModal);
  };

  return (
    <div className="loginPanel">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {collectedErrors && <p className="errorRed">{collectedErrors}</p>}
        <button type="submit" className="coolBtns" disabled={isDisabled}>
          Log In
        </button>
        <button onClick={demoLogin}>Log in as Demo User</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
