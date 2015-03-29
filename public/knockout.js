    var ViewModel = function(total, europe, northAmerica, southAmerica, asia, africa, australia) {
        var model = this;

        var mappingValues = {
                        africa: "Africa",
                        asia: "Asia",
                        australia: "Australia",
                        europe: "Europe",
                        northAmerica: "N. America",
                        southAmerica: "S. America",
        }

        var reverseMappingValues = {
                                "Africa" : "africa",
                                "Asia" : "asia",
                                "Australia" : "australia",
                                "Europe" : "europe",
                                "N. America" : "northAmerica" ,
                                "S. America" : "southAmerica"
                }

        var oldValues = {
            total: 0,
            continents: {
                "Africa": 1,
                "Asia": 0,
                "Australia": 0,
                "Europe": 0,
                "N. America": 0,
                "S. America": 0
            }
        }

        var newValues = {
                    total: 0,
                    continents: {
                        "Africa": 1,
                        "Asia": 0,
                        "Australia": 0,
                        "Europe": 0,
                        "N. America": 0,
                        "S. America": 0
                    }
                }

    model.total = ko.observable(total);
    model.europe = ko.observable(europe);
    model.northAmerica = ko.observable(northAmerica);
    model.southAmerica = ko.observable(southAmerica);
    model.asia = ko.observable(asia);
    model.africa = ko.observable(africa);
    model.australia = ko.observable(australia);


    function setNewColour(id, oldValue, newValue) {
        var newClass = oldValue == newValue ? "normal" : oldValue < newValue ? "up" : "down";
                $('#' + id).removeClass("up normal down");
                $('#' + id).addClass(newClass);
    }

    function setNewContinentValues() {
    for (continent in newValues.continents) {
                var oldV = parseInt(oldValues.continents[continent]);
                var newV = parseInt(newValues.continents[continent]);
                var continentMapped = reverseMappingValues[continent];

                setNewColour(continentMapped, oldV, newV);
                model[continentMapped](newV);
            }
            }

    function setNewTotal() {
    var oldTotal = parseInt(oldValues.total);
            var newTotal = parseInt(newValues.total);
            setNewColour("total", oldTotal, newTotal);
            model.total(newTotal);
    }

    function setValuesColour(newVal) {
        oldValues = newValues;
        newValues = newVal;

        setNewContinentValues()
        setNewTotal()
    }

     this.calculateNewTotals = function (obj) {
            setValuesColour(obj);
     };
};

var model = new ViewModel(0, 0, 0, 0, 0, 0, 0);
ko.applyBindings(model);