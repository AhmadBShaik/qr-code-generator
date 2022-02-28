function URLify(baseUrl, addr){
    let fullURL = baseUrl
    let relativeURL = ""

    for(let i=0; i< addr.length; i++){        
        const qmOrAmp = (!(baseUrl+relativeURL).includes('?')) ? '?' : '&'
        relativeURL += `${ qmOrAmp }source=${addr[i].split(' ').filter(word => word !== "" ).join('+')}`
    }
    
    fullURL += relativeURL
    return fullURL

}

function parentOfAddress(baseUrl){
    const decomposedUrl =  baseUrl.split('?')[0].split('/').filter(word => word !== "" )
    if (decomposedUrl.length == 0) return ""
    return decomposedUrl[decomposedUrl.length - 1]
}

function toIndividualAddresses(addr){
    const addressList = addr.split('|').filter(word => word !== "" )
    return addressList
}

module.exports = {URLify, parentOfAddress, toIndividualAddresses}
