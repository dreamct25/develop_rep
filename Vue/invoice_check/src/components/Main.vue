<template>
    <div class="main">
        <div v-if="Object.keys(data).length !== 0">
            <div class="data-title-group">
                <div class="title" v-for="(title,index) in dataTitle" :key="index" @click="fiterDatas(title)">{{ title }}</div>
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
                                :class="{ 'red': check.zh === '特別獎' || check.zh === '特獎' || check.zh === '增開六獎'}"
                            >
                                <div>{{ check.value }}</div>
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
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .main{
        .data-title-group{
            display: grid;
            grid-template-columns: 200px 200px 200px;
            justify-content: center;
            .title{
                text-align: center;
                padding: 5px 12px;
                background-color: black;
                color: white;
                border-radius: 5px;
                margin: 5px;
                cursor: pointer;
                user-select: none;
            }
        }
        .data-group{
            color: white;
            margin: 0 20%;
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
                        box-shadow: inset 0 0 1px 0 rgba(255,255,255,.7);
                    }
                    .check-number-val{
                        padding: 20px 0 10px 0;
                        box-shadow: inset 0 0 1px 0 rgba(255,255,255,.7);
                        .small-group{
                            line-height: 35px;
                        }
                        .check-number-val-desc{
                            margin-top: 10px;
                            font-size: 16px;
                            color: white;
                        }
                        .dis-top{
                            margin-top: unset;
                        }
                    }
                }

                .red{
                    color: red;
                }
            }
        }
    }
</style>

<script lang="ts">
import Parser,{ Output } from 'rss-parser'
import x from 'python-shell'
import { defineComponent,onMounted,ref, Ref } from 'vue'

interface stateInf {
    data:Ref<Output<Item>>,
    filterData:Ref<{[key:string]:any}[]>
    dataTitle:Ref<string[]>,
    descriptGroup:string[],
    elseDescGroup:{[key:string]:any}[]
}

interface methodInf {
    getData:() => any,
    fiterDatas:(postTitle:string) => void,
    contentRepack:(postItem:string) => string,
    transDate:(time:string) => string,
    runs:() => void
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
            dataTitle:ref<string[]>([]),
            descriptGroup:[
                "同期統一發票收執聯8位數號碼與特別獎號碼相同者獎金1,000萬元",
                "同期統一發票收執聯8位數號碼與特獎號碼相同者獎金200萬元",
                "同期統一發票收執聯8位數號碼與頭獎號碼相同者獎金20萬元",
                ""
            ],
            elseDescGroup:[{
                zh:"二獎",
                value:"",
                descript:"同期統一發票收執聯末7 位數號碼與頭獎中獎號碼末7 位相同者各得獎金4萬元"
            },{
                zh:"三獎",
                value:"",
                descript:"同期統一發票收執聯末6 位數號碼與頭獎中獎號碼末6 位相同者各得獎金1萬元"
            },{
                zh:"四獎",
                value:"",
                descript:"同期統一發票收執聯末5 位數號碼與頭獎中獎號碼末5 位相同者各得獎金4千元"
            },{
                zh:"五獎",
                value:"",
                descript:"同期統一發票收執聯末4 位數號碼與頭獎中獎號碼末4 位相同者各得獎金1千元"
            },{ 
                zh:"六獎",
                value:"",
                descript:"同期統一發票收執聯末3 位數號碼與 頭獎中獎號碼末3 位相同者各得獎金2百元"
            }]
        }
        

        const method:methodInf = {
            transDate:time => new Date(time).toJSON().split('T')[0],
            fiterDatas:postTitle => {
                state.filterData.value = state.data.value.items.filter(({ title }:Item) => title === postTitle)
            },
            runs:() => {
                
                // PythonShell.runString(`
                // from urllib.request import Request as req, urlopen
                // from urllib.error import HTTPError as error
                // import sys
                // def getPageCode():
                //     src = "https://invoice.etax.nat.gov.tw/invoice.xml"
                //     try:
                //         res = urlopen(req(src))
                //         pageDetails = res.read().decode("utf-8")
                //         print(pageDetails)
                //     except error as err:
                //         print(f"Fail code : {err.code}，Fail reason : {err.reason}")

                //     sys.stdout.flush()
                // getPageCode()
                // `, {},(err:any,res:any) => {
                //     console.log(err)
                // })
                let y = x
                console.log(y)
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
            getData:async () => {
                
                // const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
                // const parser = new Parser();

                // const data:Output<Item> = await parser.parseURL("https://invoice.etax.nat.gov.tw/invoice.xml")

                // const dataTemp:Output<Item> = await {
                //     ...data,
                //     items:data.items.map((item:Item) => ({ 
                //         ...item,
                //         title:item.title!.replace(/~/g,'月 ~ '),
                //         contentSnippet:method.contentRepack(item.contentSnippet!),
                //         isoDate:method.transDate(item.isoDate!),
                //         })
                //     )
                // }

                // state.dataTitle.value = dataTemp.items.map(({ title }:Item) => title!)

                // console.log(dataTemp)
                // console.log(state.dataTitle.value)
                return []
            }
        }

        onMounted(() => {
            // (async () => {
            //     const data = await method.getData()
            //     state.data.value = data
            // })()
        })
        
        return { ...state,...method }
    }
})
</script>