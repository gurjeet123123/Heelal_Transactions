const transactions = [
    {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER FROM 7502710871816 / Anant Enterprises",
        "Ref No./Cheque No.": "NO/HDFCR21390634668642/120-Anant Enterprises",
        "Branch Code": "4430",
        "Debit": null,
        "Credit": "3,17,951.61",
        "Balance": "1,40,67,970.41"
    },
    {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER FROM Srijan Technologies",
        "Ref No./Cheque No.": "BY TRANSFER-RTGS UTR NO:IDRAB490195971389139868051435/Srijan Technologies",
        "Branch Code": "4430",
        "Debit": null,
        "Credit": "3,19,501.43",
        "Balance": "1,55,05,503.56"
      },
      {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER FROM MOBIKWIK",
        "Ref No./Cheque No.": "BY TRANSFER-INB RTGS UTR NO:SBINR12022985130798644-MOBIKWIK",
        "Branch Code": "4430",
        "Debit": null,
        "Credit": "2,90,334.50",
        "Balance": "1,57,95,838.06"
      },
      {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER FROM Saral",
        "Ref No./Cheque No.": "BY TRANSFER-RTGS UTR NO:KKBKR7759488631/5881580-Nakshatra Corp",
        "Branch Code": "4430",
        "Debit": null,
        "Credit": "4,03,248.94",
        "Balance": "1,53,52,589.12"
      },
      {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER FROM Nakshatra Corp",
        "Ref No./Cheque No.": "BY TRANSFER-RTGS UTR NO:KKBKR7759488631/5881580-Nakshatra Corp",
        "Branch Code": "4430",
        "Debit": null,
        "Credit": "2,65,587.06",
        "Balance": "1,56,58,176.13"
      },
      {
        "Txn Date": "11-06-2024",
        "Value Date": "11-06-2024",
        "Description": "TRANSFER TO MOBIKWIK",
        "Ref No./Cheque No.": "TO TRANSFER-INB RTGS UTR NO:SBINR12022985130798644-MOBIKWIK",
        "Branch Code": "99922",
        "Debit": "3,00,226.47",
        "Credit": null,
        "Balance": "1,53,57,949.66"
      }
    ];

function filterTransactions() {
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const minCredit = parseFloat(document.getElementById('min-credit').value);
    const maxCredit = parseFloat(document.getElementById('max-credit').value);
    const minDebit = parseFloat(document.getElementById('min-debit').value);
    const maxDebit = parseFloat(document.getElementById('max-debit').value);
    const descriptionFilter = document.getElementById('description-filter').value.toLowerCase();

    const filteredTransactions = transactions.filter(transaction => {
        const txnDate = new Date(transaction["Txn Date"].split("-").reverse().join("-"));

        const credit = parseFloat(transaction.Credit?.replace(/,/g, '') || 0);
        const debit = parseFloat(transaction.Debit?.replace(/,/g, '') || 0);

        return (!startDate || txnDate >= new Date(startDate)) &&
               (!endDate || txnDate <= new Date(endDate)) &&
               (!minCredit || credit >= minCredit) &&
               (!maxCredit || credit <= maxCredit) &&
               (!minDebit || debit >= minDebit) &&
               (!maxDebit || debit <= maxDebit) &&
               (!descriptionFilter || transaction.Description.toLowerCase().includes(descriptionFilter));
    });

    displayResults(filteredTransactions);
}

function displayResults(transactions) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (transactions.length === 0) {
        resultDiv.innerHTML = '<p>No transactions found.</p>';
    } else {
        transactions.forEach(transaction => {
            const txnDiv = document.createElement('div');
            txnDiv.className = 'transaction';

            txnDiv.innerHTML = `
                <p><strong>Date:</strong> ${transaction["Txn Date"]}</p>
                <p><strong>Description:</strong> ${transaction.Description}</p>
                <p><strong>Debit:</strong> ${transaction.Debit || '-'}</p>
                <p><strong>Credit:</strong> ${transaction.Credit || '-'}</p>
                <p><strong>Balance:</strong> ${transaction.Balance}</p>
            `;

            resultDiv.appendChild(txnDiv);
        });
    }
}