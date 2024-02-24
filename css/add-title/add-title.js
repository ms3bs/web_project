(() => {
	// localStorage.setItem("titles", JSON.stringify([]))
	fetchTitles(1)
	window.addEventListener('scroll', throttle(checkPosition, 250))
	window.addEventListener('resize', throttle(checkPosition, 250))
})()

let nextPage = 2;
let fetchPages = 4
function checkPosition() {
	const height = document.body.offsetHeight
	const screenHeight = window.innerHeight
	const scrolled = window.scrollY

	const threshold = height - screenHeight / 4

	const position = scrolled + screenHeight

	if (position >= threshold) {
		if (nextPage < fetchPages) {
			fetchTitles(nextPage)
		}
		else {
			displayFromLocalStorage(nextPage)
		}

		nextPage++
	}
}

function throttle(callee, timeout, ...args) {
	let timer = null

	return function perform() {
	if (timer) return

	timer = setTimeout(() => {
		callee(...args)

		clearTimeout(timer)
		timer = null
	}, timeout)
	}
}

function fetchTitles(pageNumber) {
	let query = fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${pageNumber}`)
    query
		.then(response => response.json())
		.then(json => {
			for (let i = 0; i < 50; i++) {
				let title = {
					"id": json[i]["id"],
					"name": json[i]["title"],
					"img": json[i]["url"]
				}
				displayTitle(title)
			}
		})

}

function displayFromLocalStorage() {
    let titles = JSON.parse(localStorage.getItem("titles"))
    if (titles == null)
        titles = []

    titles
        .slice((nextPage - fetchPages) * 50, (nextPage - fetchPages + 1) * 50)
        .forEach(t => displayTitle(t))
}

function toggleAddTittle() {
	document.getElementsByClassName("page")[0].classList.toggle("page_m-menu-opened")
	document.getElementsByClassName("add-title")[0].classList.toggle("add-title_active")
}

function displayTitle(title) {
	let titleList = document.getElementById("title-list")
	let template = document.getElementById("title-template")
	let clone = template.content.cloneNode(true)

	clone.querySelector(".title__name").innerHTML = title.name
	clone.querySelector(".title__photo").setAttribute("style", `background-image: url(${title.img})`)

	titleList.appendChild(clone)
}


document.getElementById("add-title-final-button").addEventListener("click", event => {
    let titles = JSON.parse(localStorage.getItem("titles"))
	if (titles === null) {
    	titles = []
    }

	let title = {
		"id": titles.lenght,
		"name": document.getElementById("add-title-name").value,
		"author-name": document.getElementById("add-title-author").value,
		"painter-name": document.getElementById("add-title-painter").value,
		"description": document.getElementById("add-title-description").value,
		"img": "img/template.jpg"
	}

	Array.from(document.getElementsByClassName("add-title__input")).forEach(t => t.value = "")
	titles.push(title)
	displayTitle(title)
	localStorage.setItem("titles", JSON.stringify(titles))

	toggleAddTittle()
})


