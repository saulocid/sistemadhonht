function agregarFormulario() {
    const cantidadPartidos = parseInt(document.getElementById('cantidad').value);
    const contenedor = document.getElementById('partidos');

    if (cantidadPartidos > 0) {
        contenedor.innerHTML = '';

        for (let i = 1; i <= cantidadPartidos; i++) {
            const nuevoFormulario = document.createElement('div');
            nuevoFormulario.classList.add('container-fluid');
            nuevoFormulario.classList.add('border');
            nuevoFormulario.classList.add('border-2');
            nuevoFormulario.classList.add('border-secondary');
            nuevoFormulario.classList.add('m-2');
            nuevoFormulario.classList.add('rounded-1');
            nuevoFormulario.innerHTML = `
                <label clas="mt-2" for="partido${i}">Partido ${i}</label><br>
                <input type="text" name="partido${i}" id="partido${i}" required><br>

                <label for="votos${i}">Total de votos</label><br>
                <input class="mb-2 votos" type="number" name="votos${i}" id="votos${i}" required><br>`;
            contenedor.appendChild(nuevoFormulario);
        }

        const boton = document.createElement("div");
        boton.innerHTML = `<button id=calcular" type="button" class="btn btn-dark m-1" onclick="calcular()">CALCULAR</button>
        <div id="tabla-final" containet-fluid></div>`;
        contenedor.appendChild(boton);

    }
}

function calcular() {
    const bancas = parseInt(document.getElementById("bancas").value);
    var divisorPartidos = [];
    var cantVotos = [];
    const tabla = document.getElementById("tabla-final");
    const cantidadPartidos = parseInt(document.getElementById('cantidad').value);
    var nombrePartido = [];

    for (let i = 1; i <= cantidadPartidos; i++) {
        divisorPartidos[i - 1] = 1;
        nombrePartido[i - 1] = document.getElementById(`partido${i}`).value;
        cantVotos[i - 1] = parseInt(document.getElementById(`votos${i}`).value);
    }

    for (let i = 1; i <= bancas; i++) {
        let max = maximo(cantidadPartidos, divisorPartidos, cantVotos);
        for (let j = 0; j < cantidadPartidos; j++) {
            if (max == cantVotos[j] / divisorPartidos[j]) {
                divisorPartidos[j]++;
            }
        }
    }

    boton = document.createElement("div");
    boton.innerHTML = `
    <div id="tabla" class="table table-info">
        <div class="row">
            <div class="col-6 col-md-6">
                <strong>PARTIDO</strong>
            </div>
            <div class="col-6 col-md-6">
                <strong>BANCAS</strong>
            </div>
        </div><br>
    </div>`;
    tabla.appendChild(boton);

    const tablaInterna = document.getElementById("tabla");
    for (let i = 1; i <= cantidadPartidos; i++) {
        const bancasTotales = document.createElement("div");
        bancasTotales.innerHTML = `
        <div class="table table-info">
            <div class="row">
                <div class="col-6 col-md-6">
                    ${nombrePartido[i - 1]}
                </div>
                <div class="col-6 col-md-6">
                    ${divisorPartidos[i - 1] - 1}
                </div>
            </div>
        </div>
        `
        tablaInterna.appendChild(bancasTotales);
    }

}

function maximo(cantidadPartidos, divisorPartidos, cantVotos) {
    let max = 0;
    for (let i = 0; i < cantidadPartidos; i++) {
        if (i == 0) {
            max = cantVotos[i] / divisorPartidos[i];
        } else if (cantVotos[i] / divisorPartidos[i] > max) {
            max = cantVotos[i] / divisorPartidos[i];
        }
    }
    return max;
}