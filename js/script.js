import {
	getData
} from "./http.js"
import {
	createBlock,
	getDaysRemaining
} from "./ui.js"


const boxes = document.querySelector(".boxes")
const all = []
const today = []
const tomorrow = []
const later = []
const expired = []
let undone = 0


getData("/todos")
	.then(data => {
		data.forEach(el => {
			let random = Math.ceil(Math.random() * 31)
			el.date = `2023-07-${random > 10 ? random : "0" + random}`
			all.push(el)
		})
		all.forEach(el => {
			if (getDaysRemaining(el.date) === 1) {
				today.push(el)
			} else if (getDaysRemaining(el.date) === 2) {
				tomorrow.push(el)
			} else if (getDaysRemaining(el.date) > 2) {
				later.push(el)
			} else {
				expired.push(el)
			}

			if (!el.completed) {
				undone += 1
			}
			document.querySelector(".undone").innerHTML = undone
		})

		createBlock(today, boxes, `For  today - ${today.length}`)
		createBlock(tomorrow, boxes, `Tomorrow - ${tomorrow.length}`)
		createBlock(later, boxes, `Later - ${later.length}`)
		createBlock(expired, boxes, `Expired - ${expired.length}`)

		let yellow = document.querySelector(".box__title")
		yellow.style.color = "#ffc700"
		undone = 0
	})


