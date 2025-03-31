import express from 'express';
import autenticar from './security/autenticar.js';
import { verificarAutenticacao, sair } from './security/autenticar.js';
import session from 'express-session';

const porta = 3000;
const localhost = "0.0.0.0"; 

const app = express();


app.use(session({
    secret: "m1Nh4Ch4v3S3cR3t4", 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15 
    }
}));




app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
})

app.post("/login",(requisicao, resposta) => {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario === "admin" && senha === "admin") {
        requisicao.session.autenticado = true;
        resposta.redirect('/menu.html');
    } else {
        resposta.redirect('/login.html');
    }
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy();
    resposta.redirect('/login.html');
})

app.use(express.static("./publico"));

app.listen(porta, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${porta}`);
});