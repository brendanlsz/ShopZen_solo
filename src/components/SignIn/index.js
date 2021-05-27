import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.scss";
import Buttons from "./../forms/Button";
import { signInWithGoogle, auth } from "./../../firebase/utils";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../forms/FormInput";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { email, password } = this.state;

    const configAuthWrapper = {
      headline: "Log In",
    };

    return (
      <AuthWrapper {...configAuthWrapper}>
        <p>Fill in the data below.</p>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={this.handleChange}
          />
          <p>
            Forgot password? Reset it <Link to="/recovery">here</Link>
          </p>
          <div className="form-button mt-3 d-flex justify-content-center">
            <Buttons id="submit" type="submit">
              Login
            </Buttons>
          </div>
          <div className="col-md-12 mt-3 d-flex justify-content-center">
            <button
              onClick={signInWithGoogle}
              type="button"
              class="btn btn-danger loginbtn mx-2 my-auto"
            >
              Login with Google
            </button>
            <button
              type="button"
              onClick={signInWithGoogle}
              className="btn btn-danger loginbtn mx-2"
            >
              <Link className="loginbtntext" to="/">
                Login with Facebook
              </Link>
            </button>
          </div>
          <hr></hr>
          <div className="d-flex justify-content-center">
            <p className="d-flex align-items-center flex-direction: column">
              Don't have an account?
            </p>
          </div>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-lg btn-warning" to="/registration">
              Register Here
            </Link>
          </div>

          {/* <div className="socialSignin">
                      <div className="row">
                        <Buttons onClick={signInWithGoogle}>
                          Sign in with Google
                        </Buttons>
                      </div>
                    </div> */}
          {/* <div className="links">
                      <Link to="/recovery">Reset Password</Link>
                    </div> */}
        </form>
      </AuthWrapper>
    );
  }
}

export default SignIn;
