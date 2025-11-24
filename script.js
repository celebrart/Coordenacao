/* ------------------ FUNÇÕES DE ARMAZENAMENTO ------------------ */

// Carrega fila do localStorage
function carregarFila() {
    return JSON.parse(localStorage.getItem("filaAtendimento")) || [];
}

// Salva fila no localStorage
function salvarFila(fila) {
    localStorage.setItem("filaAtendimento", JSON.stringify(fila));
}

// Carrega contadores por curso
function carregarContadores() {
    return JSON.parse(localStorage.getItem("contadoresCursos")) || {};
}

// Salva contadores
function salvarContadores(cont) {
    localStorage.setItem("contadoresCursos", JSON.stringify(cont));
}


/* ------------------ GERAR SENHA (TELA DO ALUNO) ------------------ */

function gerarSenha() {
    let nome = document.getElementById("nome").value.trim();
    let curso = document.getElementById("curso").value;
    let assunto = document.getElementById("assunto").value;

    if (!nome || !curso || !assunto) {
        alert("Preencha todos os campos!");
        return;
    }

    let contadores = carregarContadores();
    let fila = carregarFila();

    // Inicia contador do curso se não existir
    if (!contadores[curso]) {
        contadores[curso] = 1;
    }

    // Gera senha com prefixo do curso + número
    let senha = curso + String(contadores[curso]).padStart(3, "0");

    // Incrementa contador
    contadores[curso]++;
    salvarContadores(contadores);

    // Adiciona aluno à fila
    fila.push({
        nome,
        curso,
        assunto,
        senha,
        hora: Date.now()
    });

    salvarFila(fila);

    // Exibe popup com a senha
    document.getElementById("senhaGerada").innerHTML =
        `<strong>${senha}</strong><br>${nome}<br>${assunto}<br><br>Aguarde ser chamado.`;

    abrirPopup();
}

function abrirPopup() {
    document.getElementById("popup").classList.remove("hidden");
}

function fecharPopup() {
    document.getElementById("popup").classList.add("hidden");

    // Limpa campos
    document.getElementById("nome").value = "";
    document.getElementById("curso").value = "";
    document.getElementById("assunto").value = "";
}


/* ------------------ PAINEL DA COORDENAÇÃO ------------------ */

function atualizarPainel() {
    const lista = document.getElementById("listaFila");
    if (!lista) return; // Página do aluno não tem painel

    const fila = carregarFila();

    lista.innerHTML = fila
        .map(a => 
            `<li class="item">
                <span class="senha">${a.senha}</span>
                <span>${a.nome} — ${a.assunto}</span>
            </li>`
        )
        .join("");
}

// Atualiza painel a cada 1s (tempo real)
setInterval(atualizarPainel, 1000);
atualizarPainel();


// Chamar aluno
function chamarAluno() {
    let fila = carregarFila();

    if (fila.length === 0) {
        alert("Nenhum aluno na fila.");
        return;
    }

    let chamado = fila.shift();
    salvarFila(fila);

    alert(`Chamando: ${chamado.senha} - ${chamado.nome}`);

    atualizarPainel();
}
