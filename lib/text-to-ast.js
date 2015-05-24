/* recursive descent parser for math expressions */

/* Grammar: 

   expression =
    expression '+' term | 
    expression '-' term |
    term

   term =
    term '*' factor |
    term nonMinusFactor |
    term '/' factor |
    factor

   nonMinusFactor =
    '(' expression ')' |
    '|' expression '|' |    THIS IS TOTALLY BROKEN
    number | 
    variable |
    function factor |
    function '(' expression ')' |
    function '^' factor factor |
    nonMinusFactor '^' factor

   factor = 
    '-' factor |
    nonMinusFactor
*/

var lexer = new (require('./lexer').Parser);

/****************************************************************/
/* setup the lexer */

lexer.parse('');
lexer = lexer.lexer;

var symbol = '';

function advance() {
    symbol = lexer.lex();
    
    if (symbol == 4)
	symbol = 'EOF';
    
    return symbol;
}

function yytext() {
    return lexer.yytext;
}

function parse(input) {
    lexer.setInput(input);
    advance();
    
    return expression();
}


/****************************************************************/
/* grammar */

function expression() {
    var lhs = term();
    
    while ((symbol == '+') || (symbol == '-')) {
	var operation = false;
	
	if (symbol == '+')
	    operation = '+';
	
	if (symbol == '-')
	    operation = '-';
	
	advance();
	
	var rhs = term();
	
	lhs = [operation, lhs, rhs];
    }
    
    return lhs;
}

function isFunctionSymbol( symbol )
{
    var functionSymbols = ['SIN', 'COS', 'TAN', 'CSC', 'SEC', 'COT', 'ARCSIN', 'ARCCOS', 'ARCTAN', 'ARCCSC', 'ARCSEC', 'ARCCOT', 'LOG', 'LN', 'EXP', 'SQRT', 'ABS'];
    return (functionSymbols.indexOf(symbol) != -1);
}    

function term() {
    var lhs = factor();

    var keepGoing = false;
    
    do {
	keepGoing = false;
	
	if (symbol == '*') {
	    advance();
	    lhs = ['*', lhs, factor()];
	    keepGoing = true;
	} else if (symbol == '/') {
	    advance();
	    lhs = ['/', lhs, factor()];
	    keepGoing = true;
	} else {
	    rhs = nonMinusFactor();
	    if (rhs != false) {
		lhs = ['*', lhs, rhs];
		keepGoing = true;
	    }
	}
    } while( keepGoing );
    
    return lhs;
}

function factor() {
    if (symbol == '-') {
	advance();
	return ['~', factor()];
    }
    
    return nonMinusFactor();
}

function nonMinusFactor() {
    var result = false;
    
    if (symbol == 'NUMBER') {
	result = parseFloat( yytext() );
	advance();
    } else if (symbol == 'VAR') {
	result = yytext();
	advance();
    } else if (symbol == 'PI') {
	result = "pi"
	advance();
    } else if (isFunctionSymbol(symbol)) {
	var functionName = symbol.toLowerCase();
	advance();

	if (symbol == '(') {
	    advance();
	    var parameter = expression();
	    if (symbol != ')') {
		throw 'Expected )';	    
	    }
	    advance();

	    result = [functionName, parameter];
	} else if (symbol == '^') {
	    advance();
	    var power = factor();
	    var parameter = factor();
	    result = ['^', [functionName, parameter], power];
	} else {
	    result = [functionName, factor()];
	}
    } else if (symbol == '(') {
	advance();
	var result = expression();
	if (symbol != ')') {
	    throw 'Expected )';	    
	}
	advance();
    } else if (symbol == '|') {
	advance();
	var result = ['abs', expression()];
	if (symbol != '|') {
	    throw 'Expected |';	    
	}
	advance();
    }
    
    if (symbol == '^') {
	advance();
	return ['^', result, factor()];
    }
    
    return result;
}

exports.textToAst = parse;

