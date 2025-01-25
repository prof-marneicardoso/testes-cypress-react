# Testes com Cypress no React

## 1. Introdução ao Cypress

### O que é Cypress?

Cypress é um framework de testes, moderno e fácil de usar, ideal para testar aplicações Web. Cypress roda no mesmo ambiente do navegador, oferecendo testes mais rápidos e confiáveis.

### Por que usar Cypress?

✅ Fácil instalação e configuração.  
✅ Depuração facilitada com ferramentas visuais.  
✅ Testes rápidos e confiáveis.

## 2. Configuração do Projeto React com Cypress

### Criando um projeto React com Vite
```
npm create vite@latest cypress-react
cd cypress-react
code .
npm install
```

### Instalando o Cypress

Instalar o Cypress como uma **devDependencies** (--save-dev)
```
npm install cypress --save-dev
```

## 3. Criando um Formulário de Login

Criar o arquivo **src/Login.js**
```jsx
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
```

No arquivo **src/App.js**
```js
import Login from './Login.jsx';

export default function App() {
    return (
        <div>
            <Login />    
        </div>
    );
};
```

## 4. Rodando os Testes

### 1️⃣ Rodar o React primeiro (em um terminal separado)
```
npm run dev
```

### 2️⃣ Rodar o Cypress (em outro terminal)
```
npx cypress open
```

## 5. Configurar o E2E Testing no Cypress

Ao rodar o Cypress, abrirá uma interface.

Como queremos testar uma aplicação React no navegador, devemos configurar o E2E Testing (End-to-End Testing).

### 1️⃣ Clique em "E2E Testing"

### 2️⃣ Clique em "Continue"
- O Cypress criará automaticamente o arquivo **cypress.config.js** na raiz do projeto.

### 3️⃣ Escolha o navegador para rodar os testes
- O Cypress mostrará os navegadores disponíveis no seu sistema (Chrome, Firefox, Edge, etc.).
- Selecione o navegador e clique em "Start E2E Testing in Chrome".

### 4️⃣ O Cypress abrirá uma nova interface
- Se for a primeira vez rodando testes, a pasta **cypress/** será criada na raíz do projeto

### 5️⃣ Criar a pasta e2e
- Se o Cypress não criar a pasta **e2e/**, crie-a dentro da pasta **cypress/**
- Dentro da pasta **e2e/** crie o arquivo **login.cy.js**
```js
describe("Testando o formulário de login", () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/');
    });

    it("Deve realizar login com credenciais", () => {
        cy.get('input[type=email]').type('teste@email.com');
        cy.get('input[type=password]').type('123456');
        cy.get('button').click();
        cy.contains("Login efetuado com sucesso!");
    });

    it("Deve exibir mensagem de erro com credenciais inválidas", () => {
        cy.get('input[type=email]').type('errado@email.com');
        cy.get('input[type=password]').type('000000');
        cy.get('button').click();
        cy.contains("Credenciais inválidas");
    });

    it("Deve exibir mensagem de erro quando os campos estiverem vazios", () => {
        cy.get('button').click();
        cy.contains("Preencha todos os campos");
    });
});
```

### 6️⃣ Rodar os testes
- Dentro da interface do Cypress, clique no teste **login.cy.js** para executá-lo.

Agora seu Cypress está configurado para testes E2E no seu projeto React! 🚀

---
### Se o React está rodando na porta 5173, precisamos alterar a configuração do Cypress.

No arquivo **login.cy.js**
```js
describe('Testando o formulário de login', () => {
    beforeEach(() => {
        // cy.visit('http://localhost:3000');
        cy.visit('http://localhost:5173');
    });
```

### Se o Cypress não conseguir encontrar o IP (localhost) então rode o React com o seguinte código:
```
npm run dev -- --host
```

O -- representa localhost
o --host pega o IP local e disponibiliza na rede
