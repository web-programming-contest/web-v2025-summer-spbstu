let students = loadStudents();

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function loadStudents() {
  const data = localStorage.getItem("students");
  if (!data) return [];
  const parsed = JSON.parse(data);
  return parsed.map(s => {
    const student = new Student(s.id, s.name);
    student.grades = s.grades;
    return student;
  });
}

function renderStudents() {
  const container = document.getElementById("students-container");
  container.innerHTML = "";

  students.forEach(student => {
    const card = document.createElement("div");
    card.className = "student-card";

    const title = document.createElement("h3");
    title.textContent = `(ID: ${student.id}) ${student.name}`;
    card.appendChild(title);

    const avg = document.createElement("p");
    avg.textContent = `Средний балл: ${student.getAverageGrade()}`;
    card.appendChild(avg);

    const grades = document.createElement("div");
    grades.className = "grades";
    grades.textContent = "Оценки: " + Object.entries(student.grades)
      .map(([sub, mark]) => `${sub}: ${mark}`)
      .join(", ");
    card.appendChild(grades);

    const addButton = document.createElement("button");
    addButton.textContent = "Добавить оценку";
    addButton.onclick = () => {
      const subj = prompt("Предмет:");
      const grade = Number(prompt("Оценка:"));
      if (subj && !isNaN(grade)) {
        asyncOperation(() => {
          student.addGrade(subj, grade);
          saveStudents();
          renderStudents();
        });
      }
    };
    card.appendChild(addButton);

    const delButton = document.createElement("button");
    delButton.textContent = "Удалить оценку";
    delButton.onclick = () => {
      const subj = prompt("Какой предмет удалить?");
      if (subj in student.grades) {
        asyncOperation(() => {
          delete student.grades[subj];
          saveStudents();
          renderStudents();
        });
      }
    };
    card.appendChild(delButton);

    const rmButton = document.createElement("button");
    rmButton.textContent = "Удалить студента";
    rmButton.onclick = () => {
      if (confirm(`Удалить ${student.name}?`)) {
        asyncOperation(() => {
          students = students.filter(s => s.id !== student.id);
          saveStudents();
          renderStudents();
        });
      }
    };
    card.appendChild(rmButton);

    container.appendChild(card);
  });
}

function asyncOperation(callback) {
  new Promise(resolve => setTimeout(resolve, 500)).then(callback);
}

document.getElementById("student-form").addEventListener("submit", el => {
  el.preventDefault();
  const id = Number(document.getElementById("student-id").value);
  const name = document.getElementById("student-name").value.trim();
  if (!name || isNaN(id) || students.some(student => student.id === id)) return;
  
  asyncOperation(() => {
    students.push(new Student(id, name));
    saveStudents();
    renderStudents();
    el.target.reset();
  });
});

renderStudents();