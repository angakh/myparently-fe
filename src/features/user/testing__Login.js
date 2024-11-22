import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Login() {
  const INITIAL_LOGIN_OBJ = {
    password: "",
    emailId: ""
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (loginObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)");
    if (loginObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)");

    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginObj)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token received from the server
        window.location.href = '/app/welcome'; // Redirect on successful login
      } else {
        setErrorMessage(data.message); // Show error message if login fails
      }
    } catch (error) {
      setErrorMessage("An error occurred during login");
    }
    setLoading(false);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLoginObj({ ...loginObj, [updateType]: value });
  };

  return (
    <div>
      {/* Your existing JSX code here */}
      <form onSubmit={submitForm}>
        {/* Input fields for email and password */}
        <InputText label="Email Id" value={loginObj.emailId} onChange={(value) => updateFormValue({ updateType: 'emailId', value })} />
        <InputText type="password" label="Password" value={loginObj.password} onChange={(value) => updateFormValue({ updateType: 'password', value })} />
        <ErrorText>{errorMessage}</ErrorText>
        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
      </form>
      <Link to="/register">Don't have an account? Register</Link>
    </div>
  );
}

export default Login;