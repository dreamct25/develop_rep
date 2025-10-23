<template lang="pug">
template(v-if="usingType === 'input'")
    .input-outer(:class=`{ 
        sm: size === 'sm', 
        md: size === 'md',
        white: useStyle === 'white'
    }`)
        template(v-if="inputStyle === 'outline'")
            input(
                class="outline"
                :class="{ 'align-left': align !== 'center','align-center': align === 'center' }"
                :disabled="disabled || false"
                :type="type"
                :readonly="readOnly || false"
                @blur="whenBlur"
                placeholder="''"
                v-model="inputVal"
            )
            .line
            p(:class=`
                { 
                    'invalid-error': isValidStatus || false,
                    center: labelAlign === 'center'
                }
            `) {{ label }}
        template(v-else)
            input(
                :class=`{
                    'align-left': align !== 'center',
                    'align-center': align === 'center'
                }`
                :disabled="disabled || false"
                :readonly="readOnly || false"
                :type="type"
                @blur="whenBlur"
                placeholder="''"
                v-model="inputVal"
            )
            p(:class=`
                { 
                    'invalid-error': isValidStatus || false,
                    center: labelAlign === 'center'
                }
            `) {{ label }}
            fieldset
                legend(:class="{ center: labelAlign === 'center' }") {{ label }}
            
template(v-else-if="usingType === 'list'")
    .input-outer(:class=`{ 
        sm: size === 'sm', 
        md: size === 'md',
        white: useStyle === 'white'
    }`)
        input(
            :class="{ outline: inputStyle === 'outline','align-left': align !== 'center','align-center': align === 'center' }"
            :disabled="disabled || false"
            :type="type"
            :value="withArrayObject ? selectedRowShow : selectedRowTemp"
            placeholder="''"
            readonly
        )
        p(:class=`
            { 
                'invalid-error': isValidStatus || false,
                center: labelAlign === 'center'
            }
        `) {{ label }}
        fieldset
            legend(:class="{ center: labelAlign === 'center' }") {{ label }}
        .option-group
            .option-list-outer(:style="{ marginTop: listPos || '' }")
                template(v-if="withArrayObject")
                    .list-item(
                        v-for="(row,index) in optionsRepack"
                        :key="index"
                        :class="{ active: row.value === selectedRow }"
                        @click="setValFromList(row)"
                    ) {{ row.key }}
                template(v-else)
                    .list-item(
                        v-for="(row,index) in optionsRepack"
                        :key="index"
                        :class="{ active: row === selectedRow }"
                        @click="setValFromList(row)"
                    ) {{ row }}
</template>
<style lang="scss">

    .input-outer {
        position: relative;
        margin-bottom: 18px;

        &.white {

            input {
                color: white;
                border-color: rgba(255,255,255,.5);

                &:not(:placeholder-shown),
                &:focus{
                    border-color: rgba(255,255,255,0);
                }

                &:not(:placeholder-shown) ~ fieldset,
                &:focus ~ fieldset{
                    border-color: rgba(255,255,255,1);
                }
            }
        }

        fieldset {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            border: 1px solid;
            border-color: rgba(30,30,30,.5);
            border-radius: 5px;
            padding: 0 12px 0 8px;
            margin-top: -10px;
            height: 68px;
            z-index: 1;
            transition: .5s ease;
            opacity: 0;

            legend{
                float: unset;
                width: unset;
                font-size: 14px;
                line-height: unset;
                margin-bottom: unset;
                padding: 0 3px;
                opacity: 0;
                text-align: left;

                &.center {

                    text-align: center;
                }
            }
        }

        input {
            position: relative;
            z-index: 3;
            width: 100%;
            outline: none;
            border: none;
            background-color: transparent;
            font-size: 16px;
            height: 58px;
            padding: 0 12px;
            border: 1px solid;
            border-color: rgba(30,30,30,.5);
            border-radius: 5px;
            transition: .5s ease;

            &[type="number"]{

                &::-webkit-outer-spin-button,
                &::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
            }

            &:placeholder-shown::placeholder {
                color: transparent;
            }

            &:disabled {
                cursor: not-allowed;
            }

            &:not(:placeholder-shown),
            &:focus {
                border-color: rgba(30,30,30,0);
            }

            &:not(:placeholder-shown) ~ p,
            &:focus ~ p {
                opacity: 1;
                transform: scale(0.85) translate(-5%, 0%);
                left: 0;
                top: -22%;

                &.center {
                    left: 50%;
                    transform: scale(.85) translate(-62.5%, 0);
                }
            }

            &:not(:placeholder-shown) ~ fieldset,
            &:focus ~ fieldset {
                opacity: 1;
                border-color: rgba(30,30,30,1);
            }

            &:not(:placeholder-shown) ~ fieldset,
            &:focus ~ .option-group {

                .option-list-outer{
                    opacity: 1;
                    z-index: 30;
                }
            }

            &.outline {
                border: unset;
                border-bottom: 1px solid;
                border-color: rgba(30,30,30,.3);
                border-radius: unset;
                height: unset;
                padding: 20px 0 5px 0;

                & ~ .line {
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    height: 1px;
                    background-color: rgb(30,30,30);
                    width: 0;
                    opacity: 0;
                    margin: auto;
                    transition: .5s ease;
                }
                
                & ~ p {
                    padding: 0;
                    top: 65%;

                    &::before{
                        content: '';
                        margin-right: unset;
                    }

                    &::after{
                        content: '';
                        margin-left: unset;
                    }
                }

                &:not(:placeholder-shown),
                &:focus{
                    
                    & ~ .line {
                        opacity: 1;
                        width: 100%;
                    }
                }

                &:not(:placeholder-shown) ~ p,
                &:focus ~ p{
                    opacity: 1;
                    transform: scale(0.85) translate(-8%, 0);
                    left: 0;
                    top: -22%;
                }
            }

            &.align-left {
                text-align: left;
            }

            &.align-center {
                text-align: center;
            }
        }

        p {
            position: absolute;
            left: 0;
            top: 50%;
            opacity: .7;
            transform: scale(1) translate(0, -50%);
            pointer-events: none;
            margin-bottom: 0;
            font-size: 13px;
            transition: .5s ease;
            z-index: 2;
            font-size: 16px;
            padding: 0 10px 0 6px;
            text-align: center;

            &.center {
                left: 50%;
                transform: scale(1) translate(-50%, -50%);
                padding: 0;
                width: 100%;
            }

            &.success {
                color: rgb(0, 255, 34);
            }

            &.invalid-error {
                color: rgb(255, 0, 0) !important;
            }

            &::before{
                content: '';
                margin-right: 4px;
            }

            &::after{
                content: '';
                margin-left: 4px;
            }
        }

        &.md {

            fieldset {
                height: 57px;
            }

            input {
                height: 47px;

                &:not(:placeholder-shown) ~ p {
                    opacity: 1;
                    transform: scale(0.85) translate(-5%, 0%);
                    left: 0;
                    top: -29%;
                }

                &:focus ~ p {
                    top: -29%;
                }
            }

            p {
                padding: 0 5px 0 7px;
            }

            .option-group {

                .option-list-outer {

                    margin-top: 5px;
                }
            }
        }


        &.sm {

            fieldset {
                height: 45px;
            }

            input {
                height: 35px;

                &:not(:placeholder-shown) ~ p {
                    opacity: 1;
                    transform: scale(0.85) translate(-5%, 0%);
                    left: 0;
                    top: -35%;
                }

                &:focus ~ p {
                    top: -35%;
                }
            }

            p {
                padding: 0 5px 0 7px;
            }

            .option-group {

                .option-list-outer {

                    margin-top: 5px;
                }
            }
        }

        .option-group {

            .option-list-outer {
                position: absolute;
                left: 0;
                right: 0;
                background-color: white;
                opacity: 0;
                z-index: -1;
                border-radius: 5px;
                overflow-y: auto;
                overflow-x: hidden;
                max-height: 120px;
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
                    background-color: rgba(255, 255, 255, 0.7);
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
    type: 'input' | 'list'
    inputStyle: 'default' | 'outline' 
    align: string
    labelAlign: 'default' | 'center'
    size: string
    inputValTemp?: string
    selectedRowTemp?: string
    options?: { key: string, value: string }[]
    disabled?:boolean
    readOnly?:boolean
    usingType:string
    isValidStatus?: boolean,
    useStyle?: string
    listPos?: number
    changeEvent?(val:any):void
    blurEvent?(val:any):void
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
        'labelAlign',
        'size',
        'inputStyle',
        'inputValTemp',
        'selectedRowTemp',
        'options',
        'disabled',
        'readOnly',
        'usingType',
        'isValidStatus',
        'useStyle',
        'listPos',
        'changeEvent',
        'blurEvent',
        'clickEvent',
        'getOptionVal'
    ],
    emits:['changeEvent','getOptionVal','blurEvent'],
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
                    state.selectedRow.value = row.value
                    state.selectedRowShow.value = row.key
                } else {
                    state.selectedRow.value = row
                    state.selectedRowShow.value = row
                }

                emit('getOptionVal',state.selectedRow.value)

                setTimeout(() => {
                    state.toggleOptionList.value = false
                }, 200)
            },
            whenBlur: () => {

                if(propsRefs.blurEvent) emit('blurEvent', state.inputVal.value)
            }
        }

        if(propsRefs.options?.value){

            watch(propsRefs.options,cur => {

                if(typeof cur![0] === 'object'){
                    const repack = cur!.map(row => 

                        Object.fromEntries(
                            Object.entries(row).map(([key,value]) => {
                                
                                if(key === 'key')
                                    return [key,value]
                                else
                                    return typeof value !== 'number' ? ['value',value] : undefined
                            }).filter(item => item !== undefined)
                        )
                    )

                    state.withArrayObject.value = true
                    state.optionsRepack.value = repack
                } else {
                    state.withArrayObject.value = false
                    state.optionsRepack.value = cur!
                }
            },{ deep: true, immediate: true })
        }

        if(propsRefs.inputValTemp){
            watch(propsRefs.inputValTemp,cur => state.inputVal.value = cur!)
        }
        
        if(propsRefs.selectedRowTemp){
            
            watch(propsRefs.selectedRowTemp,cur => {
                state.selectedRow.value = cur!

                if(![undefined, ''].includes(cur)){

                    if(state.withArrayObject.value){

                        const [{ key }] = state.optionsRepack.value.filter(({ value }) => value === cur)

                        state.selectedRowShow.value = key

                        return
                    }

                    const [value] = state.optionsRepack.value.filter(row => row === cur)
                    state.selectedRowShow.value = value

                    return
                }

                state.selectedRowShow.value = ''
            },{ immediate: true })
        }
        

        watch(state.inputVal,cur => emit('changeEvent',cur))
        
        return { ...propsRefs,...state,...method }
    }
})
</script>