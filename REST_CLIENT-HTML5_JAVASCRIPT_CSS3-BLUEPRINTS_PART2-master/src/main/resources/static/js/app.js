//var api = apimock;
var api = apiclient;

var app = (function () {

    var _author = null;
    var _plano = null;
    var blueprint = null;

    var plansAuthor = function () {
        limpiarVista();
        console.log("consultar author");
        _author = document.getElementById("autor").value;
        api.getBlueprintsByAuthor(_author, _modifyTable);
    }

    var _modifyTable = function (variable) {
        if (variable != null) {
            var arreglo = variable.map(function (blueprint) {
                return {
                    key: blueprint.name,
                    value: blueprint.points.length
                }
            })

            $("#tabla tbody").empty();
            arreglo.map(function (blueprint) {
                var temporal = `<tr>
                                    <td id="nombreActor">  ${blueprint.key}</td>
                                    <td id="puntos">  ${blueprint.value}</td>
                                    <td type="button" class="button" onclick= " app.drawPlan('${blueprint.key}')">Open</td>
                                </tr>`;
                $("#tabla tbody").append(temporal);
            })

            if (arreglo.length > 1) {
                var valorTotal = arreglo.reduce(function (total, valor) {
                    return total.value + valor.value;
                });
            } else {
                var valorTotal = arreglo[0].value;
            }

            document.getElementById("autorLabel").innerHTML = _author;
            document.getElementById("puntosLabel").innerHTML = valorTotal;
        } else {
            console.log("no encontro autor");
            limpiarVista();
            alert("Autor no existe");
        }
    };

    var limpiarVista = function () {

        _author = null;
        _plano = null;
        $("#tabla tbody").empty();
        $("#puntosLabel").empty();
        $("#autorLabel").empty();
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        blueprint = null;
    }

    var updatebluesprint = function (autor) {
        api.getBlueprintsByAuthor(autor, _modifyTable);
    }

    var drawPlan = function (name) {
        _plano = name;
        api.getBlueprintsByNameAndAuthor(_author, _plano, _funcDraw);
    }


    var _funcDraw = function (vari) {
        if (vari) {
            blueprint = vari;
            var lastx = null;
            var lasty = null;
            var actx = null;
            var acty = null;
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");

            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();

            blueprint.points.map(function (prue) {
                if (lastx == null) {
                    lastx = prue.x;
                    lasty = prue.y;
                } else {
                    actx = prue.x;
                    acty = prue.y;
                    ctx.moveTo(lastx, lasty);
                    ctx.lineTo(actx, acty);
                    ctx.stroke();
                    lastx = actx;
                    lasty = acty;
                }
            });
        }
    }

    function addPoint(point) {
        if (_author != null && _plano != null) {
            blueprint.points.push(point);
            _funcDraw(blueprint);
        } else if (_author != null) {
            alert("Seleccione un plano")
        }
    }

    function save() {
        if (_author != null && _plano != null) {
            api.save(blueprint);
        }
    }

    function deletebluesprint() {
        if (_author != null && _plano != null) {
            api.deleteblueprint(blueprint);
        } else {
            if (author == null) {
                alert("Seleccione primero un autor y un plano")
            } else {
                alert("Seleccione un plano")
            }
        }
    }

    function createnewbluesprint() {
        if (_author != null) {
            var name = prompt("Deme el nombre del nuevo plano", "");
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);
            _plano = name;
            blueprint = null;
            api.createnewbluesprint(_author, name);
        } else {
            alert("Elija un autor");
        }

    }

    return {
        plansAuthor: plansAuthor,
        drawPlan: drawPlan,
        addPoint: addPoint,
        updatebluesprint: updatebluesprint,
        save: save,
        createnewbluesprint: createnewbluesprint,
        deletebluesprint: deletebluesprint
    };
})();