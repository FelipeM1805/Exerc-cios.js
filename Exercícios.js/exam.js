class Exam {
  constructor(answer, weight) {
    this.answer = answer; 
    this.weight = weight; 
    this.exams = [];
  }

  
  add(exam) {
    this.exams.push(exam);
  }


  avg() {
    if (this.exams.length === 0) return 0;

    const totalWeight = this.weight.reduce((sum, w) => sum + w, 0);
    const totalScores = this.exams
      .map((exam) => this.calculateScore(exam))
      .reduce((sum, score) => sum + score, 0);

    return totalScores / (totalWeight * this.exams.length);
  }


  min(count = 1) {
    return this.getScores().sort((a, b) => a - b).slice(0, count);
  }


  max(count = 1) {
    return this.getScores().sort((a, b) => b - a).slice(0, count);
  }


  it(limit) {
    return this.getScores().filter((score) => score <= limit);
  }

  
  gt(limit) {
    return this.getScores().filter((score) => score >= limit);
  }

  
  getScores() {
    return this.exams.map((exam) => this.calculateScore(exam));
  }


  calculateScore(exam) {
    return exam.reduce((score, answer, index) => {
      return score + (answer === this.answer[index] ? this.weight[index] : 0);
    }, 0);
  }
}

// Exemplo
const answer = ['a', 'b', 'a', 'c', 'd']; // Resposta do professor(gabarito)
const weight = [2, 2, 2, 2, 2]; 
const exam = new Exam(answer, weight);


exam.add(['a', 'b', 'b', 'b', 'b']); // Respostas do aluno

console.log("Média:", exam.avg()); 
console.log("Nota mínima:", exam.min(1));
console.log("Nota máxima:", exam.max(1));
console.log("Notas <= 2:", exam.it(2));
console.log("Notas >= 2:", exam.gt(2));
