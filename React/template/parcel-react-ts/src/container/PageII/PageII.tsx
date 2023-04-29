import React,{ FC, useState } from "react";
import { Container } from '.'

const PageII:FC = () => {
    const [count,setCount] = useState<number>(0)
    const [arr,setArr] = useState<number[]>([])
    const [toggleColor,setToggleColor] = useState(false)
    const [inputVal,setInputVal] = useState('')

    const addCount:() => void = () => {
        setCount(count + 1)
        setArr(prev => [...prev,count + 1])
    }
    
    return pug`
        Container
            .container
            
                .list-outer
                    each item,index in arr.filter(num => num % 2 === 0).sort((a,b) => b - a)
                        .list-item(key=index) #{index + 1}.Item #{item}
                    // ${arr.map((item,index) => pug`.list-item(key=${index}) ${index + 1}.Item ${item}`)}
                // if count > 5
                //     div current count is #{count} and Bigger
                // else
                //     div current count is #{count} and smaller
                div current count is ${pug`${count > 5 ? `${count} is Bigger` : `${count} is smaller`}`}
                .add-count(onClick=addCount) Add Counts

            div(className=toggleColor ? 'box toggle' : 'box')
            .change-box-btn(onClick= () => setToggleColor(!toggleColor)) Change Color

            div #{inputVal}
            input(type="text",value=inputVal,onChange = ({ target:{ value }}) => setInputVal(value))
    `
}

export default PageII