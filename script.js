
const data = [
    { attivita: "Gelateria", area: "Pavimenti", prodotto: "Sgrassatore pavimenti", codice: "53716000", descrizione: "Per superfici grasse, PVC, cucina laboratorio", formato: "Tanica 5L" },
    { attivita: "Gelateria", area: "Superfici alimentari", prodotto: "Sgrassatore disinfettante", codice: "53712500", descrizione: "Per inox, tavoli, contenitori, vetrine", formato: "Flacone 750ml" },
    { attivita: "Ristorante", area: "Bagni", prodotto: "Gel cloro", codice: "53714100", descrizione: "Igienizzante per servizi igienici", formato: "Tanica 5L" }
];

const attivitaSel = document.getElementById('attivita');
const areaSel = document.getElementById('area');
const tbody = document.querySelector('#results tbody');

const attivitaSet = new Set(data.map(d => d.attivita));
attivitaSet.forEach(val => {
    const opt = document.createElement('option');
    opt.value = opt.text = val;
    attivitaSel.appendChild(opt);
});

function filterData() {
    const att = attivitaSel.value;
    const area = areaSel.value;

    const areas = new Set(data.filter(d => !att || d.attivita === att).map(d => d.area));
    areaSel.innerHTML = '<option value="">-- Seleziona --</option>';
    areas.forEach(val => {
        const opt = document.createElement('option');
        opt.value = opt.text = val;
        areaSel.appendChild(opt);
    });

    const filtered = data.filter(d => (!att || d.attivita === att) && (!area || d.area === area));
    tbody.innerHTML = "";
    filtered.forEach(d => {
        const row = `<tr><td>${d.prodotto}</td><td>${d.codice}</td><td>${d.descrizione}</td><td>${d.formato}</td></tr>`;
        tbody.innerHTML += row;
    });
}
