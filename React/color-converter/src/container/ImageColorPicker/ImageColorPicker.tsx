import { DragEventHandler, FC,MouseEventHandler,useContext, useRef, useState } from "react";
import { NewContext } from '../../App'
import { Container,initStateType,convertType } from '.'

const ImageColorPicker:FC = ():JSX.Element => {
    const { $,PickerUtils,formatLanguage } = useContext(NewContext)

    const [{
        fileUrl,
        toggleImg,
        rgb
    },setInitState] = useState<initStateType>({
        fileUrl:'',
        toggleImg:false,
        rgb:[]
    })
  
    const img = useRef<HTMLImageElement>(null)
  
    const canvas = useRef<HTMLCanvasElement>(null)

    const dragenter:DragEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const dragover:DragEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        e.preventDefault();
    }
    
    const drop:DragEventHandler<HTMLDivElement> = e => {
        e.stopPropagation();
        e.preventDefault();

        const file = e.dataTransfer!.files!;
        file[0] && handleFiles(file);
    }
    
    const handleFiles:(currenFile: FileList) => void = currentFile => {
        const file = currentFile[0]
        const imgRegxp = /^image\//

        if (imgRegxp.test(file.type)) {
            img.current!.setAttribute('src', window.URL.createObjectURL(file))

            canvas.current!.getContext('2d')!.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

            convertRGB(canvas.current!, img.current!)

            setInitState(prevState => ({
                ...prevState,
                toggleImg: true
            }))
        }
    }
    
    const catchColor:MouseEventHandler<HTMLImageElement> = e => {
        const xyTemp:{ x:number,y:number } = { x:0,y:0 }
        if (e.nativeEvent.offsetX) { // chrome
            xyTemp.x = e.nativeEvent.offsetX
            xyTemp.y = e.nativeEvent.offsetY
        } else if ((e.nativeEvent as any).layerX) { // firefox
            xyTemp.x = (e.nativeEvent as any).layerX
            xyTemp.y = (e.nativeEvent as any).layerY
        }

        convertRGB(canvas.current!, img.current!,xyTemp);
    }
    
    const convertRGB:(canvasElement: HTMLCanvasElement, imageElement: HTMLImageElement,xyItem?:{ x:number,y:number }) => void = (canvasElement,imageElement,{ x,y } = { x:0,y:0 }) => {
        canvasElement.width = imageElement.width; // element / img width
        canvasElement.height = imageElement.height; // element /img height
        // draw image in canvas tag
        canvasElement.getContext('2d')!.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);

        const colors = canvasElement.getContext('2d')!.getImageData(x, y, 1, 1).data;

        setInitState(prevState => ({
            ...prevState,
            rgb: [$.convert<number>(colors[0], 'number')!, $.convert<number>(colors[1], 'number')!, $.convert<number>(colors[2], 'number')!]
        }))
    }
    
    const changeCursor:(isEnter: boolean) => void = isEnter => {
        $(img.current!).styles(isEnter ? 'set' : 'remove', 'cursor', isEnter ? 'crosshair' : '')
    }
    
    const convertText:(type: convertType) => (string | undefined) = type => {
        const [R, G, B] = rgb

        return {
            rgb: rgb.length > 0 ? `rgb(${R},${G},${B})` : formatLanguage('pages.imagePicker.cathMsg'),
            hex: rgb.length > 0  ? PickerUtils.rgbToHex(R, G, B) : formatLanguage('pages.imagePicker.cathMsg')
        }[type]
    }
  

    return (
        <Container>
            <div className="area-outer">
                <div className="left-area">
                    <div className="img-outer">
                    <img className={toggleImg ? "img toggle" : "img"}
                        ref={img}
                        src={fileUrl}
                        onClick={catchColor}
                        onDragEnter={dragenter}
                        onDragOver={dragover}
                        onDrop={drop}
                        onMouseEnter={changeCursor.bind(this,true)}
                        onMouseLeave={changeCursor.bind(this,false)}
                    />
                    <div 
                        className={toggleImg ? "img-frame toggle" : "img-frame"}
                        onDragEnter={dragenter}
                        onDragOver={dragover}
                        onDrop={drop}
                    >
                        {formatLanguage('pages.imagePicker.dragImgContent')}
                    </div>
                    </div>
                </div>
                <div className="right-area">
                    <div className="color-view-outer">
                    <div className="color-box" style={{ backgroundColor:`rgb(${rgb.join(',')})` }}>
                        <div className="color-box-frame">{formatLanguage('pages.imagePicker.previewColor')}</div>
                    </div>
                    <div className="color-box-content">
                        <span>{formatLanguage('pages.imagePicker.cathColorTitle')}</span>
                        <div>RGB：{convertText('rgb')}</div>
                        <div>HEX：{convertText('hex')}</div>
                    </div>
                    </div>
                </div>
            </div>
            <canvas className="canvas" ref={canvas}></canvas>
        </Container>
    )
}

export default ImageColorPicker