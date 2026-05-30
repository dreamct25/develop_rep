import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { StyledLayout } from '.'

const Carousel:FC<{ 
    children: TSX[],
    isLoop?: boolean
    scrollActionHandler?: (emblaApi: ReturnType<typeof useEmblaCarousel>['1']) => void 
}> = ({ children, isLoop = false ,scrollActionHandler }):TSX => {

    const [emblaRef,  emblaApi] = useEmblaCarousel({
        align: 'center',
        loop: isLoop
    })

    const [toggleScrollPrevBtn, setToggleScrollPrevBtn] = useState(false)
    const [toggleScrollNextBtn, setToggleScrollNextBtn] = useState(false)

    const whenScrollSelect: () => void = () => {

        if(!emblaApi) return
        
        if(emblaApi.canScrollPrev() !== toggleScrollPrevBtn) {
            
            setToggleScrollPrevBtn(emblaApi.canScrollPrev())

            emblaApi.off('select', whenScrollSelect)
        }

        if(emblaApi.canScrollNext() !== toggleScrollNextBtn) {
            
            setToggleScrollNextBtn(emblaApi.canScrollNext())

            emblaApi.off('select', whenScrollSelect)
        }

        if(scrollActionHandler) {
            scrollActionHandler(emblaApi)
        }
    }
    
    useEffect(() => {
        
        if(emblaApi) {

            whenScrollSelect()
            
            emblaApi.on('select', whenScrollSelect)
        }

    }, [emblaApi, toggleScrollPrevBtn, toggleScrollNextBtn])

    return (
        <StyledLayout className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {children}
                </div>
            </div>
            {
                emblaApi && (
                    <>
                        <div className={toggleScrollPrevBtn ? "embla-prev-btn active" : "embla-prev-btn"} onClick={() => {
                            emblaApi.scrollPrev()
                        }}>
                            <ChevronLeft size={33} />
                        </div>
                        <div className={toggleScrollNextBtn ? "embla-next-btn active" : "embla-next-btn"} onClick={() => {
                            emblaApi.scrollNext()
                        }}>
                            <ChevronRight size={33} />
                        </div> 
                    </>
                )
            }
        </StyledLayout>
    )
}

export default Carousel