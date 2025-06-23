function pad(n) {
  return n < 10 ? "0" + n : n;
}

function generateBiletCode() {
  const prefix = "2-";
  const sufix = "-4";
  const now = Date.now();
  const random = Math.floor(Math.random() * 100000);
  const codeNumber = ((now % 9000000) + random) % 9000000;
  return `${prefix}${codeNumber}-${sufix[1]}`;
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
  return `Biletul pe liniile metropolitane a fost activat. Valabil pana in ${dataExp}. Cost 0.65 EUR+TVA . Cod ${cod}. Detalii 021-9391 Calatorie placuta!`;
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
  mesajInput.value = "c";

  setTimeout(() => {
    adaugaMesaj(genereazaMesajBilet(), "received");
  }, 500);
});
