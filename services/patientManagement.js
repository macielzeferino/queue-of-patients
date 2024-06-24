/* export function addNewPatient() {

} */
const apiUrl = 'http://localhost:3000/patients';

// Função para adicionar dados
export async function addData() {
    const data = document.getElementById('addData').value;
    const response = await fetch(`${apiUrl}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data })
    });
    const result = await response.text();
    alert(result);
}
export function updatePatient() {

}

export function consultPatient() {

}

export function deletePatient() {
  
}