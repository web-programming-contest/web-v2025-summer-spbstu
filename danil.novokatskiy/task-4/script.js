"use strict";

export class Student {
  constructor(id, name, grades) {
    if (Number.isInteger(id)) {
      this.id = id;
    } else {
      throw Error(`Student ${id} is not a number`);
    }
    if (typeof name === "string") {
      this.name = name;
    } else {
      throw Error(`Name ${name} is not a string`);
    }
    this.grades = grades || {};
  }

  addGrade(subject, grade) {
    if (grade === undefined || grade === null) {
      throw Error(`Grade ${grade} is not a number`);
    }

    if (grade <= 1 || grade >= 6) {
      throw Error("Grade must be more than 1 and less than 6");
    }

    if (subject === null || subject === '' || !(typeof subject === 'string') ) {
      throw Error(`subject is not a string or empty string`);
    }

    for (const tmpSubject in this.grades) {
      if (tmpSubject === subject) {
        this.grades[tmpSubject].push(grade);
      }
    }
    this.grades[subject].push(grade);
  }

  getAverageGrade() {
    const allGrades = [];
    for (const subject in this.grades) {
      allGrades.push(...this.grades[subject]);
    }
    if (!allGrades.length) {
      return undefined;
    }
    return +(allGrades.reduce((a,b) => a + b, 0) / allGrades.length).toFixed(2);
  }

  get summary() {
    const grade = this.getAverageGrade();
    if (grade === undefined) {
      throw Error(`Grade ${grade} is not a number`);
    }
    return `Студент[${this.name}](id:[${this.id}] - средний балл:[${grade}]`;
  }
}

function groupStudentsByAverageGrade(students) {
  if (!students.length || !Array.isArray(students)) {
    return {};
  }
  let groups  = {
    'A' : [],
    'B' : [],
    'C' : [],
  }
  for (const student of students) {
    const grade = student.getAverageGrade();
    if (grade === undefined) {
      continue;
    }
    if (grade >= 4) {
      groups['A'].push(student);
    } else if (grade >= 3) {
      groups['B'].push(student);
    } else {
      groups['C'].push(student);
    }
  }
  return groups;
}

function getListOfStudentsWhoPassedSubject(students, subject) {
  if (subject === null || typeof(subject) !== 'string' || !students.length || subject === '') {
    return {};
  }

  let result = [];
  for (const student of students) {
    if (!students.grades) continue;
    for (const [key, value] of Object.entries(student.grades)) {
      if (key === subject) {
        if (value > 2) {
          result.push(student);
        }
      }
    }
  }
  return result;
}

function groupStudentsBySubjects(students) {
  if (!students.length) {
    return new Map;
  }
  const result = new Map();
  for (const student of students) {
    for (const [subject, grade] of Object.entries(student.grades)) {
      if (grade !== undefined && grade !== null && typeof subject === 'string' && subject !== '') {
        if (!result.has(subject)) {
          result.set(subject, []);
        }
        result.get(subject).push(student);
      }
    }
  }
  return result;
}

function getUniqueSubject(students) {
  if (!!students) {
    return [];
  }

  let result = [];
  for (const student of students) {
    for (const subject in student.grades) {
      if (!result.includes(subject)) {
        result.push(subject);
      }
    }
  }
  return result;
}

function getStudentsWithMaxAverageGrade(students) {
  if (!!students) {
    return [];
  }
  let result = [];
  const grades = students.map(student => student.getAverageGrade())

  const maxAverageGrade = Math.max(...grades);
  for (const student of students) {
    if (student.getAverageGrade() === maxAverageGrade) {
      result.push(student);
    }
  }
  return result;
}

let grades1 = {
  "math": 2,
  "history": 4,
  "computer science": 5,
}

let student1 = new Student(1, "Danil", grades1);

let grades2 = {
  "math": 4,
  "russian": 5,
  "pe": 5,
}

let student2 = new Student(2, "Serafim", grades2);

let grades3 = {
  "math": 3,
  "english": 5,
  "art": 5,
}

let student3 = new Student(3, "Artem", grades3);

let students = [student1, student2, student3];

