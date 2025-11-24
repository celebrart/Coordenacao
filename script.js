// --- IMPORTAÇÕES FIREBASE (MODULAR) ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

// --- CONFIG DO SEU FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyD-Jymhub4TY_gsIAfYnHBw6VoRDvHdfmY",
  authDomain: "fila-coordenacao.firebaseapp.com",
  projectId: "fila-coordenacao",
  storageBucket: "fila-coordenacao.firebasestorage.app",
  messagingSenderId: "302987735020",
  appId: "1:302987735020:web:af93f41a0210c98fd29ac9",
  measurementId: "G-DEYKDLMJ3E"
};

// --- INICIALIZA FIREBASE + FIRESTORE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase conectado com sucesso!");

// --- FUNÇÃO PARA GERAR A SENHA ---
async function gerarSenha() {
  const nomeInput = document.getElementById("nomeAluno");
  const nomeAluno = nomeInput.value.trim();

  if (nomeAluno === "") {
    alert("Digite seu nome, visse?");
    return;
  }

  try {
    // Criar a senha (formato S001, S002, S003...)
    const numeroSenha = "S" + Math.floor(1000 + Math.random() * 9000);

    // Salvar no Firestore
    await addDoc(collection(db, "senhas"), {
      nome: nomeAluno,
      senha: numeroSenha,
      status: "aguardando",
      horario: serverTimestamp()
    });

    // Exibir resultado
    const caixa = document.getElementById("resultadoSenha");
    caixa.innerHTML = `
      <h2>Sua senha é:</h2>
      <span style="font-size:40px; font-weight:bold;">${numeroSenha}</span>
      <p>Aguarde ser chamado no painel.</p>
    `;

    nomeInput.value = "";

  } catch (error) {
    console.error("Erro ao gerar senha:", error);
    alert("Eita, garotão... fiquei feidada aqui. Deu erro ao gerar a senha.");
  }
}

// --- LIGA O BOTÃO AO SISTEMA ---
document.getElementById("btnGerarSenha").addEventListener("click", gerarSenha);
