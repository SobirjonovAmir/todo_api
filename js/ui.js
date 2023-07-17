export function createBlock(arr, place, txt) {
	let limit = 4

	function getBtnText() {
		return arr.length - limit > 12 ? "show more 12" : `Show more ${arr.length - limit}`
	}

	const box = document.createElement("div")
	const box_title = document.createElement("h2")
	const items_box = document.createElement("div")
	const btns = document.createElement("div")
	const show_more = document.createElement("button")
	const hide_all = document.createElement("button")

	box.classList.add("box")
	box_title.classList.add("box__title")
	items_box.classList.add("box__items")
	btns.classList.add("buttons")

	box_title.innerHTML = txt
	show_more.textContent = getBtnText()
	hide_all.textContent = "Hide"

	if (arr.length) {
		box.append(box_title, items_box, btns)
	}
	if (arr.length > limit) {
		btns.append(show_more)
	}


	place.append(box)
	hide_all.onclick = () => {
		limit = 4
		reload(arr.slice(0, limit), items_box)
		show_more.innerHTML = getBtnText()
		hide_all.remove()
	}
	show_more.onclick = () => {
		if (show_more.innerText === 'Hide') {
			limit = 4
			reload(arr.slice(0, limit), items_box)
			show_more.innerHTML = getBtnText()
			return
		}

		if ((arr.length - limit) > 12) {
			reload(arr.slice(0, limit + 12), items_box)
			limit += 12
			btns.append(hide_all)
			show_more.innerHTML = getBtnText()
		} else {
			reload(arr, items_box)
			hide_all.remove()
			show_more.innerHTML = "Hide"
		}
	}

	reload(arr.slice(0, limit), items_box)
}


function reload(arr, box) {
	box.innerHTML = ""

	for (let i = 0; i < arr.length; i++) {
		let item = arr[i]



		const div = document.createElement("div")
		const title = document.createElement("h3")
		const description = document.createElement("p")
		const date = document.createElement("span")
		const content = document.createElement("div")

		const label = document.createElement("label")
		const checkbox = document.createElement("input")
		const span = document.createElement("span")

		checkbox.type = "checkbox"
		label.for = `checkbox${i}`
		label.classList.add('checkbox-label');
		checkbox.type = 'checkbox'
		checkbox.id = `checkbox${i}`;
		checkbox.classList.add('styled-checkbox');
		span.classList.add('checkbox-custom');
		div.classList.add("item")
		title.classList.add("item__title")
		description.classList.add()
		content.classList.add("content")

		title.textContent = item.title
		description.textContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
		date.innerHTML = formatDate(item.date)
		checkbox.checked = item.completed


		checkbox.onchange = () => {
			item.completed = checkbox.checked
		}


		content.append(title, description, date)
		label.append(checkbox, span)
		div.append(label, content)

		box.append(div)
	}
}

function formatDate(dateString) {
	if (!dateString || dateString.trim() === '') {
		return "";
	}
	let parts = dateString.split("-");
	let year = parseInt(parts[0]);
	let month = parseInt(parts[1]);
	let day = parseInt(parts[2]);
	let date = new Date(year, month - 1, day);
	let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sen", "Oct", "Nov", "Dec"];
	let monthName = monthNames[date.getMonth()];
	let dayNumber = date.getDate();
	let formattedDate = `${monthName} ${dayNumber}`;
	if (getDaysRemaining(date) === 1) {
		return "Today"
	} else if (getDaysRemaining(date) === 2) {
		return "Tomorrow"
	} else {
		return formattedDate;
	}
}
export function getDaysRemaining(targetDateString) {
	const targetDate = new Date(targetDateString);
	const currentDate = new Date();

	const timeDifference = targetDate.getTime() - currentDate.getTime();
	const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

	return daysRemaining;
}