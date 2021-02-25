class Menu {
    constructor(icon, menu_options, cl, add_btn, remove_btn, select_btn) {
        this.icon = icon
        this.menu_options = menu_options
        this.cl = cl
        this.add_btn = add_btn
        this.remove_btn = remove_btn
        this.select_btn = select_btn
        this.icon.addEventListener("click", this.expand.bind(this))

    }
    expand() {
        this.menu_options.classList.toggle(this.cl)
    }

    add(ul) {
        const text = prompt("podaj coś")
        if (!text) return this.add(ul)
        const li = document.createElement("li")
        li.classList.add("list_element")
        li.innerHTML = `<input type="checkbox"> ${text}`
        ul.appendChild(li)
    }

    remove(arr, elem) {
        arr.forEach(item => {
            item.parentNode.remove()
        })
    }

    select(arr) {
        arr.forEach(item => {
            if (item.parentNode.style.color === "red") {
                item.parentNode.style.color = "black"
            } else item.parentNode.style.color = "red"
        })
    }
}

class Search {
    static searcher(arr_elements, str) {
        arr_elements = arr_elements.filter(item => item.textContent.toLowerCase().includes(str.toLowerCase()))
        return arr_elements
    }
}

class Select {
    constructor(elements) {
        this.elements = elements

    }
    check(elementy) {
        const arr = []
        elementy.forEach(item => {
            if (item.checked) {
                arr.push(item)
            }
        })
        return arr
    }
}


class List {
    constructor() {

        // *********** chceckboxy
        this.checkboxes = [...document.querySelectorAll(".list_element input")]
        this.boxes = new Select(this.checkboxes)
        this.checkboxes.forEach(item => addEventListener("input", this.selection.bind(this)))
        this.select_all_checkbox = document.getElementById("select_all")
        this.select_all_checkbox.addEventListener("input", this.select_all.bind(this))

        // ********************
        // menu

        this.add_btn = document.querySelector(".opt.add")
        this.remove_btn = document.querySelector(".opt.remove")
        this.select_btn = document.querySelector(".opt.select")
        this.menu = new Menu(document.querySelector(".fa-sort-down"), document.querySelector(".menu_wrapper .options_wrapper"), "active", this.add_btn, this.remove_btn, this.select_btn)

        this.menu.add_btn.addEventListener("click", this.add.bind(this))
        this.menu.remove_btn.addEventListener("click", this.remove.bind(this))
        this.menu.select_btn.addEventListener("click", this.select.bind(this))

        // *************

        this.input = document.querySelector(".searcher input")
        this.elements_container = document.querySelector("ul.list")
        this.elements = [...document.querySelectorAll(".list_element")]
        this.input.addEventListener("input", this.search.bind(this))


    }
    // metody to-do listy
    // wyszukiwarka

    search(e) {
        const elements_to_display = Search.searcher(this.elements, this.input.value.toLowerCase())
        this.elements_container.textContent = ""
        elements_to_display.forEach(item => {
            this.elements_container.appendChild(item)
        })
    }
    //// ******************* tablica z zaznoczonymi chceckboxami

    selection() {
        return this.boxes.check(this.checkboxes)
    }

    //*************************** */ metoda obslugujaca "zaznacz wszystko"
    select_all(e) {
        if (e.target.checked) {
            this.checkboxes.forEach(item => {
                item.checked = true
            })

        } else {
            this.checkboxes.forEach(item => {
                item.checked = false
            })
        }
    }

    // metody menu

    add(e) {
        this.menu.add(this.elements_container)
        this.checkboxes = [...document.querySelectorAll(".list_element input")]
        this.elements = [...document.querySelectorAll(".list_element")]

    }

    remove(e) {
        this.menu.remove(this.selection(), this.elements)
        this.elements = [...document.querySelectorAll(".list_element")]
        this.checkboxes = [...document.querySelectorAll(".list_element input")]
    }

    select(e) {
        this.menu.select(this.selection())
    }
    // *****************************
}

const to_do = new List()