let tienda = document.getElementById("shop");

/*
Si hay algun dato almacenado en el storage se recupera esa informacion para mostrarla
Sino se muestra el carrito vacio
*/
let carrito = JSON.parse(localStorage.getItem("datos")) || [];

// Funcion para renderizar las tarjetas del E-commerce
let generarTienda = ()=>{ 
    return (tienda.innerHTML = productos.map((x)=>{
        let { id, foto, nombre, precio} = x;
        let search = carrito.find((x)=> x.id === id) || [];
        return `
        <div id=producto-id-${id} class="item">
                <img width="300" height="230" src=${foto} alt="">
                <div class="detalle">
                    <h3>${nombre}</h3>
                    <div class="precio-cantidad">
                        <h3>$${precio}</h3>
                        <div class="botones">
                            <i onclick="restar(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="cantidad">${search.item === undefined? 0: search.item}</div>
                            <i onclick="sumar(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("")); 
}
// El .join lo tuve que agregar porque me quedaban unas comas (,) entre cada tarjeta. Lo tuve que buscar en internet


generarTienda();

// Funcion para sumar productos al carrito 
// Si al clickear X producto este no se encuentra en el carrito los agrega al array con ID e item
// Si ya se encuentra en el carrito solo agrega una unidad mas al item en el array
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
    actualizar(itemElegido.id);
    localStorage.setItem("datos", JSON.stringify(carrito));
}

// Funcion para restar productos del carrito
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
    localStorage.setItem("datos", JSON.stringify(carrito));
};

// Funcion que actualiza los productos del carrito total
let actualizar = (id) => {
    let search = carrito.find((x)=> x.id === id)
    document.getElementById(id).innerHTML = search.item;
    calculo();
};

// Funcion para calcular los items acumulados en el carrito
let calculo =()=>{
    let iconoCarrito = document.getElementById("cantCarrito");
    iconoCarrito.innerHTML = carrito.map((x)=> x.item).reduce((x,y)=> x + y, 0);
};
calculo();