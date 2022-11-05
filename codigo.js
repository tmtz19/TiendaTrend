let tienda = document.getElementById("shop");

let carrito = []

let generarTienda = ()=>{ 
    return (tienda.innerHTML = productos.map((x)=>{
        let { id, foto, nombre, precio} = x;
        return `
        <div id=producto-id-${id} class="item">
                <img width="221" height="250" src=${foto} alt="">
                <div class="detalle">
                    <h3>${nombre}</h3>
                    <div class="precio-cantidad">
                        <h3>$${precio}</h3>
                        <div class="botones">
                            <i onclick="restar(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="cantidad">0</div>
                            <i onclick="sumar(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `
    }).join("")); 
}

generarTienda();

let sumar = (id) => {
    let itemElegido = id;
    console.log(itemElegido.id);
};

let restar = () => {};
let actualizar = () => {};