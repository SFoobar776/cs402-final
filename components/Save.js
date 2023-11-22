const RNFS = require('react-native-fs');
const filePath = RNFS.DocumentDirectoryPath + '/data';

export function load() {
	return RNFS.readFile(filePath).then((data) => {
		return JSON.parse(data);
	}, (e) => {
		console.log("An error occured while loading:",e);
		return [];
	});
}

export function save(data) {
	RNFS.writeFile(filePath, JSON.stringify(data));
}