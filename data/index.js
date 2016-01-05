(function (data) {

    var seedData = require("./seedData");
    var database = require("./database");

    data.getNoteCategories = function(next) {
        //next(null, seedData.initialNodes);
        database.getDb(function(err, db){
           if (err){
               next(err, null);
           } else {
               db.notes.find().sort({ name: 1 }).toArray(function(err, results){
                   if (err) {
                       next(err, null);
                   } else {
                       next(null, results);
                   }
               });
           }
        });
    };

    data.getNotes = function(categoryName, next) {
        database.getDb(function(err, db) {
            if (err) {
                next(err);
            } else {
                db.notes.findOne({ name: categoryName}, next);
            }
        });
    };

    data.addNote = function(categoryName, note, next) {
        database.getDb(function(err, db){
           if (err) {
               next(err);
           } else {
               db.notes.update({ name: categoryName }, { $push: { notes: note }}, next);
           }
        });
    }

    data.createNewCategory = function(categoryName, next){
        database.getDb(function(err, db){
            if (err) {
                next(err, null);
            } else {
                db.notes.find({ name: categoryName}).count(function(err, count) {
                    if (err) {
                        next(err, null);
                    } else {
                        if (count != 0){
                            next("Category already exists");
                        } else {
                            var cat = {
                                name: categoryName,
                                notes: []
                            };

                            db.notes.insert(cat, function(err){
                                if (err) {
                                    next(err);
                                }  else {
                                    next(null);
                                }
                            });
                        }
                    }
                });
            }
        });
    };

    function seedDatabase() {
        database.getDb(function(err, db){
            if (err) {
                console.log("Failed to seed db: " + err);
            } else {
                db.notes.count(function(err, count) {
                    if (err) {
                        console.log("Failed to retrieve db count");
                    } else {
                        if (count == 0) {
                            console.log("Seeding");
                            seedData.initialNodes.forEach(function (item){
                                db.notes.insert(item, function(err){
                                    if (err) console.log("Failed to insert note into db");
                                })
                            });
                        } else {
                            console.log("Already seeded");
                        }
                    }
                })
            }
        });
    }

    seedDatabase();

})(module.exports);