const formatCurrency = (amount:number) => {
    return new Intl.NumberFormat('en-US',{
        style:'currency', currency:'USD'
    }).format(amount)
}

const toBoolean = (str:string) => {
    return str.toLowerCase() === 'true'
}

const getImagePath = (imagePath: string) => {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'

    if(imagePath.startsWith(cloudinaryBaseUrl)){
        return imagePath
    }else{
        return `/products/${imagePath}.jpg`
    }
}

export { 
    formatCurrency,
    toBoolean,
    getImagePath
}