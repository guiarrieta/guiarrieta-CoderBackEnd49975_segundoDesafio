
const fs = require('fs')


class ProductManager{

    constructor(path){
        this.path=path
        this.productos=[]
    }

    getProducts(){
        if(fs.existsSync(this.path)){
            return JSON.parse(fs.readFileSync(this.path,'utf-8'))
        } else {
            console.log(`No existe el archivo ${this.path}`)
            return []
        }
    }

    getProductById(id){
        // obtengo todos los productos
        let productos=this.getProducts()
         // chequeo si exite el producto
        let indice=productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            return `No se encontró el producto con id ${id}`
        }
        return productos[indice] 
    }

    addProduct(title,description,price,thumbnail,code,stock){
        // obtengo todos los productos
        let productos=this.getProducts()
        // chequeo si exite el producto con codigo solicitado
        let existe=productos.findIndex(producto=>producto.code===code)
        if(existe!=-1){
            console.log(`Ya existe un producto con codigo ${code}. No se pudo agregar producto solicitado`)
            return 
        }

        // genero nuevo id para el nuevo producto
        let id=1
        if(productos.length>0){
            id=productos[productos.length-1].id + 1
        } 
        
        // creo nuevo producto
        let nuevoProducto={
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        // sobreescribo el archivo con el nuevo producto
        productos.push(nuevoProducto)
        fs.writeFileSync(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se agrego producto con exito. Id: ${id}.`)
    }

    deleteProduct(id){
        //borra un producto por id

        // obtengo todos los productos
        let productos=this.getProducts()
         // chequeo si exite el producto con codigo solicitado
        let existe=productos.findIndex(producto=>producto.id === id)
        if(existe===-1){
            console.log(`No existe un producto con id ${id}. No se pudo borrar producto solicitado`)
            return 
        }
            // borro el producto
        productos.splice(existe,1)
        fs.writeFileSync(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se borro producto con exito. code: ${id}.`)
    }

    modifyProduct(id,argumentos){
        // Modifica un producto por id (no se puede modificar id)
        // se ingresa:
        // id : id del producto a modificar 
        // argumentos: objetos con clave = atributo a modificar ; valor: nuevo valor del atributo a modificar


        // obtengo todos los productos
        let productos=this.getProducts()
        // chequeo si exite el producto
        let indice=productos.findIndex(producto=>producto.id===id)
        if(indice===-1){
            console.log(`No se encontró el producto con id ${id}. No se pudo modificar producto solicitado`)
        return 
        }
        let productoMod = productos[indice]
        for (let clave in argumentos) {
            if (argumentos.hasOwnProperty(clave)) {
                if (clave !== id && argumentos[clave] !== undefined && argumentos[clave] !== null) {
                    productoMod[clave] = argumentos[clave];
                }
            }
        }
        // sobreescribo el archivo con el producto modificado
        productos[indice]=productoMod
        fs.writeFileSync(this.path,JSON.stringify(productos, null, '\t'))
        console.log(`Se modifico producto con exito. Id: ${id}.`)
        return 
    }
} 







// se crea el objeto para almacenar los proiductos
let pm = new ProductManager("./productos.txt")

// se imprime el objeto original
console.log(pm.getProducts())

// se agraga primer producto de prueba
pm.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)

// se agraga otro producto de prueba
pm.addProduct("producto prueba2","Este es el segundo producto de prueba",300,"Sin imagen 2","cba321",20)

// se muestra objeto con los productos creados
console.log(pm.getProducts())


// se muestra producto por id
console.log(pm.getProductById(1))

// se intenta agregar producto con codigo existente
pm.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)

// se intenta visualizar producto con id inexistente
console.log(pm.getProductById(3))


// se imodifica stock de un producto y codigo de un producto
pm.modifyProduct(2,{"stock":23,"code":"cba3212"})

// se muestra objeto con los productos creados
console.log(pm.getProducts())

// se borra producto con id
pm.deleteProduct(1)

// se muestra objeto con los productos creados
console.log(pm.getProducts())
