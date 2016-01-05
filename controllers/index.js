(function (controllers) {

    var homeControllers = require("./homeController");
    var notesController = require("./notesController");

    controllers.init = function (app) {
        homeControllers.init(app);
        notesController.init(app);
    };

})(module.exports);