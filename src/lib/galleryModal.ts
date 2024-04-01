import { imageList, type GalleryModalImage } from './imageList';

export default class GalleryModal {

    dataModalElName : string
    imgBtnElName : string
    modal : HTMLDivElement | null
    currentImageIndex : number | null
    imageList : GalleryModalImage[]

    constructor({ modal, imgBtn } : { modal: string, imgBtn: string }) {
        this.dataModalElName = modal
        this.imgBtnElName = imgBtn
        this.modal = null
        this.imageList = imageList
        this.currentImageIndex = null
    }

    // 
    // Main Methods
    // 
    init = () => {
        this.modal = document.querySelector(this.dataModalElName) as HTMLDivElement
        if(!this.modal) throw('Error: Modal Element not found')
        this.addImgButtonEventListeners()
    }

    openModal = (i: number, e: MouseEvent) => {
        if( this.isModalOpen() ) return

        const image = this.getClickedImage(e.clientX, e.clientY)
        if( !image ) return
        
        this.setCurrentImageIndex(i)
        const modalHTML  = this.generateModalHTML(image)
        this.showModalUI(modalHTML)
        this.setIsModalOpen(true)

    }

    closeModal = () => {
        this.hideModalUI()
        this.setIsModalOpen(false)
    }
        
    addImgButtonEventListeners = () => {
        const artBtnList = document.querySelectorAll(this.imgBtnElName) as NodeListOf<HTMLButtonElement>
        artBtnList.forEach( (btn , i) => btn.addEventListener('click', (e : MouseEvent) => { this.openModal(i,e) }) )
    }

    // 
    // Open Modal Helpers
    // 

    generateModalHTML = (image: HTMLImageElement) => {
        return this.generateCloseButtonHTML() + this.generateScrollerHTML() + this.generateImageHTML()
    }

    generateCloseButtonHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl flex justify-end px-2">
                <button data-close-img-modal-button>
                    Close
                </button>
            </div>
        `
    }
    
    generateScrollerHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl bg-primary-50" data-img-modal-scroller>
                <div class="my-4 pb-2 mx-4 overflow-y-scroll flex justify-start gap-2 scrollbar" data-image-content>
                    ${imageList.map( (img, i: number) => (
                        `<button class="w-auto min-w-fit ${i !== this.currentImageIndex ? 'opacity-50' : ''}">
                            <img 
                                src="${img.src}"
                                class="h-[100px] w-auto rounded"
                            >
                        </button>`
                        ))}
                </div>
            </div>
        `

    }
    
    generateImageHTML = () : string => {
        return `
            <div data-img-modal-content class="mx-auto w-full max-w-6xl">
                <div class="img-modal-animation flex items-start overflow-y-scroll snap-mandatory snap-x scrollbar-hide" data-img-modal-content-scroller>

                    ${ imageList.map( (image, index) => (`
                        <div class="min-w-full grid lg:flex gap-4 lg:gap-12 items-center p-4 snap-center overflow-auto scrollbar">
                            <img 
                                src="${image.src}" 
                                width="${image.width}" 
                                height="${image.height}" 
                                alt="" 
                                class='rounded'
                                style='max-height:70vh; width: auto'
                                data-index="${index}"
                            >
                            <div>
                                <h2 data-img-modal-img-title class="text-4xl font-bold font-theme">
                                    ${image.title}
                                </h2>
                                <p data-img-modal-img-description>
                                    ${image.description}
                                </p>
                            </div>
                        </div>
                    `))}

                    
                </div>
            </div>
        `
    }

    addScrollerButtonEventListeners = () => {
        const buttons = document.querySelector('[data-img-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, i) => { 
            button.addEventListener('click', () => this.moveToImage(i) )
        })
    }

    showModalUI = (modalHTML: string) => {
        if( !this.modal ) return
        this.modal.insertAdjacentHTML('beforeend', modalHTML)
        this.modal.classList.remove('opacity-0', '-z-50')
        this.modal.classList.add('z-[9999]')
        document.querySelector('[data-close-img-modal-button]')?.addEventListener('click', this.closeModal)
        this.addScrollerButtonEventListeners()
    }

    isModalOpen = () => {
        return document.body.classList.contains('img-modal-is-open')
    }

    getClickedImage = (x: number, y:number) : HTMLImageElement | null => {
        const imgNodes = document.elementsFromPoint(x,y)
            .filter( el => el.tagName === 'IMG' ) as HTMLImageElement[]
        return imgNodes.length < 1 ? null : imgNodes[0]
    }

    // 
    // Close Modal Helpers
    // 
    
    hideModalUI = () => {
        if( !this.modal ) return
        this.modal.textContent = ''
        this.modal.classList.add('opacity-0', '-z-50')
        this.modal.classList.remove('z-[9999]')
    }

    // 
    // Modal State
    // 

    setIsModalOpen = (modalOpenState : boolean) => {
        document.body.classList.toggle('img-modal-is-open', modalOpenState)
    }

    // 
    // Gallery Navigation Helpers
    // 

    setCurrentImageIndex = (i: number) => {
        this.currentImageIndex = i
    }

    moveToImage = (i : number) => {

        this.setScrollerOpacities(i)
        const imgContent = document.querySelector('[data-img-modal-content]')
        if(!imgContent) return

        const imgContentWidth = imgContent.getBoundingClientRect().width

        const imgScroller = document.querySelector('[data-img-modal-content-scroller]') as HTMLDivElement
        imgScroller.scrollTo({
            left : imgContentWidth * i,
            behavior : 'smooth'
        })
    }

    setScrollerOpacities = (i : number) => {
        const buttons = document.querySelector('[data-img-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, index) => { 
            if( i === index) {
                button.classList.remove('opacity-50')
            } else {
                button.classList.add('opacity-50')
            }
        })
    }

    // getCurrent

    // 
    // Dev Helper Methods
    // 

    mockOpenModal = () => { // For Dev Use
        this.currentImageIndex = 0
        const modalHTML  = 
            this.generateCloseButtonHTML() +
            this.generateScrollerHTML() +
            this.generateImageHTML()

        this.showModalUI(modalHTML)
        this.setIsModalOpen(true)
    }
}