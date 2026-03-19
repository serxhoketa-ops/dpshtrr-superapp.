// ==========================
// 1000 MJETE TE PARA-NGARKUARA
// ==========================
let SAMPLE_DATA = [];
for (let i = 1; i <= 1000; i++) {
  SAMPLE_DATA.push({
    targa: "AA" + i.toString().padStart(4, "0") + "BB",
    vin: "VIN" + i.toString().padStart(8, "0"),
    lloji: "Autoveturë",
    data: "2026-01-01",
    personi: "Test",
    statusi: "Në Arkiv"
  });
}

// ==========================
// LOCAL STORAGE LOAD
// ==========================
let teDhenat = JSON.parse(localStorage.getItem("dpshtrr_data")) || SAMPLE_DATA;
let historiku = JSON.parse(localStorage.getItem("dpshtrr_history")) || [];

// ==========================
// SAVE FUNCTION
// ==========================
function save() {
  localStorage.setItem("dpshtrr_data", JSON.stringify(teDhenat));
  localStorage.setItem("dpshtrr_history", JSON.stringify(historiku));
}

// ==========================
// RIFRESKO TABELEN & HISTORIKUN
// ==========================
function rifresko() {
  let tbody = document.querySelector("#tabela tbody");
  tbody.innerHTML = "";

  teDhenat.forEach(r => {
    tbody.innerHTML += `
      <tr>
        <td>${r.targa}</td>
        <td>${r.vin}</td>
        <td>${r.lloji}</td>
        <td>${r.data}</td>
        <td>${r.personi}</td>
        <td>${r.statusi}</td>
      </tr>`;
  });

  let h = document.getElementById("historiku");
  h.innerHTML = "";
  historiku.forEach(e => {
    h.innerHTML += `<li>${e}</li>`;
  });

  save();
}

// ==========================
// FUNKSIONET
// ==========================
function regjistro() {
  let obj = {
    targa: targa.value,
    vin: vin.value,
    lloji: lloji.value,
    data: data.value,
    personi: personi.value,
    statusi: statusi.value
  };

  teDhenat.push(obj);
  historiku.push("U regjistrua mjeti: " + obj.targa);

  rifresko();
}

function kerko() {
  let q = prompt("Shkruaj targën ose VIN:");
  let result = teDhenat.filter(r => r.targa.includes(q) || r.vin.includes(q));
  alert("U gjetën " + result.length + " rezultate");
}

function eksportExcel() {
  let csv = "Targa,VIN,Lloji,Data,Personi,Statusi\n";
  teDhenat.forEach(r => {
    csv += `${r.targa},${r.vin},${r.lloji},${r.data},${r.personi},${r.statusi}\n`;
  });

  let blob = new Blob([csv], { type: "text/csv" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "raport_dpshtrr.csv";
  a.click();
}

function fshiTeDhenat() {
  teDhenat = [];
  historiku.push("U fshinë të gjitha të dhënat");
  rifresko();
}

// ==========================
// START
// ==========================
rifresko();
