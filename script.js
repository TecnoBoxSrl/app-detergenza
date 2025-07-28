
document.addEventListener("DOMContentLoaded", () => {
    const attivitaSel = document.getElementById("attivita");
    const areaSel = document.getElementById("area");
    const tbody = document.querySelector("#tabella-prodotti tbody");

    let data = [];

    fetch("https://docs.google.com/spreadsheets/d/16nAQNl8NAI8x1OHJjkw4qNdj05Axh0CN/gviz/tq?tqx=out:json")
        .then(res => res.text())
        .then(rep => {
            const json = JSON.parse(rep.substring(47).slice(0, -2));
            const rows = json.table.rows;
            data = rows.map(row => {
                const cells = row.c;
                return {
                    attivita: cells[0]?.v || "",
                    area: cells[1]?.v || "",
                    prodotto: cells[2]?.v || "",
                    codice: cells[3]?.v || "",
                    descrizione: cells[4]?.v || "",
                    formato: cells[5]?.v || ""
                };
            });
            populateFilters();
            renderTable();
        });

    function populateFilters() {
        const attivita = [...new Set(data.map(d => d.attivita))];
        attivitaSel.innerHTML = '<option value="">Seleziona attività</option>';
        attivita.forEach(val => {
            const opt = document.createElement("option");
            opt.value = val;
            opt.textContent = val;
            attivitaSel.appendChild(opt);
        });

        attivitaSel.addEventListener("change", updateArea);
        areaSel.addEventListener("change", renderTable);
    }

    function updateArea() {
        const filtered = data.filter(d => d.attivita === attivitaSel.value);
        const aree = [...new Set(filtered.map(d => d.area))];
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
