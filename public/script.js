document.getElementById('dbButton').addEventListener('click', async () => {
try {
    const res = await fetch('/api/data');
    const data = await res.json();

    const tableBody = document.getElementById('tableBody');

    tableBody.innerHTML = '';

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
