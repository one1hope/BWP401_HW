// my java script file
// made by the team


// ==================== slider effect ====================

var slider = document.getElementById("featuredSlider")

if (slider != null) {

    slider.addEventListener("slide.bs.carousel", function() {
        slider.style.opacity = "0"
        slider.style.transition = "opacity 0.5s"
    })

    slider.addEventListener("slid.bs.carousel", function() {
        slider.style.opacity = "1"
    })

}


// ==================== filter by category (index page) ====================

var btns = document.querySelectorAll(".category-btn")

if (btns.length > 0) {

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {

            var cat = this.getAttribute("data-category")
            var cards = document.querySelectorAll(".event-card")

            for (var j = 0; j < cards.length; j++) {
                if (cat == "all") {
                    cards[j].style.display = ""
                } else if (cards[j].getAttribute("data-category") == cat) {
                    cards[j].style.display = ""
                } else {
                    cards[j].style.display = "none"
                }
            }

        })
    }

}


// ==================== filter and sort (events page) ====================

var categorySelect = document.querySelectorAll(".form-select")[0]
var sortSelect = document.querySelectorAll(".form-select")[1]

if (categorySelect != undefined && sortSelect != undefined) {

    categorySelect.addEventListener("change", function() {
        filterEvents()
    })

    sortSelect.addEventListener("change", function() {
        filterEvents()
    })

}

function filterEvents() {

    var selectedCategory = categorySelect.value
    var selectedSort = sortSelect.value
    var allCards = document.querySelectorAll(".event-card")

    // map arabic names to data-category values
    var catMap = {
        "كل التصنيفات": "all",
        "ثقافة": "culture",
        "رياضة": "sports",
        "موسيقى": "music",
        "عائلي": "family",
        "احداث خاصة": "special",
        "تقنية": "special",
        "تعليمي": "culture",
        "وظائف": "special"
    }

    var catValue = catMap[selectedCategory]
    if (catValue == undefined) catValue = "all"

    for (var i = 0; i < allCards.length; i++) {
        var card = allCards[i]
        if (catValue == "all") {
            card.style.display = ""
        } else if (card.getAttribute("data-category") == catValue) {
            card.style.display = ""
        } else {
            card.style.display = "none"
        }
    }

    // sort by date
    var months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"]

    var container = document.querySelector(".row.g-4")
    var visibleCards = []

    for (var i = 0; i < allCards.length; i++) {
        if (allCards[i].style.display != "none") {
            visibleCards.push(allCards[i])
        }
    }

    visibleCards.sort(function(a, b) {
        var textA = a.querySelector(".text-muted").textContent
        var textB = b.querySelector(".text-muted").textContent

        var matchA = textA.match(/(\d+)[^\d]*([\u0600-\u06FF]+)\s+(\d{4})/)
        var matchB = textB.match(/(\d+)[^\d]*([\u0600-\u06FF]+)\s+(\d{4})/)

        var dateA = new Date(2099, 0, 1)
        var dateB = new Date(2099, 0, 1)

        if (matchA) dateA = new Date(matchA[3], months.indexOf(matchA[2]), matchA[1])
        if (matchB) dateB = new Date(matchB[3], months.indexOf(matchB[2]), matchB[1])

        if (selectedSort == "الاحدث اولاً") {
            return dateB - dateA
        } else {
            return dateA - dateB
        }
    })

    for (var i = 0; i < visibleCards.length; i++) {
        container.appendChild(visibleCards[i])
    }

}


// ==================== contact form ====================

var form = document.getElementById("contactForm")

if (form != null) {

    form.addEventListener("submit", function(e) {
        e.preventDefault()

        var name = document.getElementById("name").value
        var email = document.getElementById("email").value
        var subject = document.getElementById("subject").value
        var message = document.getElementById("message").value

        var isValid = true

        // check name
        if (name == "") {
            document.getElementById("name").classList.add("is-invalid")
            isValid = false
        } else {
            document.getElementById("name").classList.remove("is-invalid")
        }

        // check email
        if (email == "" || !email.includes("@")) {
            document.getElementById("email").classList.add("is-invalid")
            isValid = false
        } else {
            document.getElementById("email").classList.remove("is-invalid")
        }

        // check subject
        if (subject == "") {
            document.getElementById("subject").classList.add("is-invalid")
            isValid = false
        } else {
            document.getElementById("subject").classList.remove("is-invalid")
        }

        // check message
        if (message == "") {
            document.getElementById("message").classList.add("is-invalid")
            isValid = false
        } else {
            document.getElementById("message").classList.remove("is-invalid")
        }

        var alertBox = document.getElementById("alertMessage")

        if (isValid == true) {
            alertBox.innerHTML = '<div class="alert alert-success">تم ارسال رسالتك بنجاح سنتواصل معك قريبا !</div>'
            form.reset()
        } else {
            alertBox.innerHTML = '<div class="alert alert-danger">يرجى تعبئة جميع الحقول !</div>'
        }

    })

}
