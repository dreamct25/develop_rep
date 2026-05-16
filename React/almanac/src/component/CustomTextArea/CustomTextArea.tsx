import { ChangeEventHandler, FocusEventHandler } from "react";
import { StyledLayout } from '.'

interface CustomTextAreaProps {
    label:string
    inputStyle: 'default' | 'outline' 
    align?: string
    labelAlign: 'default' | 'center'
    size?: 'sm' | 'md' | ''
    inputVal: string
    selectedRowTemp?: string
    options?: { key: string, value: string }[]
    disabled?:boolean
    readOnly?:boolean
    usingType: 'input' | 'list'
    isValidStatus?: boolean,
    useStyle?: 'white'
    listPos?: number
    changeEvent: ChangeEventHandler | ((...args: any[]) => void)
    blurEvent?: ChangeEventHandler | ((...args: any[]) => void)
    getOptionVal?(val: any): void
}

const CustomTextArea:FC<CustomTextAreaProps> = (props):TSX => {

    const whenBlur: FocusEventHandler = (event) => {
        if(props?.blurEvent) props.blurEvent(event)
    }
    
    return (
        <StyledLayout>
            <div className={[
                "textarea-outer",
                props?.useStyle === 'white' ? 'white' : ''
            ].join(' ')}>
                {
                    props.inputStyle === 'outline' ?
                        <>
                            <textarea
                                className={[
                                    'outline',
                                    props?.align !== 'center' ? 'align-left' : 'align-center',

                                ].join(' ')}
                                disabled={props?.disabled || false}
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
                            <textarea
                                className={props?.align !== 'center' ? 'align-left' : 'align-center'}
                                disabled={props?.disabled || false}
                                readOnly={props?.readOnly || false}
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
        </StyledLayout>
    )
}

export default CustomTextArea