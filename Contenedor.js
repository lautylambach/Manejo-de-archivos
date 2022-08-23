const fs= require('fs')

const pathToFile='./productos.txt'
class Contenedor{
    save= async (product)=>{
        //validation
        if(!product.title || !product.price) return {status:"error", message:"missing files"}
        try{
            if(fs.existsSync(pathToFile)){
                let data= await fs.promises.readFile(pathToFile,'utf-8')
                let products= JSON.parse(data)
                let id = products[products.length-1].id+1
                product.id=id
                products.push(product)
                await fs.promises.writeFile(pathToFile,JSON.stringify(products,null,2))
                return{status:"succes", message:`product created id:${id}`}
                                             
            }else{
                product.id = 1
                await fs.promises.writeFile(pathToFile,JSON.stringify([product],null,2))
                return{status:"succes",message:`product created id:${product.id}`}
            }
        } catch(err){
            return{status:"error",message: err.message}
        }
    }
    getAll =async()=>{
        if (fs.existsSync(pathToFile)){
            let data= await fs.promises.readFile(pathToFile,'utf-8')
            let products= JSON.parse(data)
            return{status:"success",message:products}
        }else{
            return{status:"error",message: err.message}
        }
    }

    getById = async(id)=>{
        //validation
        if(!id) return{status:"error", message:"id required"}
        if (fs.existsSync(pathToFile)){
            let data= await fs.promises.readFile(pathToFile,'utf-8')
            let products= JSON.parse(data)
            let product = products.find(product=> product.id === id)
            if (product)return {status:"succes", message:product}
            return{status:"error", message:null}
           
        }else{
            return{status:"error",message: err.message}
        }
    }
    updateProduct= async (id,updatedProduct)=>{
        //validation
        if(!id) return{status:"error", message:"id required"}
        if (fs.existsSync(pathToFile)){
            let data= await fs.promises.readFile(pathToFile,'utf-8')
            let products= JSON.parse(data)
            let newProduct =products.map(product =>{
                if (product.id === id){
                    updatedProduct.id=id
                    return updatedProduct
                }else return product
            })
            await fs.promises.writeFile(pathToFile,JSON.stringify(newProduct,null,2))
            return {status:"succes", message:"product Updated"}
           
        }else{
            return{status:"error",message: err.message}
        }
    }
    deleteById = async (id) => {
        //Validation
        if (!id) return {status: "error", message: "Id required"}
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let products = JSON.parse(data)
            let newProducts = products.filter(product => product.id !== id)
            await fs.promises.writeFile(pathToFile, JSON.stringify(newProducts, null, 2))
            return {status: "success", message: "product deleted"}
        } else {
            return {status: "error", message: err.message}
        }
    }
    deleteAll = async ()=>{
        if(fs.existsSync(pathToFile)){
            let newProducts = []
            await fs.promises.writeFile(pathToFile,JSON.stringify(newProducts, null,2))
            return{status:'success', message:'array deleted'}
        } else{
            return {status:'error', message:err.message}
        }
    }
}
module.exports = Contenedor