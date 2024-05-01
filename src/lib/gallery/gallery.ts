import debounce from 'lodash.debounce'
import type { Image } from '../api/image'

/**
 * 
 * @class Gallery
 * @description Image Gallery with slider/modal
 * 
 * ------- Main Methods
 * @method init()
 * @method open()
 * @method close()
 * 
 * ------- Init methods
 * @method addImgClickEventListeners()
 * @method addModalScrollEventListeners()
 * @method generateImgList()
 * 
 * ------- Open modal methods
 * @method ModalHTML()
 * @method addScrollerClickEventListeners()
 * @method showModalUI()
 * @method getClickedImage()
 * 
 * ------- Close modal methods
 * @method hideModalUI()
 * 
 * ------- Modal State
 * @method isModalOpen()
 * @method setIsModalOpen()
 * 
 * ------- Gallery navigation methods
 * @method setCurrentImageIndex()
 * @method scrollToImage()
 * @method setScrollerImageOpacities()
 * 
 * ------- Tag methods
 * @method generateTags()
 * @method showTags()
 * @method addTagButtonEventListeners()
 * @method showCurrentTaggedImgs()
 * @method TagButtonHTML()
 * 
 * ------- HTML Components
 * @method CloseButtonHTML()
 * @method ScrollerHTML()
 * @method ImageHTML()
 * 
 * ------- Dev Methods
 * @method mockOpenModal()
 * 
 */

export default class Gallery {

    dataModalElName   : string
    imgBtnElName      : string
    modal             : HTMLDivElement | null
    currentImageIndex : number | null
    imgList           : Image[]
    tagList           : Set<string>

    constructor() {
        this.dataModalElName = '[data-art-modal]'
        this.imgBtnElName = '[data-art-button]'
        this.modal = null
        this.currentImageIndex = null
        this.imgList = []
        this.tagList = new Set
    }

    // 
    // Main Methods
    // 

    init = () => {
        this.imgList = this.generateImgList()
        this.modal = document.querySelector(this.dataModalElName) as HTMLDivElement
        this.addImgClickEventListeners()
        this.tagList = this.generateTags()
        this.showTags()
    }

    open = (i: number, e: MouseEvent) => {
        if( this.isModalOpen() ) return

        const clickedImage = this.getClickedImage(e.clientX, e.clientY)
        if( !clickedImage ) return
        const clickedImageIndex = Number(clickedImage.dataset.index)
        
        this.setCurrentImageIndex(i)
        this.showModalUI( this.ModalHTML() )
        this.setIsModalOpen(true)
        this.scrollToImage(clickedImageIndex, 'instant')
        this.addModalScrollEventListeners()
    }

    close = () => {
        this.hideModalUI()
        this.setIsModalOpen(false)
    }

    // 
    // Init Helpers
    // 
        
    addImgClickEventListeners = async () => {
        const imgBtnList = document.querySelectorAll(this.imgBtnElName) as NodeListOf<HTMLButtonElement>
        imgBtnList.forEach( (btn , i) => {
            btn.addEventListener('click', (e : MouseEvent) => { this.open(i,e) }) 
        })
    }
    
    addModalScrollEventListeners = () => {
        const imgModal = document.querySelector('[data-img-modal-content-scroller]') as HTMLDivElement
        const imgList =  Array.from ( imgModal.children )

        imgModal?.addEventListener('scroll', debounce( (e) => {

            const imgCurrentlyInViewport = imgList.sort( (a, b) : number => {
                const aLeft = a.getBoundingClientRect().left
                const bLeft = b.getBoundingClientRect().left
                if ( Math.abs(aLeft) < Math.abs(bLeft) ) return -1
                if ( Math.abs(aLeft) > Math.abs(bLeft) ) return 1
                return 0
            })[0]
            
            const imgCurrentlyInViewportIndex = Number( imgCurrentlyInViewport.querySelector('img')?.dataset.index )
            this.setScrollerImageOpacities(imgCurrentlyInViewportIndex)
        }, 50))
    }

    generateImgList = () => {
        const btnList = Array.from( document.querySelectorAll(this.imgBtnElName) )
        return btnList.map( btn => {
            const imageEL = btn.querySelector('img')
            const image   = {
                url    : imageEL?.getAttribute('src'),
                width  : Number( imageEL?.getAttribute('width') ),
                height : Number (imageEL?.getAttribute('height' ))
            }
            const description = imageEL?.dataset.description || ''
            const title       = imageEL?.dataset.title || ''
            const tags        = JSON.parse(imageEL?.dataset.tags || '') || []
            const isSpicy     = imageEL?.dataset.isspicy
            return { image, title, description, tags, isSpicy }
        } ) as Image[]
    }


    // 
    // Open Modal Helpers
    // 

    ModalHTML = () => {
        return this.CloseButtonHTML() + this.ScrollerHTML() + this.ImageHTML()
    }

    addScrollerClickEventListeners = () => {
        const buttons = document.querySelector('[data-img-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, i) => { 
            button.addEventListener('click', () => this.scrollToImage(i) )
        })
    }

    showModalUI = (modalHTML: string) => {
        if( !this.modal ) return
        this.modal.insertAdjacentHTML('beforeend', modalHTML)
        this.modal.classList.remove('opacity-0', '-z-50')
        this.modal.classList.add('z-[9999]')
        document.querySelector('[data-close-img-modal-button]')?.addEventListener('click', this.close)
        this.addScrollerClickEventListeners()
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
    
    isModalOpen = () => {
        return document.body.classList.contains('img-modal-is-open')
    }

    setIsModalOpen = (modalOpenState : boolean) => {
        document.body.classList.toggle('img-modal-is-open', modalOpenState)
    }

    // 
    // Gallery Navigation Helpers
    // 

    setCurrentImageIndex = (i: number) => {
        this.currentImageIndex = i
    }

    scrollToImage = (i : number, scroll : 'smooth' | 'instant' = 'smooth') => {
        // If i < 0, the modal will scroll to the first image, which isn't what we want
        if( i < 0 ) return 

        this.setScrollerImageOpacities(i)
        const imgContent = document.querySelector('[data-img-modal-content]')
        if(!imgContent) return

        const imgContentWidth = imgContent.getBoundingClientRect().width

        const imgScroller = document.querySelector('[data-img-modal-content-scroller]') as HTMLDivElement
        imgScroller.scrollTo({
            left : imgContentWidth * i,
            behavior : scroll
        })

    }

    setScrollerImageOpacities = (currentImage : number) => {
        const buttons = document.querySelector('[data-img-modal-scroller]')?.querySelectorAll('button') as NodeListOf<HTMLButtonElement>
        buttons.forEach( (button, index) => { 
            if( currentImage === index) {
                button.classList.remove('opacity-50')
            } else {
                button.classList.add('opacity-50')
            }
        })
    }

    // 
    // Tags
    // 

    generateTags = () => {
        const tagList = this.imgList.map( img => img.tags ).flat()
        return new Set(tagList)
    }

    showTags = () => {
        const tagEl = document.querySelector('[data-gallery-tags]')
        let tags = this.TagButtonHTML('All', true)
        this.tagList.forEach(tag => {
            tags += this.TagButtonHTML(tag)
        })
        tagEl?.insertAdjacentHTML('beforeend', tags)
        this.addTagButtonEventListeners()
    }

    addTagButtonEventListeners = () => {
        const tagBtns = document.querySelectorAll('[data-gallery-tag-button]')
        const imgBtnList = document.querySelectorAll(this.imgBtnElName) as NodeListOf<HTMLButtonElement>

        tagBtns.forEach( btn => btn.addEventListener('click', () => {

            tagBtns.forEach(btn => btn.classList.remove('bg-primary-100'))
            btn.classList.add('bg-primary-100')

            const tag =  btn.textContent?.trim() || ''

            this.showCurrentTaggedImgs(imgBtnList, tag)
        }))
    }

    showCurrentTaggedImgs = (BtnList : NodeListOf<HTMLButtonElement>, tag : string) => {
        BtnList.forEach( (btn, i) => {
            btn.classList.remove('hidden')

            if( tag === 'All') {
                return
            }
            
            if( !this.imgList[i].tags.includes(tag)) {
                btn.classList.add('hidden')
            }
        })
    }

    TagButtonHTML = (tag : string, isCurrent : boolean = false) => {
        return `
            <button 
                data-gallery-tag-button
                class="block px-2 py-0 hover:bg-primary-200 text-base rounded border border-primary-200 font-medium text-primary-500 ${isCurrent ? 'bg-primary-100' : ''}"
            >
                ${tag}
            </button>
        `
    }

    // 
    // HTML Components
    // 
    
    CloseButtonHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl flex justify-end px-2">
                <button class="flex items-center gap-2 px-4 py-2 rounded-md bg-primary-500 hover:bg-primary-700 text-primary-50 uppercase font-bold" data-close-img-modal-button>
                    Close
                    <svg width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.21875 22.3507C2.97711 21.1515 1.98675 19.7171 1.30543 18.131C0.624111 16.545 0.26549 14.8391 0.250491 13.113C0.235491 11.3868 0.564413 9.675 1.21806 8.07734C1.87172 6.47969 2.83701 5.02822 4.05761 3.80761C5.27822 2.58701 6.72969 1.62172 8.32734 0.968065C9.925 0.314413 11.6368 -0.0145088 13.363 0.000490838C15.0891 0.0154904 16.795 0.374111 18.381 1.05543C19.9671 1.73675 21.4015 2.72711 22.6007 3.96875C24.9688 6.42058 26.2791 9.7044 26.2495 13.113C26.2199 16.5215 24.8527 19.7821 22.4424 22.1924C20.0321 24.6027 16.7715 25.9699 13.363 25.9995C9.9544 26.0291 6.67058 24.7188 4.21875 22.3507ZM6.05175 20.5177C8.00321 22.4692 10.65 23.5655 13.4097 23.5655C16.1695 23.5655 18.8163 22.4692 20.7677 20.5177C22.7192 18.5663 23.8155 15.9195 23.8155 13.1597C23.8155 10.4 22.7192 7.75321 20.7677 5.80175C18.8163 3.85028 16.1695 2.75396 13.4097 2.75396C10.65 2.75396 8.00321 3.85028 6.05175 5.80175C4.10028 7.75321 3.00396 10.4 3.00396 13.1597C3.00396 15.9195 4.10028 18.5663 6.05175 20.5177ZM18.9217 9.48075L15.2427 13.1597L18.9217 16.8387L17.0887 18.6717L13.4097 14.9927L9.73075 18.6717L7.89775 16.8387L11.5767 13.1597L7.89775 9.48075L9.73075 7.64775L13.4097 11.3267L17.0887 7.64775L18.9217 9.48075Z" fill="#FFE6F1"/>
                    </svg>
                </button>
            </div>
        `
    }
    
    ScrollerHTML = () => {
        return `
            <div class="mx-auto w-full max-w-6xl bg-primary-50" data-img-modal-scroller>
                <div class="my-4 pb-2 mx-4 overflow-y-scroll flex justify-start gap-1 scrollbar" data-image-content>
                    ${this.imgList.map( (art, i: number) => (
                        `<button class="w-auto min-w-fit ${i !== this.currentImageIndex ? 'opacity-50' : ''}">
                            <img 
                                src="${art.image.url}"
                                class="h-[80px] w-auto rounded"
                            />
                        </button>`
                    )).join('')}
                </div>
            </div>
        `
    }
    
    ImageHTML = () : string => {
        return `
            <div data-img-modal-content class="mx-auto w-full max-w-6xl">
                <div class="img-modal-animation flex items-start overflow-auto snap-mandatory snap-x scrollbar-hide" data-img-modal-content-scroller>

                    ${ this.imgList.map( (art, index) => (`
                        <div class="min-w-full grid lg:flex gap-4 lg:gap-12 items-start p-4 snap-center">
                            <img 
                                src="${art.image.url}" 
                                width="${art.image.width}" 
                                height="${art.image.height}" 
                                alt="" 
                                role="presentation"
                                class='rounded max-h-[60vh] w-auto lg:max-w-[50%] justify-self-center '
                                data-index="${index}"
                            >
                            <div>
                                <h2 data-img-modal-img-title class="text-2xl font-semibold font-theme mb-4">
                                    ${art.title}
                                </h2>
                                <p class="text-base" data-img-modal-img-description>
                                    ${art.description}
                                </p>
                            </div>
                        </div>
                    `))}

                    
                </div>
            </div>
        `
    }

    // 
    // Dev Helper Methods
    // 

    mockOpenModal = () => { 
        this.currentImageIndex = 0
        const modalHTML  = 
            this.CloseButtonHTML() +
            this.ScrollerHTML() +
            this.ImageHTML()

        this.showModalUI(modalHTML)
        this.setIsModalOpen(true)
    }
}