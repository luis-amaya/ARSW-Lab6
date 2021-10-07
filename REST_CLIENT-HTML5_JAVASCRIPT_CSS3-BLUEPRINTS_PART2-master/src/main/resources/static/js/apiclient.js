var apiclient = (function () {

    var _url = "http://localhost:8080/blueprints/";

    var getBlueprintsByAuthor = function (author, callback) {
        var _urlSend = _url + author;
        $.get(_urlSend, function (data) {
            callback(data);
        }).fail(function () {
            callback(null);
        });
    };

    var getBlueprintsByNameAndAuthor = function (author, nameBlueprint, callback) {
        var _urlSend = _url + author + "/" + nameBlueprint;
        $.get(_urlSend, function (data) {
            callback(data);
        });
    };

    var save = function (blueprint) {
        var _urlSend = `${_url}${blueprint.author}/${blueprint.name}`;
        console.log(_urlSend);
        console.log(JSON.stringify(blueprint));
        var updatebluesprint = $.ajax({
            type: "PUT",
            url: _urlSend,
            data: JSON.stringify(blueprint),
            contentType: "application/json",
        }).then(
            function () {
                app.updatebluesprint(blueprint.author);
            },
            function () {
                console.log("Error");
            }
        );
        return updatebluesprint;
    }

    var createnewbluesprint = function (author, name) {
        var blueprint = `{"author":"${author}","name":"${name}","points":[] }`
        return $.ajax({
                url: _url,
                type: "POST",
                data: blueprint,
                contentType: "application/json",
            })
            .then(
                function () {
                    app.updatebluesprint(author);
                    app.drawPlan(name);
                },
                function () {
                    console.log("Error");
                }
            );
    };

    var deleteblueprint = function (blueprint) {
        var _urlSend = `${_url}${blueprint.author}/${blueprint.name}`;
        return $.ajax({
            url: _urlSend,
            type: "DELETE",
            contentType: "application/json",
        }).then(
            function () {
                alert("Se ha eliminado el plano" + blueprint.name);
                app.updatebluesprint(blueprint.author);
            },
            function () {
                console.log("Error");
            }
        );
    };


    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor,
        save: save,
        createnewbluesprint: createnewbluesprint,
        deleteblueprint: deleteblueprint
    };
})();