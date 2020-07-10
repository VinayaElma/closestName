function diceCoefficient(first, second) {
	first = first.replace(/\s+/g, '')
	second = second.replace(/\s+/g, '')

	if (!first.length && !second.length) return 1;                   
	if (!first.length || !second.length) return 0;                   
	if (first === second) return 1;       							
	if (first.length === 1 && second.length === 1) return 0;      
	if (first.length < 2 || second.length < 2) return 0;			

	let firstBigrams = new Map();
	for (let i = 0; i < first.length - 1; i++) {
		const bigram = first.substr(i,2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram) + 1
			: 1;

		firstBigrams.set(bigram, count);
	};

	let intersectionSize = 0;
	for (let i = 0; i < second.length - 1; i++) {
		const bigram = second.substr(i,2);
		const count = firstBigrams.has(bigram)
			? firstBigrams.get(bigram)
			: 0;

		if (count > 0) {
			firstBigrams.set(bigram, count - 1);
			intersectionSize++;
		}
	}

	return (2.0 * intersectionSize) / (first.length + second.length - 2);
}

function findBestMatch(mainString, targetStrings) {
	if (!areArgsValid(mainString, targetStrings)) throw new Error('Bad arguments: First argument should be a string, second should be an array of strings');
	
	const ratings = [];
	let bestMatchIndex = [];

	for (let i = 0; i < targetStrings.length; i++) {
		const currentTargetString = targetStrings[i];
		const currentRating = diceCoefficient(mainString, currentTargetString)
		ratings.push({target: currentTargetString, rating: currentRating})
		if (currentRating >= 0.5 && currentRating!=1){
			bestMatchIndex.push(i);
		}
	}
	
	const bestMatch=[];
	for(let i=0;i<bestMatchIndex.length;i++){
		var j=bestMatchIndex[i];
		bestMatch.push({name:ratings[j].target, rating:ratings[j].rating})
	}
	 return bestMatch;
}

function areArgsValid(mainString, targetStrings) {
	if (typeof mainString !== 'string') 
	{
		console.log("false");
		return false;
	}
	if (!Array.isArray(targetStrings))
	{
		return false;
	}
	if (!targetStrings.length) 
	{
		return false;
	}
	if (targetStrings.find(s => typeof s !== 'string')) 
	{
		return false;
	}
	return true;
}

module.exports = {
	areArgsValid,
	findBestMatch,
	diceCoefficient
};
