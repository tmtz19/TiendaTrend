let label = document.getElementById("label");
let carritoAAbonar = document.getElementById("carritoAAbonar");
let carrito = JSON.parse(localStorage.getItem("datos")) || [];

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input")

// expresiones regulares para validar los campos del formulario
const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{8,14}$/ 
}

// Le asigno una condicion false a los campos por defecto para poder validarlos con la funcion validarCampo
const campos = {
    Nombre: false,
    Apellido: false,
    Email: false,
    Telefono: false
}

// Funcion para validar los campos en los input
let validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, "Nombre");
        break
        case "apellido":
            validarCampo(expresiones.apellido, e.target, "Apellido");
        break
        case "email":
            validarCampo(expresiones.email, e.target, "Email");
        break
        case "telefono":
            validarCampo(expresiones.telefono, e.target, "Telefono");
        break
    }
}

// Funcion que al validar muestra un mensaje de error en caso de no cumplir correctamente la condicion del input
let validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.querySelector(`#grupo${campo} .formularioError`).classList.remove("formularioErrorActivo");
        campos[campo] = true;
    }else{
        document.querySelector(`#grupo${campo} .formularioError`).classList.add("formularioErrorActivo");
        campos[campo] = false;
    }
}
// Cada vez que se levanta una tecla o se selecciona por fuera del input se valida el campo
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


// Funcion que calcula los items acumulados en el carrito 
let calculo =()=>{
    let iconoCarrito = document.getElementById("cantCarrito");
    iconoCarrito.innerHTML = carrito.map((x)=> x.item).reduce((x,y)=> x + y, 0);
};
calculo();
/*
Funcion para renderizar los items en el carrito
Si no hay productos en el carrito, se muestra el mensaje de carrito vacio
*/ 
let generarItemsCarrito =()=>{
    if(carrito.length !==0){
        return (carritoAAbonar.innerHTML = carrito.map((x)=>{
            let {id, item} = x;
            let search = productos.find((x)=> x.id ===id) || [];
            return `
            <div class="item-carrito">
                <img width="150" height="200" src=${search.foto} alt="" />
                <div class="detalles">
                    <div class="info">
                        <h4 class="titulo-precio">
                            <p>${search.nombre}</p>
                            <p class="carrito-precio">$${search.precio}</p>
                        </h4>
                        <i onclick="eliminarItem(${id})"class="bi bi-x-lg"></i>
                    </div>
                    <div class="botones pb-2">
                        <i onclick="restar(${id})" class="bi bi-dash-lg ps-3"></i>
                        <div id=${id} class="cantidad">${item}</div>
                        <i onclick="sumar(${id})" class="bi bi-plus-lg"></i>
                    </div>
                    <h3 class="precioFinal">$${item * search.precio}</h3>
                    </div>
                    
                </div>
            </div>
            `
        }).join(""));
    }else{
        carritoAAbonar.innerHTML = ``;
        label.innerHTML = `
        <h2 class="seccion2">El carrito esta vacio</h2>
        <a href="index.html">
            <button class="botonInicio">Volver al inicio</button>
        </a>
        <br>
        <br>
        <br>
        `;
    }
}
generarItemsCarrito();

// Funcion para agregar una unidad del producto seleccionado desde el carrito
let sumar = (id) => {
    let itemElegido = id;
    console.log(itemElegido.id);
    let search = carrito.find((x)=> x.id === itemElegido.id);

    if(search === undefined){
        carrito.push({
            id: itemElegido.id,
            item: 1,
        });
    } else{
        search.item += 1;
    }
    generarItemsCarrito();
    actualizar(itemElegido.id);
    localStorage.setItem("datos", JSON.stringify(carrito));
}

// Funcion para restar una unidad del producto seleccionado desde el carrito
let restar = (id) => {
    let itemElegido = id;
    console.log(itemElegido.id);
    let search = carrito.find((x)=> x.id === itemElegido.id);
    if(search === undefined) return;
    else if (search.item === 0) return;
    else{
        search.item -= 1;
    }
    actualizar(itemElegido.id);
    carrito = carrito.filter((x)=> x.item !==0);
    generarItemsCarrito();
    localStorage.setItem("datos", JSON.stringify(carrito));
};

// Funcion que actualiza 
let actualizar = (id) => {
    let search = carrito.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculo();
    calculoTotal();
};

// Funcion para eliminar un producto del carrito
let eliminarItem =(id)=> {
    let itemElegido = id
    carrito = carrito.filter((x)=>x.id !== itemElegido.id);
    generarItemsCarrito();
    calculoTotal();
    calculo();
    localStorage.setItem("datos", JSON.stringify(carrito));
}

// Funcion para calcular el total sumando todos los valores de los productos en el carrito 
let calculoTotal = ()=>{
    if(carrito.length !==0){
        let cantidad = carrito.map((x)=>{
            let {item, id} = x;
            let search = productos.find((x)=> x.id ===id) || [];
            return item * search.precio;
        }).reduce((x,y)=>x+y,0);
        label.innerHTML=`
        <h2 class="seccion">Total a abonar: $${cantidad}</h2>
        <button onclick="finalizarCompra()" type="submit" class="finalizarCompra" id="finalizarCompra">Finalizar compra</button>
        <button onclick="vaciarCarrito()" class="vaciarCarrito">Vaciar carrito</button>
        `
    } else return;
};
calculoTotal();

// Funcion para vaciar el carrito desde el boton Vaciar Carrito
let vaciarCarrito = ()=>{
    carrito = [];
    generarItemsCarrito();
    calculo();
    localStorage.setItem("datos", JSON.stringify(carrito));
};

// Funcion para finalizar la compra 
let finalizarCompra = ()=>{
    if(campos.Nombre && campos.Apellido && campos.Email && campos.Telefono){
        formulario.reset();
        carrito = [];
        generarItemsCarrito();
        calculo();
        localStorage.setItem("datos", JSON.stringify(carrito));
        Swal.fire(
            'Compra registrada!',
            'Vas a recibir informacion por email para coordinar la entrega.',
            'success'
        )
    }else{
        Swal.fire({
            title: 'Por favor completá el formulario correctamente.',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500
        })
    }
    
}

