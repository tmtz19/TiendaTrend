// Bienvenida
let nombreUsuario = prompt("Ingresa tu nombre para comenzar");
alert("Bienvenido "+nombreUsuario+" a Tienda Trend!")

// Solicito al usuario que ingrese el codigo del articulo para ver el precio por consola
let articulo=prompt("Ingresa el codigo del articulo que vas a comprar para conocer su precio. S para salir");
while(articulo!="S"){
    switch(articulo){
        case "1":
            console.log("El precio del almohadon es $2500");
            break;
        case "2":
            console.log("El precio de la frazada es $3500");
            break;
        case "3":
            console.log("El precio de la cortina es $3000");
            break;
        case "4":
            console.log("El precio de la manta es $4200");
            break;
        default:
            console.log("Articulo sin stock");
            break;
    }
    articulo=prompt("Ingresa el codigo del articulo que vas a comprar para conocer su precio. S para salir");
}

// Solicito al usuario que ingrese el precio de hasta 4 articulos elegidos para sumarlos al carrito
let precio;
let precioTotal = 0;

for (let i = 1 ; i <= 4 ; i++){
    precio=parseInt(prompt("Ingresa el precio del "+i+"° producto seleccionado. Podes llevarte hasta 4 articulos"));
    console.log("El precio ingresado es $"+precio);
    precioTotal = precioTotal + precio;
    console.log("El carrito acumula $"+precioTotal);
}

// En caso que el total sea mayor a $10000.00 el envio es gratuito
if (precioTotal >= 10000){
    alert("Contas con envío gratis")
}else{
    alert("Te faltan $"+(10000-precioTotal)+" para contar con envio gratis a domicilio.")
}

