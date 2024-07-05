import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import  { useState, ChangeEvent, FormEvent } from 'react';
import "./login.css";

interface User {
    id: number;
    userName: string;
    email: string;
    name: string;
    password:string;
    avatar: string;
    banner: string;
    bio: string;
    follows: any[];
    friends: any[];
    groups: any[];
    created_at: string;
}

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginData {
    email: string;
    password: string;
}

export default function Login() {
    const [isActive, setIsActive] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [loginData, setLoginData] = useState<LoginData>({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');

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
                const response = await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...formData,
                        id: Date.now(),  // generate unique ID
                        userName: formData.name.toLowerCase().replace(/\s+/g, '_'),
                        avatar: '',
                        banner: '',
                        bio: '',
                        follows: [],
                        friends: [],
                        groups: [],
                        created_at: new Date().toISOString()
                    })
                });
                if (response.ok) {
                    alert('Registration successful');
                    setIsActive(false);
                } else {
                    alert('Registration failed');
                }
            } catch (error) {
                console.error('Error:', error);
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
            const response = await fetch('http://localhost:8080/users');
            const users: User[] = await response.json();
            const user = users.find(user => user.email === loginData.email && user.password === loginData.password);
            if (user) {
                alert('Login successful');
            } else {
                setLoginError('Invalid email or password');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className='body-container'>
                <div className={isActive ? "container active" : "container"} id="container">
                    <div className="form-container sign-in">
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
                    <div className="form-container sign-up">
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
            </div>
        </>
    );
}
