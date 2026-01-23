import { useActionState } from "react";
import { useNavigate } from "react-router";

export default function Login(
    {onLogin,}
) {
    const navigate = useNavigate();

    const loginHandler = async (prevState, formData) => {
        const values = Object.fromEntries(formData);

        const email = values.email;
        if (!email) {
            return { error: 'Email is required', email: '' };
        }
        
        onLogin(email);
        navigate('/games');
        return values;
    };  

    const initialState = {
        email: '',
        password: '',
    }
    const [state, formAction, isPending] = useActionState(loginHandler, initialState);

    return (
        <section id="login-page" className="auth">
            <form id="login" action={formAction}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com" />

                    <label htmlFor="login-password">Password:</label>
                    <input type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" value="Login" />
                    <p className="field">
                        <span>If you don't have profile click <a href="#">here</a></span>
                    </p>
                </div>
            </form>
        </section>
    );
};