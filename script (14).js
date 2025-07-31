
document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2Mqj4Z0uWbae0Pcb2fTbhiGZj7WdjwCmzNRqLV_Lp13KSF_B99MVxqZSYKmMzQw/pub?output=csv';
    const tbody = document.querySelector('#tabella-prodotti tbody');
    const filtroGlobale = document.getElementById('filtro-globale');

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

                    // Effetto zoom
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

                    // Filtro globale con evidenziazione
                    filtroGlobale.addEventListener('input', function () {
                        const filtro = this.value.toLowerCase().replace(/\s+/g, '');
                        document.querySelectorAll('#tabella-prodotti tbody tr').forEach(tr => {
                            const testoRiga = tr.textContent.toLowerCase().replace(/\s+/g, '');
                            const visibile = testoRiga.includes(filtro);

                            tr.style.display = visibile ? '' : 'none';

                            Array.from(tr.children).forEach(td => {
                                const testoOriginale = td.textContent;
                                const testoPulito = testoOriginale.toLowerCase().replace(/\s+/g, '');
                                if (filtro && testoPulito.includes(filtro)) {
                                    // Evidenzia il filtro ignorando gli spazi
                                    const regex = new RegExp(filtro.split('').join('\\s*'), 'gi');
                                    td.innerHTML = testoOriginale.replace(regex, match => '<mark>' + match + '</mark>');
                                } else {
                                    td.innerHTML = testoOriginale;
                                }
                            });
                        });
                    });
                }
            });
        });
});
