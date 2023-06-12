import { DetailedHTMLProps, DragEventHandler, FC,ImgHTMLAttributes,MouseEventHandler,useContext, useEffect, useRef, useState } from "react";
import { NewContext } from '../../App'
import { Container,initStateType,convertType } from '.'

const ImageColorPicker:FC = ():TSX => {
    const { $,PickerUtils,formatLanguage } = useContext(NewContext)
    
    const [{
        fileUrl,
        toggleImg,
        rgb,
        isVertical,
        zoomSize
    },setInitState] = useState<initStateType>({
        fileUrl:'',
        toggleImg:false,
        rgb:[],
        isVertical: false,
        zoomSize:1
    })

    const [startMousePos,setStartMousePosition] = useState<{
        mouseX:number,
        mouseY:number,
        inUsing: boolean
    }>({
        mouseX:0,
        mouseY:0,
        inUsing: false
    })

    const [pointPos,setPointPosition] = useState<{
        pointX:number,
        pointY:number
    }>({
        pointX:0,
        pointY:0
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
            const insideImge = new Image()

            insideImge.src = window.URL.createObjectURL(file)

            img.current!.setAttribute('src', window.URL.createObjectURL(file))

            canvas.current!.getContext('2d')!.clearRect(0, 0, canvas.current!.width, canvas.current!.height);

            insideImge.onload = () => {
                convertRGB(canvas.current!, img.current!)

                setInitState(prevState => ({
                    ...prevState,
                    toggleImg: true,
                    isVertical: insideImge.width < insideImge.height,
                    zoomSize:1
                }))

                setPointPosition(prevState => ({
                    ...prevState,
                    pointX:0,
                    pointY:0
                }))

                setStartMousePosition(prevState => ({
                    ...prevState,
                    mouseX:0,
                    mouseY:0,
                    inUsing:false
                }))
            }
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

    const dragImgStart:MouseEventHandler<HTMLImageElement> = event => {
        event.preventDefault()
        setStartMousePosition(prevState => ({
            ...prevState,
            mouseX: event.clientX - pointPos.pointX,
            mouseY: event.clientY - pointPos.pointY,
            inUsing: true
        }))
    }

    const dragImgMove:MouseEventHandler<HTMLImageElement> = event => {
        event.preventDefault();

        const { inUsing,mouseX,mouseY } = startMousePos

        if (!inUsing) return;

        setPointPosition(prevState => ({
            ...prevState,
            pointX: event.clientX - mouseX,
            pointY: event.clientY - mouseY
        }))

        $(img.current!).styles('set', 'cursor', 'move')
    }

    const dragImgEnd:MouseEventHandler<HTMLImageElement> = () => {
        setStartMousePosition(prevState => ({
            ...prevState,
            useMouseUp: true,
            inUsing: false
        }))
        
        changeCursor(true)
    }
    
    const convertText:(type: convertType) => (string | undefined) = type => {
        const [R, G, B] = rgb

        return {
            rgb: rgb.length > 0 ? `rgb(${R},${G},${B})` : formatLanguage('pages.imagePicker.cathMsg'),
            hex: rgb.length > 0  ? PickerUtils.rgbToHex(R, G, B) : formatLanguage('pages.imagePicker.cathMsg')
        }[type]
    }

    const changeZoom:(isZoomIn:boolean) => void = isZoomIn => {
        setInitState(prevState => ({
            ...prevState,
            zoomSize: isZoomIn ? prevState.zoomSize + 0.2 : prevState.zoomSize - 0.2 < 1 ? 1 : prevState.zoomSize - 0.2
        }))
    }

    useEffect(() => {
        $(img.current!).styles('set', 'transform', `translate(${pointPos.pointX}px,${pointPos.pointY}px) scale(${zoomSize})`)
    },[pointPos,zoomSize])
  

    return (
        <Container>
            <div className="area-outer">
                <div className="left-area">
                    <div className={`img-outer ${toggleImg && isVertical ? 'outer-vertical' : 'outer-horizontal'}`}>
                        <img className={`img ${toggleImg && isVertical ? 'toggle vertical' : 'toggle horizontal'}`}
                            ref={img}
                            src={fileUrl}
                            onClick={catchColor}
                            onDragEnter={dragenter}
                            onDragOver={dragover}
                            onDrop={drop}
                            onMouseDown={dragImgStart}
                            onMouseMove={dragImgMove}
                            onMouseUp={dragImgEnd}
                            onMouseEnter={changeCursor.bind(undefined,true)}
                            onMouseLeave={changeCursor.bind(undefined,false)}
                        />
                        <div className="zoom-controller">
                            <div className="plus" onClick={changeZoom.bind(undefined,true)}>
                                <div>
                                    <div className="line"></div>
                                    <div className="line"></div>
                                </div>
                            </div>
                            <div className="minus" onClick={changeZoom.bind(undefined,false)}>
                                <div className="line"></div>
                            </div>
                        </div>
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