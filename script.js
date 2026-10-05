// ===== عدّل هنا =====
const PHONE = "201108302815"; // رقمك بصيغة دولية بدون + أو صفر
const CURRENCY = "جنيه";
// p = السعر الرسمي للشحنة. لو سبته 0 هيظهر "اسأل عن السعر"
const GAMES = {
  "فري فاير": { unit: "جوهرة", packs: [{n:100,p:0},{n:310,p:0},{n:520,p:0},{n:1060,p:0},{n:2180,p:0}] },
  "ببجي موبايل": { unit: "UC", packs: [{n:60,p:0},{n:325,p:0},{n:660,p:0},{n:1800,p:0},{n:3850,p:0}] },
  "بلود سترايك": { unit: "ذهب", packs: [{n:100,p:0},{n:500,p:0},{n:1000,p:0},{n:2000,p:0}] }
};
// =====================

let game = Object.keys(GAMES)[0];
let pack = null;
const $ = id => document.getElementById(id);

function renderTabs() {
  $("tabs").innerHTML = "";
  Object.keys(GAMES).forEach(g => {
    const b = document.createElement("button");
    b.className = "tab";
    b.textContent = g;
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", g === game);
    b.onclick = () => { game = g; pack = null; renderTabs(); renderPacks(); };
    $("tabs").appendChild(b);
  });
}

function renderPacks() {
  const G = GAMES[game];
  $("packs").innerHTML = "";
  G.packs.forEach(k => {
    const b = document.createElement("button");
    b.className = "pack";
    b.setAttribute("aria-pressed", pack === k);
    b.innerHTML = `<b>${k.n} ${G.unit}</b><small>${k.p ? k.p + " " + CURRENCY : "اسأل عن السعر"}</small>`;
    b.onclick = () => { pack = k; renderPacks(); };
    $("packs").appendChild(b);
  });
}

$("send").onclick = () => {
  const id = $("pid").value.trim();
  const name = $("pname").value.trim();
  if (!pack) { $("err").textContent = "اختر الشحنة الأول."; return; }
  if (!id) { $("err").textContent = "اكتب ID اللاعب."; return; }
  $("err").textContent = "";
  const G = GAMES[game];
  const msg = `طلب شحن جديد - Medo Gaming Store\nاللعبة: ${game}\nالشحنة: ${pack.n} ${G.unit}\nالسعر: ${pack.p ? pack.p + " " + CURRENCY : "حسب السعر الرسمي"}\nID اللاعب: ${id}\nالاسم: ${name || "-"}`;
  window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
};

renderTabs();
renderPacks();
