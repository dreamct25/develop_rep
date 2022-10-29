const querySelector = parameter => document.querySelector(parameter)
const querySelectorAll = parameter => document.querySelectorAll(parameter)
let objs = {}
objs.item = JSON.parse(localStorage.getItem("item")) || []
objs.itemDeleted = JSON.parse(localStorage.getItem("itemDeleted")) || []
objs.id = 0
objs.deleteArray = []
objs.partArrayTemp = []
objs.partArray = []
objs.goList = true

function creatList(data = [], base) {
    querySelector(".table thead").innerHTML = `
    <tr>
        <th width="5%">Finish</th>
        <th>Title</th>
        <th width="15%">Create Time</th>
        <th width="15%">Create Date</th>
        <th width="15%">Modify</th>
    </tr>`
    if (data.length == 0) {
        base.innerHTML = `
        <tr class="list-in">
            <td colspan="5">Nothing to added in your todo list</td>
        </tr>
        `
        return
    }
    base.innerHTML = data.map((lists, order) =>
        `<tr class="list-in">
            <td>
                <input type="checkbox" onclick="getIndex(${lists.id},${order})" id="item${order}" ${lists.hasFinish == true?'checked':''}/>
            </td>
            <td>
                <label for="item${order}" data-num="${order}" class="outside-text">${lists.title}</label>
                <input type="text" data-num="${order}" class="inside-text" value="${lists.title}">
                <div class="inside-text-bottom"></div>
            </td>
            <td>${lists.createTime}</td>
            <td>${lists.createDate}</td>
            <td>
                <span class="modify-btn" data-num="${order}" onclick="modifyItem(this,${lists.id})">Modify<span>
            </td>
        </tr>`
    ).join('')
}

// 設定刪除歷史清單框架函式，後將變數帶入參數使用
function deletedList(data = [], base) {
    querySelector(".chooses").textContent = ""
    querySelector(".table thead").innerHTML = `
    <tr>
        <th width="15%">Finish</th>
        <th>Title</th>
        <th width="22%">Create / Delete Time</th>
        <th width="22%">Create / Delete Date</th>
    </tr>`
    if (data.length == 0) {
        base.innerHTML = `
        <tr class="list-in">
            <td colspan="4">Nothing deleted from your todo list</td>
        </tr>
        `
        return
    }
    base.innerHTML = data.map(lists =>
        `<tr class="list-in">
            <td >${lists.finish == false?'Undone':'Completed'}</td>
            <td>${lists.title}</td>
            <td >${lists.createTime} / ${lists.deleteTime}</td>
            <td >${lists.createDate} / ${lists.deleteDate}</td>
        </tr>`
    ).join('')

}

function pagination(array, pages) {
    let paginationObj = {}
    paginationObj.totalLength = array.length;
    paginationObj.partPage = 8;
    paginationObj.pageTotal = Math.ceil(
        paginationObj.totalLength / paginationObj.partPage
    );
    pages == undefined ? pages = 1 : pages;
    paginationObj.currentPage = pages;
    paginationObj.nextPage = paginationObj.currentPage + 1;
    paginationObj.prevPage = paginationObj.currentPage - 1;
    paginationObj.beforPage = paginationObj.currentPage > 1;
    paginationObj.afterPage =
        paginationObj.currentPage < paginationObj.totalLength;
    if (paginationObj.currentPage == paginationObj.pageTotal)
        paginationObj.afterPage = false;
    if (paginationObj.currentPage > paginationObj.pageTotal)
        paginationObj.currentPage = paginationObj.pageTotal;

    const minPage =
        paginationObj.currentPage * paginationObj.partPage -
        paginationObj.partPage +
        1;
    const maxPage = paginationObj.currentPage * paginationObj.partPage;

    objs.partArrayTemp = array;
    objs.partArray = [];
    objs.partArrayTemp.forEach((key, index) => {
        let num = index + 1;
        if (num >= minPage && num <= maxPage) {
            objs.partArray.push(key);
        }
    });
    console.log(paginationObj)
    if (objs.partArrayTemp.length == 0) {
        querySelector(".pagination-group ul").innerHTML = ""
        return
    }
    paginationBtn(paginationObj)
}

function paginationBtn(page) {
    let str = ''
    page.beforPage ? str += `<li onclick="changePage(${page.prevPage})"><i class="fal fa-angle-double-left"></i></li>` : str += `<li class="current-diabled"><i class="fal fa-angle-double-left"></i></li>`
    for (let p = 1; p <= page.pageTotal; p++) {
        page.currentPage === p ? str += `<li class="${page.currentPage == p ? "current-active":""}" onclick="changePage(${p})">${p}</li>` : str += `<li onclick="changePage(${p})">${p}</li>`
    }
    page.afterPage ? str += ` <li onclick="changePage(${page.nextPage})"><i class="fal fa-angle-double-right"></i></li>` : str += `<li class="current-diabled"><i class="fal fa-angle-double-right"></i></li>`
    querySelector(".pagination-group ul").innerHTML = str
}

function addItem() {
    objs.id++
        objs.item.push({
            id: objs.id,
            hasFinish: false,
            title: querySelector(".input-text").value,
            createTime: timeObject().fullTime,
            createDate: timeObject().fullDate
        })
    localStorage.setItem("item", JSON.stringify(objs.item))
    choosePart("I", 1, objs.item)
    querySelector(".input-text").value = ""
}

function searchItem() {
    let filterArray = []
    let array = objs.goList == true ? objs.item : objs.itemDeleted
    array.forEach(key => {
        let filterText = key.title.toLowerCase().match(querySelector(".search-text").value.toLowerCase())
        if (filterText != null) filterArray.push(key)
    })
    if (querySelector(".search-text").value == "") {
        filterArray = array
        querySelector(".searches").textContent = ""
    } else {
        querySelector(".searches").textContent = `Find ${filterArray.length} todoes，`
    }

    objs.goList == true ? choosePart("I", 1, filterArray) : choosePart("II", 1, filterArray)
}

function modifyItem(element, id) {
    let filterArray = objs.deleteArray.filter(key => key == id)
    if (filterArray.length != 0) return
    if (element.textContent.trim("") == "Modify") {
        element.textContent = "Confirm"
        querySelectorAll(".outside-text")[element.dataset.num].textContent = ""
        querySelectorAll(".modify-btn")[element.dataset.num].classList.add("confirmes")
        querySelectorAll(".inside-text")[element.dataset.num].classList.add("inside-text-toggle")
        querySelectorAll(".inside-text-bottom")[element.dataset.num].classList.add("inside-text-bottom-toggle")
    } else {
        element.textContent = "Modify"
        objs.item.forEach(key => {
            if (key.id == id) {
                key.title = querySelectorAll(".inside-text")[element.dataset.num].value
                key.createDate = timeObject().fullDate
                key.createTime = timeObject().fullTime
            }
        })
        localStorage.setItem("item", JSON.stringify(objs.item))
        querySelectorAll(".modify-btn")[element.dataset.num].classList.remove("confirmes")
        querySelectorAll(".inside-text")[element.dataset.num].classList.remove("inside-text-toggle")
        querySelectorAll(".inside-text-bottom")[element.dataset.num].classList.remove("inside-text-bottom-toggle")
        setTimeout(() => choosePart("I", 1, objs.item), 700)
    }
}

function deleteItem() {
    if (objs.deleteArray.length == 0) {
        alert("Check your finish todos then click delete")
        return
    }
    let pos = null
    objs.deleteArray.forEach(key => {
        objs.item.forEach(keyI => {
            if (keyI.id == key) {
                pos = objs.item.findIndex(keyF => keyF.id == keyI.id)
                if (confirm(`Do you want to delete ${keyI.title} this todo？`)) {
                    keyI.hasFinish = true
                    keyI.deleteTime = timeObject().fullTime
                    keyI.deleteDate = timeObject().fullDate
                    objs.itemDeleted.push(keyI)
                    objs.item.splice(pos, 1)
                    alert("Have already deleted this todo from your todo list")
                } else {
                    alert("Your todo list nothing to modify")
                }

            }
        })
    })
    objs.deleteArray = []
    localStorage.setItem("item", JSON.stringify(objs.item))
    localStorage.setItem("itemDeleted", JSON.stringify(objs.itemDeleted))
    choosePart("I", 1, objs.item)
    querySelector(".chooses").textContent = ""
}

function deleteAllHistory() {
    if (objs.itemDeleted.length == 0) {
        alert("Your don't have any delete todoes")
        return
    }
    if (confirm("Do you want to delete all todo list history？")) {
        objs.itemDeleted = []
        localStorage.setItem("itemDeleted", JSON.stringify(objs.itemDeleted))
        choosePart("II", 1, objs.itemDeleted)
        alert("Your todo list have all cleared")
    } else {
        alert("Your todo list nothing to modify")
    }
}

function getItem(cur) {
    let sortArray = []
    objs.item = JSON.parse(localStorage.getItem("item")) || []
    objs.itemDeleted = JSON.parse(localStorage.getItem("itemDeleted")) || []
    objs.item.forEach(key => sortArray.push(key.id))
    sortArray = sortArray.sort((a, b) => a - b)
    objs.id = sortArray[sortArray.length - 1] == null ? 0 : sortArray[sortArray.length - 1]
    if (cur == "I") {
        querySelector(".table tfoot tr td").setAttribute("colspan", 5)
        querySelector(".total").textContent = `Total ${objs.item.length} todoes`
    } else {
        querySelector(".table tfoot tr td").setAttribute("colspan", 4)
        querySelector(".total").textContent = `Have deleted total ${objs.itemDeleted.length} todoes`
    }
}

function getIndex(id, index) {
    let pos = objs.deleteArray.indexOf(id)
    if (pos == -1) {
        querySelectorAll(".outside-text")[index].classList.add("delete-line")
        querySelectorAll(".modify-btn")[index].classList.add("btn-disable")
        objs.deleteArray.push(id)
    } else {
        querySelectorAll(".outside-text")[index].classList.remove("delete-line")
        querySelectorAll(".modify-btn")[index].classList.remove("btn-disable")
        objs.deleteArray.splice(pos, 1)
    }
    console.log(objs.deleteArray)
    querySelector(".chooses").textContent = objs.deleteArray.length > 0 ? `You have choose ${objs.deleteArray.length} todo，` : ""
}

function timeObject() {
    let obj = {}
    const date = new Date()
    const weekendTextItems = [{
        weekNum: 1,
        weekName: 'Monday'
    }, {
        weekNum: 2,
        weekName: 'Tuesday'
    }, {
        weekNum: 3,
        weekName: 'Wednesday'
    }, {
        weekNum: 4,
        weekName: 'Thursday'
    }, {
        weekNum: 5,
        weekName: 'Friday'
    }, {
        weekNum: 6,
        weekName: 'Saturday'
    }, {
        weekNum: 0,
        weekName: 'Sunday'
    }]
    const year = date.getFullYear()
    const month = `${date.getMonth()+1 < 10 ? "0":""}${date.getMonth()+1}`
    const dates = `${date.getDate() < 10 ? "0":""}${date.getDate()}`
    const hour = `${date.getHours() < 10 ? "0":""}${date.getHours()}`
    const minute = `${date.getMinutes() < 10 ? "0":""}${date.getMinutes()}`
    const secondes = `${date.getSeconds() < 10 ? "0":""}${date.getSeconds()}`
    weekendTextItems.forEach(key => key.weekNum == date.getDay() ? obj.days = key.weekName : null)
    obj.fullDate = `${year}-${month}-${dates}`
    obj.fullTime = `${hour} : ${minute} : ${secondes}`
    return obj
}

function changePage(pageSet) {
    objs.goList == true ? choosePart("I", pageSet, objs.item) : choosePart("II", pageSet, objs.itemDeleted)
}

function choose() {
    querySelector(".searches").textContent = ""
    this.className.split(" ")[1] == "I" ? choosePart("I", 1, objs.item) : choosePart("II", 1, objs.itemDeleted)
}

function listAimate(options) {
    querySelectorAll(".list-in").forEach(key => options == true ? key.classList.add("list-in-active") : key.classList.remove("list-in-active"))
}

function deleteSwitchAnimate(text) {
    if (text == "I") {
        querySelector(".delete-btn").classList.add("delete-btn-toggle")
        querySelector(".delete-all-btn").classList.remove("delete-all-btn-toggle")
    } else {
        querySelector(".delete-btn").classList.remove("delete-btn-toggle")
        querySelector(".delete-all-btn").classList.add("delete-all-btn-toggle")
    }
}


function choosePart(e, page, array) {
    if (e == "I") {
        objs.goList = true
        getItem("I")
        deleteSwitchAnimate("I")
        querySelector(".I").classList.remove("top-btn-disable")
        querySelector(".II").classList.add("top-btn-disable")
        listAimate(false)
        pagination(array, page)
        setTimeout(() => creatList(objs.partArray, querySelector(".table tbody")), 501)
        setTimeout(() => listAimate(true), 702)
    } else {
        objs.goList = false
        getItem("II")
        deleteSwitchAnimate("II")
        querySelector(".I").classList.add("top-btn-disable")
        querySelector(".II").classList.remove("top-btn-disable")
        pagination(array, page)
        listAimate(false)
        setTimeout(() => deletedList(objs.partArray, querySelector(".table tbody")), 501)
        setTimeout(() => listAimate(true), 702)
    }
}

choosePart("I", 1, objs.item)

querySelectorAll(".top-btn").forEach(key => key.addEventListener("click", choose))
querySelector(".add-btn").addEventListener("click", addItem)
querySelector(".delete-btn").addEventListener("click", deleteItem)
querySelector(".delete-all-btn").addEventListener("click", deleteAllHistory)
querySelector(".search-btn").addEventListener("click", searchItem)

setInterval(() => querySelector(".times").innerHTML = `${timeObject().days} ${timeObject().fullDate}<br>${timeObject().fullTime}`, 1000)