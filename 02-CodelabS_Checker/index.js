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
// definindo o array de sílabas, 'b' como sílaba para ter mais opções de resultado
const SILABAS=['co','de','la','b'];

// tradução das requisições feitas em JSON para JavaScript para o uso dos dados vindos do .json
app.use(express.json());

// definindo os nomes corretos base da API
let nomes_corretos=JSON.parse(fs.readFileSync('nomes_corretos.json'));

// aparecer uma mensagem na web https://localhost:3000
app.get('/',(req,res)=>{
    res.send('API rodando!');
})

// verificando se o arquivo .json existe
if(!fs.existsSync('corretos.json')){
    // criando o arquivo nomes.json
    fs.writeFileSync('corretos.json',JSON.stringify({ corretos: [], qntd_corretos: 0}));
}

// verificando se o arquivo .json existe
if(!fs.existsSync('incorretos.json')){
    // criando o arquivo nomes.json
    fs.writeFileSync('incorretos.json',JSON.stringify({ incorretos: [], qntd_incorretos: 0}));
}

// post
app.post('/verificar',(req,res)=>{
    // recebendo o nome pelo cliente
    const {nome} = req.body;

    let nomes = Array.isArray(nome) ? nome : [nome];

    // conversão de dados .json para dados manipuláveis em JavaScript
    const dados_corretos=JSON.parse(fs.readFileSync('corretos.json'));
    const dados_incorretos=JSON.parse(fs.readFileSync('incorretos.json'));

    // verificação se o nome está correto ou não ( verificando na lista )
    if(nomes_corretos.nomes_corretos.includes(nome.toLowerCase())){
        // salvar os dados do nome correto
        dados_corretos.corretos.push({ nome, data: new Date().toISOString() });
        dados_corretos.qntd_corretos+=1;

        // avisando pelo terminal web que o nome está correto
        res.status(201).json({mensagem:"Nome correto!"});
        fs.writeFileSync('corretos.json',JSON.stringify(dados_corretos,null,2));
    }

    else{
        // salvar os dados do nome incorreto
        // nessa etapa não estou fazendo a contagem de cada um dos nomes incorretos por uma questão de aprendizado ( melhor explicado na função app.get('/estatisticas/erros'...))
        dados_incorretos.incorretos.push({ nome, data: new Date().toISOString() });
        dados_incorretos.qntd_incorretos+=1;

        // avisando pelo terminal web que o nome está incorreto
        res.status(201).json({mensagem:"Nome incorreto!"});
        fs.writeFileSync('incorretos.json',JSON.stringify(dados_incorretos,null,2));
    }

})

app.post('/nomes/validos',(req,res)=>{
    const { nome }=req.body;

    // verificar se nome já é um array, se não, transformá-lo em um
    const nomes=Array.isArray(nome) ? nome:[nome]; //-> nomes recebe o "nome" enviado pelo cliente sempre em array

    // lendo o arquivo novamente para garantir que desde a primeira interação ( quando o servidor foi iniciado ) o "banco de dados" continue atualizado com a versão mais recente
    let arquivo=fs.readFileSync('nomes_corretos.json');

    // traduzindo do .json para .js
    let dados = JSON.parse(arquivo);

    // para cada nomes_corretos serão convertidos para letras minúsculas
    dados.nomes_corretos=dados.nomes_corretos.map(n=>n.toLowerCase());

    // verificar se os novos nomes já não existem
    nomes.forEach(n=>{
        if(!dados.nomes_corretos.includes(n.toLowerCase())){
            dados.nomes_corretos.push(n.toLowerCase());
        }
    })

    console.log("Nomes finais para salvar:", dados.nomes_corretos);

    fs.writeFileSync('nomes_corretos.json',JSON.stringify(dados,null,2));

    res.status(200).json({
        mensagem:'Nomes adicionados com sucesso!',
        nomes_corretos:dados.nomes_corretos
    })

})

app.get('/nomes/aleatorio',(req,res)=>{
    let nome='';
    for(let i=0;i<(SILABAS.length+1);i++){ //SILABAS.lenght+1 garante que todos os nomes aleatorios que irão surgir são errados ( em comparação com o nome original 'codelab' )
        const indice=Math.floor(Math.random()*SILABAS.length);
        nome=nome+SILABAS[indice];
    }

    // resposta
    res.status(200).json(
        {
            nome,
            mensagem: 'Nome gerado com sucesso!'
        });
})

//optei por uma abordagem que não estivesse contando os incorretos um por um a partir dos erros dos usuários por que isso parte do princípio de que o arquivo incorretos.json não teria nenhum item antes
//então decidi fazer realmente a contagem de cada um dos objetos dentro do arquivo incorretos.json imaginando ser algo que não pudéssemos apagar ( existem outras formas também mas essa foi focada num aprendizado de mais ferramentas )
app.get('/estatisticas/erros',(req,res)=>{
    //leitura e conversão de dados do incorretos.json para dados em JS para serem utilizados
    const dados=JSON.parse(fs.readFileSync('incorretos.json'));

    //armazenar o nome e a contagem de cada item
    const contagem={};
    
    //para cada item do array dados.incorretos ( que armazena os nomes incorretos que os usuários tentaram )
    //vamos fazer a contagem
    dados.incorretos.forEach(item=>{
        //padronização tomada desde o início do código para letras somente minúsculas para a comparação entre os nomes
        const nome=item.nome.toLowerCase();

        if(contagem[nome]){
            contagem[nome]++;
        }
        else{
            contagem[nome]=1;
        }

    })

    //transformando o contagem ( objeto literal ) em um array com duas informações: nome e quantidade de vezes em que aparece
    const pares_info= Object.entries(contagem);

    pares_info.sort((a,b)=>b[1]-a[1]); //método de ordenação bubble, do maior pro menor ( ordem decrescente )
    
    //separar somente os 5 valores mais frequentes e exibí-los
    const top5=pares_info.slice(0,5);

    res.status(200).json({
        mensagem:'Estatística gerada com sucesso:',
        top5: top5
    })

})

// iniciando o servidor local
app.listen(PORT,()=>
    console.log(`Servidor rodando na porta local http://localhost:${PORT}`)
);