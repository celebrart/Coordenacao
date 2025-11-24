function retirarSenha() {
    const nome = document.getElementById("nome").value.trim();
    const assunto = document.getElementById("assunto").value;
    const curso = document.getElementById("curso").value;
    const preferencial = document.getElementById("preferencial").value === "sim";

    if (!nome) {
        alert("Digite seu nome!");
        return;
    }

    // Recupera fila atual
    let fila = JSON.parse(localStorage.getItem("fila_atendimento") || "[]");

    // Cria nova senha
    const senha = {
        id: Date.now(),
        nome,
        assunto,
        curso,
        preferencial,
        horaEntrada: Date.now()
    };

    fila.push(senha);

    // Salva a fila
    localStorage.setItem("fila_atendimento", JSON.stringify(fila));

    alert("Senha registrada com sucesso!");
    document.getElementById("nome").value = "";
}
