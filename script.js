'use strict'

/**
 Função para criar a estrutura do card no DOM
 
 */
function criarCard(repositorio) {
    const galeria = document.getElementById('galeria')
    
    // Criando os elementos
    const card = document.createElement('div')
    card.classList.add('card-repositorio')

    const titulo = document.createElement('h3')
    titulo.classList.add('titulo')
    titulo.textContent = repositorio.name

    const descricao = document.createElement('p')
    descricao.classList.add('descricao')
    descricao.textContent = repositorio.description || "Sem descrição disponível."

    const link = document.createElement('a')
    link.classList.add('link-repo')
    link.href = repositorio.html_url
    link.target = "_blank"
    link.textContent = "Ver no GitHub"

    // Montando o card
    card.append(titulo, descricao, link)

    // Adicionando na galeria principal
    galeria.append(card)
}

/**
 * Função principal para carregar os dados da API
 */
async function carregarRepositorios() {
    const busca = document.getElementById('termoBusca').value.toLowerCase().trim()
    const galeria = document.getElementById('galeria')

    // Tratamento simples para termos comuns 
    const sinonimos = {
        "acessibilidade": "accessibility",
        "web": "frontend",
        "banco de dados": "database"
    }

    let termoFinal = busca
    if (sinonimos[busca]) {
        termoFinal = sinonimos[busca]
    }

    const url = `https://api.github.com/search/repositories?q=${termoFinal}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        // Limpa a galeria antes de novos resultados
        galeria.replaceChildren()

        if (data.items && data.items.length > 0) {
            
            data.items.slice(0,3).forEach(criarCard)
        } else {
            alert("Nenhum repositório encontrado para este termo!")
        }

    } catch (error) {
        alert("Erro ao buscar dados na API do GitHub!")
    }
}

// Evento de clique 
document.getElementById('pesquisar').addEventListener('click', carregarRepositorios)

