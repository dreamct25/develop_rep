<template>
    <div class="main">
        <div v-if="Object.keys(data).length !== 0">
            <div 
                class="data-title-group"
                :class="{ 'data-title-group-active' : toggleGroup }"
            >
                <div class="arrow-outer" @click="toggleGroups">
                    <i 
                        class="fas fa-chevron-left"
                        :class="{ 'arrow-active' : toggleGroup }"
                    ></i>
                </div>
                <div class="title" v-for="(item,index) in dataTitle" :key="index" @click="fiterDatas(item.title,item.date)">{{ item.title }}</div>
            </div>
            <div class="data-group">
                <div v-for="(item,indexI) in filterData" :key="indexI">
                    <div class="check-number-group">
                        <div class="title">
                            <div>{{ item.title }}</div>
                            <div class="update-date">更新日期 {{ item.isoDate }}</div>
                        </div>
                        <div class="check-number" v-for="(check,indexII) in JSON.parse(item.contentSnippet)" :key="indexII">
                            <div class="check-number-title">{{ check.zh }}</div>
                            <div class="check-number-val"
                                v-if="check.value.constructor.name !== 'Array'"
                                :class="{ 
                                    'red': check.zh === '特別獎' || check.zh === '特獎' || check.zh === '增開六獎',
                                    'dis-pad': check.value === ''
                                }"
                            >
                                <div class="single-val">{{ check.value }}</div>
                                <div 
                                    class="check-number-val-desc"
                                    :class="{ 'dis-top' : check.value === ''}"
                                >{{ check.descript }}</div>
                            </div>
                            <div class="check-number-val" v-else>
                                <div class="small-group" >
                                    <div v-for="(val,indexIII) in check.value" :key="indexIII">
                                        <span>{{ val.slice(0,val.length - 3) }}</span>
                                        <span class="red">{{ val.slice(val.length - 3,val.length) }}</span>
                                    </div>
                                </div>
                                <div class="check-number-val-desc">{{ check.descript }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="data-footer">
                    <span v-for="(text,index) in dataFootItem" :key="index">{{ text }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .main{
        position: relative;
        z-index: 2;
        min-height: 100vh;
        .data-title-group{
            border-radius: 0 0 0 8px;
            background-color: rgba(40,40,40,.7);
            box-shadow: inset -1px 0 2px 0 rgba(255,255,255,.7);
            position: fixed;
            top:50%;
            right:0;
            transform: translate(166px,-50%);
            z-index: 3;
            transition: .7s ease;
            .arrow-outer{
                border-radius: 8px 0 0 8px;
                position: absolute;
                top: 0;
                left: 0;
                background-color: rgba(40,40,40,.7);
                box-shadow: inset 1px 0 2px 0 rgba(255,255,255,.7);
                transform: translate(-27px, 0px);
                display: flex;
                align-items: center;
                flex-direction: column;
                justify-content: center;
                cursor: pointer;
                user-select: none;
                i{
                    color: white;
                    transform: rotate(0deg);
                    transition: .7s ease;
                    padding: 6px 8px 6px 10px;
                }
                .arrow-active{
                    transform: rotate(180deg);
                }
            }
            
            .title{
                text-align: center;
                padding: 5px 12px;
                color: white;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                user-select: none;
                box-shadow: inset 0 0 2px 1px rgba(0,0,0,.7);
            }
        }
        .data-title-group-active{
            transform: translate(0,-50%);
        }
        .data-group{
            color: white;
            margin: 0 10%;
            .check-number-group{
                font-size: 25px;
                background-color: rgb(30, 30, 30);
                overflow: hidden;
                border-radius: 10px;
                box-shadow: inset 0 0 2px 1px rgba(255,255,255,.7),0 0 2px 1px rgba(0,0,0,.7);
                .title{
                    text-align: center;
                    padding: 40px 0 10px 0;
                    font-size: 35px;
                    .update-date{
                        font-size: 15px;
                        text-align: right;
                        margin:15px 15px 0 0;
                    }
                }
                .check-number{
                    display: grid;
                    grid-template-columns: 30% 70%;
                    align-items:center;
                    text-align: center;
                    .check-number-title{
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                    }
                    .check-number-val{
                        padding: 25px 0 10px 0;
                        box-shadow: inset 0 0 2px 0 rgba(255,255,255,.7);
                        .single-val{
                            font-weight: bold;
                            letter-spacing: 3px;
                        }
                        .small-group{
                            font-weight: bold;
                            letter-spacing: 3px;
                            line-height: 35px;
                        }
                        .check-number-val-desc{
                            margin-top: 10px;
                            padding: 0 12px;
                            font-size: 16px;
                            color: white;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                            font-weight: unset;
                        }
                        .dis-top{
                            margin-top: unset;
                            text-overflow: ellipsis;
                            display: -webkit-box;
                            -webkit-line-clamp: 1;
                            -webkit-box-orient: vertical;
                        }
                    }
                    .dis-pad{
                        padding: 20px 0 20px 0;
                        font-weight: unset;
                    }
                }

                .red{
                    color: red;
                }
            }
            .data-footer{
                padding: 12px;
                span{
                    line-height: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    font-weight: bold;
                    text-shadow: 0 1px 1px rgba(0,0,0,.7);
                }
            }
        }
    }
</style>

<script lang="ts">
import Parser,{ Output } from 'rss-parser'
import { defineComponent,onMounted,ref, Ref } from 'vue'

interface stateInf {
    data:Ref<Output<Item>>,
    filterData:Ref<{[key:string]:any}[]>
    dataTitle:Ref<{[key:string]:any}[]>,
    dataFootItem:Ref<string[]>
    descriptGroup:string[],
    elseDescGroup:{[key:string]:any}[],
    toggleGroup:Ref<boolean>
}

interface methodInf {
    getData:() => void,
    getDataFoot:(postDate:string) => void
    fiterDatas:(postTitle:string,postDate:string) => void,
    contentRepack:(postItem:string) => string,
    transDate:(time:string) => string,
    toggleGroups:() => void
}

interface Item {
    link?: string;
    title?: string;
    isoDate?: string;
    contentSnippet?: string;
    descript?:string
  }

export default defineComponent({
    name:'Main',
    setup(){

        const state:stateInf = {
            data:ref<any>({}),
            filterData:ref<{[key:string]:any}[]>([]),
            dataTitle:ref<{[key:string]:any}[]>([]),
            dataFootItem:ref<string[]>([]),
            toggleGroup:ref<boolean>(false),
            descriptGroup:[
                "同期統一發票收執聯 8 位數號碼與特別獎號碼相同者獎金 1,000 萬元",
                "同期統一發票收執聯 8 位數號碼與特獎號碼相同者獎金 200 萬元",
                "同期統一發票收執聯 8 位數號碼與頭獎號碼相同者獎金 20 萬元",
                ""
            ],
            elseDescGroup:[{
                zh:"二獎",
                value:"",
                descript:"同期統一發票收執聯末 7 位數號碼與頭獎中獎號碼末 7 位相同者各得獎金 4 萬元"
            },{
                zh:"三獎",
                value:"",
                descript:"同期統一發票收執聯末 6 位數號碼與頭獎中獎號碼末 6 位相同者各得獎金 1 萬元"
            },{
                zh:"四獎",
                value:"",
                descript:"同期統一發票收執聯末 5 位數號碼與頭獎中獎號碼末 5 位相同者各得獎金 4 千元"
            },{
                zh:"五獎",
                value:"",
                descript:"同期統一發票收執聯末 4 位數號碼與頭獎中獎號碼末 4 位相同者各得獎金 1 千元"
            },{ 
                zh:"六獎",
                value:"",
                descript:"同期統一發票收執聯末 3 位數號碼與 頭獎中獎號碼末 3 位相同者各得獎金 2 百元"
            }]
        }
        

        const method:methodInf = {
            toggleGroups:() => state.toggleGroup.value = !state.toggleGroup.value ,
            transDate:time => new Date(time).toJSON().split('T')[0],
            fiterDatas:(postTitle,postDate) => {
                state.filterData.value = state.data.value.items.filter(({ title }:Item) => title === postTitle)
                method.getDataFoot(postDate)
            },
            contentRepack:postItem => {
                const [a,b,c,d]:{[key:string]:any}[] = postItem.replace(/：/g,'-').replace(/、/g,'+').replace(/\n/g,',').split(',')
                .map((snippetText:string,index:number) => snippetText.indexOf('+') !== -1 ? 
                { 
                    zh:snippetText.split('-')[0],
                    value:snippetText.split('-')[1].split('+'),
                    descript:state.descriptGroup[index]
                } : { 
                    zh:snippetText.split('-')[0],
                    value:snippetText.split('-')[1],
                    descript:state.descriptGroup[index]
                })
                return JSON.stringify([a,b,c,...state.elseDescGroup,d])
            },
            getDataFoot:async date => {

                let res:Response
                let resError:Response | undefined

                try{
                     res = await fetch("http://localhost:8088/call/invoice_content",{
                        method:"post",
                        headers:{ "Content-Type":"application/json" },
                        body:JSON.stringify({ date:date })
                    });

                    if(res.status === 200){
                        res.json().then(({ data }:{ data:string[] }) => {
                            const lineIndex = data.findIndex((str:string) => str.match("領獎期間自"))
                            const lines = data[lineIndex].replace(/<br>/g,'').split(">")[1].split('。')
                            lines.pop()
                            lines.pop()
                            state.dataFootItem.value = lines
                        })
                    }else{
                        resError = res
                        throw new Error();
                    }
                }catch(err){
                    alert(`Error Code：${resError!.status} \nError Message：${resError!.statusText}`)
                }
            },
            getData:async () => {
                // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

                const parser = new Parser();

                const data:Output<Item> = await parser.parseURL("http://localhost:8088/call/invoice_number")

                const dataTemp:Output<Item> = await {
                    ...data,
                    items:data.items.map((item:Item) => ({ 
                        ...item,
                        title:item.title!.replace(/~/g,'月 ~ '),
                        contentSnippet:method.contentRepack(item.contentSnippet!),
                        isoDate:method.transDate(item.isoDate!),
                        })
                    )
                }

                state.data.value = dataTemp

                state.dataTitle.value = dataTemp.items.map(({ title }:Item) => ({ title:title!,date:title!.replace("年",'').replace(/月/g,'').split(" ").join("").split("~")[0] }))

                console.log(state.data.value)
                console.log(state.dataTitle.value)
                console.log(state.dataFootItem.value)
                
            }
        }

        onMounted(() => {
            method.getData()
        })
        
        return { ...state,...method }
    }
})
</script>