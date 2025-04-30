document.getElementById('dbButton').addEventListener('click', async () => {
try {
    const res = await fetch('/api/data');
    const data = await res.json()


    console.log(data.results);

    const tableBody = document.getElementById('tableBody');
    const tableHead = document.getElementById('tableHead')

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');

    data.headings.forEach((h) => {
        const th = document.createElement('th')
        th.textContent = h;
        headerRow.classList.add('sticky-header')
        headerRow.appendChild(th);
    })

    tableHead.appendChild(headerRow)
    data.results.forEach((item) =>{
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;    
            row.appendChild(cell);
        });

        tableBody.appendChild(row);
    }
    )
} catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('dbOutput').textContent = 'Error loading data.';
}
});
