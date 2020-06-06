loadProducts = function () {

    document.querySelector('#contadorCarrito').innerHTML = this.contadorProductos().length;
    const almacen = document.querySelector('#tab1');

    //recibe la data en formato json desde la api
    fetch('/api/products')
        .then(data => data.json())
        .then(async data => {
            const array = JSON.parse(data);
            var inicio = "<div class=\"products-slick\" data-nav=\"#slick-nav-1\" id=\"unicoProducto\">";
            //console.log(array);
            for (let i = 0; i < array.length; i++) {
                //console.log(array);
                //inicio de la nueva iteracion htmL
                inicio += "<div class = \"col-md-4\">";
                inicio += "<form id= producto" + array[i].id + ">"
                inicio += "<div class=\"product\">"
                inicio += "<div class=\"product-img\">"
                inicio += "<img src=" + array[i].imgdir + " height=\"400\"" + ">"
                inicio += "</div>"
                inicio += "<div class=\"product-body\">"
                inicio += "<h7 class=\"product-category\"style=\"visibility: hidden\">" + array[i].id + "</h7>"
                inicio += "<h3 class=\"product-name\">" + array[i].nombre + "</h3>"
                inicio += "<h4 class=\"product-price\">$" + array[i].precio + "</h4>"
                inicio += "<div class=\"product-btns\">"
                inicio += "<button class=\"add-to-wishlist\">" + "<i class=\"fa fa-heart-o\"></i>" + "<span class=\"tooltipp\">" + "Agregar a deseados" + "</span>" + "</button>"
                inicio += "<button class=\"quick-view\">" + "<i class=\"fa fa-eye\"></i>" + "<span class=\"tooltipp\">" + "Vista previa" + "</span>" + "</button>"
                inicio += "</div>"
                inicio += "</div>"
                inicio += "<div class=\"add-to-cart\">"
                inicio += "<button id=agregar class=\"add-to-cart-btn\" type=\"submit\">" + "<i class=\"fa fa-shopping-cart\"></i>" + " Agregar al carro" + "</button>"
                inicio += "</div>"
                inicio += "</div>"
                inicio += "</form>"
                inicio += "</div>"


            }
            inicio += "</div>";

            almacen.innerHTML = inicio;
            //console.log(terminado);
        })
}

loadCart = () => {
    var almacen = document.querySelector('#contenedorProductos')
    document.querySelector('#miniCarro').addEventListener('click', (e) => {
        e.preventDefault()
        var array = contadorProductos()

        var inicio = "<div class=\"cart-list\">"

        for (let i = 0; i < array.length; i++) {

            var producto = JSON.parse(array[i])
            inicio += "<form>"
            inicio += "<div class=\"product-widget\">"
            inicio += "<div class=\"product-img\">"
            inicio += "<img src= >"
            inicio += "</div>"
            inicio += "<div class=\"product-body\">"
            inicio += "<h3 class=\"product-name\">" + producto.nombre + "</h3>"
            inicio += "<h4 class=\"product-price\">" + "<span id=cantidad class=\"qty\">" + producto.cantidad + ' X' + "</span>" + producto.precio + "</h4>"
            inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
            inicio += "</div>"
            inicio += "<button type=submit class=\"delete\">" + "<i class=\"fa fa-close\"></i>" + "</button>"
            inicio += "</div>"
            inicio += "</form>"
        }
        inicio += "<div class=\"cart-summary\">"
        inicio += "<small>Productos Totales: " + array.length + "</small>"
        inicio += "<h5>SUBTOTAL: $ " + subtotal(array) + "</h5>"
        inicio += "</div>"
        inicio += "<div class=\"cart-btns\">"
        inicio += "<a href=\"#\">View Cart</a>"
        inicio += "<a href=\"/orden\">" + "Checkout " + "<i class=\"fa fa-arrow-circle-right\"></i>" + "</a>"
        inicio += "</div>"
        inicio += "</form>"
        almacen.innerHTML = inicio
    })

    function subtotal(array) {
        var subtotal = 0
        var products = new Array()
        for (let i = 0; i < array.length; i++) {
            products.push(JSON.parse(array[i]))
            var precio = products[i].precio
            precio = precio.replace(/,/g, "")
            var precio2 = parseInt(precio.substr(1, precio.length))
            subtotal += products[i].cantidad * precio2
        }
        return subtotal
    }
}

agregar = () => {
    const productoSeleccionado = document.getElementById('tab1');
    productoSeleccionado.addEventListener('submit', (e) => {
        e.preventDefault()
        //captura el formulario que contiene el producto especifico
        var htmlProduct = e.target
        //convierte el producto seleccionado de HTML a un Object
        var objectProduct = htmlToObject(htmlProduct)
        //agrega producto a LocalStorage
        pushToCart(objectProduct, htmlProduct.querySelector('h7').textContent)
        document.querySelector('#contadorCarrito').innerHTML = contadorProductos().length;// actualiza el contador 
    })
    //FUNCIONES NECESARIAS OARA EJECUTAR AGREGAR
    function pushToCart(product, id) {
        var infoLs = contadorProductos()
        var arrayLs = new Array //este array contiene toda la data del ls
        var setLS = new Array //este array contiene toda la info nueva que se va a setear hacia el LS
        //Hay que hacerle un render a la info que viene desde LS para poder manejarla
        for (let i = 0; i < infoLs.length; i++) {
            var aux = new Object
            aux = JSON.parse(infoLs[i])
            arrayLs.push(aux)
        }
        //HACEMOS VERIFICACIONES ANTES DE GUARDAR UN PRODUCTO EN LS
        if (arrayLs == 0) {
            var jsonProduct = JSON.stringify(product)//Convierte producto recivido a json
            setLS.push(jsonProduct)
            const arrayToJson = JSON.stringify(setLS);//convierte array a json
            localStorage.setItem('productos', arrayToJson);//almacena la info en LS
        } else {
            if (existe(arrayLs, id)) {
                for (let i = 0; i < arrayLs.length; i++) {
                    setLS.push(arrayLs[i])
                }
                mainLoop:
                for (let i = 0; i < arrayLs.length; i++) {
                    if (arrayLs[i].id == id) {
                        setLS[i].cantidad += 1
                        break mainLoop
                    }
                }
                var aux = new Array()
                for (let i = 0; i < arrayLs.length; i++) {
                    aux.push(JSON.stringify(setLS[i]))
                }
                const arrayToJson = JSON.stringify(aux)
                localStorage.setItem('productos', arrayToJson)
            } else {
                for (let i = 0; i < arrayLs.length; i++) {
                    setLS.push(JSON.stringify(arrayLs[i]))
                }
                var jsonProduct = JSON.stringify(product)
                setLS.push(jsonProduct)
                const arrayToJson = JSON.stringify(setLS)
                localStorage.setItem('productos', arrayToJson)
            }

        }

        function existe(array, busqueda) {
            var boolean = false
            loop:
            for (let x = 0; x < array.length; x++) {
                if (array[x].id == busqueda) {
                    boolean = true
                    break loop;
                }
            }
            return boolean
        }
    }



    function htmlToObject(html) {
        const producto = {
            id: html.querySelector('h7').textContent,
            nombre: html.querySelector('h3').textContent,
            precio: html.querySelector('h4').textContent,
            cantidad: 1
        };
        return producto;
    }
}

deleteProduct = () => {
    const productoSeleccionado = document.getElementById('contenedorProductos');
    var almacen = document.querySelector('#contenedorProductos')//PARTE FUNDAMENTAL PARA ACTUALIZAR EL CARRO
    productoSeleccionado.addEventListener('submit', (e) => {
        e.preventDefault()
        var htmlProduct = e.target
        var reciveLs = new Array()
        var setLs = new Array()
        var aux = new Array()
        for (let i = 0; i < contadorProductos().length; i++) {
            reciveLs.push(JSON.parse(contadorProductos()[i]))
        }
        setLs = reciveLs.filter(item => item.id != htmlProduct.querySelector('h7').textContent)
        for (let i = 0; i < setLs.length; i++) {
            aux.push(JSON.stringify(setLs[i]))
        }
        const arrayToJson = JSON.stringify(aux)
        localStorage.setItem('productos', arrayToJson)
        document.querySelector('#contadorCarrito').innerHTML = contadorProductos().length;

        //******** AQUI SE ACTUALIZA LA INFO VISUAL DEL CARRO ************\\
        var array = contadorProductos()

        var inicio = "<div class=\"cart-list\">"

        for (let i = 0; i < array.length; i++) {

            var producto = JSON.parse(array[i])
            inicio += "<form>"
            inicio += "<div class=\"product-widget\">"
            inicio += "<div class=\"product-img\">"
            inicio += "<img src= >"
            inicio += "</div>"
            inicio += "<div class=\"product-body\">"
            inicio += "<h3 class=\"product-name\">" + producto.nombre + "</h3>"
            inicio += "<h4 class=\"product-price\">" + "<span id=cantidad class=\"qty\">" + producto.cantidad + ' X' + "</span>" + producto.precio + "</h4>"
            inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
            inicio += "</div>"
            inicio += "<button type=submit class=\"delete\">" + "<i class=\"fa fa-close\"></i>" + "</button>"
            inicio += "</div>"
            inicio += "</form>"
        }
        inicio += "<div class=\"cart-summary\">"
        inicio += "<small>Productos Totales: " + array.length + "</small>"
        inicio += "<h5>SUBTOTAL: $ " + subtotal(array) + "</h5>"
        inicio += "</div>"
        inicio += "<div class=\"cart-btns\">"
        inicio += "<a href=\"#\">View Cart</a>"
        inicio += "<a href=\"#\">" + "Checkout " + "<i class=\"fa fa-arrow-circle-right\"></i>" + "</a>"
        inicio += "</div>"
        inicio += "</form>"
        almacen.innerHTML = inicio

        //*****************AQUI SE ACTUALIZA LA INFO DE LAS ORDENES*********************\\
        var almacen2 = document.querySelector('#contenedor')

        var array = contadorProductos()

        var inicio = ""
        for (let i = 0; i < array.length; i++) {
            var producto = JSON.parse(array[i])
            inicio += "<tr id= tableRow>"
            inicio += "<td>" + producto.nombre + "</td>"
            inicio += "<td>" + producto.cantidad
            inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
            inicio += "<button onclick=add() id= add" + producto.id + " class = LeftPlusBtn>" + "+" + "</button>"
            inicio += "<button onclick=substract() id= substract" + producto.id + " class = rightSubstractBtn>" + "-" + "</button>"
            inicio += "</td>"
            inicio += "<td>" + producto.precio + "</td>"
            inicio += "</tr>"

        }
        almacen2.innerHTML = inicio
    })
    function subtotal(array) {
        var subtotal = 0
        var products = new Array()
        for (let i = 0; i < array.length; i++) {
            products.push(JSON.parse(array[i]))
            var precio = products[i].precio
            precio = precio.replace(/,/g, "")
            var precio2 = parseInt(precio.substr(1, precio.length))
            subtotal += products[i].cantidad * precio2
        }
        return subtotal
    }
}

//********************ORDER SECTION *******************\\
loadOrder = () => {
    document.querySelector('#contadorCarrito').innerHTML = this.contadorProductos().length;

    var almacen = document.querySelector('#contenedor')

    var array = contadorProductos()

    var inicio = ""
    for (let i = 0; i < array.length; i++) {
        var producto = JSON.parse(array[i])
        inicio += "<tr id= tableRow>"
        inicio += "<td>" + producto.nombre + "</td>"
        inicio += "<td>" + producto.cantidad
        inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
        inicio += "<button onclick=add() id= add" + producto.id + " class = LeftPlusBtn>" + "+" + "</button>"
        inicio += "<button onclick=substract() id= substract" + producto.id + " class = rightSubstractBtn>" + "-" + "</button>"
        inicio += "</td>"
        inicio += "<td>" + producto.precio + "</td>"
        inicio += "</tr>"

    }
    almacen.innerHTML = inicio
    //******************Actualiza total de la orden******************************\\
    var totalHtml = document.getElementById('total')
    totalHtml.innerHTML = total(contadorProductos())
}

add = () => {
    console.log('estas sumando')
    var e = window.event
    e.preventDefault()
    var selectedProduct = e.target.parentElement.querySelector('h7').textContent
    var LsArray = new Array()
    var aux = new Array()
    for (let i = 0; i < contadorProductos().length; i++) {
        LsArray.push(JSON.parse(contadorProductos()[i]))
    }
    var existe = LsArray.find(product => product.id == selectedProduct)
    existe.cantidad += 1
    for (let x = 0; x < LsArray.length; x++) {
        aux.push(JSON.stringify(LsArray[x]))
    }
    const arrayToJson = JSON.stringify(aux)
    localStorage.setItem('productos', arrayToJson)
    //************************ACTUALIZA LA VISTA DE MY ORDER*************************\\
    var almacen2 = document.querySelector('#contenedor')

    var array = contadorProductos()

    var inicio = ""
    for (let i = 0; i < array.length; i++) {
        var producto = JSON.parse(array[i])
        inicio += "<tr id= tableRow>"
        inicio += "<td>" + producto.nombre + "</td>"
        inicio += "<td>" + producto.cantidad
        inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
        inicio += "<button onclick=add() id= add" + producto.id + " class = LeftPlusBtn>" + "+" + "</button>"
        inicio += "<button onclick=substract() id= substract" + producto.id + " class = rightSubstractBtn>" + "-" + "</button>"
        inicio += "</td>"
        inicio += "<td>" + producto.precio + "</td>"
        inicio += "</tr>"

    }
    almacen2.innerHTML = inicio
    //******************Actualiza total de la orden******************************\\
    var totalHtml = document.getElementById('total')
    totalHtml.innerHTML = total(contadorProductos())
}

substract = () => {
    console.log('estas restando')
    var e = window.event
    e.preventDefault()
    var selectedProduct = e.target.parentElement.querySelector('h7').textContent
    var LsArray = new Array()
    var aux = new Array()
    for (let i = 0; i < contadorProductos().length; i++) {
        LsArray.push(JSON.parse(contadorProductos()[i]))
    }
    var existe = LsArray.find(product => product.id == selectedProduct)
    existe.cantidad = existe.cantidad - 1
    if (existe.cantidad == 0) {
        var arrayFiltrado = LsArray.filter(product => product.id != selectedProduct)
        for (let x = 0; x < arrayFiltrado.length; x++) {
            aux.push(JSON.stringify(arrayFiltrado[x]))
        }
        const arrayToJson = JSON.stringify(aux)
        localStorage.setItem('productos', arrayToJson)
        console.log(arrayFiltrado)
    } else {
        for (let x = 0; x < LsArray.length; x++) {
            aux.push(JSON.stringify(LsArray[x]))
        }
        const arrayToJson = JSON.stringify(aux)
        localStorage.setItem('productos', arrayToJson)
    }
    //************************ACTUALIZA LA VISTA DE MY ORDER*************************\\
    var almacen2 = document.querySelector('#contenedor')

    var array = contadorProductos()

    var inicio = ""
    for (let i = 0; i < array.length; i++) {
        var producto = JSON.parse(array[i])
        inicio += "<tr id= tableRow>"
        inicio += "<td>" + producto.nombre + "</td>"
        inicio += "<td>" + producto.cantidad
        inicio += "<h7 style=visibility: hidden>" + producto.id + "</h7>"
        inicio += "<button onclick=add() id= add" + producto.id + " class = LeftPlusBtn>" + "+" + "</button>"
        inicio += "<button onclick=substract() id= substract" + producto.id + " class = rightSubstractBtn>" + "-" + "</button>"
        inicio += "</td>"
        inicio += "<td>" + producto.precio + "</td>"
        inicio += "</tr>"

    }
    almacen2.innerHTML = inicio
    //************************ACTUALIZA CONTADOR*************************\\
    document.querySelector('#contadorCarrito').innerHTML = this.contadorProductos().length;
    //******************Actualiza total de la orden******************************\\
    var totalHtml = document.getElementById('total')
    totalHtml.innerHTML = total(contadorProductos())
}
//***************************VERIFICACION DE STOCK*************************************\\
verifications = () => {
    var placeOrder = document.getElementById('verificador')
    placeOrder.addEventListener('click', (e) => {
        e.preventDefault()
        var products = contadorProductos()

        fetch('/api/productsVerification', {
            method: 'POST',
            body: JSON.stringify(products),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data) {
                console.log('Lo tengo')
            }else{
                console.log('No pasa nada compa')
            }
        })
    })
}


//********************************COUNT SECTION *************\\
contadorProductos = () => {
    var productosLS = new Array();
    if (localStorage.getItem('productos') === null) {
        productosLS = [];
    } else {
        productosLS = JSON.parse(localStorage.getItem('productos'))
    }
    return productosLS
};

total = (array) => {
    var subtotal = 0
    var products = new Array()
    for (let i = 0; i < array.length; i++) {
        products.push(JSON.parse(array[i]))
        var precio = products[i].precio
        precio = precio.replace(/,/g, "")
        var precio2 = parseInt(precio.substr(1, precio.length))
        subtotal += products[i].cantidad * precio2
    }
    return subtotal
}

