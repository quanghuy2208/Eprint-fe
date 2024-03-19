import React, { useRef } from 'react';
import './style.scss';

const LoginPage = () => {
  const wrapperRef = useRef(null);

  const handleSignInClick = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('animate-signUp');
      wrapperRef.current.classList.remove('animate-signIn');
    }
  };
  const handleSignUpClick = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('animate-signIn');
      wrapperRef.current.classList.remove('animate-signUp');
    }
  };
  return (
    <div className="login-background">
      <div className="wrapper" ref={wrapperRef}>
        <div className="form-wrapper sign-up">
          <form action="">
            <h2 className="login-title">Sign Up</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor=""> Username</label>
            </div>
            <div className="input-group">
              <input type="email" required />
              <label htmlFor="">Email</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label htmlFor=""> Password</label>
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="sign-link">
              <p>
                {' '}
                Already have an account?
                <a href="#" className="signIn-link" onClick={handleSignInClick}>
                  {' '}
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="form-wrapper sign-in">
          <form action="">
            <h2 className="login-title">Login</h2>
            <div className="input-group">
              <input type="text" required />
              <label htmlFor=""> Username</label>
            </div>
            <div className="input-group">
              <input type="password" required />
              <label htmlFor=""> Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password ?</a>
            </div>

            <button type="submit" className="btn">
              Login
            </button>

            <div className="sign-link">
              <p>
                {' '}
                Don't have an account?
                <a href="#" className="signUp-link" onClick={handleSignUpClick}>
                  {' '}
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
