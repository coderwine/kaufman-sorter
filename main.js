const totalRecInput = document.getElementById('sum-Records');
const recordInput = document.querySelector('.total-records');
const addRecord = document.getElementById('add-record');
const addRecordInput = document.getElementById('needed-record');
const reprintDiv = document.querySelector('.reprint-records');
const tableRecords = document.getElementById('kaufman-records');
const tablePages = document.getElementById('kaufman-pages');
const printBtn = document.getElementById('print-btn');
const clearBtn = document.getElementById('reset-btn');
const bindMsg = document.getElementById('bindery-message');
const doneBtn = document.getElementById('done-btn');
const pagesCopy = document.getElementById('pagesCopy');

let totalRecords;
let splitRecord;

let reprintRecords = [];
let pageNumbers = [];

function compareNumbers(a, b) {
    // sorts array numerically
    return a - b;
}

const checkValues = (num) => {
    if (reprintRecords.includes(num)) {
        alert(`${num} is already added to the list.`)
        return false
    } else if(!num) {
        return false
    } else {
        return true
    }
}

const displayRecords = () => {
    let value = tableRecords;
    let pages = tablePages;
    reprintRecords.sort(compareNumbers);
    pageNumbers.sort(compareNumbers);

    for (let i = 0; i < reprintRecords.length; i++) {
        if (i === 0) {
            value.textContent = `${reprintRecords[i]}`;
            pages.textContent = `${pageNumbers[i]}`;
        } else {
            value.textContent += `,${reprintRecords[i]}`;
            pages.textContent += `,${pageNumbers[i]}`;
        }
    }
}

//! Event Listeners
pagesCopy.addEventListener('click', () => {
    console.log(tablePages.textContent);
    const copyInfo = tablePages.textContent;
    navigator.clipboard.writeText(copyInfo);
    alert('Text Copied')
})

// Need to update Print display
doneBtn.addEventListener('click', () => {
    const records = document.getElementById('records-print')
    
    for(let i = 0; i < reprintRecords.length; i++ ) {
        if(i === 0) {
            records.textContent = `Pages: ${pageNumbers[i]}`
        } else {
            records.textContent += `, ${pageNumbers[i]}`;
        }
    }

})

totalRecInput.addEventListener('submit', e => {
    e.preventDefault();
    recInput = totalRecInput.childNodes[5].value
    totalRecords = recInput;
    splitRecord = totalRecords / 2;

    const h3 = document.querySelector('h3');
    h3.textContent = `Total: ${totalRecords} || Split: ${splitRecord}`;
    h3.style.color = `darkred`;
    recordInput.value = '';
    addRecordInput.focus();
})

addRecord.addEventListener('submit', (e) => {
    e.preventDefault();

    if (totalRecords) {

        const firstValue = 
            Number(addRecordInput.value) > totalRecords ?
                alert(`Please input a record within 1 - ${totalRecords}.`) :
                Number(addRecordInput.value);
        const secondValue =
            firstValue > splitRecord ?
                firstValue - Number(splitRecord) :
                firstValue + Number(splitRecord);

        const firstValueCheck = checkValues(firstValue);
        const secondValueCheck = checkValues(secondValue);

        if (firstValueCheck && secondValueCheck) {

            reprintRecords.push(firstValue);
            reprintRecords.push(secondValue);

            const findPage = firstValue < secondValue ? firstValue : secondValue;

            pageNumbers.push((findPage * 2) - 1);
            pageNumbers.push((findPage * 2));

        };

        addRecordInput.value = "";
        addRecordInput.focus();

        displayRecords()
    } else {
        alert(`Please input the Total Records for the original file.`)
        recordInput.focus();
    }
});

printBtn.addEventListener('click', () => {
    const image = Math.floor((Math.random() * 4)+1)
    
    bindMsg.innerHTML = `
        <p>Be sure to double-check all records listed. This details all that would be printed together.</p>
        <img src="./assets/${image}.jpg" alt="dumb-image">
        <br/>
        <main id="check-records"><b>Records</b>: ${reprintRecords.join(", ")}</main>
        `    
    window.print();
})

clearBtn.addEventListener('click', () => {
    const confirmed = window.confirm('Are you Sure?')

    if (confirmed) {
        console.log('hit')
        window.location = window.location
    } 
})


