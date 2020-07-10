
var namesJSON = require('./names.json'),
stringSimilarity = require('./stringSimilarity');

function findClosestNames(nameGivenByUser){
	var bestMatch = [];
	bestMatch = stringSimilarity.findBestMatch(nameGivenByUser,namesJSON);
	for(let i=0;i< bestMatch.length;i++)
	{
		console.log(bestMatch[i].name + " : " + bestMatch[i].rating)
	}
}

var nameGivenByUser = process.argv.slice(2);
findClosestNames(nameGivenByUser[0]);
