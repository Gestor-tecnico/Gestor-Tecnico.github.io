document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("studentForm");
    const studentList = document.getElementById("studentList");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function saveStudents() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function renderStudents() {
        studentList.innerHTML = "";
        students.forEach((student, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${student.nombre} ${student.apellidos}</strong> - ${student.documento} (${student.carrera})
                            <button onclick="addGrades(${index})">Agregar Notas</button>
                            <button onclick="deleteStudent(${index})">Eliminar</button>
                            <p>Notas: ${student.notas.join(", ") || "N/A"}</p>`;
            studentList.appendChild(li);
        });
    }

    studentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const apellidos = document.getElementById("apellidos").value;
        const documento = document.getElementById("documento").value;
        const carrera = document.getElementById("carrera").value;
        students.push({ nombre, apellidos, documento, carrera, notas: [] });
        saveStudents();
        renderStudents();
        studentForm.reset();
    });

    window.addGrades = (index) => {
        const notas = prompt("Ingrese las notas separadas por comas:");
        if (notas) {
            const nuevasNotas = notas.split(",").map(n => parseFloat(n.trim()));
            students[index].notas = students[index].notas.concat(nuevasNotas);
            saveStudents();
            calculateAverage(index);
            renderStudents();
        }
    };

    function calculateAverage(index) {
        const student = students[index];
        if (student.notas.length > 0) {
            const promedio = student.notas.reduce((acc, n) => acc + n, 0) / student.notas.length;
            alert(`El promedio de ${student.nombre} ${student.apellidos} es: ${promedio.toFixed(2)}`);
        }
    }

    window.deleteStudent = (index) => {
        students.splice(index, 1);
        saveStudents();
        renderStudents();
    };

    renderStudents();
});
