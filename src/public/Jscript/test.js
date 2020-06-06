
/*function Main() {
    
    /*DE MOMENTO TODO OK. AHORA NECESITO QUE SE HAGAN LOS FORMA PARA ALMACENAR PRODUCTOS.
    DE ESTA FORMA PODRE CAPTURAR LA INFO DE CADA UNO Y ENVIALA EN FORMATO JSON.
    NECESITO QUE TODOS LOS LABELS Y EL FORM TENGAN UN ID.
    POR SI SE ME OLVIDA COMO HACER ALGO DEJARE LINKS DE REFERENCIA QUE PODRIAN AYUDARME:
    JS POO: https://www.youtube.com/watch?v=QWAAiskbzZo
    JS CART: https://www.youtube.com/watch?v=JINHNhFD-kA&t=162s
    POST FETCH: https://www.youtube.com/watch?v=nLrL9Ip3tWI
    SOF RECIVE FETCH POST: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
    QUERY SELECTOR: https://developer.mozilla.org/es/docs/Web/API/Document/querySelector
    
    this.data = () => {
        const array = ['df'];
        //array.push('a','s');

        document.getElementById("suma").addEventListener("click", infoProducto);
        function agrega() {
            array.push('a');
            document.getElementById("demo").innerHTML = array.length;
            const texto = document.querySelector('.este').textContent;
            console.log(texto);
            fetch('/recive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    compra: {
                        texto: texto
                    }
                })
            })
        };
    };

    

    this.load = () => {
        const almacen = document.querySelector('#container');
        fetch('/api/index')
            .then(data => data.json())
            .then(async data => {
                const array = JSON.parse(data);
                inicio = "<div class = \"row\">";
                //console.log(array);
                for (let i = 0; i < array.length; i++) {
                    //console.log(array[i]);
                    inicio += "<div class = \"col-md-4\">";
                    inicio += "<form id= producto" + array[i].id + ">"
                    inicio += "<div class=\"card\" style=\"width: 18rem;\">"
                    inicio += "<img class=\"card-img-top\" alt=\"Card image cap\" src=" + array[i].dirimg + ">"
                    inicio += "<div class=\"card-body\">"
                    inicio += "<h5 class=\"card-title nombreProducto\">" + "Nombre producto" + "</h5>"
                    inicio += "<p class=\"card-text\">" + "Descripción...." + "</p>"
                    inicio += "<button class=\"btn btn-primary\" id=\"submit\">" + "Agregar al carro" + "</button>"
                    inicio += "</div>";
                    inicio += "</div>";
                    inicio += "</form>"
                    inicio += "<p>" + array[i].id + "</p>"
                    inicio += "</div>";

                }
                inicio += "</div>";

                almacen.innerHTML = inicio;
                //console.log(terminado);
            })
    };

    this.agregar = ()=>{
        const formulario = document.getElementById('container');
        formulario.addEventListener('click', (e)=>{
            e.preventDefault();
            //.parentElement INDICA EL ELEMENTO PADRE DEL TARGET
            const data = e.target.parentElement.parentElement;
            
            carro = leerProducto(data)
            console.log(carro.length);
            //console.log(data);
        });

        //ESTE METODO LEE EL HTMLobject Y LO RETORNA COMO OBJETO DE JS
        function leerProducto(data){
            const producto = [{
                imagen: data.querySelector('img').src,
                nombre: data.querySelector('h5').textContent,
                descripcion: data.querySelector('p').textContent
            }];
            return producto;
        };
    };
    console.log('creando su carrito...');

}*/