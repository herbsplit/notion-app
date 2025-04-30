document.getElementById('dbButton').addEventListener('click', async () => {
try {
    const res1 = await fetch('/api/data');
    const data = await res1.json();
    const res2 = await fetch('api/headers');
    const head = await res2.json();

    const tableBody = document.getElementById('tableBody');
    const tableHead = document.getElementById('tableHead')

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');

    head.forEach((h) => {
        const th = document.createElement('th')
        th.textContent = h;
        headerRow.appendChild(th);
    })

    tableHead.appendChild(headerRow)
    data.forEach((item) =>{
        const row = document.createElement('tr');

        const cell = document.createElement('td');
        cell.textContent = item;

        row.appendChild(cell);
        tableBody.appendChild(row);
    }
    )
} catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('dbOutput').textContent = 'Error loading data.';
}
});
