module.exports.validateNote = (obj) => {
	if (!obj.id) {
		console.log(`\x1b[31m%s\x1b[0m`, `Missing property "id" or value undefined`)
		console.log(`\x1b[31mObject: %s does not contain property "id" or value undefined\x1b[0m`, JSON.stringify(obj, null, 2))
		return false
	}
	if (!obj.text) {
		console.log(`\x1b[31m%s\x1b[0m`, `Missing property "text" or value undefined`)
		console.log(`\x1b[31mObject: %s does not contain property "text" or value undefined\x1b[0m`, JSON.stringify(obj, null, 2))
		return false
	}
	if (!obj.createdAt) {
		console.log(`\x1b[31m%s\x1b[0m`, `Missing property "createdAt" or value undefined`)
		console.log(`\x1b[31mObject: %s does not contain property "createdAt" or value undefined\x1b[0m`, JSON.stringify(obj, null, 2))
		return false
	}
	if (!obj.lastModifiedAt) {
		console.log(`\x1b[31m%s\x1b[0m`, `Missing property "lastModified" or value undefined`)
		console.log(`\x1b[31mObject: %s does not contain property "lastModified" or value undefined\x1b[0m`, JSON.stringify(obj, null, 2))
		return false
	}
	return true
}

module.exports.validateArray = (arr) => {
	if (!Array.isArray(arr)) {
		console.log(`\x1b[31m%s\x1b[0m`, `Expecting Array...`)
		console.log(`\x1b[31mObject: %s is not an Array\x1b[0m`, JSON.stringify(arr, null, 2))
		return false
	}
	return true
}

module.exports.validateNoteArray = (arr) => {
	if (!this.validateArray(arr)) {
		return false
	}
	for (let i = 0; i < arr.length; i++) {
		if (!this.validateNote(arr[i])) {
			return false
		}
	}
	return true
}
