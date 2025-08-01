// importar o framework
const express=require('express');

// importando mais funcionalidades ( nativas do node.js ), fs-> File System -> lidar com sistemas de arquivos
const fs=require('fs');
// importando mais funcionalidades, path-> montar caminhos de arquivos seguros e compatíveis com todos os sistemas operacionais
const path=require('path');

// criar instância para usar o framework e suas ferramentas
const app=express();
// definindo uma porta para o acesso LOCALHOST
const PORT=3000;

// tradução das requisições feitas em JSON para JavaScript para o uso dos dados vindos do .json
app.use(express.json());

// definindo o nome correto base da API
const NOME_CORRETO="codelab";

// aparecer uma mensagem na web https://localhost:3000
app.get('/',(req,res)=>{
    res.send('API rodando!');
})

// verificando se o arquivo .json existe
if(!fs.existsSync('nomes.json')){
    // criando o arquivo nomes.json
    fs.writeFileSync('nomes.json',JSON.stringify({ corretos: [], incorretos: [] }));
}

// post
app.post('/nomes',(req,res)=>{
    // recebendo o nome pelo cliente
    const {nome} = req.body;

    // conversão de dados .json para dados manipuláveis em JavaScript
    const dados=JSON.parse(fs.readFileSync('nomes.json'));

    // verificação se o nome está correto ou não
    if(nome.toLowerCase()===NOME_CORRETO){
        // salvar os dados do nome correto
        dados.corretos.push({ nome, data: new Date().toISOString() });

        // avisando pelo terminal web que o nome está correto
        res.status(201).json({mensagem:"Nome correto!"});
    }

    else{
        // salvar os dados do nome incorreto
        dados.incorretos.push({ nome, data: new Date().toISOString() });

        // avisando pelo terminal web que o nome está incorreto
        res.status(201).json({mensagem:"Nome incorreto!"});
    }

    // salvando os nomes usados no arquivo nomes.json, sem filtros, com espaço de 2 para melhor legibilidade
    fs.writeFileSync('nomes.json',JSON.stringify(dados,null,2));
})

// iniciando o servidor local
app.listen(PORT,()=>
    console.log(`Servidor rodando na porta local http://localhost:${PORT}`)
);