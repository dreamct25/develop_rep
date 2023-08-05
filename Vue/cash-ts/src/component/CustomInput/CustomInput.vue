<template lang="pug">
template(v-if="usingType === 'input'")
    .input-outer(:class="size || ''")
        input(
            :class="{ 'lock': inputVal || '','align-left': align !== 'center','align-center': align === 'center' }"
            :disabled="disabled || false"
            :type="type"
            v-model="inputVal"
        )
        p {{ label }}
        fieldset
            legend {{ label }}
template(v-else-if="usingType === 'list'")
    .input-outer(:class="size || ''")
        input(
            :class="{ 'lock': selectedRow || '','align-left': align !== 'center','align-center': align === 'center' }"
            :disabled="disabled || false"
            :type="type"
            :value="selectedRowShow"
            readonly
        )
        p {{ label }}
        fieldset
            legend {{ label }}
        .option-group
            .option-list-outer
                template(v-if="withArrayObject")
                    .list-item(
                        v-for="(row,index) in optionsRepack"
                        :key="index"
                        :class="{ active: row.key === selectedRow }"
                        @click="setValFromList(row)"
                    ) {{ row.value }}
                template(v-else-if="withArrayObject === false")
                    .list-item(
                        v-for="(row,index) in optionsRepack"
                        :key="index"
                        :class="{ active: row === selectedRow }"
                        @click="setValFromList(row)"
                    ) {{ row }}
</template>
<style lang="scss" scoped>
    .input-outer{
        position: relative;
        margin-bottom: 12px;

        fieldset{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid;
            border-color: rgba(255,255,255,.5);
            border-radius: 5px;
            padding: 0 12px 0 8px;
            margin-top: -11.5px;
            height: 70px;
            z-index: 1;
            transition: .5s ease;
            opacity: 0;

            legend{
                float: unset;
                width: unset;
                font-size: 16px;
                line-height: unset;
                margin-bottom: unset;
                padding: 0 3px;
                opacity: 0;
            }
        }

        input{
            position: relative;
            z-index: 3;
            width: 100%;
            outline: none;
            border: none;
            background-color: transparent;
            font-size: 18px;
            height: 58px;
            padding: 0 12px;
            color: white;
            border: 1px solid;
            border-color: rgba(255,255,255,.5);
            border-radius: 5px;
            transition: .5s ease;

            &:placeholder-shown::placeholder {
                color: transparent;
            }

            &:focus{
                border-color: rgba(255,255,255,0);
            }

            &:focus ~ p{
                opacity: 1;
                transform: scale(0.85);
                left: 0;
                top: -22%;
            }

            &:focus ~ fieldset{
                opacity: 1;
            }

            &:focus ~ .option-group{

                .option-list-outer{
                    opacity: 1;
                    z-index: 5;
                }
                
            }

            &.lock{
                &:not(:placeholder-shown){
                    border-color: rgba(255,255,255,0);
                }

                &:not(:placeholder-shown) ~ p {
                    opacity: 1;
                    transform: scale(0.85);
                    left: 0;
                    top: -22%;
                }

                &:not(:placeholder-shown) ~ fieldset{
                    opacity: 1;
                }
            }

            &.align-left{
                text-align: left;
            }

            &.align-center{
                text-align: center;
            }
        }

        p {
            position: absolute;
            left: 50%;
            top: 50%;
            color: white;
            opacity: .7;
            transform: scale(1) translate(-50%, -50%);
            pointer-events: none;
            margin-bottom: 0;
            font-size: 13px;
            transition: .5s ease;
            z-index: 2;
            font-size: 18px;
            padding: 0 10px 0 6px;

            &::before{
                content: '';
                margin-right: 4px;
            }

            &::after{
                content: '';
                margin-left: 4px;
            }
        }

        &.sm {

            fieldset{
                height: 47px;
            }

            input{
                height: 35px;

                &.lock{

                    &:not(:placeholder-shown) ~ p {
                        opacity: 1;
                        transform: scale(0.85);
                        left: 0;
                        top: -35%;
                    }
                }

                &:focus ~ p{
                    top: -35%;
                }
            }

            p{
                padding: 0 5px;
            }
        }

        .option-group{

            .option-list-outer{
                position: absolute;
                left: 0;
                right: 0;
                background-color: white;
                opacity: 0;
                z-index: -1;
                border-radius: 5px;
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 250px;
                border: 1px solid rgba(30,30,30,.3);
                margin-top: 10px;
                transition-delay: .2s;

                .list-item{
                    text-align: center;
                    padding: 8px 0;
                    cursor: pointer;
                    user-select: none;
                    transition: .5s ease;
                    color: black;

                    &:hover{
                        color: white;
                        background-color: rgb(60,60,60);
                    }
                    
                    &.active{
                        color: white;
                        background-color: rgb(60,60,60);
                        box-shadow: inset 0 0 3px 0 rgba(255,255,255,.7);
                    }
                }

                &::-webkit-scrollbar {
                    width: 5px;
                }

                &::-webkit-scrollbar-thumb {
                    border-radius: 20px;
                    background-color: rgba(30, 30, 30, 0.7);
                }

                @media screen and (max-width:414px){
                    margin-top: 3px;
                }
            }
        }
    }
</style>
<script lang="ts">
import { defineComponent,toRefs,ref,watch,Ref } from 'vue'
interface CustomInputProps {
    label:string
    type:string
    align: string
    size: string
    inputValTemp?: string
    selectedRowTemp?: string
    options?: any[]
    disabled?:boolean
    usingType:string
    changeEvent?(event:MouseEvent):void
    clickEvent?(status:boolean):void
    getOptionVal?(val:any):void
}

interface stateType {
    inputVal: Ref<string>,
    optionsRepack: Ref<any[]>,
    selectedRow: Ref<string>
    selectedRowShow: Ref<string>
    toggleOptionList: Ref<boolean>
    withArrayObject: Ref<boolean>
}

export default defineComponent({
    props:[
        'label',
        'type',
        'align',
        'size',
        'inputValTemp',
        'selectedRowTemp',
        'options',
        'disabled',
        'usingType',
        'changeEvent',
        'getOptionVal'
    ],
    emits:['changeEvent','getOptionVal'],
    setup(props:CustomInputProps,{ emit }){
        const propsRefs = toRefs(props)

        const state:stateType = {
            inputVal: ref(''),
            optionsRepack: ref([]),
            selectedRow: ref(''),
            selectedRowShow: ref(''),
            toggleOptionList: ref(false),
            withArrayObject: ref(false)
        }

        const method = {
            setValFromList: (row:Record<string,any> | any) => {
                if(row?.key){
                    state.selectedRow.value = row.key
                    state.selectedRowShow.value = row.value
                } else {
                    state.selectedRow.value = row
                    state.selectedRowShow.value = row
                }

                emit('getOptionVal',state.selectedRow.value)

                state.toggleOptionList.value = false
            }
        }

        watch(propsRefs.options,cur => {
            if(typeof cur.at(0) === 'object'){
                const repack = cur.map(row => {
                    return Object.fromEntries(Object.entries(row).map(([key,value]) => {
                        if(key === 'key')
                            return [key,value]
                        else
                            return typeof value !== 'number' ? ['value',value] : undefined
                    }).filter(item => item !== undefined))
                })

                state.withArrayObject.value = true
                state.optionsRepack.value = repack
            } else {
                state.withArrayObject.value = false
                state.optionsRepack.value = cur
            }
        })
        
        watch(propsRefs.inputValTemp,cur => state.inputVal.value = cur)

        watch(propsRefs.selectedRowTemp,cur => {
            state.selectedRow.value = cur

            if(cur){
                if(state.withArrayObject.value){
                    const [{ value }] = state.optionsRepack.value.filter(({ key }) => key === cur)
                    state.selectedRowShow.value = value
                } else {
                    const [value] = state.optionsRepack.value.filter(row => row === parseInt(cur))
                    state.selectedRowShow.value = value
                }
            } else {
                state.selectedRowShow.value = ''
            }
        })

        watch(state.inputVal,cur => emit('changeEvent',cur))
        
        return { ...propsRefs,...state,...method }
    }
})
</script>