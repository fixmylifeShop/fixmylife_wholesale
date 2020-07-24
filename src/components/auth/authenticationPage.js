import React, { useState, useEffect } from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { axiosWithoutAuth, axiosWithAuth } from "../config/axiosConfig";
import "../../CSS/authPage.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function AuthenticationPage() {
  const [credentials, setCredentials] = useState({});
  const [path, setPath] = useState();
  const [error, setError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      setError(false);
    }
    if (localStorage.getItem("login")) {
      history.push("/");
    }
  }, [path]);

  const handleChange = (e) => {
    if (error) {
      setError(false);
    }
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const auth = () => {
    axiosWithAuth()
      .post(`${path}`, credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        console.log(res.data);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setError("Invalid Credentials");
      });
  };
  console.log(credentials);

  const submitForm = (e) => {
    e.preventDefault();
    const { email, password, first_name, last_name, phone } = credentials;
    
    
    if (process.env.REACT_APP_ACCOUNT_PASSWORD === password) {
      localStorage.setItem("login", true)
      history.push("/");
    }
    // if (path == "/login" && (!email || !password)) {
    //   setError("Please wAll Text Fields");
    // }
    // if (
    //   (path == "/register" && !email) ||
    //   !password ||
    //   !first_name ||
    //   !last_name ||
    //   !phone
    // ) {
    //   setError("Please All Text Fields");
    // } else {
    // auth();
    // }
  };

  const newInput = (name, placeholder, type) => {
    return (
      <TextField
        id="standard-basic"
        label={placeholder}
        type={type}
        name={name}
        onChange={handleChange}
        className="authFormInput"
      />
    );
  };

  const form = () => {
    return (
      <form onSubmit={() => submitForm()} className="form">
        {/* {newInput("email", "Email")} */}
        {/* {path === "/register" ? newInput("first_name", "First Name") : ""}
        {path === "/register" ? newInput("last_name", "Last Name") : ""}
        {path === "/register" ? newInput("phone", "Phone") : ""} */}
        {newInput("password", "Password", "password")}

        <Button variant="contained" onClick={submitForm}>
          {path === "/register" ? "Sign Up" : "View Wholesale Shop"}
        </Button>
        <div className="formError">{error}</div>
      </form>
    );
  };
  return (
    <div className="authContainer">
      <Switch>
        <Route
          exact
          path="/auth"
          render={() => {
            setPath("/login");
            return (
              <div className="formContainer">
                <img
                  src="http://res.cloudinary.com/fixmylife/image/upload/v1595343387/isqkcfdhd6iuzwbghxtd.png"
                  className="authLogo"
                />
                {/* <h1>Wholesale Page</h1> */}
                {form()}
                <p className="formBottomText">
                  Don't have access?{" "}
                  <a href="http://www.fmlcycling.com/contact">Contact Us!</a>
                </p>
              </div>
            );
          }}
        />
        {/* <Route
          exact
          path="/auth/register"
          render={() => {
            setPath("/register");
            return (
              <div className="formContainer">
                <img
                  src="https://www.duranirving.com/static/media/cartoon.72f7f183.jpg"
                  className="authLogo"
                />
                {form()}
                <p className="formBottomText">
                  Already have an account? <Link to="/auth/">Log in!</Link>
                </p>
              </div>
            );
          }}
        /> */}
      </Switch>
    </div>
  );
}
