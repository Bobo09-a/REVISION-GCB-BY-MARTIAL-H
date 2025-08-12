let questions = [];
const fileInput = document.getElementById('file-input');
const loadBtn = document.getElementById('load-questions');
const quizContainer = document.getElementById('quiz-container');

loadBtn.addEventListener('click', () => {
  const file = fileInput.files[0];
  if (!file) return alert('Sélectionnez un fichier JSON.');
  const reader = new FileReader();
  reader.onload = (e) => {
    questions = JSON.parse(e.target.result);
    afficherQuestion(0);
  };
  reader.readAsText(file);
});

function afficherQuestion(index) {
  if (index >= questions.length) {
    quizContainer.innerHTML = '<p>Révision terminée !</p>';
    return;
  }
  const q = questions[index];
  let html = `<p>${q.prompt}</p>`;
  if (q.type === 'mcq') {
    q.options.forEach((opt, i) => {
      html += `<button onclick="verifierReponse(${index}, ${i})">${opt}</button>`;
    });
  } else if (q.type === 'qa') {
    html += `<input type='text' id='reponse' /><button onclick="verifierReponseText(${index})">Valider</button>`;
  } else if (q.type === 'image') {
    html += `<img src='${q.imageUrl}' alt='Image question' style='max-width:100%' />`;
    html += `<input type='text' id='reponse' /><button onclick="verifierReponseText(${index})">Valider</button>`;
  }
  quizContainer.innerHTML = html;
}

function verifierReponse(index, choix) {
  if (choix === questions[index].answer) {
    alert('Bonne réponse !');
  } else {
    alert('Mauvaise réponse.');
  }
  afficherQuestion(index + 1);
}

function verifierReponseText(index) {
  const rep = document.getElementById('reponse').value.trim().toLowerCase();
  if (questions[index].answerText.map(a => a.toLowerCase()).includes(rep)) {
    alert('Bonne réponse !');
  } else {
    alert('Mauvaise réponse.');
  }
  afficherQuestion(index + 1);
}