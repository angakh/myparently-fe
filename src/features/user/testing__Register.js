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
      {
        <div className="min-h-screen bg-base-200 flex items-center">
          <div className="card mx-auto w-full max-w-5xl  shadow-xl">
            <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
              <div className=''>
                <LandingIntro />
              </div>
              <div className='py-24 px-10'>
                <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                <form onSubmit={(e) => submitForm(e)}>

                  <div className="mb-4">

                    <InputText defaultValue={registerObj.name} updateType="name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

                    <InputText defaultValue={registerObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Email Id" updateFormValue={updateFormValue} />

                    <InputText defaultValue={registerObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Password" updateFormValue={updateFormValue} />

                  </div>

                  <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                  <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Register</button>

                  <div className='text-center mt-4'>Already have an account? <Link to="/login"><span className="  inline-block  hover:text-primary hover:underline hover:cursor-pointer transition duration-200">Login</span></Link></div>
                </form>
              </div>
            </div>
          </div>
        </div>
      }
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