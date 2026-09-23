document.getElementById('generateBtn').addEventListener('click', async () => {
  const notes = document.getElementById('notes').value;
  document.getElementById('output').innerText = 'Generating...';

  try {
    const response = await puter.ai.chat(
      "Turn these notes into 5 flashcards. Respond with ONLY a JSON array like [{\"front\":\"...\",\"back\":\"...\"}], nothing else. Notes: " + notes
    );

    const flashcards = JSON.parse(response.message.content);

    showFlashcards(flashcards);
  } catch (err) {
    document.getElementById('output').innerText = 'Error: ' + err;
  }
});

let deck = [];
let current = 0;

function showFlashcards(cards) {
  deck = cards;
  current = 0;
  document.getElementById('navButtons').style.display = 'block';
  renderCard();
}

function renderCard() {
  const card = deck[current];
  document.getElementById('output').innerHTML = `
    <div class="card" id="cardEl">
      <div class="question">${card.front}</div>
      <div class="answer">${card.back}</div>
    </div>
  `;
  document.getElementById('counter').innerText = `${current + 1} / ${deck.length}`;
  document.getElementById('cardEl').addEventListener('click', () => {
    document.getElementById('cardEl').classList.toggle('flipped');
  });
}

document.getElementById('prevBtn').addEventListener('click', () => {
  current = (current - 1 + deck.length) % deck.length;
  renderCard();
});

document.getElementById('nextBtn').addEventListener('click', () => {
  current = (current + 1) % deck.length;
  renderCard();
});