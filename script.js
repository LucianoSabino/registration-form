'use strict'

const limparFomulrio = (endereco) => {
    //Imprimindo na tela as informação
    //endereco.logradouro:  endereco e o atributo que eu passo e o 
    //logradouro é o nome que a api passa para pega a informação do objeto
    //Como saber é so olha na documentação ou da  console.log antes do tratamento final 
    document.getElementById('endereco').value = ' ';
    document.getElementById('bairro').value = ' ';
    document.getElementById('cidade').value = ' ';
    document.getElementById('estado').value = ' ';
    document.getElementById('numero').value = ' ';
}

const preencherFormulario = (endereco) => {
    //Imprimindo na tela as informação
    //endereco.logradouro:  endereco e o atributo que eu passo e o 
    //logradouro é o nome que a api passa para pega a informação do objeto
    //Como saber é so olha na documentação ou da  console.log antes do tratamento final 
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
    document.getElementById('numero').value = endereco.ibge;
}

///^[0-9]$/ preção regular
const eNumero = (numero) => /^[0-9]+$/.test(numero)

const cepValido = (cep) => cep.length == 8 && eNumero(cep);

const pesquisarCep = async() => {
    limparFomulrio();
    const cep = document.getElementById('cep').value;

    //Pegando a url do saite viaCep e colacando o cep que o usuario digitar 
    const url = `https://viacep.com.br/ws/${cep}/json/`

    //Sabendo se o cep tem munero a mais ou a menos ou se tem letra
    if (cepValido(cep)) {
        // Usando JSON tem dois jeito de usar 
        //jeito 1
        //fetch(url).then(response => response.json()).then(console.log);
        //jeito 2 coloca async e await
        const dados = await fetch(url);
        const endereco = await dados.json();
        
        //Sabendo se o cep é valido
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!'
        } else {
            preencherFormulario(endereco);
        }
    } else {
        document.getElementById('endereco').value = 'CEP não encontrado!'
    }
}

document.getElementById('cep').addEventListener('focusout', pesquisarCep);