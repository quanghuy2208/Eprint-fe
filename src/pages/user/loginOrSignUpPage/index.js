import './style.scss';
import './function.js';

const LoginPage = () => {
    return ( 
    <>
                <div className="wrapper">
                    <div className="form-wrapper sign-up">
                        <form action="">
                            <h2 className='login-title'>Sign Up</h2>
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
                            <button type='summit' className='btn'>Sign Up</button>
                            <div className="sign-link">
                                <p> Already have an account?
                                    <a href="#" className='signIn-link'> Sign In</a>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="form-wrapper sign-in">
                        <form action="">
                            <h2 className='login-title'>Login</h2>
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
                            <button type='summit' className='btn'>Login</button>
                            <div className="sign-link">
                                <p> Don't have an account?
                                    <a href="" className='signUp-link'> Sign Up</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
    </>
    );
};
export default LoginPage;