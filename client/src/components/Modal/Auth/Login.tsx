
import { useState, ChangeEvent, FormEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import "./login.css";
import { User, FormData, LoginData, LoginProps } from '../../../interfaces/interfaces';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../store/reducers/authSlice';
import { closeModal } from '../../../store/reducers/authModalSlice';
import { loginUser } from '../../../services/auth.services';
import { registerUser } from '../../../services/auth.services';
import { Modal, Button } from 'react-bootstrap';

export default function Login({ toggleView }: LoginProps) {
  const [isActive, setIsActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    status: true,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [showBanModal, setShowBanModal] = useState(false);
  const dispatch = useDispatch();

  const handleRegisterClick = () => {
    setIsActive(true);
  };

  const handleLoginClick = () => {
    setIsActive(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors: Partial<FormData> = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) tempErrors.email = "Email is required";
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is not valid";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const user = await registerUser({ ...formData, status: true });
        if (user) {
          alert('Registration successful');
          setIsActive(false);
        }
      } catch (error) {
        alert('Registration failed');
      }
    }
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginUser(loginData);
      if (user) {
        if (!user.status) {
          setShowBanModal(true);
          return;
        }
        alert('Login successful');
        dispatch(setUser(user));
        dispatch(closeModal());
        localStorage.setItem('user', JSON.stringify(user));

        // Check if the logged-in user is an admin
        if (user.id === 1111111111111) {
          
        }
      }
    } catch (error) {
      setLoginError('Invalid email or password');
    }
  };

  return (
    <div className='body-container'>
      <div className={isActive ? "container active" : "container"} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder='Name' onChange={handleChange} />
            {errors.name && <div className="error">{errors.name}</div>}
            <input type="email" name="email" placeholder='Email' onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
            <input type="password" name="password" placeholder='Password' onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
            <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={handleChange} />
            {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            <button>Register</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLoginSubmit}>
            <h1>Log In</h1>
            <div className="social-icons">
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faGoogle} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a href="#" className='icon'>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
            <span>or use your email and password</span>
            <input type="email" name="email" placeholder='Email' onChange={handleLoginChange} />
            <input type="password" name="password" placeholder='Password' onChange={handleLoginChange} />
            {loginError && <div className="error">{loginError}</div>}
            <a href="#">Forget Your Password?</a>
            <button>Log In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of the site features</p>
              <button className='' onClick={handleLoginClick} id='login'>Login</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of the site features</p>
              <button className='' onClick={handleRegisterClick} id='register'>Register</button>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showBanModal} onHide={() => setShowBanModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Account Banned</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been banned. Please contact support for more information.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBanModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}


