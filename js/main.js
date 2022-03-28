class Liquidacion {
  constructor(
    periodo,
    gananaciaNetaAnterior,
    retencionesAnteriores,
    bruto,
    conyuge,
    hijo
  ) {
    this.periodo = periodo;
    this.gananaciaNetaAnterior = gananaciaNetaAnterior;
    this.retencionesAnteriores = retencionesAnteriores;
    this.bruto = bruto;
    this.conyuge = conyuge;
    this.hijo = hijo;
  }
  get neto() {
    return this.bruto * descuentos;
  }
  get proporcionalAguinaldo() {
    return this.neto / 12;
  }
  get gananaciaNeta() {
    return this.neto + this.proporcionalAguinaldo;
  }
  get gananciaNoImponible() {
    return this.periodo * gananciaNoImponible;
  }
  get deduccionEspecial() {
    return this.periodo * deduccionEspecial;
  }

  get deduccionConyuge() {
    return this.periodo * this.conyuge * deduccionConyuge;
  }
  get deduccionHijo() {
    return this.periodo * this.hijo * deduccionHijo;
  }

  get deduccionEspecialIncrementada() {
    let respuesta = 0;
    let deduccion = deduccionesEspecialesIncrementadas.find(
      (item) => this.bruto < item.sueldoBruto
    );
    if (deduccion) {
      respuesta = deduccion.deduccion * this.periodo;
    }
    return respuesta;
  }

  get deducciones() {
    return (
      this.gananciaNoImponible +
      this.deduccionEspecial +
      this.deduccionEspecialIncrementada +
      this.conyuge +
      this.hijo
    );
  }
  get gananciaNetaSujetaAImpuesto() {
    return this.gananaciaNeta + this.gananaciaNetaAnterior - this.deducciones >
      0
      ? this.gananaciaNeta + this.gananaciaNetaAnterior - this.deducciones
      : 0;
  }
  get escala() {
    return escalas.find(
      (item) =>
        this.gananciaNetaSujetaAImpuesto >= item.desde * this.periodo &&
        this.gananciaNetaSujetaAImpuesto <= item.hasta * this.periodo
    );
  }
  get impuesto() {
    return (
      this.escala.fijo * this.periodo +
      this.escala.alicuota *
        (this.gananciaNetaSujetaAImpuesto - this.escala.desde * this.periodo)
    );
  }
  get retencion() {
    return this.impuesto - this.retencionesAnteriores;
  }
}

const descuentos = 0.83;
const gananciaNoImponible = 21047.07;
const deduccionEspecial = 101025.94;
const deduccionConyuge = 19621.43;
const deduccionHijo = 9895.16;
const deduccionesEspecialesIncrementadas = [];
const escalas = [];
const liquidaciones = [];
const inptSueldoBruto = document.querySelector("#inptSueldoBruto");

const obtenerDeduccionesEspecialesIncrementadas = async () => 
{
  const res = await fetch("datos/deduccionesEspecialesIncrementadas.json");
  const data = res.json();
  return data
}

const obtenerEscalas = async () => {
  const res = await fetch("datos/escalas.json");
  const data = res.json();
  return data
}

const obtenerParametros = async () => {
  const deis = await obtenerDeduccionesEspecialesIncrementadas()
  const escs = await obtenerEscalas()

  deis.forEach(dei => deduccionesEspecialesIncrementadas.push(dei))
  escs.forEach(esc => escalas.push(esc))

  obtenerLiquidaciones()
  cargarLiquidaciones();
}

const obtenerLiquidaciones = () => {
  const datos = JSON.parse(window.localStorage.getItem("Liquidaciones"));
  if (datos) {
    datos.forEach((item) => {
      let {
        periodo,
        gananaciaNetaAnterior,
        retencionesAnteriores,
        bruto,
        conyuge,
        hijo,
      } = item;
      liquidaciones.push(
        new Liquidacion(
          periodo,
          parseFloat(gananaciaNetaAnterior),
          parseFloat(retencionesAnteriores),
          parseFloat(bruto),
          conyuge,
          hijo
        )
      );
    });
  }
}

const cargarLiquidaciones = () => {
  let tabla = document.querySelector("#tabla");
  tabla.innerHTML = "";
  liquidaciones.forEach((element) => {
    let fila = document.createElement("tr");
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.periodo}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.bruto.toFixed(2)}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.neto.toFixed(2)}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.proporcionalAguinaldo.toFixed(2)}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.impuesto.toFixed(2)}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.retencionesAnteriores.toFixed(2)}`,
      })
    );
    fila.appendChild(
      Object.assign(document.createElement("td"), {
        innerText: `${element.retencion.toFixed(2)}`,
      })
    );
    tabla.appendChild(fila);
  });
}

const cargarLiquidacion = (evt) => {
  evt.preventDefault();

  if (liquidaciones.length < 12) {
    if (!isNaN(parseFloat(inptSueldoBruto.value))) {
      let periodo = liquidaciones.length + 1;
      let GanAcum = liquidaciones.reduce(
        (valor, item) => valor + item.gananaciaNeta,
        0
      );
      let RetAcum = liquidaciones.reduce(
        (valor, item) => valor + item.retencion,
        0
      );
      let SueldoBruto = parseFloat(inptSueldoBruto.value);
      liquidaciones.push(
        new Liquidacion(periodo, GanAcum, RetAcum, SueldoBruto, 0, 0)
      );
      window.localStorage.setItem("Liquidaciones", JSON.stringify(liquidaciones))
      cargarLiquidaciones();
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

  inptSueldoBruto.value = "";
  inptSueldoBruto.focus();
}

const Limpiar = () => {
  liquidaciones.length = 0;
  window.localStorage.clear();
  cargarLiquidaciones();
  inptSueldoBruto.value = "";
  inptSueldoBruto.focus();
}

obtenerParametros()
