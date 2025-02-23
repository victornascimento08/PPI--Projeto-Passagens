import express from 'express';
import autenticar from './security/autenticar.js';
import { verificarAutenticacao, sair } from './security/autenticar.js';
import session from 'express-session';

const host = '0.0.0.0'; 
const porta = 2024;
const app = express();


app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'segredo', 
    resave: true,
    saveUninitialized: true,
    cookie: {  
        maxAge: 1000 * 60 * 15
    }
}));

app.use(express.static('./public'));
    


app.get('/inicial',(req, res) => {
    resposta.redirect('/inicio.html');
});

app.get('/logout', sair);

app.post('/inicio', autenticar);

app.use(verificarAutenticacao, express.static('./private'));



app.listen(porta, host, () => {
    console.log('Servidor rodando em http://${host}:${porta})');
})