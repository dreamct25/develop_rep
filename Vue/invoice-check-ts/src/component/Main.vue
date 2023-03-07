<template lang="pug">
.main
    .invoic-layout
        .invoic(v-for="(item,index) in renderData",:key="index")
            .title {{ item.year }} 年 {{ item.betweenMonth.join(' ~ ') }} 月發票
                .function-group(v-if="!rwdStatus")
                    .open-scanner-btn(@click="openScanner") 發票 QR Code
                    .change-date-btn-outer
                        .change-date-btn(@click="toggleInvoiceDateList = !toggleInvoiceDateList")
                            |發票年月
                            i(class="fal fa-angle-up arrow",:class="{ active:toggleInvoiceDateList }")
                        .date-list-outer(:class="{ active:toggleInvoiceDateList }")
                            .option(
                                v-for="(optionItem,optionIndex) in invoiceDateData",
                                :key="optionIndex",
                                :class="{ active:optionItem.value === currentChoiceDate }",
                                @click="changeInvoiceDate(optionItem.value)"
                            ) {{ optionItem.label }}
                .function-group-rwd(v-else)
                    .open-scanner-btn(@click="openScanner") 發票 QR Code
                    .change-date-btn-outer
                        .change-date-btn(@click="toggleInvoiceDateList = !toggleInvoiceDateList")
                            |發票年月
                            i(class="fal fa-angle-up arrow",:class="{ active:toggleInvoiceDateList }")
                        .date-list-outer(:class="{ active:toggleInvoiceDateList }")
                            .option(
                                v-for="(optionItem,optionIndex) in invoiceDateData",
                                :key="optionIndex",
                                :class="{ active:optionItem.value === currentChoiceDate }",
                                @click="changeInvoiceDate(optionItem.value)"
                            ) {{ optionItem.label }}
                .update-date 更新日期 {{ item.publishDate }}
            .content
                .sply-num-outer.num-outer
                    div 特別獎
                    div 
                        span(class="light") {{ item.description.splyAwards }}
                        span 同期統一發票收執聯8位數號碼與特別獎號碼相同者獎金1,000萬元
                .sp-num-outer.num-outer
                    div 特獎
                    div 
                        span(class="light") {{ item.description.spAwards }}
                        span 同期統一發票收執聯8位數號碼與特獎號碼相同者獎金200萬元
                .top-num-outer.num-outer
                    div 頭獎
                    .top-num-group
                        div(v-for="(topItem,topIndex) in item.description.topAwards",:key="topIndex")
                            span {{ topItem.substr(0,topItem.length - 3) }}
                                span(class="light") {{ topItem.substr(topItem.length - 3,topItem.length) }}
                            span(v-if="item.description.topAwards.length - 1 === topIndex") 同期統一發票收執聯8位數號碼與頭獎號碼相同者獎金20萬元
                .sm-desc-outer(v-for="(staticItem,staticIndex) in staticAwardsData",:key="staticIndex")
                    div {{ staticItem.title }}
                    div {{ staticItem.desc }}
                .bottom-outer
                    div 兌獎日期
                    div {{ renderAwardsDateRange[0] }} ~ {{ renderAwardsDateRange[1] }}
        .qr-scanner-frame(:class="{ active:toggleSannerFrame }")
            video(ref="videoRef")
            .close-scanner-btn(@click="closeScanner") 關閉掃描視窗
        .badge-alert-frame(:class="{ active:toggleBadgeContent.status }")
            .content 掃描狀態：{{ toggleBadgeContent.content }}
        .loading-outer(:class="{ active:loadingStatus }")
            .loading
            .loading-line-out
                .loading-line-in
            .loading-text Loading
</template>
<style lang="scss" scoped>
    .main{
        .invoic-layout{
            display: flex;
            justify-content: center;
            
            .invoic{
                width: 95%;
                max-width: 960px;
                color: white;
                background-color: rgba(0,0,0,.7);
                border-radius: 10px;
                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                overflow: hidden;

                .title{
                    position: relative;
                    text-align: center;
                    padding: 30px;
                    font-size: 50px;
                    border-radius: 10px 10px 0 0;
                    box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);

                    @media screen and (max-width:414px) {
                        padding: 35px 10px 9px 10px;
                        font-size: 33px;
                    }

                    .function-group{
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: -35px;
                        display: grid;
                        grid-template-columns: 106px 106px;
                        gap: 5px;
                        margin: 5px 5px 0 0;

                        .open-scanner-btn{
                            height: 14px;
                            cursor: pointer;
                            user-select: none;
                            font-size: 14px;
                            padding: 8px 0;
                            background-color: rgba(30,30,30,.3);
                            backdrop-filter: blur(8px);
                            -webkit-backdrop-filter: blur(8px);
                            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                            border-radius: 5px;
                        }

                        .change-date-btn-outer{
                            position: relative;

                            .change-date-btn{
                                cursor: pointer;
                                user-select: none;
                                font-size: 14px;
                                padding: 8px 0;
                                background-color: rgba(30,30,30,.3);
                                backdrop-filter: blur(8px);
                                -webkit-backdrop-filter: blur(8px);
                                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                                border-radius: 5px;

                                .arrow{
                                    font-size: 22px;
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    transform: translate(-9px,4px) rotate(0deg);
                                    transition: .5s ease;

                                    &.active{
                                        transform: translate(-9px,4px) rotate(-180deg);
                                    }
                                }
                            }

                            .date-list-outer{
                                position: absolute;
                                top: 35px;
                                left: 0;
                                right: 0;
                                opacity: 0;
                                z-index: 10;
                                font-size: 14px;
                                overflow-x: hidden;
                                overflow-y: auto;
                                max-height: 0;
                                transition: .5s ease;
                                background-color: rgba(30,30,30,.8);
                                border-radius: 5px;
                                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);

                                &::-webkit-scrollbar {
                                    width: 5px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 20px;
                                    background-color: rgba(255, 255, 255, 0.7);
                                }

                                &.active{
                                    opacity: 1;
                                    max-height: 120px;
                                }

                                .option{
                                    text-align: center;
                                    padding: 8px 0;
                                    cursor: pointer;
                                    user-select: none;
                                    font-size: 12px;

                                    &.active{
                                        color: black;
                                        background-color: rgba(255, 255, 255, 0.7);
                                    }
                                }
                            }
                        }
                    }

                    .function-group-rwd{
                        display: grid;
                        grid-template-columns: 50% 50%;
                        gap: 5px;
                        padding-top: 15px;

                        .open-scanner-btn{
                            height: 14px;
                            cursor: pointer;
                            user-select: none;
                            font-size: 14px;
                            padding: 8px 0;
                            background-color: rgba(30,30,30,.3);
                            backdrop-filter: blur(8px);
                            -webkit-backdrop-filter: blur(8px);
                            box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                            border-radius: 5px;
                        }

                        .change-date-btn-outer{
                            position: relative;
                            margin-right: 5px;

                            .change-date-btn{
                                cursor: pointer;
                                user-select: none;
                                font-size: 14px;
                                padding: 8px 0;
                                background-color: rgba(30,30,30,.3);
                                backdrop-filter: blur(8px);
                                -webkit-backdrop-filter: blur(8px);
                                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                                border-radius: 5px;

                                .arrow{
                                    font-size: 22px;
                                    position: absolute;
                                    top: 0;
                                    right: 0;
                                    transform: translate(-9px,4px) rotate(0deg);
                                    transition: .5s ease;

                                    &.active{
                                        transform: translate(-9px,4px) rotate(-180deg);
                                    }
                                }
                            }

                            .date-list-outer{
                                position: absolute;
                                top: 35px;
                                left: 0;
                                right: 0;
                                opacity: 0;
                                z-index: 2;
                                font-size: 14px;
                                overflow-x: hidden;
                                overflow-y: scroll;
                                max-height: 0;
                                transition: .5s ease;
                                background-color: rgba(30,30,30,.8);
                                border-radius: 5px;
                                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);

                                &::-webkit-scrollbar {
                                    width: 5px;
                                }

                                &::-webkit-scrollbar-thumb {
                                    border-radius: 20px;
                                    background-color: rgba(255, 255, 255, 0.7);
                                }

                                &.active{
                                    opacity: 1;
                                    max-height: 120px;
                                }

                                .option{
                                    text-align: center;
                                    padding: 8px 0;
                                    cursor: pointer;
                                    user-select: none;
                                    font-size: 12px;

                                    &.active{
                                        color: black;
                                        background-color: rgba(255, 255, 255, 0.7);
                                    }
                                }
                            }
                        }
                    }

                    .update-date{
                        position: absolute;
                        bottom: 0;
                        right: 0;
                        font-size: 14px;
                        margin: 0 12px 10px 0;

                        @media screen and (max-width:414px) {
                           top: 0;
                           bottom: unset;
                           margin: 8px 8px 0 0;
                        }
                    }
                }

                .content{
                    .sply-num-outer,
                    .sp-num-outer{

                        div{

                           &:nth-of-type(1){
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                           }

                            span{
                                display: block;
                                padding: 12px;

                                &:nth-of-type(2){
                                    font-size: 13px;
                                    border-top: .5px solid rgba(220,220,220,.7);

                                    @media screen and (max-width:414px) {
                                        line-height: 25px;
                                        text-align: justify;
                                    }
                                }
                            }
                        }
                    }

                    .num-outer{
                        display: grid;
                        grid-template-columns: 30% auto;

                        div{
                            box-shadow: inset 0 0 0px .5px rgba(255,255,255,.7);
                            text-align: center;
                            font-size: 30px;

                            @media screen and (max-width:414px) {
                                font-size: 25px;
                            }

                            .light{
                                color: rgb(255, 65, 65);
                                margin-left: 5px;
                            }
                        }
                    }

                    .sm-desc-outer{
                        display: grid;
                        grid-template-columns: 30% auto;

                        div{
                            box-shadow: inset 0 0 0px .5px rgba(255,255,255,.7);
                            text-align: center;

                            &:first-child{
                                padding: 30px;
                                font-size: 30px;

                                @media screen and (max-width:414px) {
                                    font-size: 25px;
                                    padding: 30px 25px;
                                }
                            }

                            &:last-child{
                                display: flex;
                                flex-direction: column;
                                justify-content: center;

                                @media screen and (max-width:414px) {
                                    font-size: 14px;
                                    padding: 0 15px;
                                    line-height: 25px;
                                    text-align: justify;
                                }
                            }
                        }
                    }

                    .top-num-outer{
                        div{
                            &:nth-of-type(1){
                                display: flex;
                                justify-content: center;
                                flex-direction: column;
                            }
                        }

                        .top-num-group{
                            padding: 0;
                            box-shadow: unset;

                            span{
                                display: block;
                                padding: 12px;
                                
                                span{
                                    display: inline;
                                    padding: 0;
                                }

                                &:nth-of-type(2){
                                    font-size: 13px;
                                    border-top: .5px solid rgba(220,220,220,.7);
                                }
                            }

                            div{
                                height: auto;

                                &:last-child{

                                    span{

                                        &:last-child{

                                            @media screen and (max-width:414px) {
                                                line-height: 25px;
                                                text-align: justify;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    .bottom-outer{
                        display: grid;
                        grid-template-columns: 30% auto;

                        div{
                            padding: 30px;
                            box-shadow: inset 0 0 0px .5px rgba(255,255,255,.7);

                            @media screen and (max-width:414px) {
                                padding: 15px;
                            }

                            &:nth-of-type(1){
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                text-align: center;
                                font-size: 30px;

                                @media screen and (max-width:414px) {
                                    font-size: 20px;
                                }
                            }

                            &:nth-of-type(2){
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                font-size: 16px;
                                text-align: center;

                                @media screen and (max-width:414px) {
                                    font-size: 14px;
                                }
                            }
                        }
                    }
                }
            }

            .qr-scanner-frame{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                opacity: 0;
                transform: translateY(100%);
                transition: .5s ease;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(8px);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                video{
                    width: 100% !important;
                    height: auto !important;

                    @media screen and (max-width: 414px){
                        transform: scale(4) !important;
                    }
                }

                .close-scanner-btn{
                    z-index: 2;
                    position: absolute;
                    top: 0;
                    right: 0;
                    color: white;
                    cursor: pointer;
                    user-select: none;
                    font-size: 14px;
                    padding: 8px 11px;
                    background-color: rgba(30,30,30,.7);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7);
                    border-radius: 5px;
                    margin: 5px;
                }

                &.active{
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .badge-alert-frame{
                position: fixed;
                right: 0;
                left: 0;
                bottom: 0;
                color: white;
                text-align: center;
                opacity: 0;
                transform: translateY(100%);
                transition: .5s ease;
                background: linear-gradient(0deg,rgba(30,30,30,1),rgba(30,30,30,.8),rgba(30,30,30,.6),rgba(30,30,30,.4),rgba(30,30,30,.2),rgba(30,30,30,0));
                border-radius: 5px;
                padding: 15px 0;
                font-size: 18px;
                z-index: 3;

                &.active{
                    opacity: 1;
                    transform: translateY(0%);
                }
            }

            .loading-outer{
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(30,30,30,.5);
                opacity: 0;
                z-index: -1;
                backdrop-filter: blur(10px);
                -webkit-backdrop-filter: blur(8px);
                transition: .5s ease;

                .loading{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    box-shadow: inset 0 0 0 5px rgba(255,255,255,.1);
                    margin-left: -100px;
                    margin-top: -100px;
                }

                .loading-line-out{
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 100px;
                    height: 200px;
                    margin-left: -100px;
                    margin-top: -100px;
                    overflow: hidden;
                    transform-origin: 100px 100px;
                    -webkit-mask-image: -webkit-linear-gradient(top, black, rgba(0, 0, 0, 0));
                    animation: loadingLineOutAnimate 1.5s infinite linear;

                    @keyframes loadingLineOutAnimate {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }

                    .loading-line-in{
                        width: 200px;
                        height: 200px;
                        border-radius: 50%;
                        box-shadow: inset 0 0 0 3px rgb(255 255 255 / 50%);
                    }
                }

                .loading-text{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform:translate(-50%,-50%);
                    color: white;
                    font-size: 20px;
                }

                &.active{
                    opacity: 1;
                    z-index: 10;
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,ref,Ref,onMounted,watch,toRefs,inject } from 'vue'
import QrScanner from 'qr-scanner'
import { initProviderObj } from '../provider'
import { ProviderObjType,stateType,methodType, invoiceDataType, awardsDateRangeDataType, staticAwardsDataType, invoiceDataRepackType } from '../types'

export default defineComponent({
    props:['rwdStatus'],
    setup(props){
        const { $ } = inject<ProviderObjType>("provideMethod",initProviderObj);

        const state:stateType = {
            respResult:ref([]),
            renderData:ref([]),
            toggleInvoiceDateList:ref(false),
            invoiceDateData:ref([]),
            currentChoiceDate:ref(''),
            renderAwardsDateRange:ref([]),
            staticAwardsData:ref([]),
            videoRef:ref(undefined),
            QrSannerRef:ref(undefined),
            toggleSannerFrame:ref(false),
            toggleBadgeContent:ref({ status:false,content:'' }),
            loadingStatus:ref(false)
        }

        const method:methodType = {
            async getData(){
                const self = this as methodType
                try {
                    state.loadingStatus.value = true

                    const res = await $.fetch.get<{ data:{ result:invoiceDataType[],title:string } }>('https://proxyservice-1-t7335739.deta.app/test/invoice')
                    
                    if(res.status >= 200 && res.status <= 399){
                        const { data:{ result } } = res.data
                        const repackData = self.repackRenderData(result)
                        const [fstObj,] = repackData

                        state.respResult.value = repackData
                        state.renderData.value = [fstObj]
                        state.currentChoiceDate.value = `${fstObj.year}-${fstObj.betweenMonth.join('-')}`
                        state.invoiceDateData.value = $.maps(repackData,({ year,betweenMonth }) => ({ label:`${year} 年 ${betweenMonth.join(' ~ ')} 月`,value:`${year}-${betweenMonth.join('-')}` }))
                        state.staticAwardsData.value =  self.createStaticAwardsData()

                        state.loadingStatus.value = false
                    } else {
                        throw new Error('request error')
                    }
                } catch (err){
                    alert(err.message)
                }
                
            },
            repackRenderData: arr => {
                const data = $.maps<invoiceDataType,invoiceDataRepackType>(arr,(item => {
                    item.description.topAwards = (item.description.topAwards as string).split('、')
                    item.publishDate = $.formatDateTime({ formatDate: item.publishDate,formatType:'yyyy-MM-dd HH:mm:ss',toTcYear:true }) as string

                    return item as invoiceDataRepackType
                }))

                return data
            },
            changeInvoiceDate:val => {
                state.toggleInvoiceDateList.value = false
                state.currentChoiceDate.value = val
            },
            createAwardsDateRangeData:fullDate => {
                const [yearTemp,monthPrev,monthNext] = fullDate.split('-')
                const year = parseInt(yearTemp)
                const monthWords:string[][] = [[`${year}y4m6d`,`${year}y7m5d`],[`${year}y6m6d`,`${year}y9m5d`],[`${year}y8m6d`,`${year}y11m5d`],[`${year}y10m6d`,`${year + 1}y1m5d`],[`${year}y12m6d`,`${year + 1}y3m5d`],[`${year + 1}y2m6d`,`${year + 1}y5m5d`]]

                const awardsDateRange = $.createArray<{ random:number },awardsDateRangeDataType>({ type:'fake',item:{ random:monthWords.length }},num => ({
                    monthRange: `${(num * 2) + 1}-${(num + 1) * 2}`,
                    monthDate: monthWords[num]
                }))

                return $.filter(awardsDateRange,({ monthRange }) => monthRange === `${monthPrev}-${monthNext}`).map(({ monthDate }) => monthDate).reduce((emtyArr,item) =>  emtyArr.concat(item.map(monthDates => monthDates.replace('y','年').replace('m','月').replace('d','日'))),[])
            },
            createStaticAwardsData:() => {
                const cashes:string[][] = [['二','40000 元'],['三','10000 元'],['四','4000 元'],['五','1000 元'],['六',' 200 元']]
                
                return $.createArray<{ random:number },staticAwardsDataType>({ type:'fake',item:{ random:cashes.length }},num => {
                    const [prevWord,nextWord] = cashes[num]

                    return {
                        title:`${prevWord}獎`,
                        desc:`同期統一發票收執聯末 ${Math.abs(num - 7)} 位數號碼與頭獎中獎號碼末 ${Math.abs(num - 7)} 位相同者各得獎金 ${nextWord}`
                    }
                })
            },
            openScanner() {
                const self = this as methodType

                if(QrScanner.hasCamera()){
                    state.QrSannerRef.value.start()
                    state.toggleSannerFrame.value = true
                    self.controlBadgeCotent('未掃描')
                } else {
                    alert('請使用有攝像頭設備')
                }
            },
            closeScanner() {
                const self = this as methodType
                state.QrSannerRef.value.stop()
                setTimeout(() => state.toggleSannerFrame.value = false,800)
                self.controlBadgeCotent('')
            },
            controlBadgeCotent: content => {
                state.toggleBadgeContent.value = { status: content !== '',content }
            },
            qrResult:(result) => {
                const getAwardsDesc:{[key:string]:any} = {
                    '0': '','3': '200 元',
                    '4': '1000 元','5': '4000 元',
                    '6': '10000 元','7': '40000 元'
                }
                const { data } = result
                const dataRange:string = data.slice(0,17)
                const invoiceNum:string[] = dataRange.slice(2,dataRange.length - 7).split('').reverse()
                const invoiceDate:string = dataRange.slice(dataRange.length - 7,dataRange.length)
                const getYear = parseInt(invoiceDate.slice(0,2))
                const getMonth = parseInt(invoiceDate.slice(2,4))
                const getDate = parseInt(invoiceDate.slice(4,6))

                const [currentYear,currentMonthPrev,currentMonthNext] = state.currentChoiceDate.value.split('-')
                const filterAwardsExists = $.filter(state.respResult.value,({ publishDate }) => +new Date(getYear,getMonth,getDate) >= +new Date(publishDate))

                console.log(invoiceNum,invoiceDate)

                if(parseInt(currentYear) !== getYear && getMonth >= parseInt(currentMonthPrev) && getMonth <= parseInt(currentMonthNext)){
                    method.controlBadgeCotent('發票年月錯誤請選擇對應年月中獎發票碼')

                    return
                }

                if(filterAwardsExists.length > 0){
                    method.controlBadgeCotent('發票尚未開獎')

                    return
                }

                const [{ description:{ splyAwards,spAwards,topAwards } }] = state.renderData.value
                const [firstTopAwards,secondTopAwards,thirdTopAwards] = topAwards

                const filterSplyAwards = $.sum<string,(string | boolean)[]>(invoiceNum,(a,b) => a === b && b,splyAwards.split('').reverse()).filter(str => str !== false)
                const filterSpAwards = $.sum<string,(string | boolean)[]>(invoiceNum,(a,b) => a === b && b,spAwards.split('').reverse()).filter(str => str !== false)
                
                const firstTopAwardsCheck = $.sum<string,(string | boolean)[]>(invoiceNum,(a,b) => a === b && b,firstTopAwards.split('').reverse()).filter(str => str !== false) as string[]
                const secondTopAwardsCheck = $.sum<string,(string | boolean)[]>(invoiceNum,(a,b) => a === b && b,secondTopAwards.split('').reverse()).filter(str => str !== false) as string[]
                const thirdTopAwardsCheck = $.sum<string,(string | boolean)[]>(invoiceNum,(a,b) => a === b && b,thirdTopAwards.split('').reverse()).filter(str => str !== false) as string[]
                

                if(filterSplyAwards.length > 0){
                    method.controlBadgeCotent('特別獎中獎 ~')

                    return
                }

                if(filterSpAwards.length > 0){
                    method.controlBadgeCotent('特獎中獎 ~')
                    
                    return
                }

                if(firstTopAwardsCheck.length > 0 || secondTopAwardsCheck.length > 0 || thirdTopAwardsCheck.length > 0){
                    const descCotent = [
                        getAwardsDesc[firstTopAwardsCheck.length.toString()],
                        getAwardsDesc[secondTopAwardsCheck.length.toString()],
                        getAwardsDesc[thirdTopAwardsCheck.length.toString()],
                        '中獎 ~'
                    ].join('')

                    method.controlBadgeCotent(descCotent)

                    return
                }

                method.controlBadgeCotent('本張沒中 再對對看 ~')
            }
        }

        watch(state.currentChoiceDate,(cur) => {
            const filterItem = $.filter(state.respResult.value,({ year,betweenMonth }) => cur === `${year}-${betweenMonth.join('-')}`)
            state.renderData.value = filterItem
            state.renderAwardsDateRange.value = method.createAwardsDateRangeData(cur)
        })

        onMounted(async () => {
            await method.getData()

            state.QrSannerRef.value = new QrScanner(
                state.videoRef.value,
                method.qrResult,
                { maxScansPerSecond:60,highlightScanRegion:true }
            )
        })
        
        return { ...state,...method,...toRefs(props) }
    }
})

</script>