const addBtn = document.getElementById("add_btn")

const submitBtn = document.getElementById("submit_btn")
const downloadBtn = document.getElementById("download_btn")

const addressList = []
const completeURLList = []

addBtn.addEventListener('click',() => {

    const baseURL = (document.getElementById('base_url').value).trim()
    const address = (document.getElementById('address').value).trim()
    const baseURLMessage = document.getElementById("base_url_message")
    const addressMessage = document.getElementById("address_message")
    
    const addressInputTag = document.getElementById("address")
    
    const url = URLify(baseURL, toIndividualAddresses(address))
    if(baseURL !== "" && !(baseURL.includes(" ")) && address !== "" && !(completeURLList.includes(url))){
        
        completeURLList.push(url)
        // console.log()


        addressList.push(
            url.split("?")[1].split('source=')
                .filter(word => word!=="")
                .map(word => word.replace("&",""))
                .map(word => word.split("+").join(" "))
                .join(" | ")
            )
            
        addressMessage.innerText = ""
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
            addressMessage.innerText = "Address already exists!"
            addressInputTag.focus()
        }
        
    }
    
    updateUI()
})
function updateUI(){
    const submitBtn = document.getElementById('submit_btn')
    if(addressList.length > 0){
        submitBtn.style.display = "block"
        document.getElementById("separator").style.display = "block"

    }else{
        submitBtn.style.display = "none"
        document.getElementById("separator").style.display = "none"
    }

    const rootElement = document.getElementById('address_list')
    rootElement.innerHTML = ""
    
    for(let i=0;i < addressList.length; i++){

        const card = document.createElement('div')
        const content = document.createElement('div')
        const action_btns = document.createElement('div')
        const view_qr_btn_wrapper = document.createElement('div')
        const edit_delete_btn_wrapper = document.createElement('div')
        // const view_qr_btn = document.createElement('button')
        const edit_btn = document.createElement('button')
        const delete_btn = document.createElement('button')

        
        rootElement.appendChild(card)
        card.classList.add('card')
        content.classList.add('card-content')
        
        card.appendChild(content)
        
        card.appendChild(action_btns)
        action_btns.classList.add('action_btns')

        
        content.innerHTML = addressList[i].split('|').join(',\n')

        
        action_btns.appendChild(view_qr_btn_wrapper)
        action_btns.appendChild(edit_delete_btn_wrapper)
        


        // view_qr_btn_wrapper.appendChild(view_qr_btn)
        // view_qr_btn.innerHTML = "View QR Code"
        // view_qr_btn.innerHTML = ""
        // view_qr_btn.classList.add('btn')
        // view_qr_btn.classList.add('view_qr_btn')


        edit_delete_btn_wrapper.appendChild(edit_btn)
        
        edit_btn.innerHTML = "Edit"
        edit_btn.classList.add('btn')
        edit_btn.classList.add('edit_btn')

        edit_delete_btn_wrapper.appendChild(delete_btn)
        
        delete_btn.innerHTML = "Delete"
        delete_btn.classList.add('btn')
        delete_btn.classList.add('delete_btn')


        // view_qr_btn.addEventListener('click',()=>{
        //     // console.log(i)
        // })



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
            backBtn.classList.add("back_btn")
            changeBtn.innerHTML = "change"
            changeBtn.classList.add("btn")
            changeBtn.classList.add("change_btn")

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
                
                const baseURL = (document.getElementById('base_url').value).trim().split('?')[0]
                const address = (inputTag.value).trim()

                const url = URLify(baseURL, toIndividualAddresses(address))

                if(address === "" ){
                    inputMessage.innerText = "*This field is required"
                }else if(completeURLList.includes(url) && url !== completeURLList[i] ){
                    inputMessage.innerText = "Address already exists!"
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
        const community = document.createElement('p')
        
        community.innerText = parentOfAddress(completeURLList[i])
        community.style.textDecoration = "underline"
        community.style.color = "#f005ff"

        canvasAddress.innerText = addressList[i].split("|").join("\n")
        canvasAddress.style.color = "#0488f1"

        canvasCard.classList.add('card')
        
        const canvas = document.createElement('canvas')
        canvas.id = completeURLList[i]
        canvas.style.margin = "auto"
        
 
        canvasAddress.style.textAlign = "center"
        community.style.textAlign = "center"
        
        canvasCard.appendChild(canvas)
        canvasCard.appendChild(community)
        canvasCard.appendChild(canvasAddress)
        
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


downloadBtn.addEventListener('click', () => {
    for(let c in completeURLList){

        // console.log(canv)
        const image = document.getElementById(completeURLList[c]).toDataURL('image/png')
        // console.log(image)
        // console.log(addressList[c])

        const fileName = addressList[c]
        const canv = document.createElement("a");
        canv.setAttribute("href", image);
        canv.setAttribute("download", fileName);
        document.body.appendChild(canv);
        canv.click();
        canv.remove();
    }
})