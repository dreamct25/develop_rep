let Datas;
let DatasTemp = []
const querySelectorFn = classText => document.querySelector(classText)
const querySelectorAllFn = classText => document.querySelectorAll(classText)
const main = querySelectorFn('.card-show')
const paginations = querySelectorFn('.pagination')

fetch('https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json').then(jsonTrans => jsonTrans.json()).then(res => {
    let Data = res.result.records
    if (res.success == true) {
        setTimeout(() => {
            pagination(Data, 1)
            listData(Data);
        }, 5000)
    }
}).catch(err => console.log(err))

function listData(Data) {
    let option = '';
    let ZoneArrayTemp = []
    Datas = Array.from(new Set(Data))
    option = `<option value="" selected>--請選擇行政區--</option>`;
    Datas.forEach(key => {
        if (ZoneArrayTemp.indexOf(key.Zone) == -1) ZoneArrayTemp.push(key.Zone)
    })
    ZoneArrayTemp.forEach(key => option += `<option value="${key}">${key}</option>`)
    querySelectorFn('.block').innerHTML = option
}

function contentShow() {
    querySelectorAllFn(".box").forEach(key => key.classList.remove("box-active"))
    DatasTemp = []
    DatasTemp = Datas.filter(key => key.Zone == this.value)
    pagination(DatasTemp, 1)
}

function topBarContentShow() {
    DatasTemp = []
    DatasTemp = Datas.filter(key => key.Zone == this.textContent)
    pagination(DatasTemp, 1)
    querySelectorAllFn(".box").forEach(key => key.dataset.block == this.dataset.block ? key.classList.add("box-active") : key.classList.remove("box-active"))
}

function changePage(element) {
    element.preventDefault();
    if (element.target.className.split(" ").indexOf("pages") == -1) return
    const pageSet = element.target.dataset.pages
    DatasTemp.length == 0 ? pagination(Datas, pageSet) : pagination(DatasTemp, pageSet)
}

function pagination(Data, nowPage) {
    const newArry = []
    const dataLength = Data.length
    let onPage = window.innerWidth <= 768 ? 6 : 8
    let pageTotal = Math.ceil(dataLength / onPage)
    let currentPage = nowPage == undefined ? 1 : nowPage
    let beforePage = currentPage > 1
    let afterPage = currentPage < dataLength
    if (currentPage == pageTotal) afterPage = false
    if (currentPage > pageTotal) currentPage = pageTotal
    const minNum = (currentPage * onPage) - onPage + 1
    const maxNum = (currentPage * onPage)
    Data.forEach((key, index) => {
        const num = index + 1
        num >= minNum && num <= maxNum ? newArry.push(key) : null
    })
    const page = {
        pageTotal,
        currentPage,
        beforPage: beforePage,
        afterPage: afterPage
    }
    show(newArry)
    paginationBtn(page)
}

function show(newArry) {
    let mnCard = '';
    newArry.forEach(key => {
        DatasTemp.length == 0 ? querySelectorFn('.ct-title').textContent = '所有市區景點' : querySelectorFn('.ct-title').textContent = key.Zone;
        mnCard += `
    <div class="col-md-6">
        <div class="card-act">
            <div class="image-outer">
                <h5 class="font-fix-1">${key.Name}</h5>
                <h5 class="font-fix-2">${key.Zone}</h5>
                <div class="image" style="background-image:url(${key.Picture1});"></div>
            </div>
            <div class="list pt-3 px-2">
                <p><font color="#FF1493"><i class="fas fa-clock mr-1"></i></font>${key.Opentime}</p>
                <p><font color="#FF0000"><i class="fas fa-map-marker-alt mr-1"></i></font>${key.Add}</p>
                <div class="d-flex justify-content-between">
                    <p><font color="#00BBFF"><i class="fas fa-mobile-alt mr-1"></i></font>${key.Tel}</p>
                    <p><font color="#F5D005"><i class="fas fa-tag mr-1"></i></font>${key.Ticketinfo}</p>
                </div>
            </div>
        </div>
    </div>`
    })
    main.innerHTML = mnCard;
    querySelectorFn('.dashed').classList.add('dashed-in')
    querySelectorFn('.arrow').classList.add('arrow-in')
}

function paginationBtn(page) {
    let str = ''
    const allPages = page.pageTotal
    Number(page.beforPage) ? str += `<li class="page-item"><a class="page-link pages" href="#" data-pages="${Number(page.currentPage) - 1}"><i class="fal fa-angle-double-left pages" data-pages="${Number(page.currentPage) - 1}"></i></a></li>` : str += `<li class="page-item disabled"><a class="page-link" href="#"><i class="fal fa-angle-double-left"></i></a></li>`
    for (let p = 1; p <= allPages; p++) {
        Number(page.currentPage) === p ? str += `<li class="page-item active"><a class="page-link pages" href="#" data-pages="${p}">${p}</a></li>` : str += `<li class="page-item"><a class="page-link pages" href="#" data-pages="${p}">${p}</a></li>`
    }
    Number(page.afterPage) ? str += ` <li class="page-item"><a class="page-link pages" href="#" data-pages="${Number(page.currentPage) + 1}"><i class="fal fa-angle-double-right pages" data-pages="${Number(page.currentPage) + 1}"></i></a></li>` : str += `<li class="page-item disabled"><span class="page-link"><i class="fal fa-angle-double-right"></i></span></li>`
    paginations.innerHTML = str
}

function changeLine() {
    this.classList.toggle('arrow-act')
    querySelectorFn('.dashed').classList.toggle('dashed-sm')
    querySelectorFn('.display').classList.toggle('display-act')
}

function showBackBtn() {
    this.scrollY > 100 ? querySelectorFn('.top').classList.add('top-show') : querySelectorFn('.top').classList.remove('top-show')
}

paginations.addEventListener('click', changePage)
querySelectorFn('.block').addEventListener('change', contentShow)
querySelectorFn('.arrow').addEventListener('click', changeLine)
window.addEventListener('scroll', showBackBtn)
querySelectorFn('.title1').classList.add('fadeIn-rt')
querySelectorFn('.title2').classList.add('fadeIn-lt')
querySelectorAllFn('.box').forEach((key, index) => {
    key.addEventListener('click', topBarContentShow)
    key.setAttribute("data-block", index)
})

$(document).ready(() => {
    $('.top').click(() => {
        $('html,body').animate({
            scrollTop: 0
        }, 3000)
    })
})