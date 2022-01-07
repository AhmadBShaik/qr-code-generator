function URLify(baseUrl, addr){
    return `${baseUrl}?source=${addr.split(' ').filter(word => word !== "" ).join('+')}`
}