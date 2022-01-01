import { useState } from 'react'

const useInput = (initVal) => {
    const [value,setVal] = useState(initVal)
    const reset = () => setVal(initVal)
    const bind = { value,onChange:({ target:{value} }) => setVal(value) }
    return [value,bind,reset]
}

export default useInput