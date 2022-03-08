class Liquidacion {
    constructor(periodo, gananaciaNetaAnterior, retencionesAnteriores, bruto, conyuge, hijo) {
        this.periodo = periodo;
        this.gananaciaNetaAnterior = gananaciaNetaAnterior;
        this.retencionesAnteriores = retencionesAnteriores;
        this.bruto = bruto;
        this.conyuge = conyuge;
        this.hijo = hijo;
    }

    get neto() {
        return  this.bruto * 0.83;
    }
    get proporcionalAguinaldo() {
        return this.neto / 12;
    }
    get gananaciaNeta() {
        return this.neto + this.proporcionalAguinaldo;
    }
    get gananciaNoImponible() {
        return this.periodo * 21047.07;
    } 
    get deduccionEspecial() {
        return this.periodo * 101025.94;
    } 
    get deduccionEspecialIncrementada() {
        return this.periodo * this.deduccionEspecialesIncrementadas.find(item => this.bruto < item.sueldoBruto).deduccion;
    }
    get deduccionConyuge() {
        return this.periodo * this.conyuge * 19621.43;
    } 
    get deduccionHijo() {
        return this.periodo * this.hijo * 9895.16;
    } 
    get deducciones() {
        return this.gananciaNoImponible + this.deduccionEspecial + this.deduccionEspecialIncrementada + this.conyuge + this.hijo;
    }
    // Ternario
    get gananciaNetaSujetaAImpuesto() {
       return this.gananaciaNeta + this.gananaciaNetaAnterior - this.deducciones > 0 ? this.gananaciaNeta + this.gananaciaNetaAnterior - this.deducciones : 0 
    }
    get escala() {
       return this.escalas.find(item => this.gananciaNetaSujetaAImpuesto >= item.desde * this.periodo && this.gananciaNetaSujetaAImpuesto <= item.hasta * this.periodo);
    }
    get impuesto() {
        return this.escala.fijo * this.periodo + this.escala.alicuota * (this.gananciaNetaSujetaAImpuesto - this.escala.desde * this.periodo);
    }
    get retencion() {
        return this.impuesto - this.retencionesAnteriores;
    }
    get escalas() {
        return [
        { desde: 0, hasta: 8100.17, fijo: 0, alicuota: 0.05 },
        { desde: 8100.17, hasta: 16200.33, fijo: 405.01, alicuota: 0.09 },
        { desde: 16200.33, hasta: 24300.50, fijo: 1134.02, alicuota: 0.12 },
        { desde: 24300.50, hasta: 32400.67, fijo: 2106.04, alicuota: 0.15 },
        { desde: 32400.67, hasta: 48601.00, fijo: 3321.07, alicuota: 0.19 },
        { desde: 48601.00, hasta: 64801.34, fijo: 6399.13, alicuota: 0.23 },
        { desde: 64801.34, hasta: 97202.00, fijo: 10125.21, alicuota: 0.27 },
        { desde: 97202.00, hasta: 129602.67, fijo: 18873.39, alicuota: 0.31 },
        { desde: 129602.67, hasta: 999999999.99, fijo: 28917.06, alicuota: 0.35 }
    ];
    }
    get deduccionEspecialesIncrementadas() {
        return [
    { sueldoBruto: 226087, deduccion: 64737 },
    { sueldoBruto: 226238, deduccion: 64180 },
    { sueldoBruto: 226389, deduccion: 63669 },
    { sueldoBruto: 226539, deduccion: 63187 },
    { sueldoBruto: 226690, deduccion: 62726 },
    { sueldoBruto: 226841, deduccion: 62280 },
    { sueldoBruto: 226991, deduccion: 61848 },
    { sueldoBruto: 227142, deduccion: 61425 },
    { sueldoBruto: 227292, deduccion: 61010 },
    { sueldoBruto: 227443, deduccion: 60605 },
    { sueldoBruto: 227594, deduccion: 60206 },
    { sueldoBruto: 227744, deduccion: 59813 },
    { sueldoBruto: 227895, deduccion: 59424 },
    { sueldoBruto: 228046, deduccion: 59043 },
    { sueldoBruto: 228196, deduccion: 58665 },
    { sueldoBruto: 228347, deduccion: 58292 },
    { sueldoBruto: 228497, deduccion: 57921 },
    { sueldoBruto: 228648, deduccion: 57555 },
    { sueldoBruto: 228799, deduccion: 57192 },
    { sueldoBruto: 228949, deduccion: 56834 },
    { sueldoBruto: 229100, deduccion: 56477 },
    { sueldoBruto: 229251, deduccion: 56124 },
    { sueldoBruto: 229401, deduccion: 55773 },
    { sueldoBruto: 229552, deduccion: 55425 },
    { sueldoBruto: 229702, deduccion: 55079 },
    { sueldoBruto: 229853, deduccion: 54735 },
    { sueldoBruto: 230004, deduccion: 54395 },
    { sueldoBruto: 230154, deduccion: 54056 },
    { sueldoBruto: 230305, deduccion: 53719 },
    { sueldoBruto: 230456, deduccion: 53384 },
    { sueldoBruto: 230606, deduccion: 53051 },
    { sueldoBruto: 230757, deduccion: 52720 },
    { sueldoBruto: 230907, deduccion: 52390 },
    { sueldoBruto: 231058, deduccion: 52063 },
    { sueldoBruto: 231209, deduccion: 51737 },
    { sueldoBruto: 231359, deduccion: 51413 },
    { sueldoBruto: 231510, deduccion: 51089 },
    { sueldoBruto: 231661, deduccion: 50768 },
    { sueldoBruto: 231811, deduccion: 50447 },
    { sueldoBruto: 231962, deduccion: 50129 },
    { sueldoBruto: 232112, deduccion: 49812 },
    { sueldoBruto: 232263, deduccion: 49495 },
    { sueldoBruto: 232414, deduccion: 49180 },
    { sueldoBruto: 232564, deduccion: 48867 },
    { sueldoBruto: 232715, deduccion: 48555 },
    { sueldoBruto: 232866, deduccion: 48244 },
    { sueldoBruto: 233016, deduccion: 47935 },
    { sueldoBruto: 233167, deduccion: 47624 },
    { sueldoBruto: 233317, deduccion: 47317 },
    { sueldoBruto: 233468, deduccion: 47011 },
    { sueldoBruto: 233619, deduccion: 46706 },
    { sueldoBruto: 233769, deduccion: 46400 },
    { sueldoBruto: 233920, deduccion: 46097 },
    { sueldoBruto: 234071, deduccion: 45794 },
    { sueldoBruto: 234221, deduccion: 45493 },
    { sueldoBruto: 234372, deduccion: 45192 },
    { sueldoBruto: 234522, deduccion: 44892 },
    { sueldoBruto: 234673, deduccion: 44592 },
    { sueldoBruto: 234824, deduccion: 44294 },
    { sueldoBruto: 234974, deduccion: 43997 },
    { sueldoBruto: 235125, deduccion: 43701 },
    { sueldoBruto: 235276, deduccion: 43405 },
    { sueldoBruto: 235426, deduccion: 43110 },
    { sueldoBruto: 235577, deduccion: 42817 },
    { sueldoBruto: 235727, deduccion: 42523 },
    { sueldoBruto: 235878, deduccion: 42231 },
    { sueldoBruto: 236029, deduccion: 41940 },
    { sueldoBruto: 236179, deduccion: 41649 },
    { sueldoBruto: 236330, deduccion: 41358 },
    { sueldoBruto: 236481, deduccion: 41069 },
    { sueldoBruto: 236631, deduccion: 40780 },
    { sueldoBruto: 236782, deduccion: 40492 },
    { sueldoBruto: 236932, deduccion: 40205 },
    { sueldoBruto: 237083, deduccion: 39917 },
    { sueldoBruto: 237234, deduccion: 39631 },
    { sueldoBruto: 237384, deduccion: 39346 },
    { sueldoBruto: 237535, deduccion: 39061 },
    { sueldoBruto: 237686, deduccion: 38777 },
    { sueldoBruto: 237836, deduccion: 38494 },
    { sueldoBruto: 237987, deduccion: 38210 },
    { sueldoBruto: 238137, deduccion: 37929 },
    { sueldoBruto: 238288, deduccion: 37647 },
    { sueldoBruto: 238439, deduccion: 37365 },
    { sueldoBruto: 238589, deduccion: 37085 },
    { sueldoBruto: 238740, deduccion: 36805 },
    { sueldoBruto: 238891, deduccion: 36525 },
    { sueldoBruto: 239041, deduccion: 36246 },
    { sueldoBruto: 239192, deduccion: 35968 },
    { sueldoBruto: 239342, deduccion: 35690 },
    { sueldoBruto: 239493, deduccion: 35413 },
    { sueldoBruto: 239644, deduccion: 35136 },
    { sueldoBruto: 239794, deduccion: 34859 },
    { sueldoBruto: 239945, deduccion: 34583 },
    { sueldoBruto: 240096, deduccion: 34309 },
    { sueldoBruto: 240246, deduccion: 34034 },
    { sueldoBruto: 240397, deduccion: 33759 },
    { sueldoBruto: 240547, deduccion: 33485 },
    { sueldoBruto: 240698, deduccion: 33213 },
    { sueldoBruto: 240849, deduccion: 32940 },
    { sueldoBruto: 240999, deduccion: 32667 },
    { sueldoBruto: 241150, deduccion: 32395 },
    { sueldoBruto: 241301, deduccion: 32124 },
    { sueldoBruto: 241451, deduccion: 31853 },
    { sueldoBruto: 241602, deduccion: 31583 },
    { sueldoBruto: 241752, deduccion: 31312 },
    { sueldoBruto: 241903, deduccion: 31042 },
    { sueldoBruto: 242054, deduccion: 30773 },
    { sueldoBruto: 242204, deduccion: 30504 },
    { sueldoBruto: 242355, deduccion: 30236 },
    { sueldoBruto: 242506, deduccion: 29968 },
    { sueldoBruto: 242656, deduccion: 29700 },
    { sueldoBruto: 242807, deduccion: 29434 },
    { sueldoBruto: 242957, deduccion: 29167 },
    { sueldoBruto: 243108, deduccion: 28900 },
    { sueldoBruto: 243259, deduccion: 28634 },
    { sueldoBruto: 243409, deduccion: 28369 },
    { sueldoBruto: 243560, deduccion: 28104 },
    { sueldoBruto: 243711, deduccion: 27838 },
    { sueldoBruto: 243861, deduccion: 27575 },
    { sueldoBruto: 244012, deduccion: 27311 },
    { sueldoBruto: 244162, deduccion: 27048 },
    { sueldoBruto: 244313, deduccion: 26784 },
    { sueldoBruto: 244464, deduccion: 26520 },
    { sueldoBruto: 244614, deduccion: 26258 },
    { sueldoBruto: 244765, deduccion: 25996 },
    { sueldoBruto: 244916, deduccion: 25734 },
    { sueldoBruto: 245066, deduccion: 25472 },
    { sueldoBruto: 245217, deduccion: 25212 },
    { sueldoBruto: 245367, deduccion: 24951 },
    { sueldoBruto: 245518, deduccion: 24690 },
    { sueldoBruto: 245669, deduccion: 24430 },
    { sueldoBruto: 245819, deduccion: 24171 },
    { sueldoBruto: 245970, deduccion: 23912 },
    { sueldoBruto: 246121, deduccion: 23653 },
    { sueldoBruto: 246271, deduccion: 23393 },
    { sueldoBruto: 246422, deduccion: 23134 },
    { sueldoBruto: 246572, deduccion: 22877 },
    { sueldoBruto: 246723, deduccion: 22619 },
    { sueldoBruto: 246874, deduccion: 22362 },
    { sueldoBruto: 247024, deduccion: 22104 },
    { sueldoBruto: 247175, deduccion: 21848 },
    { sueldoBruto: 247326, deduccion: 21591 },
    { sueldoBruto: 247476, deduccion: 21334 },
    { sueldoBruto: 247627, deduccion: 21078 },
    { sueldoBruto: 247777, deduccion: 20822 },
    { sueldoBruto: 247928, deduccion: 20568 },
    { sueldoBruto: 248079, deduccion: 20313 },
    { sueldoBruto: 248229, deduccion: 20059 },
    { sueldoBruto: 248380, deduccion: 19804 },
    { sueldoBruto: 248531, deduccion: 19550 },
    { sueldoBruto: 248681, deduccion: 19295 },
    { sueldoBruto: 248832, deduccion: 19042 },
    { sueldoBruto: 248982, deduccion: 18789 },
    { sueldoBruto: 249133, deduccion: 18536 },
    { sueldoBruto: 249284, deduccion: 18283 },
    { sueldoBruto: 249434, deduccion: 18030 },
    { sueldoBruto: 249585, deduccion: 17778 },
    { sueldoBruto: 249736, deduccion: 17527 },
    { sueldoBruto: 249886, deduccion: 17275 },
    { sueldoBruto: 250037, deduccion: 17024 },
    { sueldoBruto: 250187, deduccion: 16772 },
    { sueldoBruto: 250338, deduccion: 16522 },
    { sueldoBruto: 250489, deduccion: 16270 },
    { sueldoBruto: 250639, deduccion: 16020 },
    { sueldoBruto: 250790, deduccion: 15770 },
    { sueldoBruto: 250941, deduccion: 15520 },
    { sueldoBruto: 251091, deduccion: 15272 },
    { sueldoBruto: 251242, deduccion: 15022 },
    { sueldoBruto: 251392, deduccion: 14773 },
    { sueldoBruto: 251543, deduccion: 14525 },
    { sueldoBruto: 251694, deduccion: 14276 },
    { sueldoBruto: 251844, deduccion: 14028 },
    { sueldoBruto: 251995, deduccion: 13779 },
    { sueldoBruto: 252145, deduccion: 13531 },
    { sueldoBruto: 252296, deduccion: 13284 },
    { sueldoBruto: 252447, deduccion: 13037 },
    { sueldoBruto: 252597, deduccion: 12790 },
    { sueldoBruto: 252748, deduccion: 12543 },
    { sueldoBruto: 252899, deduccion: 12295 },
    { sueldoBruto: 253049, deduccion: 12050 },
    { sueldoBruto: 253200, deduccion: 11803 },
    { sueldoBruto: 253350, deduccion: 11557 },
    { sueldoBruto: 253501, deduccion: 11312 },
    { sueldoBruto: 253652, deduccion: 11066 },
    { sueldoBruto: 253802, deduccion: 10821 },
    { sueldoBruto: 253953, deduccion: 10577 },
    { sueldoBruto: 254104, deduccion: 10331 },
    { sueldoBruto: 254254, deduccion: 10087 },
    { sueldoBruto: 254405, deduccion: 9842 },
    { sueldoBruto: 254555, deduccion: 9598 },
    { sueldoBruto: 254706, deduccion: 9354 },
    { sueldoBruto: 254857, deduccion: 9111 },
    { sueldoBruto: 255007, deduccion: 8867 },
    { sueldoBruto: 255158, deduccion: 8625 },
    { sueldoBruto: 255309, deduccion: 8381 },
    { sueldoBruto: 255459, deduccion: 8138 },
    { sueldoBruto: 255610, deduccion: 7896 },
    { sueldoBruto: 255760, deduccion: 7653 },
    { sueldoBruto: 255911, deduccion: 7411 },
    { sueldoBruto: 256062, deduccion: 7170 },
    { sueldoBruto: 256212, deduccion: 6927 },
    { sueldoBruto: 256363, deduccion: 6686 },
    { sueldoBruto: 256514, deduccion: 6444 },
    { sueldoBruto: 256664, deduccion: 6203 },
    { sueldoBruto: 256815, deduccion: 5962 },
    { sueldoBruto: 256965, deduccion: 5721 },
    { sueldoBruto: 257116, deduccion: 5481 },
    { sueldoBruto: 257267, deduccion: 5240 },
    { sueldoBruto: 257417, deduccion: 5001 },
    { sueldoBruto: 257568, deduccion: 4760 },
    { sueldoBruto: 257719, deduccion: 4520 },
    { sueldoBruto: 257869, deduccion: 4281 },
    { sueldoBruto: 258020, deduccion: 4041 },
    { sueldoBruto: 258170, deduccion: 3802 },
    { sueldoBruto: 258321, deduccion: 3564 },
    { sueldoBruto: 258472, deduccion: 3324 },
    { sueldoBruto: 258622, deduccion: 3086 },
    { sueldoBruto: 258773, deduccion: 2847 },
    { sueldoBruto: 258924, deduccion: 2609 },
    { sueldoBruto: 259074, deduccion: 2371 },
    { sueldoBruto: 259225, deduccion: 2133 },
    { sueldoBruto: 259375, deduccion: 1895 },
    { sueldoBruto: 259526, deduccion: 1658 },
    { sueldoBruto: 259677, deduccion: 1420 },
    { sueldoBruto: 259827, deduccion: 1184 },
    { sueldoBruto: 259978, deduccion: 946 },
    { sueldoBruto: 260129, deduccion: 709 },
    { sueldoBruto: 260279, deduccion: 473 },
    { sueldoBruto: 260430, deduccion: 236 },
    { sueldoBruto: 260580, deduccion: 0 }
];
}
}

let Liquidaciones = [];
let inptSueldoBruto = document.querySelector('#inptSueldoBruto');

getLiquidaciones()
cargarLiquidaciones();

function getLiquidaciones() {
    const datos = _getLiquidaciones();
    if (datos) {
        datos.forEach(item => {
            //desestructuración
            let { periodo, gananaciaNetaAnterior, retencionesAnteriores, bruto, conyuge, hijo } =  item
            Liquidaciones.push(new Liquidacion(periodo, parseFloat(gananaciaNetaAnterior), parseFloat(retencionesAnteriores), parseFloat(bruto), conyuge, hijo))
        });
    }
}

function _getLiquidaciones() {
    return  JSON.parse(window.localStorage.getItem('Liquidaciones'));
}

function _setLiquidaciones() {
    return  window.localStorage.setItem('Liquidaciones', JSON.stringify(Liquidaciones));
}

function cargarLiquidaciones() {
    let tabla = document.querySelector('#tabla');
    tabla.innerHTML = '';
    Liquidaciones.forEach(element => {
        let fila = document.createElement('tr')
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.periodo}`}));
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.bruto.toFixed(2)}`}));
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.neto.toFixed(2)}`}));
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.proporcionalAguinaldo.toFixed(2)}`}));    
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.impuesto.toFixed(2)}`}));
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.retencionesAnteriores.toFixed(2)}`}));
        fila.appendChild(Object.assign(document.createElement('td'), { innerText: `${element.retencion.toFixed(2)}`}));            
        tabla.appendChild(fila);
    });
}

function cargarLiquidacion(evt) {
    evt.preventDefault();

    if (Liquidaciones.length < 12) {
        if (!isNaN(parseFloat(inptSueldoBruto.value))) {
            let periodo = Liquidaciones.length + 1;
            let GanAcum = Liquidaciones.reduce((valor, item) => valor + item.gananaciaNeta, 0);
            let RetAcum = Liquidaciones.reduce((valor, item) => valor + item.retencion, 0);
            let SueldoBruto = parseFloat(inptSueldoBruto.value);    
            Liquidaciones.push(new Liquidacion(periodo, GanAcum, RetAcum, SueldoBruto, 0, 0));    
            _setLiquidaciones()
            cargarLiquidaciones()
            swal({
                text: "¡Carga exitosa!", 
                icon: "success",
                buttons: false,
                timer: 1000,
              });
        } else {
            swal({
                text: "Ingrese sueldo bruto",
                icon: "warning",
              });
        }
    } else {
        swal({
            text: "No se pueden ingresar mas de 12 liquidaciones al año.",
            icon: "warning",
          });
    }

    inptSueldoBruto.value = '';
    inptSueldoBruto.focus()
}

function Limpiar() {
    Liquidaciones = [];
    window.localStorage.clear();
    cargarLiquidaciones();
    inptSueldoBruto.value = '';
    inptSueldoBruto.focus()
}

















