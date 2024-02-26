export function initIndexedDB({
	databaseName,
	version = 3,
	objectStoreName = null,
}) {
	return new Promise((resolve, reject) => {
		let request = window.indexedDB.open(databaseName, version);

		request.onerror = function (event) {
			reject('IndexedDB error: ' + event.target.errorCode);
		};

		request.onupgradeneeded = function (event) {
			let db = event.target.result;
			db.createObjectStore(objectStoreName);
		};

		request.onsuccess = function (event) {
			console.log('IndexedDB opened successfully');
			resolve(event.target.result);
		};
	});
}

export async function cacheIndexedDB(databaseName, objectStoreName, notesData) {
	try {
		let db = await initIndexedDB(databaseName, objectStoreName);
		let transaction = db.transaction(objectStoreName, 'readwrite');
		let objectStore = transaction.objectStore(objectStoreName);

		let existingData = await objectStore.getAll();
		if (existingData.length > 0) {
			await objectStore.clear();
		}

		objectStore.add(notesData);
	} catch (error) {
		console.error('Error caching data: ', error);
	}
}

export async function fetchIndexedDB(databaseName, objectStoreName) {
	try {
		let db = await initIndexedDB({
			databaseName: databaseName,
		});
		let transaction = db.transaction(objectStoreName, 'readonly');
		let objectStore = transaction.objectStore(objectStoreName);

		let data = await objectStore.getAll();
		console.log('fetchData:', data);
		if (data.length === 0) {
			return [];
		}
		return data;
	} catch (error) {
		console.error('Error retrieving data: ', error);
	}
}
