import { imageList, type ArtImage } from './imageList';

export default class ArtModal {

    dataModalElName : string
    artBtnElName : string
    modal : HTMLDivElement | null
    currentImageIndex : number | null
    imageList : ArtImage[]

    constructor({ modal, artBtn } : { modal: string, artBtn: string }) {
        this.dataModalElName = modal
        this.artBtnElName = artBtn
        this.modal = null
        this.imageList = imageList
        this.currentImageIndex = null
    }

    init = () => {
        this.modal = document.querySelector(this.dataModalElName) as HTMLDivElement
        if(!this.modal) throw('Error: Modal Element not found')
        this.addArtButtonEventListeners()
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

    generateModalHTML = (image: HTMLImageElement) => {
        return this.generateCloseButtonHTML() + this.generateScrollerHTML() + this.generateImageHTML(image)
    }

    generateCloseButtonHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl flex justify-end px-2">
                <button data-close-art-modal-button>
                    Close
                </button>
            </div>
        `
    }
    
    generateScrollerHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl" data-art-modal-scroller>
                <div class="my-4 pb-2 mx-4 overflow-y-scroll flex justify-start gap-2 scrollbar">
                    ${imageList.map( (img, i: number) => (
                        `<button class="w-auto min-w-fit ${i !== this.currentImageIndex ? 'opacity-30' : ''}">
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

    generateImageHTML = (image : HTMLImageElement): string => {
        const {src, naturalWidth: width, naturalHeight: height} = image
        const {title, description, index}                       = image.dataset
        return `
            <div data-art-modal-content class="grid place-items-center">
                <div class="art-modal-animation">
                    <img 
                        src="${src}" 
                        width="${width}" 
                        height="${height}" 
                        alt="" 
                        class='rounded'
                        style='height:50vh; width: auto'
                        data-index="${index}"
                    >
                    <h2>${title}</h2>
                    <p>${description}</p>
                </div>
            </div>
        `
    }

    addScrollerEventListeners = () => {
        const buttons = document.querySelector('[data-art-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, i) => { 
            button.addEventListener('click', () => this.moveToImage(i) )
        })
    }
    
    addArtButtonEventListeners = () => {
        const artBtnList = document.querySelectorAll(this.artBtnElName) as NodeListOf<HTMLButtonElement>
        artBtnList.forEach( (btn , i) => btn.addEventListener('click', (e : MouseEvent) => { this.openModal(i,e) }) )
    }


    setCurrentImageIndex = (i: number) => {
        this.currentImageIndex = i
    }

    moveToImage = (i : number) => {
        this.setScrollerOpacities(i)
        this.swapImage(imageList[i])
    }

    setScrollerOpacities = (i : number) => {
        const buttons = document.querySelector('[data-art-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, index) => { 
            if( i === index) {
                button.classList.remove('opacity-30')
            } else {
                button.classList.add('opacity-30')
            }
        })
    }

    getCurrentImage = () => {
        return document.querySelector('[data-art-modal-content] img') as HTMLImageElement
    }

    swapImage(image: ArtImage) {
        const newImage  = document.createElement('img')
        newImage.src    = image.src
        newImage.width  = image.width
        newImage.height = image.height
        newImage.setAttribute('class', 'rounded')
        newImage.setAttribute('style', 'height:50vh; width: auto')
        newImage.dataset.title       = image.title
        newImage.dataset.description = image.description
        
        this.getCurrentImage().remove()
        document.querySelector('[data-art-modal-content]>div')?.insertAdjacentElement('afterbegin', newImage)
    }

    showModalUI = (modalHTML: string) => {
        if( !this.modal ) return
        this.modal.insertAdjacentHTML('beforeend', modalHTML)
        this.modal.classList.remove('opacity-0', '-z-50')
        this.modal.classList.add('z-[9999]')
        document.querySelector('[data-close-art-modal-button]')?.addEventListener('click', this.closeModal)
        this.addScrollerEventListeners()
    }

    hideModalUI = () => {
        if( !this.modal ) return
        this.modal.textContent = ''
        this.modal.classList.add('opacity-0', '-z-50')
        this.modal.classList.remove('z-[9999]')
    }

    isModalOpen = () => {
        return document.body.classList.contains('art-modal-is-open')
    }

    setIsModalOpen = (modalOpenState : boolean) => {
        document.body.classList.toggle('art-modal-is-open', modalOpenState)
    }

    getClickedImage = (x: number, y:number) : HTMLImageElement | null => {
        const imgNodes = document.elementsFromPoint(x,y)
            .filter( el => el.tagName === 'IMG' ) as HTMLImageElement[]
        return imgNodes.length < 1 ? null : imgNodes[0]
    }

    mockOpenModal = () => { // For Dev Use
        this.currentImageIndex = 0
        const image = document.querySelector('[data-art-button]>img') as HTMLImageElement
        const modalHTML  = 
            this.generateCloseButtonHTML() +
            this.generateScrollerHTML() +
            this.generateImageHTML(image)

        this.showModalUI(modalHTML)
        this.setIsModalOpen(true)
    }
}