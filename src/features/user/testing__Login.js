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
      {
        <div className="min-h-screen bg-base-200 flex items-center">
          <div className="card mx-auto w-full max-w-5xl  shadow-xl">
            <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
              <div className=''>
                <LandingIntro />
              </div>
              <div className='py-24 px-10'>
                <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                <form onSubmit={(e) => submitForm(e)}>

                  <div className="mb-4">

                    <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                    <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                  </div>

                  <div className='text-right text-primary'><Link to="/forgot-password"><span className="text-sm  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Forgot Password?</span></Link>
                  </div>

                  <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                  <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                  <div className='text-center mt-4'>Don't have an account yet? <Link to="/register"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Register</span></Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
    }
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