
export default class ArtModal {

    dataModalElName : string
    dataModalContentElName : string
    artBtnElName : string
    closeModalBtnElName : string

    modal : HTMLDivElement | null
    modalContent : HTMLDivElement | null


    constructor({
        modal, 
        modalContent,
        artBtn,
        closeModalBtn
    } : {
        modal: string, 
        modalContent: string
        artBtn: string
        closeModalBtn: string
    }) {
        this.dataModalElName = modal
        this.dataModalContentElName = modalContent
        this.artBtnElName = artBtn
        this.closeModalBtnElName = closeModalBtn
        this.modal = null
        this.modalContent = null
    }

    init = () => {
        this.modal 	      = document.querySelector(this.dataModalElName) as HTMLDivElement
        this.modalContent = document.querySelector(this.dataModalContentElName) as HTMLDivElement

        if(!this.modal || !this.modalContent) throw('Error: Modal or ModalContent Element was not found')

        const artBtnList = Array.from( document.querySelectorAll(this.artBtnElName) ) as HTMLButtonElement[]
        artBtnList.forEach( () => addEventListener('click', this.openModal) )

        const closeModalBtn = document.querySelector(this.closeModalBtnElName) as HTMLButtonElement
        closeModalBtn.addEventListener('click', this.closeModal)
    }

    openModal = (e: MouseEvent) => {
        if (! (e.target instanceof HTMLElement) ) return

        if( this.isModalOpen() ) return

        const image = this.getClickedImage(e.clientX, e.clientY)
        if( !image ) return

        const modalHTML = this.generateModalHTML(image)
        this.showModalUI(modalHTML)

        this.setIsModalOpen(true)

    }

    closeModal = () => {
        this.hideModalUI()
        this.setIsModalOpen(false)
    }

    generateModalHTML = (image : HTMLImageElement): string => {
        const {src, naturalWidth: width, naturalHeight: height} = image
        const {title, description} = image.dataset

        return `
            <div class="art-modal-animation">
                <img 
                    src="${src}" 
                    width="${width}" 
                    height="${height}" 
                    alt="" 
                    class='rounded'
                    style='height:50vh; width: auto'
                >
                <h2>${title}</h2>
                <p>${description}</p>
            </div>
        `
    }

    showModalUI = (modalHTML: string) => {
        if(!this.modal || !this.modalContent) return
        this.modalContent.insertAdjacentHTML('beforeend', modalHTML)
        this.modal.classList.remove('opacity-0', '-z-50')
        this.modal.classList.add('z-[9999]')
    }

    hideModalUI = () => {
        if(!this.modal || !this.modalContent) return
        this.modalContent.textContent = ''
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
}