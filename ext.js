let link = [];

const inputEl = document.querySelector("#input-el")
const ulEl = document.querySelector("#ul-el")
let inputBtn = document.querySelector("#input-btn")
let deletBtn = document.querySelector("#delete-btn")
let tabBtn = document.querySelector("#tab-btn")

tabBtn.addEventListener("click", function () {

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {


        link.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(link))
        render(link)
    })
})

inputBtn.addEventListener("click", function () {
    link.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("links", JSON.stringify(link))
    render(link)

})
let fromLocalStorage = JSON.parse(localStorage.getItem("links"))

if (fromLocalStorage) {
    link = fromLocalStorage
    render(link)
}

deletBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    link = []
    render(link)
})

function render(arrLink) {
    let eachLink = ""
    for (let value of arrLink) {
        eachLink += `
        <li>
            <a target='_blank' href='${value}'>${value}</a>
        </li>
        `
    }
    ulEl.innerHTML = eachLink
}