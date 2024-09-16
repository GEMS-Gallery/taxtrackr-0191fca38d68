import { backend } from 'declarations/backend';

// Function to add a new TaxPayer
async function addTaxPayer(event) {
    event.preventDefault();
    const tid = document.getElementById('tid').value;
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;

    await backend.addTaxPayer(tid, firstName, lastName, address);
    document.getElementById('addTaxPayerForm').reset();
    await displayAllTaxPayers();
}

// Function to search for a TaxPayer by TID
async function searchTaxPayer() {
    const searchTid = document.getElementById('searchTid').value;
    const result = await backend.searchTaxPayer(searchTid);
    const searchResult = document.getElementById('searchResult');

    if (result.length > 0) {
        const taxPayer = result[0];
        searchResult.innerHTML = `
            <h3>Search Result:</h3>
            <p>TID: ${taxPayer.tid}</p>
            <p>Name: ${taxPayer.firstName} ${taxPayer.lastName}</p>
            <p>Address: ${taxPayer.address}</p>
        `;
    } else {
        searchResult.innerHTML = '<p>No TaxPayer found with the given TID.</p>';
    }
}

// Function to display all TaxPayers
async function displayAllTaxPayers() {
    const taxPayers = await backend.getAllTaxPayers();
    const taxPayerList = document.getElementById('taxPayerList');
    taxPayerList.innerHTML = '<h3>All TaxPayers:</h3>';

    if (taxPayers.length === 0) {
        taxPayerList.innerHTML += '<p>No TaxPayers found.</p>';
    } else {
        const ul = document.createElement('ul');
        taxPayers.forEach(taxPayer => {
            const li = document.createElement('li');
            li.textContent = `${taxPayer.tid}: ${taxPayer.firstName} ${taxPayer.lastName}, ${taxPayer.address}`;
            ul.appendChild(li);
        });
        taxPayerList.appendChild(ul);
    }
}

// Event listeners
document.getElementById('addTaxPayerForm').addEventListener('submit', addTaxPayer);

// Initial display of all TaxPayers
displayAllTaxPayers();