function URLify(baseUrl, addr){
    return `${baseUrl}=${addr.split(' ').filter(word => word !== "" ).join('+')}`
}