import { FC, useState,useRef,useContext, useEffect } from "react";
import { NewContext } from '../../App'
import { Container,initStateType } from '.'

const ColorPicker:FC = ():JSX.Element => {

    const { $,PickerUtils,formatLanguage } = useContext(NewContext)

    const [{
        width,
        height,
        radLarge,
        radSmall,
        cx,
        cy,
        points,
        angle,
        rgbVal,
        hexVal,
        hslVal,
    },setInitState] = useState<initStateType>({
        width: 0,
        height: 0,
        radLarge: 0,
        radSmall: 0,
        cx: 0,
        cy: 0,
        points:40,
        angle:360 / 40,
        rgbVal: '',
        hexVal: '',
        hslVal: '',
    })

    const parent = useRef<HTMLDivElement>(null);
    const outerRef = useRef<HTMLCanvasElement>(null)
    const ctxARef = useRef<CanvasRenderingContext2D>(null)
    const innerRef = useRef<HTMLCanvasElement>(null)
    const ctxBRef = useRef<CanvasRenderingContext2D>(null)
    const dotRef = useRef<HTMLCanvasElement>(null)
    const ctxCRef = useRef<CanvasRenderingContext2D>(null)
    const triRef = useRef<any>(undefined)
    const activeRef = useRef<boolean>(false)

    const init:() => void = () => {
        // outer canvas
        const outer:HTMLCanvasElement = $.createDom('canvas',{
            width:width,
            height:height,
        }) as HTMLCanvasElement

        const ctxA = outer.getContext('2d')!;

        // inner canvas
        const inner = $.createDom('canvas',{
            width:width,
            height:height,
        }) as HTMLCanvasElement

        const ctxB = inner.getContext('2d')!;
        ctxB.globalCompositeOperation = 'hard-light';

        // dot canvas
        const dot:HTMLCanvasElement = $.createDom('canvas',{
            width:width,
            height:height,
            onmouseup:() => (activeRef.current as boolean) = false,
            onmousemove:(e:MouseEvent) => activeRef.current && updateCanvas(e),
            onmousedown:(e:MouseEvent) => {
                (activeRef.current as boolean) = true;
                activeRef.current && updateCanvas(e)
            }
        }) as HTMLCanvasElement

        const ctxC = dot.getContext('2d')!;

        (outerRef.current as HTMLCanvasElement) = outer;
        (ctxARef.current as CanvasRenderingContext2D) = ctxA;
        (innerRef.current as HTMLCanvasElement) = inner;
        (ctxBRef.current as CanvasRenderingContext2D) = ctxB;
        (dotRef.current as HTMLCanvasElement) = dot;
        (ctxCRef.current as CanvasRenderingContext2D) = ctxC;

        $(parent.current!).appendDom(outer);
        $(parent.current!).appendDom(inner);
        $(parent.current!).appendDom(dot);
        // add spectrum

        spectrum();

        draw(298, 25, false);
    }
  
    const circle:(ctx:CanvasRenderingContext2D,...parameters:any[]) => void = (ctx,...parameters) => {
        const [x, y, r, style, start, end]:any[] = parameters

        ctx.beginPath();
        ctx.arc(x, y, r, start || 0, end || Math.PI * 2);

        if (style.fill) {
            ctx.fillStyle = style.fill;
            ctx.fill();
        }

        if (style.stroke) {
            ctx.strokeStyle = style.stroke;
            ctx.stroke();
        }

        if (style.lineWidth) {
            ctx.lineWidth = style.lineWidth;
        }
    }
  
    const triangle:(ctx:CanvasRenderingContext2D, points:any[], fill:CanvasGradient) => void = (ctx,points,fill) => {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        for (let i = points.length - 2; i >= 0; i--) {
            ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.fillStyle = fill;
        ctx.fill();
    }
  
    const spectrum:() => void = () => {
        for (let i = 1; i <= points; i++) {
            // arc points
            const a = i * angle;
            const b = (i - 1) * angle;

            // gradient vector
            const radius = radSmall + (radLarge - radSmall) / 2;
            const x1 = Math.cos(toRadians(a)) * radius + cx;
            const y1 = Math.sin(toRadians(a)) * radius + cy;
            const x2 = Math.cos(toRadians(b)) * radius + cx;
            const y2 = Math.sin(toRadians(b)) * radius + cy;

            // gradient
            const ctxAShape = ctxARef.current!.createLinearGradient(x1, y1, x2, y2);
            ctxAShape.addColorStop(0, `hsl(${a}, 100%, 50%)`);
            ctxAShape.addColorStop(1, `hsl(${b}, 100%, 50%)`);

            // draw arc
            ctxARef.current!.beginPath();
            ctxARef.current!.arc(cx, cy, radLarge, toRadians(b) - 0.001, toRadians(a) + 0.001, false);
            ctxARef.current!.arc(cx, cy, radSmall, toRadians(a) + 0.001, toRadians(b) - 0.001, true);
            ctxARef.current!.fillStyle = ctxAShape;
            ctxARef.current!.fill();
        }
    }
  
    // convert angle to radians
    const toRadians:(angleR:number) => number = angleR => angleR * (Math.PI / 180)
  
    // center of circle (x0,y0), mouse coordinates (x1,y1), radius (r)
    const inCircle:(x0:number, y0:number, x1:number, y1:number, r:number) => boolean = (x0, y0, x1, y1, r) => Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0)) < r
  
    const inTriangle:(p:{[key:string]:any}, p0:{[key:string]:any}, p1:{[key:string]:any}, p2:{[key:string]:any}) => boolean = (p, p0, p1, p2) => {
        // point in circle (p), triangle points (p0, p1, p2)
        const A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        const sign = A < 0 ? -1 : 1;
        const s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * p.x + (p0.x - p2.x) * p.y) * sign;
        const t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * p.x + (p1.x - p0.x) * p.y) * sign;
        return s > 0 && t > 0 && (s + t) < 2 * A * sign;
    }
  
    const updateCanvas:(e:MouseEvent) => void = e => {
        let triTemp:any;
        // get mouse pos
        const x = e.clientX - innerRef.current!.offsetLeft;
        const y = e.clientY - innerRef.current!.offsetTop;
        const pos = {x: x, y: y};
        // check mouse is within bounds
        const outer = inCircle(cx, cy, x, y, radLarge)
        const inners = inCircle(cx, cy, x, y, radSmall)
        // check mouse in triangle
        if (triRef.current) triTemp = inTriangle(pos, triRef.current[0], triRef.current[1], triRef.current[2]);
        // draw
        if (outer && !inners) {
            draw(x, y, false);
        } else if (triTemp) {
            draw(x, y, true)
        }
    }
  
    const draw:(x:number, y:number, tris:boolean) => void = (x, y, tris) => {
        // get pixel data
        const da = Array.from(ctxARef.current!.getImageData(x, y, 1, 1).data);
        const db = Array.from(ctxBRef.current!.getImageData(x, y, 1, 1).data);
        // draw equilateral triangle
        if (!tris) {
            // clear triangle canvas
            ctxBRef.current!.clearRect(0, 0, innerRef.current!.width, innerRef.current!.height);
            const ang = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
            const color = `rgb(${da[0]},${da[1]},${da[2]})`;
            const angs = [0, 120, 240, 180];

            const pts:{ x:number,y:number }[] = triRef.current = [];

            $.each(angs,((num:number) => {
                pts.push({
                    x: Math.cos(toRadians(ang + num)) * radSmall + cx,
                    y: Math.sin(toRadians(ang + num)) * radSmall + cy
                })
            }))

            // gradient 1 = black => white
            const ctxB1Shape = ctxBRef.current!.createLinearGradient(pts[1].x, pts[1].y, pts[2].x, pts[2].y);
            
            const hsl = PickerUtils.rgbToHsl(da[0], da[1], da[2]).fomat<number[]>('toArray'); // mark place
            
            ctxB1Shape.addColorStop(0, 'hsl(' + hsl[0] * 360 + ',0%,100%)');
            ctxB1Shape.addColorStop(1, 'hsl(' + hsl[0] * 360 + ',0%,0%)');
            // gradient 2 = hue => transparent
            const ctxB2Shape = ctxBRef.current!.createLinearGradient(pts[0].x, pts[0].y, pts[3].x, pts[3].y);
            ctxB2Shape.addColorStop(0, color);
            ctxB2Shape.addColorStop(1, `rgb(${da[0]},${da[1]},${da[2]})`);
            // draw
            triangle(ctxBRef.current!, pts, ctxB2Shape);
            triangle(ctxBRef.current!, pts, ctxB1Shape);
        }
        // clear dot canvas
        ctxCRef.current!.clearRect(0, 0, dotRef.current!.width, dotRef.current!.height);
        
        const [choiceR,choiceG,choiceB]:number[] = tris ? db : da;
        const choiceColor:string = `rgb(${choiceR},${choiceG},${choiceB})`

        setInitState(prevState => ({
            ...prevState,
            rgbVal:choiceColor,
            hexVal:PickerUtils.rgbToHex(choiceR,choiceG,choiceB),
            hslVal:`HSL：${PickerUtils.rgbToHsl(choiceR,choiceG,choiceB).fomat<string>('toElement')}`
        }))

        circle(ctxCRef.current!, x, y, 10, {stroke: '#fff', lineWidth: 3, fill: choiceColor});
    }

    useEffect(() => {
        width && height && init()
    },[width,height])

    useEffect(() => {
        parent.current && setInitState(prevState => ({
            ...prevState,
            radLarge:($(parent.current!).props('offsetWidth') / 2) - 5,
            radSmall:(($(parent.current!).props('offsetHeight') / 2) - 5) - 40,
            width:$(parent.current!).props('offsetWidth'),
            height:$(parent.current!).props('offsetHeight'),
            cx:$(parent.current!).props('offsetWidth') / 2,
            cy:$(parent.current!).props('offsetHeight') / 2,
        }))
    },[parent.current])

    return (
        <Container>
            <div className="picker" ref={parent}></div>
            <div className="board-info">
              <div>RGB：{rgbVal}</div>
              <div>Hex：{hexVal}</div>
              <div dangerouslySetInnerHTML={{ __html:hslVal }}></div>
            </div>
            <div className="color-preview" style={{ backgroundColor: rgbVal }}>
                <div className="color-preview-frame">{formatLanguage('pages.colorPicker.previewColor')}</div>
            </div>
        </Container>
    )
}

export default ColorPicker