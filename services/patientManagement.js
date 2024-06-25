
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