import { useState, ChangeEventHandler } from 'react'
import { StyledLayout } from '.'

interface InputProps {
    label:string
    type: 'input' | 'list'
    inputStyle: 'default' | 'outline' 
    align?: string
    labelAlign: 'default' | 'center'
    size: string
    inputValTemp?: string
    selectedRowTemp?: string
    options?: { key: string, value: string }[]
    disabled?:boolean
    readOnly?:boolean
    usingType: 'input' | 'list'
    isValidStatus?: boolean,
    useStyle?: 'white'
    listPos?: number
    withoutMb?: boolean
    changeEvent?: ChangeEventHandler<HTMLInputElement>
    blurEvent?: ChangeEventHandler<HTMLInputElement>
    getOptionVal?<T>(val:T):void
}

const Input: FC<InputProps> = (props): TSX => {

    const { label, type, inputStyle, labelAlign, size, usingType } = props

    const [{
        optionsRepack,
        selectedRow,
        selectedRowShow,
        toggleOptionList,
        withArrayObject
    }, setInitState] = useState<{
        optionsRepack: any[],
        selectedRow: string,
        selectedRowShow: string,
        toggleOptionList: boolean,
        withArrayObject: boolean
    }>({
        optionsRepack: [],
        selectedRow: '',
        selectedRowShow: '',
        toggleOptionList: false,
        withArrayObject: false
    })

    const setValFromList: (row:Record<string,any> | any) => void = row => {
                
        setInitState(prevState => ({
            ...prevState,
            selectedRow: row?.key ? row.value : row,
            selectedRowShow: row?.key ? row.key : row
        }))

        props?.getOptionVal(row?.key ? row.value : row)

        setTimeout(() => {
            setInitState(prevState => ({
                ...prevState,
                toggleOptionList: false
            }))
        }, 200)
    }

    if(usingType === 'input') {

        return (
            <StyledLayout>
                <div className={`input-outer ${size} ${props?.useStyle || ''} ${props?.withoutMb ? 'without-mb' : ''}`}>
                    {
                        inputStyle === 'outline' ? (
                            <>
                                <input
                                    className={`outline ${props?.align !== 'center' ? 'align-left' : 'align-center'}`}
                                    disabled={props?.disabled || false}
                                    type={type}
                                    readOnly={props?.readOnly || false}
                                    onChange={props?.changeEvent}
                                    onBlur={props?.blurEvent}
                                    placeholder="''"
                                    value={props?.inputValTemp}
                                />
                                <div className="line"></div>
                                <p className={`${props?.isValidStatus ? 'invalid-error' : ''} ${labelAlign === 'center' ? 'center' : ''}`}>
                                    {label}
                                </p>
                            </>
                        ) : (
                            <>
                                <input
                                    className={`${props?.align !== 'center' ? 'align-left' : 'align-center'}`}
                                    disabled={props?.disabled || false}
                                    type={type}
                                    readOnly={props?.readOnly || false}
                                    onChange={props?.changeEvent}
                                    onBlur={props?.blurEvent}
                                    placeholder="''"
                                    value={props?.inputValTemp}
                                />
                                <p className={`${props?.isValidStatus ? 'invalid-error' : ''} ${labelAlign === 'center' ? 'center' : ''}`}>
                                    {label}
                                </p>
                                <fieldset>
                                    <legend className={`${labelAlign === 'center' ? 'center' : ''}`}>{label}</legend>
                                </fieldset>
                            </>
                        )
                    }
                </div>
            </StyledLayout>
        )
    }

    return (
        <StyledLayout>
            <div className={`input-outer ${size} ${props?.useStyle || ''}`}>
                <input
                    className={`${inputStyle === 'outline' ? 'outline' : ''} ${props?.align !== 'center' ? 'align-left' : 'align-center'}`}
                    disabled={props?.disabled || false}
                    type={type}
                    readOnly
                    onBlur={props?.blurEvent}
                    placeholder="''"
                    defaultValue={withArrayObject ? selectedRowShow : props?.selectedRowTemp}
                />
                <p className={`${props?.isValidStatus ? 'invalid-error' : ''} ${labelAlign === 'center' ? 'center' : ''}`}>
                    {label}
                </p>
                <fieldset>
                    <legend className={`${labelAlign === 'center' ? 'center' : ''}`}>{label}</legend>
                </fieldset>
                <div className="option-group">
                    <div className="option-list-outer" style={{ marginTop: props?.listPos || '' }}>
                        {
                            optionsRepack.map((row, index) => (
                                withArrayObject ? (
                                    <div 
                                        className={`list-item ${row.value === selectedRow ? 'active' : ''}`}
                                        key={index}
                                        onClick={setValFromList.bind(this,row)}
                                    >
                                        {row.key}
                                    </div>
                                ) : (
                                    <div 
                                        className={`list-item ${row === selectedRow ? 'active' : ''}`}
                                        key={index}
                                        onClick={setValFromList.bind(this,row)}
                                    >
                                        {row}
                                    </div>
                                )
                            ))
                        }
                    </div>
                </div>
            </div>
        </StyledLayout>
    )
}

export default Input