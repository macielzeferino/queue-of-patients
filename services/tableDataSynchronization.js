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


document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.btn-add');
    const viewButton = document.querySelector('.btn-view');
    const updateButton = document.querySelector('.btn-update');
    const deleteButton = document.querySelector('.btn-delete');
  
    const addModal = document.getElementById('formAdd');
    const viewModal = document.getElementById('formView');
    const updateModal = document.getElementById('formUpdate');
    const deleteModal = document.getElementById('formDelete');
  
    const closeButtons = document.querySelectorAll('.close');
  
    addButton.addEventListener('click', () => {
      addModal.classList.remove('hidden');
      addModal.style.display = 'block';
    });
  
    viewButton.addEventListener('click', () => {
      viewModal.classList.remove('hidden');
      viewModal.style.display = 'block';
    });
  
    updateButton.addEventListener('click', () => {
      updateModal.classList.remove('hidden');
      updateModal.style.display = 'block';
    });
  
    deleteButton.addEventListener('click', () => {
      deleteModal.classList.remove('hidden');
      deleteModal.style.display = 'block';
    });
  
    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        addModal.style.display = 'none';
        viewModal.style.display = 'none';
        updateModal.style.display = 'none';
        deleteModal.style.display = 'none';
      });
    });
  
    window.addEventListener('click', (event) => {
      if (event.target == addModal) {
        addModal.style.display = 'none';
      } else if (event.target == viewModal) {
        viewModal.style.display = 'none';
      } else if (event.target == updateModal) {
        updateModal.style.display = 'none';
      } else if (event.target == deleteModal) {
        deleteModal.style.display = 'none';
      }
    });
  });
    