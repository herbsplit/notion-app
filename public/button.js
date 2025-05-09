// display headers of database in multiselect
const dbChange = document.getElementById('db-select')
dbChange.addEventListener('change', async() => {
    try {
    const res = await fetch('/api/data');
    const data = await res.json()

    const headingSelect = document.getElementById('header-select');

    headingSelect.innerHTML = '';

    data.headings.forEach((h) => {
        const opt = document.createElement('option')
        opt.textContent = h;
        headingSelect.appendChild(opt);
    })
    } catch (error) { 
        console.error('Fetch error:', error);
    }
});

// fetch from API data and table genereation
document.getElementById('dbButton').addEventListener('click', async () => {
try {
    // get selected headers
    const headerSelect = document.getElementById("header-select");
    const headers = Array.from(headerSelect.selectedOptions).map(option => option.value);
    console.log(headers);
    //fetch data
    const res = await fetch('/api/data');
    const data = await res.json()

    const tableBody = document.getElementById('tableBody');
    const tableHead = document.getElementById('tableHead')

    tableHead.innerHTML = '';
    tableBody.innerHTML = '';

    const headerRow = document.createElement('tr');

    headers.forEach((h) => {
        const th = document.createElement('th')
        th.textContent = h;
        headerRow.classList.add('sticky-header')
        headerRow.classList.add('table-wrapper')
        headerRow.appendChild(th);
    })
    //generate table based on selected headers
    tableHead.appendChild(headerRow)
    data.results.forEach((item) => {
        const row = document.createElement('tr');
    
        headers.forEach(key => {
            const cell = document.createElement('td');
            cell.textContent = item[key] ?? '';  // Use optional chaining in case key doesn't exist
            row.appendChild(cell);
        });
    
        tableBody.appendChild(row);
    });
} catch (error) {
    console.error('Fetch error:', error);
    document.getElementById('dbOutput').textContent = 'Error loading data.';
}
});
