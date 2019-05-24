/*
	Calcul le factoriel d'un nombre
*/
function factorial(n) {
  var result = 1;
  for (var i = 1; i <= n; i++) {
    result *= i
  }
  return result;
}

/*
	Calcul de k parmis n de la loi Binomiale
*/
function binomialFactor(k,n) {
	return ( factorial(n) / (factorial(k)*factorial(n-k)) );
}

/*
	Calcul le nombre de combinaisons possibles afin d'obtenir une somme (s) avec un nombre (n) de dé(s)
*/
function dicePossibilitiesQuantity(s,n,p) {
	var result = 0,
		k = 0;

	do {
		result += Math.pow(-1,k) * binomialFactor(k,n) * binomialFactor((n-1),(s - p*k - 1));
		k++;
	} while( k <= Math.floor((s-n)/p) );
	return result;
}

/*
	Calcul la probabilité d'une somme (s) d'un nombre (n) de dé(s)
*/
function dicePossibilities(s,n,k)
{
	return dicePossibilitiesQuantity(s,n,k)/Math.pow(k,n);
}
