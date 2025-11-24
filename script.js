// Carregar fila
function carregarFila() {
    return JSON.parse(localStorage.getItem("filaAtendimento") || "[]");
}

// Salvar fila
function salvarFila(fila) {
    localStorage.setItem("filaAtendimento", JSON.stringify(fila));
}

// Gerar senha
function gerarSenha() {
    const nome = document.getElementById("nome").value;
    const curso = document.getElementById("curso").value;
    const assunto = document.getElementById("assunto").value;

    if (!nome || !curso || !assunto) {
        alert("Preencha todos os campos!");
        return;
    }

    let fila = carregarFila();

    const prefixo = curso;
    const numero = String(fila.length + 1).padStart(3, "0");
    const senha = prefixo + numero;

    const aluno = {
        nome,
        curso,
        assunto,
        senha,
        hora: Date.now()
    };

    fila.push(aluno);
    salvarFila(fila);

    document.getElementById("senhaGerada").innerText = 
        `Sua senha é: ${senha}\nAguarde ser chamado.`;

    document.getElementById("popup").classList.remove("hidden");
}

// Fechar popup
function fecharPopup() {
    document.getElementById("popup").classList.add("hidden");
}

// Painel - Listar fila
function atualizarPainel() {
    const lista = document.getElementById("listaFila");
    if (!lista) return;

    const fila = carregarFila();
    
    lista.innerHTML = fila.map(a => 
        `<li><strong>${a.senha}</strong> - ${a.nome} (${a.assunto})</li>`
    ).join("");
}

setInterval(atualizarPainel, 1000);
atualizarPainel();

// Chamar aluno
function chamarAluno() {
    let fila = carregarFila();
    if (fila.length === 0) {
        alert("Nenhum aluno na fila.");
        return;
    }

    const chamado = fila.shift();
    salvarFila(fila);

    alert(`Chamando: ${chamado.senha} - ${chamado.nome}`);

    atualizarPainel();
}
