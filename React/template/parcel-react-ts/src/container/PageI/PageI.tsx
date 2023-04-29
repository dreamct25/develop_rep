import React, { FC, useEffect, useState } from "react";
import { Container } from '.'

const PageI:FC = ():JSX.Element => {
    const [{
        count,
        arr,
        xyz
    },setIniState] = useState<{
        count:number,
        arr:any[]
        xyz:{[key:string]:any}
    }>({
        count:0,
        arr:[],
        xyz:{}
    })

    const setCount:() => void = () => {
        setIniState(prevState => ({ 
            ...prevState,
            count: count + 1,
            arr: [...arr,count + 1]
        }))
    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIniState(prevState => ({
    //             ...prevState,
    //             xyz:{ b:{ c:100 } }
    //         }))
    //     },10000)
        
    // },[])

    return pug`
        Container
            // .opp 123456
            //     .aaa 10
            if count < 10
                div #{count} is smaller than 10
            else
                div #{count} is bigger than 10
            .btn(onClick=setCount) AddCount
            .list-outer
                each row,index in arr
                    .list-item.pug(key=index) #{index + 1}. Item #{row} use in pug
            .list-outer
                ${arr.map((row:number,index:number) => pug`.list-item.jsx(key=index) #{index + 1}. Item #{row} use in jsx`)}
    `

    // return (
    //     <Container>
    //         <div>{xyz.b?.c} 0</div>
    //     </Container>
        
    // )
}

export default PageI