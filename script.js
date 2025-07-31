
document.addEventListener('DOMContentLoaded', function () {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT2Mqj4Z0uWbae0Pcb2fTbhiGZj7WdjwCmzNRqLV_Lp13KSF_B99MVxqZSYKmMzQw/pub?output=csv';

    fetch(url)
        .then(response => response.text())
        .then(data => {
            const righe = data.split('\n').slice(1);
            const tbody = document.querySelector('#tabella-prodotti tbody');

            righe.forEach(riga => {
                const colonne = riga.split(',');

                if (colonne.length < 9) return;

                const tr = document.createElement('tr');
                colonne.forEach((cella) => {
                    const td = document.createElement('td');
                    td.textContent = decodeURIComponent(cella.trim());
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });
        });

    document.getElementById('filtro-prodotto').addEventListener('input', filtraTabella);
    document.getElementById('filtro-superfici').addEventListener('input', filtraTabella);

    function filtraTabella() {
        const testoProdotto = document.getElementById('filtro-prodotto').value.toLowerCase();
        const testoSuperfici = document.getElementById('filtro-superfici').value.toLowerCase();

        document.querySelectorAll('#tabella-prodotti tbody tr').forEach(tr => {
            const prodotto = tr.children[1].textContent.toLowerCase();
            const superfici = tr.children[2].textContent.toLowerCase();
            const visibile = prodotto.includes(testoProdotto) && superfici.includes(testoSuperfici);
            tr.style.display = visibile ? '' : 'none';
        });
    }
});
