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
	constructor (title, imageUrl, description, price) {
		this.title = title
		this.imageUrl = imageUrl
		this.description = description
		this.price = price
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
