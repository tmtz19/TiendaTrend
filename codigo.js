// Bienvenida
let nombreUsuario = prompt("Abri la consola del navegador e ingresa tu nombre para comenzar");
alert("Bienvenido "+nombreUsuario+" a Tienda Trend!")

// Solicito al usuario que ingrese el codigo del articulo para ver el precio por consola
let articulo=prompt("Ingresa el codigo del articulo que vas a comprar para conocer su precio. S para salir. \n1 - Almohadon \n2 - Frazada \n3 - Cortina \n4 - Manta \n5 - Sabanas");
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
    articulo=prompt("Ingresa el codigo del articulo que vas a comprar para conocer su precio. S para salir. \n1 - Almohadon \n2 - Frazada \n3 - Cortina \n4 - Manta \n5 - Sabanas");
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

// Funciones para calcular el IVA y el precio final
function calcularIVA (precioTotal){
    return precioTotal * 0.21;
}

let iva = calcularIVA(precioTotal);
console.log("El IVA de la compra es $"+iva);

function mostrarPrecioFinal(precioIngresado, ivaCalculado ){
console.log("El precio con IVA incluido es $"+(precioIngresado+ivaCalculado))
}
mostrarPrecioFinal(precioTotal, iva)

// Forma de pago
let formaDePago;
let pagoValido;
do{
    pagoValido = true
    formaDePago = (prompt("Ingresa el código segun como quieras abonar. \n1 - Debito \n2 - Credito (En 3, 6, o 12 cuotas) \n3 - Efectivo (10% de descuento) "));
    if ((formaDePago != 1)&&(formaDePago != 2)&&(formaDePago != 3)){
        alert("Opción incorrecta, volve a intentearlo.");
        pagoValido = false;
    }
}while (pagoValido == false)

// Cantidad de cuotas 
let cantidadCuotas = 0;
if (formaDePago == 1){
    cantidadCuotas = 1;
    alert("El precio a abonar es $"+ (precioTotal+iva))
}
if(formaDePago == 2){
    do{
        cantidadCuotas = prompt("Ingresa en cuantas cuotas queres abonar. 3, 6 o 12 cuotas sin interes.")
    }while((cantidadCuotas != 3)&&(cantidadCuotas != 6)&&(cantidadCuotas != 12))
    alert("El precio a abonar es $"+precioTotal+" en "+cantidadCuotas+" cuotas sin interes de $"+([precioTotal+iva]/cantidadCuotas)+" cada una.")
}

// Descuento efectivo

function calcularDescuento(precioTotal){
    return precioTotal * 0,10
}
let descuento = calcularDescuento(precioTotal)
let precioConDescuento = ([precioTotal+iva] - descuento)
if(formaDePago == 3){
    descuento = calcularDescuento(precioTotal)
    console.log("El descuento por abonar en efectivo es de $"+descuento+". Terminas abonando la suma de $"+precioConDescuento)
}






