import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    function handleSubmit(evento) {
        evento.preventDefault();

        if (email === '' || password === '') {
            setError(true);
            setMessage('Preencha todos os campos');
            return;
        }

        if (email === 'teste@email.com' && password === '123456') {
            setMessage("Login efetuado com sucesso!");
            setError(false);
        
        } else {
            setMessage("Credenciais inválidas");
            setError(true);
        }
    }

    return(
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Informe seu e-mail"
                    value={email}
                    onChange={(evento) => setEmail(evento.target.value)} />
                
                <input
                    type="password"
                    placeholder="Informe sua senha"
                    value={password}
                    onChange={(evento) => setPassword(evento.target.value)} />
                
                <button type="submit">Entrar</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
