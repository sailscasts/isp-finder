import {predictDigit} from './predict-digit.js';

document?.addEventListener('DOMContentLoaded', () => {
  const numberInput = document.getElementById('numberInput');
  const detectButton = document.getElementById('detectButton');
  const resultElement = document.getElementById('result');
  const csv = document.getElementById('csvFile');

  // check if button is loaded in DOM first
  detectButton?.addEventListener('click', () => {
    if (numberInput.value) {
      const provider = predictDigit(numberInput.value);

      resultElement.style.color = 'green';
      resultElement.textContent = `${provider} - ${numberInput.value}`; // send response to html

      numberInput.value = ''; // reset input
      document.getElementById('thead').innerHTML = '';
      document.getElementById('tbody').innerHTML = '';
    } else if (csv.value) {
      const reader = new FileReader();
      reader.onload = () => {
        const numbers = d3.csvParse(reader.result);
        document.getElementById('result').innerHTML = '';
        toHtml(numbers);
      };
      if (csvFile.files[0]) reader.readAsText(csvFile.files[0]);
      csv.value = '';
    } else {
      resultElement.style.color = 'red';
      resultElement.textContent = 'Please provide a value to detect';
    }
  });
});

function toHtml(obj) {
  let thead = `
  <th>S/N</th>
  <th>Number</th>
  <th>ISP</th>
  `;
  document.getElementById('thead').innerHTML += thead;
  for (let i = 0; i < obj.length; i++) {
    let row = `
      <tr>
        <td>${obj[i].id}</td>
        <td>${'0' + obj[i].Number}</td>
        <td>${predictDigit('0' + obj[i].Number)}</td>
      </tr>
    `;
    document.getElementById('tbody').innerHTML += row;
  }
}

// hamburger button function
const menuBtn = document.getElementById('menu-button');

menuBtn.addEventListener('click', function () {
  const links = document.getElementById('nav-links');
  links.classList.toggle('show-menu');
  if (links.classList.contains('show-menu')) {
    menuBtn.innerHTML = `
      <span class="material-symbols-outlined">
        close
      </span>
    `;
  } else {
    menuBtn.innerHTML = `
      <span class="material-symbols-outlined">
        menu
      </span>
    `;
  }
});
