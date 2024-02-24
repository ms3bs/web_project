
// let links = document.getElementsByClassName("header__item")

// for (let i = 0; i < links.lenght; i++) {
// 	alert(links[i])
// }

document.querySelectorAll(".header__item").forEach(t => {
	if (t.classList.contains("page__link") == true && t.href == document.location.origin + document.location.pathname) {
		t.classList.add("m-menu__active-item")
	}
})

document.querySelectorAll(".m-menu__item").forEach(t => {
	if (t.classList.contains("page__link") == true && t.href == document.location.origin + document.location.pathname) {
		t.classList.add("m-menu__active-item")
	}
})