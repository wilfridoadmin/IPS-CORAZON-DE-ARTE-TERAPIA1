document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const loginPage = document.getElementById('login');
    const mainContent = document.getElementById('main-content');
    const dashboardPage = document.getElementById('dashboard');
    const patientsPage = document.getElementById('patients');
    const addPatientForm = document.getElementById('add-patient-form');
    const patientsTable = document.getElementById('patients-table').getElementsByTagName('tbody')[0];

    // Mostrar página
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = page.id === pageId ? 'block' : 'none';
        });
    }

    // Validación y login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameField.value;
        const password = passwordField.value;
        if ((username === 'psicóloga' && password === '2210') || (username === 'admin' && password === '221099')) {
            loginPage.style.display = 'none';
            mainContent.style.display = 'flex';
            showPage('dashboard');
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    // Navegación
    document.getElementById('show-dashboard').addEventListener('click', () => showPage('dashboard'));
    document.getElementById('show-patients').addEventListener('click', () => showPage('patients'));

    // Guardar paciente
    addPatientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const patient = {
            name: document.getElementById('patient-name').value,
            age: document.getElementById('patient-age').value,
            date: document.getElementById('patient-date').value,
            evolution: document.getElementById('patient-evolution').value,
            observations: document.getElementById('patient-observations').value
        };

        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients.push(patient);
        localStorage.setItem('patients', JSON.stringify(patients));
        showPage('patients');
        loadPatients();
    });

    // Cargar pacientes
    function loadPatients() {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        patientsTable.innerHTML = '';
        patients.forEach(patient => {
            const row = patientsTable.insertRow();
            row.insertCell().innerText = patient.name;
            row.insertCell().innerText = patient.age;
            row.insertCell().innerText = patient.date;
            row.insertCell().innerText = patient.evolution;
            row.insertCell().innerText = patient.observations;
            const actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                <button class="edit" onclick="editPatient('${patient.name}')">Editar</button>
                <button class="delete" onclick="deletePatient('${patient.name}')">Eliminar</button>
                <button onclick="printPatient('${patient.name}')">Imprimir</button>
            `;
        });
    }

    // Eliminar paciente
    window.deletePatient = function(name) {
        let patients = JSON.parse(localStorage.getItem('patients')) || [];
        patients = patients.filter(patient => patient.name !== name);
        localStorage.setItem('patients', JSON.stringify(patients));
        loadPatients();
    };

    // Editar paciente
    window.editPatient = function(name) {
        alert('Funcionalidad de edición no implementada.');
    };

    // Imprimir paciente
    window.printPatient = function(name) {
        const patients = JSON.parse(localStorage.getItem('patients')) || [];
        const patient = patients.find(patient => patient.name === name);
        if (patient) {
            const printWindow = window.open('', '', 'height=600,width=800');
            printWindow.document.write(`
                <html>
                <head>
                    <title>Impresión de Paciente</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h1 { color: #004d00; }
                        table { width: 100%; border-collapse: collapse; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #004d00; color: white; }
                    </style>
                </head>
                <body>
                    <h1>IPS UNIDAD CORAZON DE ARTE TERAPIA</h1>
                    <table>
                        <tr><th>Nombre</th><td>${patient.name}</td></tr>
                        <tr><th>Edad</th><td>${patient.age}</td></tr>
                        <tr><th>Fecha de Atención</th><td>${patient.date}</td></tr>
                        <tr><th>Evolución Diaria</th><td>${patient.evolution}</td></tr>
                        <tr><th>Observaciones</th><td>${patient.observations}</td></tr>
                    </table>
                    <footer>
                        <p>Nombre de Psicóloga: Michell Leiva</p>
                    </footer>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
        }
    };

    // Cargar pacientes al iniciar
    if (localStorage.getItem('patients')) {
        loadPatients();
    }
});
