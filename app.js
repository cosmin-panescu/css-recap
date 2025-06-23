function pad(n) {
  return n < 10 ? "0" + n : n;
}

function generateBiletCode() {
  // 1. Determină ziua săptămânii
  // getDay(): 0 - Duminică, 1 - Luni, ..., 6 - Sâmbătă
  const weekday = new Date().getDay();
  let prefix = "0";
  switch (weekday) {
    case 0:
      prefix = "0";
      break; // Duminică
    case 1:
      prefix = "1";
      break; // Luni
    case 2: // Marți
    case 4: // Joi
    case 6:
      prefix = "2";
      break; // Sâmbătă
    case 3:
      prefix = "3";
      break; // Miercuri
    case 5:
      prefix = "5";
      break; // Vineri
  }

  // 2. Numărul din mijloc: 7 cifre, prima cifră ≠ 0
  let middle = Math.floor(Math.random() * 9000000) + 1000000; // 1000000..9999999

  // 3. Ultima cifră: 0-9
  let sufix = Math.floor(Math.random() * 10);

  return `${prefix}-${middle}-${sufix}`;
}

function calculeazaExpirare() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 90);
  return `${pad(now.getDate())}/${pad(
    now.getMonth() + 1
  )}/${now.getFullYear()} ora ${pad(now.getHours())}:${pad(now.getMinutes())}`;
}

function genereazaMesajBilet() {
  const cod = generateBiletCode();
  const dataExp = calculeazaExpirare();
  return `Biletul pe liniile metropolitane a fost activat. Valabil pana in ${dataExp}. Cost 0.65 EUR+TVA . Cod ${cod}. <br/>Detalii 021-9391 <br/>Calatorie placuta!`;
}

function adaugaMesaj(text, tip) {
  const mesaj = document.createElement("div");
  mesaj.className = "message " + tip;
  mesaj.innerHTML = text.replace(/\n/g, "<br>");
  document.getElementById("messages").appendChild(mesaj);
  document.getElementById("messages").scrollTop =
    document.getElementById("messages").scrollHeight;
}

document.getElementById("sms-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const mesajInput = document.getElementById("sms-input");
  const textTrimis = mesajInput.value.trim();
  if (!textTrimis) return;

  adaugaMesaj(textTrimis, "user");
  mesajInput.value = "";

  setTimeout(() => {
    adaugaMesaj(genereazaMesajBilet(), "received");
  }, 500);
});

function adaugaDividerTodayCurent() {
  const now = new Date();
  const h = pad(now.getHours()),
    m = pad(now.getMinutes());
  const divider = document.createElement("div");
  divider.className = "message-divider";
  divider.textContent = `Today ${h}:${m}`;
  document.getElementById("messages").appendChild(divider);
}

// La încărcarea paginii, după ce DOM-ul e gata:
window.addEventListener("DOMContentLoaded", function () {
  adaugaDividerTodayCurent();
});
