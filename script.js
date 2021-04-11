window.onload = ()=>{
    plans_container.style.paddingLeft = document.getElementById("dummy").style.width + 20;
}
/* Código para mostrar tabla según el click de las flechas*/
var arrow_right = document.getElementById('right-arrow');
var arrow_left = document.getElementById('left-arrow');
var currency_table = document.getElementById('main-currency-table');
var convencion_table = document.getElementById('main-convencion-table');
var tables_container = document.getElementById("table-container");

function change_display(table, arrow, state){
table.style.display = state;
arrow.style.display = state;
}
arrow_right.addEventListener('click', function(){
   tables_container.classList.add('slide-left');
   setTimeout(()=>{
       tables_container.classList.remove("slide-left");
    change_display(currency_table, arrow_right, "none");
    change_display(convencion_table, arrow_left, "block");
   }, 300);
});
arrow_left.addEventListener('click', function(){
    console.log("doesnt work");
    tables_container.classList.add('slide-right');
    setTimeout(()=>{
       tables_container.classList.remove("slide-right");
        change_display(currency_table, arrow_right, "block");
        change_display(convencion_table, arrow_left, "none");
       }, 300);
});

/* Codigo para hacer scroll a un div horizontal por medio de flechas.
Uso el tamaño de las cajas dentro del slide para restarselo al scrollLeft y llevarme
a la posicion deseada.
Además oculto las flechas dependiendo de en que posicion me encuentre*/

// Obtengo los dos elementos de flecha
var gray_arrow_left = document.getElementById("left-gray-arrow");
var gray_arrow_right = document.getElementById("right-gray-arrow");

// El contenedor de los planes / donde se hace scroll
var plans_container = document.getElementById("plans-slider");
var plan = document.getElementsByClassName("plans-container--card");

// Averiguo el tamaño de las tarjetas, esto incluye el tamaño del margen
let margin = 20;
var size = document.getElementById("recomendado").clientWidth + margin;
/*La posicion inicial que tiene el scrollLeft es ese "numero magico"
 que me ayuda a encontrar exactamente la posicion de cada uno de los elementos*/
var posicionInicial= plans_container.scrollLeft;

//Para que la cajita del centro se muestre por default
plans_container.scrollLeft = size;

//Uso mi "numero mágico" (la posicione inicial de scrollLeft del slider) para calcular la posicion exacta de cada una de las cajitas
const plan_middle = new Plan(posicionInicial + size, plan[1]);
const plan_left = new Plan(posicionInicial, plan[0]);
const plan_right = new Plan(plan_middle.size+ size, plan[2]);

//Ahora voy a hacer que cada uno de los planes sea un objeto de la clase plan, y de esta forma se me facilita manipularlo 
class Plan {
    constructor(size, elemento){
        this.size = size;
        this.elemento = elemento;
    }
    //Para las animaciones de opacidad
    isCenter() {
        this.elemento.classList.add("highligh");
    }
    isNotCenter(){
        this.elemento.classList.remove("highligh");
    }
}



console.log( `${plan_middle} left: ${plan_left} y right: ${plan_right}`);

//Muevo el scroll hacia el cuadrado que es segun las flechas
gray_arrow_left.addEventListener("click", function(){
    plans_container.scrollLeft -= size
});

gray_arrow_right.addEventListener("click", function(){
    plans_container.scrollLeft += size;
});

/* Detecto cuando se hace scroll para mostrar o no las flechas 
dependiendo de que caja se encuentra en el centro

Esta es el motivo por el cual necesitaba averiguar la posicion de los planes,
para que detecte cuando estoy mirando una
*/

plans_container.addEventListener("scroll", function(){
    let position = plans_container.scrollLeft;
    if(position < plan_middle.size -30) //Uso 30 como un umbral para que lo siguiente sucesa un poco antes de llegar al elemento
    {
        gray_arrow_left.style.display = "none";
        gray_arrow_right.style.display = "inline-block";
        plan_left.isCenter();
        plan_middle.isNotCenter();
    }
    else if(position > plan_middle.size + 30 ){

        gray_arrow_right.style.display = "none";
        gray_arrow_left.style.display = "inline-block";
        plan_right.isCenter();
        plan_middle.isNotCenter();
    }
    else{
        gray_arrow_right.style.display = "inline-block";
        gray_arrow_left.style.display = "inline-block";
        plan_middle.isCenter();
        plan_right.isNotCenter();
        plan_left.isNotCenter();
    }
});

//CODIGO DE COLLAPSIBLE DE PREGUNTAS FRECUENTES

var collapsibles = document.getElementsByClassName("collapsible");
var contenidos = document.getElementsByClassName("collapsible-content");
for (let index = 0; index < collapsibles.length; index++) {
    collapsibles[index].addEventListener('click', function(){
        /* Toggle añade la calse si no existia antes, y la elimina si ya existia*/
        let contenido= contenidos[index]; 
        if(contenido.style.maxHeight){
            contenido.style.maxHeight = null;
        }
        else{
            contenido.style.maxHeight = contenido.scrollHeight +"px";
        }
    });
}