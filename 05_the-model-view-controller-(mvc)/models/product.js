const fs = require('fs')
const path = require('path')

const myPath = require('../util/path')

const p = path.join(myPath, 'data', 'products.json')

const getProductsFromFile = callback => {
	fs.readFile(p, (error, fileContent) => {
			if (error) {
				callback([])
			} else {
				callback(JSON.parse(fileContent))
			}
		})
}

module.exports = class Product {
	constructor (t) {
		this.title = t
	}
	save() {
		getProductsFromFile(products => {
			products.push(this)
			fs.writeFile(p, JSON.stringify(products), (error) => {
				console.log(error)
			})
		})
	}
	static fetchAll(callback) {
		getProductsFromFile(callback)
	}
}
