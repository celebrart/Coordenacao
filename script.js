function enviar() {
    const nome = document.getElementById("nome").value;
    const curso = document.getElementById("curso").value;
    const assunto = document.getElementById("assunto").value;

    if (!nome || !curso || !assunto) {
        alert("Preencha todos os campos!");
        return;
    }

    // Gerar número do ticket
    const ticket = gerarTicket();

    // Enviar dados para o servidor fake (localStorage)
    const fila = JSON.parse(localStorage.getItem("fila")) || [];
    fila.push({
        nome: nome,
        curso: curso,
        assunto: assunto,
        ticket: ticket,
        horario: Date.now()
    });
    localStorage.setItem("fila", JSON.stringify(fila));

    // Mostrar ticket ao aluno
    document.getElementById("ticketBox").style.display = "block";
    document.getElementById("ticketBox").innerHTML = 
        "Seu Ticket é: <strong>" + ticket + "</strong>";

    // Mostrar POPUP
    document.getElementById("popup").style.display = "flex";
}

function gerarTicket() {
    let numero = Number(localStorage.getItem("ultimoTicket")) || 1;

    let ticket = "A" + numero.toString().padStart(3, "0");

    localStorage.setItem("ultimoTicket", numero + 1);

    return ticket;
}

function fecharPopup() {
    document.getElementById("popup").style.display = "none";
}
