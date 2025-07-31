
document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2Mqj4Z0uWbae0Pcb2fTbhiGZj7WdjwCmzNRqLV_Lp13KSF_B99MVxqZSYKmMzQw/pub?output=csv';
    const tbody = document.querySelector('#tabella-prodotti tbody');

    fetch(url)
        .then(response => response.text())
        .then(csv => {
            Papa.parse(csv, {
                header: true,
                skipEmptyLines: true,
                complete: function(results) {
                    results.data.forEach(prodotto => {
                        const tr = document.createElement('tr');
                        [
                            "Codice Prodotto", "Nome Prodotto", "Superfici da Trattare",
                            "Descrizione Completa", "Modalità d'Uso", "Diluizione",
                            "Formato", "Pezzi x Cartone", "Cartoni per Pallet",
                            "Scheda Tecnica", "Scheda Sicurezza", "Immagine"
                        ].forEach((chiave, index) => {
                            const td = document.createElement('td');
                            const valore = prodotto[chiave] || '';

                            if (index === 9 || index === 10) {
                                if (valore) {
                                    const a = document.createElement('a');
                                    a.href = valore;
                                    a.textContent = 'Visualizza';
                                    a.target = '_blank';
                                    td.appendChild(a);
                                } else {
                                    td.textContent = '-';
                                }
                            } else if (index === 11) {
                                if (valore) {
                                    const img = document.createElement('img');
                                    img.src = valore;
                                    img.alt = 'Foto prodotto';
                                    img.classList.add('zoomable');
                                    td.appendChild(img);
                                } else {
                                    td.textContent = '-';
                                }
                            } else {
                                td.textContent = valore;
                            }

                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });

                    // Effetto zoom immagine
                    const overlay = document.getElementById('zoomOverlay');
                    const zoomedImg = document.getElementById('zoomedImg');

                    document.querySelectorAll('.zoomable').forEach(img => {
                        img.addEventListener('click', () => {
                            zoomedImg.src = img.src;
                            overlay.style.display = 'flex';
                        });
                    });

                    overlay.addEventListener('click', () => {
                        overlay.style.display = 'none';
                        zoomedImg.src = '';
                    });
                }
            });
        });

    document.getElementById('filtro-codice').addEventListener('input', filtraTabella);
    document.getElementById('filtro-nome').addEventListener('input', filtraTabella);
    document.getElementById('filtro-superfici').addEventListener('input', filtraTabella);
    document.getElementById('filtro-testo').addEventListener('input', filtraTabella);

    function filtraTabella() {
        const codice = document.getElementById('filtro-codice').value.toLowerCase();
        const nome = document.getElementById('filtro-nome').value.toLowerCase();
        const superfici = document.getElementById('filtro-superfici').value.toLowerCase();
        const testo = document.getElementById('filtro-testo').value.toLowerCase();

        document.querySelectorAll('#tabella-prodotti tbody tr').forEach(tr => {
            const tds = Array.from(tr.children);
            const matchCodice = tds[0].textContent.toLowerCase().includes(codice);
            const matchNome = tds[1].textContent.toLowerCase().includes(nome);
            const matchSuperfici = tds[2].textContent.toLowerCase().includes(superfici);
            const matchTesto = tr.textContent.toLowerCase().includes(testo);

            const visibile = matchCodice && matchNome && matchSuperfici && matchTesto;
            tr.style.display = visibile ? '' : 'none';
        });
    }
});
