import React, { useRef, useState } from 'react';
import './style.scss';
import axios from 'axios';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState('');
  const wrapperRef = useRef(null);

  const sendOtp = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Vui lòng nhập địa chỉ email.");
      return;
    }
    try {
      const res = await axios.post(`https://eprint-be.onrender.com/api/express/generateOtp`, { email: email });
  
      if (res.data.status === 'OK') {
        alert('Mã OTP đã được gửi vào email của bạn.');
        setOtpSent(true);
        setOtpMessage('');
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi trong khi gửi mã OTP:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  const handleOtpChange = async (e) => {
    const enteredOtp = e.target.value;
    setOtp(enteredOtp);

    if (enteredOtp.length === 6) {
      try {
        const res = await axios.post(`https://eprint-be.onrender.com/api/express/validateOtp`, { userInput: enteredOtp });

        if (res.data.status === 'OK') {
          setOtpMessage('Mã OTP hợp lệ!');
        } else {
          setOtpMessage('Mã OTP không hợp lệ!');
        }
      } catch (error) {
        console.error('Đã xảy ra lỗi trong khi xác minh mã OTP:', error);
        setOtpMessage('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } else {
      setOtpMessage('');
    }
  };

  const signUp = async (event) => {
    event.preventDefault();

    if (otpMessage !== 'Mã OTP hợp lệ!') {
      alert('Vui lòng nhập mã OTP hợp lệ trước khi đăng ký.');
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-up`, {
        name: userName,
        email: email,
        password: password,
        level: "copper"
      });

      if (res.data.status === 'OK') {
        alert('Đăng ký thành công!');
        handleSignInClick();
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi trong khi đăng ký:', error);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/sign-in`, {
        email: email,
        password: password,
      });

      if (res.data.status === 'OK') {
        const userData = {
          email: email,
          accessToken: res.data.access_token,
          refreshToken: res.data.refresh_token,
          isAdmin: res.data.isAdmin,
        };

        localStorage.setItem('user', JSON.stringify(userData));

        const searchRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-details-by-email`, {
          params: {
            email: email,
          },
        });

        if (searchRes.data.status === 'OK') {
          userData.name = searchRes.data.data.name;
          localStorage.setItem('user', JSON.stringify(userData));
          window.location.href = '/';
        } else {
          console.error('Đã xảy ra lỗi trong khi tìm kiếm người dùng bằng email:', searchRes.data.message);
        }
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error('Đã xảy ra lỗi trong khi đăng nhập:', error);
    }
  };

  const handleSignInClick = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('animate-signIn');
      wrapperRef.current.classList.remove('animate-signUp');
    }
  };

  const handleSignUpClick = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.add('animate-signUp');
      wrapperRef.current.classList.remove('animate-signIn');
    }
  };

  return (
    <div className="login-background">
      <div className="wrapper" ref={wrapperRef}>
        <div className="form-wrapper sign-up">
          <form onSubmit={signUp}>
            <h2 className="login-title">Sign Up</h2>
            <div className="input-group">
              <input type="text" required value={userName} onChange={e => setUserName(e.target.value)} />
              <label htmlFor=""> Username</label>
            </div>
            <div className="input-group">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <label htmlFor="">Email</label>
            </div>
            <button type="button" className="btn" onClick={sendOtp}>
              {otpSent ? 'Resend OTP' : 'Send OTP'}
            </button>
            <div className="input-group">
              <input
                type="text"
                required
                value={otp}
                onChange={handleOtpChange}
                maxLength={6}
              />
              <label htmlFor=""> OTP code</label>
            </div>
            {otpMessage && <p className={otpMessage === 'Mã OTP hợp lệ!' ? 'otp-valid' : 'otp-invalid'}>{otpMessage}</p>}
            <div className="input-group">
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor=""> Password</label>
            </div>
            <button type="submit" className="btn">
              Sign Up
            </button>
            <div className="sign-link">
              <p>
                Already have an account?
                <a href="#" className="signIn-link" onClick={handleSignInClick}>
                  Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
        <div className="form-wrapper sign-in">
          <form onSubmit={signIn}>
            <h2 className="login-title">Login</h2>
            <div className="input-group">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
              <label htmlFor=""> Email</label>
            </div>
            <div className="input-group">
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              <label htmlFor=""> Password</label>
            </div>
            <div className="forgot-pass">
              <a href="#">Forgot Password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="sign-link">
              <p>
                Don't have an account?
                <a href="#" className="signUp-link" onClick={handleSignUpClick}>
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
