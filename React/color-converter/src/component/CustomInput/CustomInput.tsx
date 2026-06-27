import { 
    ChangeEventHandler, 
    MouseEventHandler,
    FocusEventHandler,
    HTMLInputTypeAttribute, 
    useContext, 
    useEffect, 
    useRef, 
    useState 
} from "react";
import { NewContext } from '@/App'
import { StyledLayout } from '.'

interface CustomInputProps {
    label:string
    type: HTMLInputTypeAttribute
    inputStyle: 'default' | 'outline' 
    align?: 'left' | 'center'
    labelAlign: 'default' | 'center'
    size?: 'sm' | 'md' | ''
    inputVal?: string
    selectedRowTemp?: string
    options?: { key: string, value: string }[]
    disabled?:boolean
    readOnly?:boolean
    usingType: 'input' | 'list'
    isValidStatus?: boolean,
    useStyle?: 'white'
    listPos?: number
    marginBottom?: number
    changeEvent?: ChangeEventHandler | ((...args: any[]) => void)
    blurEvent?: FocusEventHandler | ((...args: any[]) => void)
    clickEvent?: MouseEventHandler | ((...args: any[]) => void)
    getOptionVal?(val: any): void
}

const CustomInput:FC<CustomInputProps> = (props):TSX => {

    const { $ } = useContext(NewContext)

    const [{
        toggleOptionList,
        selectedRow
    }, setInitState] = useState<{
        toggleOptionList: boolean
        selectedRow: string
    }>({
        toggleOptionList: false,
        selectedRow: ''
    })

    const toggleOptionListDebunce = useRef<number | undefined>(undefined)

    const optionListRef = useRef<HTMLDivElement | null>(null)

    const setValFromList: (row: { key: string, value: string }) => void = row => {

        if(!props?.getOptionVal) return

        setInitState(prevState => ({
            ...prevState,
            toggleOptionList: false,
            selectedRow: row.value
        }))

        props.getOptionVal(row.value)

        optionListRef.current!.classList.remove('top')
        optionListRef.current!.classList.remove('bottom')
    }
    
    const whenBlur: FocusEventHandler = (event) => {
        if(props?.blurEvent) props.blurEvent(event)
    }

    useEffect(() => {

        if(!props?.options) return

        setInitState(prevState => ({
            ...prevState,
            withArrayObject: true,
            optionsRepack: props.options!
        }))

    }, [props?.options])
    
    return (
        <StyledLayout 
            listPos={props?.listPos}
            marginBottom={props?.marginBottom}
        >
            {
                {
                    [props.usingType]: false,
                    input: (
                        <div className={[
                            'input-outer',
                            props.size,
                            props?.useStyle === 'white' ? 'white' : ''
                        ].join(' ')}>
                            { 
                                props.inputStyle === 'outline' ?
                                    <>
                                        <input
                                            className={[
                                                'outline',
                                                props?.align !== 'center' ? 'align-left' : 'align-center',

                                            ].join(' ')}
                                            disabled={props?.disabled || false}
                                            type={props.type}
                                            readOnly={props?.readOnly || false}
                                            onBlur={whenBlur}
                                            placeholder=""
                                            value={props?.inputVal}
                                            onChange={props.changeEvent}
                                        />
                                        <div className="line"></div>
                                        <p className={[
                                            props?.isValidStatus ? 'invalid-error' : '',
                                            props.labelAlign
                                        ].join(' ')}>{props.label}</p>
                                    </> : <>
                                        <input
                                            className={props?.align !== 'center' ? 'align-left' : 'align-center'}
                                            disabled={props?.disabled || false}
                                            readOnly={props?.readOnly || false}
                                            type={props.type}
                                            onBlur={whenBlur}
                                            value={props?.inputVal}
                                            onChange={props.changeEvent}
                                            placeholder=""
                                        />
                                        <p className={[
                                            props?.isValidStatus ? 'invalid-error' : '',
                                            props.labelAlign
                                        ].join(' ')}>{props.label}</p>
                                        <fieldset>
                                            <legend className={props.labelAlign}>{props.label}</legend>
                                        </fieldset>
                                    </>
                            }
                        </div>
                    ),
                    list: (
                        <div className={[
                            'input-outer',
                            props.size,
                            props?.useStyle === 'white' ? 'white' : ''
                        ].join(' ')}>
                            <input
                                className={[
                                    props.inputStyle === 'outline' ? 'outline' : 'default',
                                    props?.align !== 'center' ? 'align-left' : 'align-center'
                                ].join(' ')}
                                disabled={props?.disabled || false}
                                type={props.type}
                                defaultValue={props?.selectedRowTemp}
                                onFocus={() => {

                                    setInitState(prevState => ({
                                        ...prevState,
                                        toggleOptionList: true
                                    }))
                                }}
                                onBlur={event => {

                                    clearTimeout(toggleOptionListDebunce.current)

                                    toggleOptionListDebunce.current = setTimeout(() => {
                                        
                                        setInitState(prevState => ({
                                            ...prevState,
                                            toggleOptionList: false
                                        }))

                                    }, 500)
                                    

                                    whenBlur(event)
                                }}
                                placeholder=""
                                readOnly
                            />
                            <p className={[
                                props?.isValidStatus ? 'invalid-error' : '',
                                props.labelAlign
                            ].join(' ')}>{props.label}</p>
                            <fieldset>
                                <legend className={props.labelAlign}>{props.label}</legend>
                            </fieldset>
                            <div className="option-group">
                                <div className={toggleOptionList ? 'option-list-outer toggle' : 'option-list-outer'} ref={el => {
                                    if(!el) return

                                    optionListRef.current = el

                                    const rect = el.getBoundingClientRect();

                                    const spaceBelow = window.innerHeight - rect.bottom;
                                    const spaceAbove = rect.top;

                                    if (spaceBelow > 300 && spaceAbove > spaceBelow) {
                                        el.classList.add("pos-top");
                                    } else {
                                        el.classList.add("pos-bottom");
                                    }
                                }}>
                                    {
                                        props?.options && $.maps(props.options, (row, index) => 
                                            (
                                                <div 
                                                    className={
                                                        [
                                                            'list-item', 
                                                            row.value === selectedRow ? 'active' : ''
                                                        ].join(' ')
                                                    }
                                                    key={index}
                                                    onClick={setValFromList.bind(undefined, row)}
                                                >
                                                    {row.key}
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    )
                }[props.usingType]
            }
        </StyledLayout>
    )
}

export default CustomInput