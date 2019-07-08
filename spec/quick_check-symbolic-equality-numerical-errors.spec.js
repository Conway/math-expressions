import me from '../lib/math-expressions';

const allow_error_in_numbers = [
  {
    original: '65.2313',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      '65.2313',
      '65.2313*1.00009',
      '65.2313*0.99991',
    ],
    incorrect_answers: [
      '65.2313*1.00011',
      '65.2313*0.99989',
    ],
  },
  {
    original: 'exp(5xy+c)',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      'exp(5xy+c)',
      'exp(5*1.00009xy+c)',
      'exp(5*0.99991xy+c)'
    ],
    incorrect_answers: [
      'exp(5*1.00011xy+c)',
      'exp(5*0.99989xy+c)',
    ],
  },
  {
    original: 'exp(5xy+c)',
    allowed_error: 0.000001,
    include_exponents: false,
    correct_answers: [
      'exp(5xy+c)',
      'exp(5*1.0000009xy+c)',
      'exp(5*0.9999991xy+c)'
    ],
    incorrect_answers: [
      'exp(5*1.0000011xy+c)',
      'exp(5*0.9999989xy+c)'
    ],
  },
  {
    original: '10exp(5xy+c)',
    allowed_error: 0.000001,
    include_exponents: false,
    correct_answers: [
      '10exp(5xy+c)',
      '10exp(5*1.0000009xy+c)',
      '10exp(5*0.9999991xy+c)',
      '10*1.0000009exp(5xy+c)',
      '10*1.0000009exp(5*1.0000009xy+c)',
      '10*1.0000009exp(5*0.9999991xy+c)',
      '10*0.9999991exp(5xy+c)',
      '10*0.9999991exp(5*1.0000009xy+c)',
      '10*0.9999991exp(5*0.9999991xy+c)'
    ],
    incorrect_answers: [
      '10*1.0000011exp(5xy+c)',
      '10*1.0000011exp(5*1.0000011xy+c)',
      '10*1.0000011exp(5*0.9999989xy+c)',
      '10*0.9999989exp(5xy+c)',
      '10*0.9999989exp(5*1.0000011xy+c)',
      '10*0.9999989exp(5*0.9999989xy+c)',
      '10exp(5*1.0000011xy+c)',
      '10exp(5*0.9999989xy+c)',
    ],
  },
  {
    original: '10exp(0.01xy+1000q^2)',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      '10exp(0.01xy+1000q^2)',
      '10*(1+.00009)exp(0.01*(1+.00009)xy+1000*(1+.00009)q^2)',
      '10*(1+.00009)exp(0.01*(1+.00009)xy+1000*(1-.00009)q^2)',
      '10*(1+.00009)exp(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1+.00009)exp(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)exp(0.01*(1+.00009)xy+1000*(1+.00009)q^2)',
      '10*(1-.00009)exp(0.01*(1+.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)exp(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)exp(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
    ],
    incorrect_answers: [
      '10*(1+.00011)exp(0.01xy+1000q^2)',
      '10*(1-.00011)exp(0.01xy+1000q^2)',
      '10exp(0.01*(1+.00011)xy+1000q^2)',
      '10exp(0.01*(1-.00011)xy+1000q^2)',
      '10exp(0.01xy+1000*(1+.00011)q^2)',
      '10exp(0.01xy+1000*(1-.00011)q^2)',
    ],
  },
  {
    original: 'exp(0.01xy+1000q^2)',
    allowed_error: 0.0001,
    include_exponents: true,
    correct_answers: [
      'exp(0.01xy+1000q^2)',
      'exp(0.01xy+1000q^(2*(1+.00009)))',
      'exp(0.01xy+1000q^(2*(1-.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1+.00009)q^(2*(1+.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1+.00009)q^(2*(1-.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
    ],
    incorrect_answers: [
      'exp(0.01*(1+.00011)xy+1000q^(2))',
      'exp(0.01*(1-.00011)xy+1000q^(2))',
      'exp(0.01xy+1000*(1+.00011)q^(2))',
      'exp(0.01xy+1000*(1-.00011)q^(2))',
      'exp(0.01xy+1000q^(2*(1+.00011)))',
      'exp(0.01xy+1000q^(2*(1-.00011)))',
    ],
  },
  {
    original: 'exp(0.01xy+1000sqrt(q))',
    allowed_error: 0.0001,
    include_exponents: true,
    correct_answers: [
      'exp(0.01xy+1000sqrt(q))',
      'exp(0.01*(1+.00009)xy+1000sqrt(q))',
      'exp(0.01*(1-.00009)xy+1000sqrt(q))',
      'exp(0.01*(1+.00009)xy+1000*(1+.00009)q^(0.5*(1+.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1+.00009)q^(0.5*(1-.00009)))',
      'exp(0.01*(1+.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
      'exp(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
    ],
    incorrect_answers: [
      'exp(0.01*(1+.00011)xy+1000sqrt(q))',
      'exp(0.01*(1-.00011)xy+1000sqrt(q))',
      'exp(0.01xy+1000*(1+.00011)sqrt(q))',
      'exp(0.01xy+1000*(1-.00011)sqrt(q))',
      'exp(0.01xy+1000q^(0.5*(1+.00011)))',
      'exp(0.01xy+1000q^(0.5*(1-.00011)))',
    ],
  },
  {
    original: '10log(0.01xy+1000q^2)',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      '10log(0.01xy+1000q^2)',
      '10*(1+.00009)log(0.01*(1+.00009)xy+1000*(1+.00009)q^2)',
      '10*(1+.00009)log(0.01*(1+.00009)xy+1000*(1-.00009)q^2)',
      '10*(1+.00009)log(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1+.00009)log(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)log(0.01*(1+.00009)xy+1000*(1+.00009)q^2)',
      '10*(1-.00009)log(0.01*(1+.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)log(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
      '10*(1-.00009)log(0.01*(1-.00009)xy+1000*(1-.00009)q^2)',
    ],
    incorrect_answers: [
      '10*(1+.00011)log(0.01xy+1000q^2)',
      '10*(1-.00011)log(0.01xy+1000q^2)',
      '10log(0.01*(1+.00011)xy+1000q^2)',
      '10log(0.01*(1-.00011)xy+1000q^2)',
      '10log(0.01xy+1000*(1+.00011)q^2)',
      '10log(0.01xy+1000*(1-.00011)q^2)',
    ],
  },
  {
    original: 'log(0.01xy+1000q^2)',
    allowed_error: 0.0001,
    include_exponents: true,
    correct_answers: [
      'log(0.01xy+1000q^2)',
      'log(0.01*(1+.00009)xy+1000*(1+.00009)q^(2*(1+.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1+.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1+.00009)q^(2*(1-.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(2*(1-.00009)))',
    ],
    incorrect_answers: [
      'log(0.01*(1+.00011)xy+1000q^(2))',
      'log(0.01*(1-.00011)xy+1000q^(2))',
      'log(0.01xy+1000*(1+.00011)q^(2))',
      'log(0.01xy+1000*(1-.00011)q^(2))',
      'log(0.01xy+1000q^(2*(1+.00011)))',
      'log(0.01xy+1000q^(2*(1-.00011)))',
    ],
  },
  {
    original: 'log(0.01xy+1000sqrt(q))',
    allowed_error: 0.0001,
    include_exponents: true,
    correct_answers: [
      'log(0.01xy+1000sqrt(q))',
      'log(0.01*(1+.00009)xy+1000sqrt(q))',
      'log(0.01*(1-.00009)xy+1000sqrt(q))',
      'log(0.01*(1+.00009)xy+1000*(1+.00009)q^(0.5*(1+.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1+.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1+.00009)q^(0.5*(1-.00009)))',
      'log(0.01*(1+.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
      'log(0.01*(1-.00009)xy+1000*(1-.00009)q^(0.5*(1-.00009)))',
    ],
    incorrect_answers: [
      'log(0.01*(1+.00011)xy+1000q^(0.5))',
      'log(0.01*(1-.00011)xy+1000q^(0.5))',
      'log(0.01xy+1000*(1+.00011)q^(0.5))',
      'log(0.01xy+1000*(1-.00011)q^(0.5))',
      'log(0.01xy+1000q^(0.5*(1+.00011)))',
      'log(0.01xy+1000q^(0.5*(1-.00011)))',
    ],
  },
  {
    original: '(0.1x^2+90a+b)/(cx^2+d+0.01)',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      '(0.1x^2+90a+b)/(cx^2+d+0.01)',
      '(0.1*(1+.00009)x^2+90*(1+.00009)a+b)/(cx^2+d+0.01*(1+.00009))',
      '(0.1*(1+.00009)x^2+90*(1+.00009)a+b)/(cx^2+d+0.01*(1-.00009))',
      '(0.1*(1+.00009)x^2+90*(1-.00009)a+b)/(cx^2+d+0.01*(1+.00009))',
      '(0.1*(1+.00009)x^2+90*(1-.00009)a+b)/(cx^2+d+0.01*(1-.00009))',
      '(0.1*(1-.00009)x^2+90*(1+.00009)a+b)/(cx^2+d+0.01*(1+.00009))',
      '(0.1*(1-.00009)x^2+90*(1+.00009)a+b)/(cx^2+d+0.01*(1-.00009))',
      '(0.1*(1-.00009)x^2+90*(1-.00009)a+b)/(cx^2+d+0.01*(1+.00009))',
      '(0.1*(1-.00009)x^2+90*(1-.00009)a+b)/(cx^2+d+0.01*(1-.00009))',
    ],
    incorrect_answers: [
      '(0.1*(1+.00011)x^2+90a+b)/(cx^2+d+0.01)',
      '(0.1*(1-.00011)x^2+90a+b)/(cx^2+d+0.01)',
      '(0.1x^2+90*(1+.00011)a+b)/(cx^2+d+0.01)',
      '(0.1x^2+90*(1-.00011)a+b)/(cx^2+d+0.01)',
      '(0.1x^2+90a+b)/(cx^2+d+0.01*(1+.00011))',
      '(0.1x^2+90a+b)/(cx^2+d+0.01*(1-.00011))',
    ],
  },
  {
    original: '10 exp(7x^2/(3-sqrt(y)))',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      '10 exp(7x^2/(3-sqrt(y)))',
      '10*(1+.00009)exp(7*(1+.00009)x^2/(3*(1+.00009)-sqrt(y)))',
      '10*(1+.00009)exp(7*(1+.00009)x^2/(3*(1-.00009)-sqrt(y)))',
      '10*(1+.00009)exp(7*(1-.00009)x^2/(3*(1+.00009)-sqrt(y)))',
      '10*(1+.00009)exp(7*(1-.00009)x^2/(3*(1-.00009)-sqrt(y)))',
      '10*(1-.00009)exp(7*(1+.00009)x^2/(3*(1+.00009)-sqrt(y)))',
      '10*(1-.00009)exp(7*(1+.00009)x^2/(3*(1-.00009)-sqrt(y)))',
      '10*(1-.00009)exp(7*(1-.00009)x^2/(3*(1+.00009)-sqrt(y)))',
      '10*(1-.00009)exp(7*(1-.00009)x^2/(3*(1-.00009)-sqrt(y)))',
    ],
    incorrect_answers: [
      '10*(1+.00011)exp(7x^2/(3-sqrt(y)))',
      '10*(1-.00011)exp(7x^2/(3-sqrt(y)))',
      '10exp(7*(1+.00011)x^2/(3-sqrt(y)))',
      '10exp(7*(1-.00011)x^2/(3-sqrt(y)))',
      '10exp(7x^2/(3*(1+.00011)-sqrt(y)))',
      '10exp(7x^2/(3*(1-.00011)-sqrt(y)))',
    ],
  },
  {
    original: 'sin(2pi x)-3e',
    allowed_error: 0.0001,
    include_exponents: false,
    correct_answers: [
      'sin(2pi x) - 3e',
      'sin(6.2826 x) - 8.1541',
      'sin(6.2826 x) - 8.1556',
      'sin(6.2838 x) - 8.1541',
      'sin(6.2838 x) - 8.1556',
    ],
    incorrect_answers: [
      'sin(6.2824 x)- 3e',
      'sin(6.2839 x)- 3e',
      'sin(2pi x) - 8.1539',
      'sin(2pi x) - 8.1557',
    ],
  },
]



for (let objectToTest of allow_error_in_numbers) {
  describe("allow error in numbers for " + objectToTest.original, function () {

    let orig = me.fromText(objectToTest.original)
      .evaluate_numbers({ max_digits: Infinity })
      .normalize_function_names()
      .normalize_applied_functions()
      .simplify();

    for (let option of objectToTest.correct_answers) {
      let ans = me.fromText(option)
        .evaluate_numbers({ max_digits: Infinity })
        .normalize_function_names()
        .normalize_applied_functions()
        .simplify();

      test(option + " is correct", () => {

        expect(orig.equalsViaSyntax(ans, {
          allowed_error_in_numbers: objectToTest.allowed_error,
          include_error_in_number_exponents: objectToTest.include_exponents
        })).toBeTruthy();
      });
    }
    for (let option of objectToTest.incorrect_answers) {
      let ans = me.fromText(option)
        .evaluate_numbers({ max_digits: Infinity })
        .normalize_function_names()
        .normalize_applied_functions()
        .simplify();
      test(option + " is incorrect", () => {

        expect(orig.equalsViaSyntax(ans, {
          allowed_error_in_numbers: objectToTest.allowed_error,
          include_error_in_number_exponents: objectToTest.include_exponents
        })).toBeFalsy();
      });
    }
  });
}


