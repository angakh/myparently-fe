import { useState } from 'react';
import { Link } from 'react-router-dom';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';

function Register() {
  const INITIAL_REGISTER_OBJ = {
    name: "",
    password: "",
    emailId: ""
  };

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (registerObj.name.trim() === "") return setErrorMessage("Name is required! (use any value)");
    if (registerObj.emailId.trim() === "") return setErrorMessage("Email Id is required! (use any value)");
    if (registerObj.password.trim() === "") return setErrorMessage("Password is required! (use any value)");

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerObj)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Store the token received from the server
        window.location.href = '/app/welcome'; // Redirect on successful registration
      } else {
        setErrorMessage(data.message); // Show error message if registration fails
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration");
    }
    setLoading(false);
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setRegisterObj({ ...registerObj, [updateType]: value });
  };

  return (
    <div>
      {/* Your existing JSX code here */}
      <form onSubmit={submitForm}>
        {/* Input fields for name, email, and password */}
        <InputText label="Name" value={registerObj.name} onChange={(value) => updateFormValue({ updateType: 'name', value })} />
        <InputText label="Email Id" value={registerObj.emailId} onChange={(value) => updateFormValue({ updateType: 'emailId', value })} />
        <InputText type="password" label="Password" value={registerObj.password} onChange={(value) => updateFormValue({ updateType: 'password', value })} />
        <ErrorText>{errorMessage}</ErrorText>
        <button type="submit" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Register;