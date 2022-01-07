const addBtn = document.getElementById("add_btn")

const submitBtn = document.getElementById("submit_btn")

const addressList = []
const completeURLList = []

addBtn.addEventListener('click',() => {

    const baseURL = (document.getElementById('base_url').value).trim()
    const address = (document.getElementById('address').value).trim()
    const baseURLMessage = document.getElementById("base_url_message")
    const addressMessage = document.getElementById("address_message")
    
    
    const url = URLify(baseURL, address)
    if(baseURL !=="" && !(baseURL.includes(" ")) && address !== "" && !(completeURLList.includes(url))){
        
        completeURLList.push(url)
        addressList.push(address)
        addressMessage.innerText = ""
        const addressInputTag = document.getElementById("address")
        addressInputTag.value = ""
        addressInputTag.focus()        
        
    }else{
        
        if(baseURL === ""){
            baseURLMessage.innerText = "*This field is required"
        }else if(baseURL.includes(" ")){
            baseURLMessage.innerText = "Base URL should not contain spaces"
        }else{
            baseURLMessage.innerText = ""
        }
        
        if(address === ""){
            addressMessage.innerText = "*This field is required"
        }else if(completeURLList.includes(url)){
            addressMessage.innerText = "already exists!"
        }
        
    }
    
    updateUI()
})
function updateUI(){
    const submitBtn = document.getElementById('submit_btn')
    if(addressList.length > 0){
        submitBtn.style.display = "block"
    }

    const rootElement = document.getElementById('address_list')
    rootElement.innerHTML = ""
    
    for(let i=0;i < addressList.length; i++){

        const card = document.createElement('div')
        const content = document.createElement('div')
        const action_btns = document.createElement('div')
        const view_qr_btn_wrapper = document.createElement('div')
        const edit_delete_btn_wrapper = document.createElement('div')
        const view_qr_btn = document.createElement('div')
        const edit_btn = document.createElement('div')
        const delete_btn = document.createElement('div')

        
        rootElement.appendChild(card)
        card.classList.add('card')

        
        card.appendChild(content)
        card.appendChild(action_btns)
        action_btns.classList.add('action_btns')

        
        content.innerHTML = addressList[i]

        
        action_btns.appendChild(view_qr_btn_wrapper)
        action_btns.appendChild(edit_delete_btn_wrapper)
        


        view_qr_btn_wrapper.appendChild(view_qr_btn)
        // view_qr_btn.innerHTML = "View QR Code"
        view_qr_btn.innerHTML = ""
        view_qr_btn.classList.add('btn')
        view_qr_btn.classList.add('view_qr_btn')


        edit_delete_btn_wrapper.appendChild(edit_btn)
        
        edit_btn.innerHTML = "Edit"
        edit_btn.classList.add('btn')
        edit_btn.classList.add('edit_btn')

        edit_delete_btn_wrapper.appendChild(delete_btn)
        
        delete_btn.innerHTML = "Delete"
        delete_btn.classList.add('btn')
        delete_btn.classList.add('delete_btn')


        view_qr_btn.addEventListener('click',()=>{
            // console.log(i)
        })



        edit_btn.addEventListener('click',()=>{
            const inputMessage = document.createElement('div')
            const inputTag = document.createElement('input')
            const back_change_btn_wrapper = document.createElement('div')
            const backBtn = document.createElement('div')
            const changeBtn = document.createElement('div')
            
            back_change_btn_wrapper.classList.add('action_btns')

            inputMessage.classList.add('edit_input_message')
            backBtn.innerHTML = "back"
            backBtn.classList.add("btn")
            changeBtn.innerHTML = "change"
            changeBtn.classList.add("btn")

            inputTag.classList.add('form-control')
            const contentHTML = content.innerHTML
            content.innerHTML = ""
            inputTag.value = addressList[i]
            
            content.appendChild(inputMessage)
            content.appendChild(inputTag)
            content.appendChild(back_change_btn_wrapper)
            back_change_btn_wrapper.appendChild(backBtn)
            back_change_btn_wrapper.appendChild(changeBtn)
            
            action_btns.style.display = "none"

            backBtn.addEventListener('click',() => {
                content.removeChild(inputTag)
                content.removeChild(back_change_btn_wrapper)
                content.innerHTML = contentHTML
                action_btns.style.display = "flex"
                
                
            })

            changeBtn.addEventListener('click',() => {
                
                const baseURL = (document.getElementById('base_url').value).trim()
                const address = (inputTag.value).trim()

                const url = URLify(baseURL, address)
                
                if(completeURLList.includes(url) && url !== completeURLList[i] ){
                    inputMessage.innerText = "already exists!"
                }else{
                    addressList[i] = inputTag.value
                    completeURLList[i] = url
                    content.removeChild(inputTag)
                    content.removeChild(back_change_btn_wrapper)
                    content.innerHTML = contentHTML
                    action_btns.style.display = "flex"
                    updateUI()
                }
            })

        })

        delete_btn.addEventListener('click',()=>{
            addressList.splice(i,1)
            completeURLList.splice(i,1)
            updateUI()
        })
    }

}

submitBtn.addEventListener('click',() => {
    const inputView = document.getElementById("input_view")
    const outputView = document.getElementById("output_view")
    outputView.style.display = "block"
    inputView.style.display = "none"


    for(let i=0;i<completeURLList.length;i++){
        
        const canvasCard = document.createElement('div')
        const canvasAddress = document.createElement('p')
        const canvasLink = document.createElement('a')

        canvasLink.innerText = "Visit Site"
        canvasAddress.innerText = addressList[i]

        canvasCard.classList.add('card')
        
        const canvas = document.createElement('canvas')
        canvas.style.margin = "auto"
        
        canvasLink.style.textAlign = "center"
        canvasLink.classList.add('link')
        canvasLink.href = completeURLList[i]
        canvasLink.target="_blank"
        canvasAddress.style.textAlign = "center"
        
        canvasCard.appendChild(canvas)
        canvasCard.appendChild(canvasAddress)
        canvasCard.appendChild(canvasLink)
        
        outputView.children[0].appendChild(canvasCard)
        
        QRCode.toCanvas(canvas,completeURLList[i],(error) => {
            if(error) console.error("An error encountered with generating qrcode!");
            // console.log("success")
        })
    }

    const backToHomeBtn = document.getElementById("back_to_home")

    backToHomeBtn.addEventListener('click',() => {
        outputView.style.display = "none"
        inputView.style.display = "block"
        outputView.children[0].innerHTML = ""
            
    })

})