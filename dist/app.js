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
function filtraProdutoPorID(req, res) {
    try {
        let id = Number(req.params.id);
        const produto = produtos.find(p => p.id === id);
        if (!produto) {
            res.status(404).json({ Message: "Produto não encontrado" });
            return;
        }
        res.status(200).json(produto);
    }
    catch (e) {
        res.status(400).json({ Message: "Dados inválidos enviados pelo usuário" });
    }
}
function listarProdutos(req, res) {
    try {
        if (produtos.length === 0) {
            res.status(404).json({ Message: "Não há nenhum produto cadastrado" });
            return;
        }
        res.status(200).json(produtos);
    }
    catch (e) {
        res.status(500).json({ Message: "Erro interno da aplicação" });
    }
}
function novoProduto(req, res) {
    try {
        let data = req.body;
        const idExiste = produtos.find(p => p.id === data.id);
        if (data.preco <= 0) {
            throw new Error("O preço do produto deve ser maior que zero.");
        }
        if (idExiste) {
            throw new Error("Já existe um produto cadastrado com este ID.");
        }
        if (!data.id || !data.nome || !data.preco || !data.fabricante) {
            throw new Error("Para criar um produto novo é necessário informar o id, nome, preço e o fabricante");
        }
        let produto = new Produto_1.Produto(data.id, data.nome, data.preco, data.fabricante);
        produtos.push(produto);
        res.status(201).json(produto);
    }
    catch (e) {
        res.status(400).json({ Message: e.message });
    }
}
function atualizarProduto(req, res) {
    try {
        let id = Number(req.params.id);
        const produto = produtos.find(p => p.id === id);
        let newData = req.body;
        if (!produto) {
            res.status(404).json({ Message: "Produto não encontrado" });
            return;
        }
        if (newData.nome) {
            produto.nome = newData.nome;
        }
        if (newData.preco) {
            produto.preco = newData.preco;
        }
        if (newData.fabricante) {
            produto.fabricante.nome = newData.fabricante.nome;
            produto.fabricante.endereco.cidade = newData.fabricante.endereco.cidade;
            produto.fabricante.endereco.pais = newData.fabricante.endereco.pais;
        }
        res.status(200).json({ Message: "Produto Atualizado" });
    }
    catch (e) {
        res.status(400).json({ Message: "Dados inválidos enviados pelo usuário" });
    }
}
function removerProdutoPorID(req, res) {
    try {
        let id = Number(req.params.id);
        const produto = produtos.findIndex(p => p.id === id);
        if (produto === -1) {
            res.status(404).json({ Message: "Produto não encontrado" });
            return;
        }
        produtos.splice(produto, 1);
        res.status(200).json({ Message: "Produto Removido" });
    }
    catch (e) {
        res.status(400).json({ Message: "Dados inválidos enviados pelo usuário" });
    }
}
app.get('/Api_Papelaria/Produto/:id', filtraProdutoPorID);
app.get('/Api_Papelaria/Produto', listarProdutos);
app.post('/Api_Papelaria/Produto', novoProduto);
app.put('/Api_Papelaria/Produto/:id', atualizarProduto);
app.delete('/Api_Papelaria/Produto/:id', removerProdutoPorID);
app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));
