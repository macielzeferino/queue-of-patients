
//add patient 
document.querySelector(".btn-add").addEventListener("click", () => {
    const form = document.querySelector("#formData")
    if(form.classList.contains("hidden")) {
      form.classList.remove("hidden")
    }
  });

  document.querySelector("#formData").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#name").value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const patientData = {
      name: name,
      status: status,
      sex: sex
    };

   
    fetch('http://localhost:3000/patients', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
    })
    
//remove patient

document.querySelector(".btn-delete").addEventListener("click", () => {
    const form = document.querySelector("#input-delete")
    if(form.classList.contains("hidden")) {
      form.classList.remove("hidden")
    }
  });

  document.querySelector(".btn-delete").addEventListener("click", ()=>{
    const idPatient = document.querySelector("#idPatient").value;

    fetch(`http://localhost:3000/patients/${idPatient}`, {
        method : 'DELETE',
        headers :{
            'Content-Type': 'aplication/json'
        }
    })
    .then(response=>{
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    } else {
      return response.text();
    }
    })
    .then(result=> {
        console.log('Sucess', result);
        alert(`Paciente de id ${idPatient} deletado `);
    })
    .catch(error=> {
        console.error("error fetching data", error);
        alert("erro ao deletar paciente")
    });
 });