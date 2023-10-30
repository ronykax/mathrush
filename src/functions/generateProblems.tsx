interface problem {
  num1: number,
  operator: string,
  num2: number
}

function generateProblems(count: number) {
  const problems: problem[] = [];

  for (let i = 1; i <= count; i++) {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;

    const operator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];

    let problem: problem = { num1: 0, operator: "", num2: 0 };

    switch (operator) {
      case "+":
        problem = { num1: num1, operator: "+", num2: num2 };
        break;
      case "-":
        problem = { num1: num1, operator: "-", num2: num2 };
        break;
      case "*":
        problem = { num1: num1, operator: "*", num2: num2 };
        break;
      case "/":
        num2 = num2 === 0 ? 1 : num2;

        problem = { num1: num1, operator: "/", num2: num2 };
        break;
    }

    problems.push(problem);
  }

  return problems;
}

export default generateProblems;