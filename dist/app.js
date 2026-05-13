"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Produto_1 = require("./Produto");
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3000;
app.use(express_1.default.json());
const produtos = [];
function hellworld(req, res) {
    res.status(200).send('Hello World!!');
}
function filtraProdutoPorID(req, res) {
    try {
        let id = req.params.id;
        const produto = produtos.find((p) => p.id === id);
        res.status(200).json({ ID: id });
    }
    catch (e) {
        res.status(404).json({ Message: "Produto não encontrado" });
    }
}
function listarProdutos(req, res) {
    try {
        res.status(200).json(produtos);
    }
    catch (e) {
        res.status(404).json({ Message: "Não há nenhum produto cadastrado" });
    }
}
function novoProduto(req, res) {
    try {
        let data = req.body;
        if (!data.nome || !data.preco || !data.fabricante) {
            throw new Error("Favor enviar os valores corretos");
        }
        let produto = new Produto_1.Produto(1, data.nome, data.preco, data.fabricante);
        produtos.push(produto);
        res.status(201).json(produto);
    }
    catch (e) {
        res.status(400).json({ Message: "Necessário informar as informações do produto." });
    }
}
app.get('/API_PAPELARIA/Produto/:id', filtraProdutoPorID);
app.get('/API_PAPELARIA/Produto', listarProdutos);
app.post('/API_PAPELARIA/Produto', novoProduto);
app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));
