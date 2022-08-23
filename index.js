const Contenedor = require('./Contenedor.js')
const manager = new Contenedor()

let product= {
    title:"monitor",
    price:'18000',
    thumbnail:'https://www.samsung.com/ar/monitors/flat/t35f-27-inch-ips-fhd-1080p-freesync-lf27t350fhlczb/'
    
}
manager.save(product)
//manager.getById(1)
//manager.getAll()
//manager.updateProduct(2,product)
//manager.deleteById(4)
//manager.deleteAll()
.then(result=> console.log(result))