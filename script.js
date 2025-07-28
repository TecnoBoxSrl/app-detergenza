
document.addEventListener("DOMContentLoaded", () => {
    const data = [
        { attivita: "Gelateria", area: "Pavimenti", prodotto: "Sgrassatore pavimenti", codice: "53716000", descrizione: "Per superfici grasse", formato: "5L" }
    ];

    const attivitaSel = document.getElementById("attivita");
    const areaSel = document.getElementById("area");
    const tbody = document.querySelector("#tabella-prodotti tbody");

    const attivita = [...new Set(data.map(item => item.attivita))];
    attivita.forEach(val => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = val;
        attivitaSel.appendChild(opt);
    });

    attivitaSel.addEventListener("change", updateAreas);
    areaSel.addEventListener("change", renderTable);

    function updateAreas() {
        const filtered = data.filter(d => d.attivita === attivitaSel.value);
        const aree = [...new Set(filtered.map(item => item.area))];
        areaSel.innerHTML = '<option value="">Seleziona area operativa</option>';
        aree.forEach(val => {
            const opt = document.createElement("option");
            opt.value = val;
            opt.textContent = val;
            areaSel.appendChild(opt);
        });
        renderTable();
    }

    function renderTable() {
        tbody.innerHTML = "";
        const filtered = data.filter(d => 
            (attivitaSel.value === "" || d.attivita === attivitaSel.value) &&
            (areaSel.value === "" || d.area === areaSel.value)
        );
        filtered.forEach(prod => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${prod.prodotto}</td>
                <td>${prod.codice}</td>
                <td>${prod.descrizione}</td>
                <td>${prod.formato}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
