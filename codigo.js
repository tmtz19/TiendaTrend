alert("Bienvenidos a Tienda Trend")

let articulo=prompt("Ingresa el articulo que vas a comprar para conocer su precio");
while(articulo!="FIN"){
    switch(articulo){
        case "almohadon":
            console.log("El precio del almohadon es $2500");
            break;
        case "frazada":
            console.log("El precio de la frazada es $3500");
            break;
        case "cortina":
            console.log("El precio de la cortina es $3000");
            break;
        case "manta":
            console.log("El precio de la manta es $4200");
            break;
        default:
            console.log("Articulo sin stock");
            break;
    }
    articulo=prompt("Ingresa el articulo que vas a comprar para sumarlo al carrito (FIN para salir)");
}

let precio;
let precioTotal = 0;

for (let i = 1 ; i <= 4 ; i++){
    precio=parseInt(prompt("Ingresa el precio del "+i+"° producto seleccionado."));
    console.log("El precio ingresado es $"+precio);
    precioTotal = precioTotal + precio;
    console.log("El carrito acumula $"+precioTotal);
}

if (precioTotal >= 10000){
    alert("Contas con envío gratis")
}else{
    alert("Te faltan $"+(10000-precioTotal)+" para contar con envio gratis a domicilio.")
}

