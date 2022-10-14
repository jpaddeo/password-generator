import words from '../data.json'
import {
	ABC_ARRAY,
	getLower,
	getNumber,
	getSymbol,
	getUpper,
	makeRandomString,
	setMinMaxLength,
	setSeparator,
	checkIfIncludeAtLeastOneNumberAndSymbol
} from './utils'

export function randomPassword({ length = 8, includeNumbers, includeSymbols }) {
	let password = ''
	length = setMinMaxLength({ length, min: 8, max: 100 })

	for (let i = 0; i < parseInt(length); i++) {
		const x = Math.random()

		if (includeNumbers && includeSymbols) {
			if (x < 0.3) {
				password += getUpper()
			} else if (x >= 0.3 && x < 0.6) {
				password += getLower()
			} else if (x >= 0.6 && x < 0.8) {
				password += getNumber()
			} else {
				password += getSymbol()
			}
		} else if (includeNumbers) {
			if (x < 0.33) {
				password += getUpper()
			} else if (x >= 0.33 && x < 0.66) {
				password += getLower()
			} else if (x >= 0.66) {
				password += getNumber()
			}
		} else if (includeSymbols) {
			if (x < 0.33) {
				password += getUpper()
			} else if (x >= 0.33 && x < 0.66) {
				password += getLower()
			} else if (x >= 0.66) {
				password += getSymbol()
			}
		} else {
			if (x < 0.5) {
				password += getUpper()
			} else {
				password += getLower()
			}
		}
	}

	// This ensure there is at least one number or symbol in the password
	if (includeNumbers && includeSymbols) {
		if (!/\d/.test(password)) {
			password = password.replace(
				password[Math.floor(Math.random() * password.length)],
				getNumber()
			)
		}

		if (!/[!@*_\-/.]/.test(password)) {
			password = password.replace(
				password[Math.floor(Math.random() * password.length)],
				getSymbol()
			)
		}
	}

	return [...password]
}

export function smartPassword() {
	const password = []

	for (let i = 0; i < 5; i++) {
		password.push(makeRandomString({ arr: ABC_ARRAY, length: 3 }))
	}

	const randNumber = Math.floor(Math.random() * 5)
	password[randNumber] = password[randNumber].toUpperCase()

	const newArrayLength = 5 * 2 - 1
	for (let i = 1; i < newArrayLength; i += 2) {
		const isNumber = Math.random() < 0.5
		if (isNumber) {
			password.splice(i, 0, getNumber())
		} else {
			password.splice(i, 0, getSymbol())
		}
	}

	return checkIfIncludeAtLeastOneNumberAndSymbol(password)
}

export function pinCode({ length = 4 }) {
	let password = ''
	length = setMinMaxLength({ length, min: 4, max: 12 })

	for (let i = 0; i < parseInt(length); i++) {
		password += getNumber()
	}

	return [...password]
}

export function memorablePassword({
	wordsNumber = 3,
	separator = 'Hyphens',
	capitalize = false,
	fullWords = true
}) {
	let wordsArray = []
	wordsNumber = setMinMaxLength({ length: wordsNumber, min: 3, max: 15 })

	if (fullWords) {
		wordsArray = words.sort(() => 0.5 - Math.random()).splice(0, wordsNumber)
	} else {
		for (let i = 0; i < wordsNumber; i++) {
			wordsArray.push(makeRandomString({ arr: ABC_ARRAY }))
		}
	}

	if (capitalize) {
		const randNumber = Math.floor(Math.random() * wordsNumber)
		wordsArray[randNumber] = wordsArray[randNumber].toUpperCase()
	}

	if (separator === 'Numbers') {
		let position = 1
		wordsArray.forEach((_val, _idx, arr) => {
			if (position < arr.length) {
				arr.splice(position, 0, getNumber())
				position += 2
			}
		})
		return wordsArray
	}

	if (separator === 'Numbers and Symbols') {
		const newArrayLength = wordsNumber * 2 - 1
		for (let i = 1; i < newArrayLength; i += 2) {
			const isNumber = Math.random() < 0.5
			if (isNumber) {
				wordsArray.splice(i, 0, getNumber())
			} else {
				wordsArray.splice(i, 0, getSymbol())
			}
		}

		return checkIfIncludeAtLeastOneNumberAndSymbol(wordsArray)
	}

	return [...wordsArray.join(setSeparator(separator))]
}
