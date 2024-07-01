setInterval(fetchData, 10000)


function fetchData() {
  fetch('http://localhost:3000/patients') // URL para buscar todos os pacientes
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
      })
      .then(data => renderTable(data))
      .catch(error => console.error('Erro ao buscar dados:', error));
}

function renderTable(data) {
  const tableBody = document.querySelector('.patients-list tbody');
  tableBody.innerHTML = ''; // Limpa o corpo da tabela antes de adicionar os dados

  data.forEach(item => {
      const row = document.createElement('tr');
      
      const cellId = document.createElement('td');
      cellId.textContent = item.id;
      row.appendChild(cellId);

      const cellName = document.createElement('td');
      cellName.textContent = item.name;
      cellName.colSpan = 8; // Adiciona o atributo colspan
      row.appendChild(cellName);

      const cellSex = document.createElement('td');
      cellSex.textContent = item.sex;
      row.appendChild(cellSex);

      const cellStatus = document.createElement('td');
      cellStatus.textContent = item.status;
      row.appendChild(cellStatus);

      tableBody.appendChild(row);
  });
}


