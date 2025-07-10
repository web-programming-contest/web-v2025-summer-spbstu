class Student{
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.grades = {};
    }
    addGrade(subject, grade){
        this.grades[subject] = grade;
    }
    getAverageGrade(){
        const values_ = Object.values(this.grades);
        if (values_.length === 0) return 0;
        const sum = values_.reduce((acc, grade) => acc + grade, 0);
        return (sum / values_.length).toFixed(1);
    }
    summary(){
        return `Студент ${this.name} (id: ${this.id}) — средний балл: ${this.getAverageGrade()}`;
    }
}

function groupByAverage(students) {
  const map = new Map();
  for (const student of students) {
    const avg = student.getAverageGrade();
    if (!map.has(avg)) {
      map.set(avg, []);
    }
    map.get(avg).push(student);
  }
  return map;
}

function getAllSubjects(students) {
  const subjectSet = new Set();
  for (const student of students) {
    for (const subject of Object.keys(student.grades)) {
      subjectSet.add(subject);
    }
  }
  return Array.from(subjectSet);
}

function groupBySubject(students) {
  const map = new Map();
  for (const student of students) {
    for (const subject of Object.keys(student.grades)) {
      if (!map.has(subject)) {
        map.set(subject, []);
      }
      map.get(subject).push(student);
    }
  }
  return map;
}

function getTopStudents(students) {
  let maxAvg = 0;
  for (const student of students) {
    const avg = student.getAverageGrade();
    if (avg > maxAvg) {
      maxAvg = avg;
    }
  }
  return students.filter(student => student.getAverageGrade() === maxAvg);
}

function getStudentsPassedSubject(students, subject, passingGrade = 3) {
  return students.filter(student => subject in student.grades && student.grades[subject] >= passingGrade);
}
