var lookup = {};
lookup.customObjects = {};
lookup.omniBoxTextInput = ko.observable("");

lookup.omniBoxTextInput
    .extend({ rateLimit: 100 });


lookup.somethingChanged = ko.observable(0);

lookup.filteredSearch = ko.computed(
    function()
    {
        var changeOccured = lookup.somethingChanged();
        var searchQuery = lookup.omniBoxTextInput().trim().toLowerCase();
        var filtered = [];
        const availableKeys = Object.keys(lookup.customObjects);

        const non_statements = ko.utils.arrayFilter(availableKeys, function(key)
            {
                const obj = lookup.customObjects[key];
                return obj.type !== "rdf-statement";
            });

        const mapped = ko.utils.arrayMap(non_statements, function(key) {
            const obj = lookup.customObjects[key];
            var name = "";
            if(lookup.isFieldPresent(obj, "name"))
            {
                name = obj["name"]();
            }
            if(typeof(name) === "undefined" || name === "")
            {
                name = "no-name " + obj.id;
            }
            
            return { 
                id: key, 
                text: name
            };
            
        });

        if(searchQuery === "")
        {
            filtered = mapped;
        }
        else
        {
            filtered = ko.utils.arrayFilter(mapped, function(item)
            {
                return item.text.toLowerCase().indexOf(searchQuery) >= 0;
            });
        }

        filtered = filtered.map(element => { 

            const index = element.text.toLowerCase().indexOf(searchQuery);
            const new_text = element.text.substring(index - 50, index + 50);
            element.text = new_text;
            return element;
        });

        return filtered;
    }
);



lookup.operations = [];

lookup.operationsPush = function(some)
{
    lookup.operations.push(some);
    var toSerialize = {};
    for (const [key, value] of Object.entries(lookup.customObjects)) {
        var toAdd = {};
        for (const [keyInner, valueInner] of Object.entries(value)) {
            if(typeof(valueInner) === 'function')
            {
                toAdd[keyInner] = valueInner();
            }else
            {
                if(keyInner === "splitted")
                {
                    continue;
                }
                if(keyInner === "local_lookup")
                {
                    continue;
                }
                if(keyInner === "reserved_lookup")
                {
                    continue;
                }
                toAdd[keyInner] = valueInner;
            }
        }
        toSerialize[key] = toAdd;
    }
    var data = JSON.stringify(toSerialize);
    localStorage.setItem('customObjects', data);
    lookup.somethingChanged(lookup.somethingChanged() + 1);
};

lookup.loadFromStorage = function()
{
    lookup.localStorage = localStorage;
    var stored = localStorage.getItem('customObjects');
    if(typeof(stored) !== 'undefined' && stored != null)
    {
        var parsed = JSON.parse(stored);
        for (const [key, value] of Object.entries(parsed)) 
        {
            lookup.tryRestoreOffsetCoordinates(value);
            if(typeof(value.type) !== 'undefined')
            {
                if(value.type === "rdf-predicate") 
                {
                    lookup.customObjects[key] = lookup.try_restore_RDF_predicate(value);
                }
                if(value.type === "rdf-entry") 
                {
                    lookup.customObjects[key] = lookup.try_restore_RDF_entry(value);
                }
                if(value.type === "rdf-statement") 
                {
                    lookup.customObjects[key] = lookup.try_restore_RDF_statement(value);
                }
            }
            lookup.somethingChanged(lookup.somethingChanged() + 1);
        }
    }
    
};

lookup.tryRestoreOffsetCoordinates = function(value)
{
    if(typeof(value.offsetX) === "undefined")
    {
        value.offsetX = ko.observable(0);
    }
    else
    {
        value.offsetX = ko.observable(value.offsetX);
    }
    if(typeof(value.offsetY) === "undefined")
    {
        value.offsetY = ko.observable(0);
    }
    else
    {
        value.offsetY = ko.observable(value.offsetY);
    }
    value.inWorldOffsetX = ko.computed(function()
    {
        return value.offsetX() + lookup.globalOffsetX();
    });

    value.inWorldOffsetY = ko.computed(function()
    {
        return value.offsetY() + lookup.globalOffsetY();
    });
    value.box = ko.computed(function(){
        var x = value.inWorldOffsetX();
        var y = value.inWorldOffsetY();
        const anchorWidth = lookup.anchorWidth();
        const margin = anchorWidth ;
    
        var box = {};
        var bb = lookup.getUIBoxOfElement(value, margin);
        box.left = x;
        box.top = y;
        box.width = 10;
        box.height = 10;
        
        if(typeof(bb) !== 'undefined')
        {
            box.width = bb.width;
            box.height = bb.height;
            box.left = bb.left + lookup.globalOffsetX();
            box.top = bb.top + + lookup.globalOffsetY();
        }
        
        return box;
    });
};

lookup.restore_RDF_predicates_array = function()
{
    for (const [key, value] of Object.entries(lookup.customObjects)) 
    {
        if(typeof(value.type) !== 'undefined')
        {
            if(value.type === "rdf-predicate" )
            {
                lookup.rdf_predicates_Array.push(value);
            }
        }
    }
};


//this is my personal list of people who inspire me
lookup.defaultNamesForFunctions =
[
    "Edsger Dijkstra",
    "Alan Mathison Turing",
    "Alan Kay (Smalltalk)",
    "Dan Ingalls (Smalltalk)", 
    "Adele Goldberg (Smalltalk)", 
    "Ted Kaehler (Smalltalk)", 
    "Diana Merry (Smalltalk)", 
    "Scott Wallace (Smalltalk)", 
    "Peter Deutsch (Smalltalk)",
    "Xerox PARC (Smalltalk)",
    "John McCarthy (Lisp)",
    "Steve Russell (Lisp)", 
    "Timothy P. Hart (Lisp)",
    "Mike Levin (Lisp)",
    "Joe Armstrong (Erlang)",
    "Robert Virding (Erlang)",
    "Mike Williams (Erlang)",
    "Bret Victor (The Future of Programming talk)",
    "Carl Hewitt (Actor model, Planner)",
    "Alain Colmerauer (Prolog)", 
    "Robert Kowalski (Prolog)",
    "Niklaus Wirth (Pascal)",
    "Leonardo da Vinci",
    "Donato di Niccolo di Betto Bardi",
    "Raffaello Sanzio da Urbino",
    "Michelangelo di Lodovico Buonarroti Simoni",
    "Premature optimization is the root of all evil - Sir Tony Hoare",
    "Do not think without examples - Oleksandr Kryvonos"
];

lookup.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  };

lookup.try_restore_RDF_predicate = function(value)
{
    value.name = ko.observable(value.name);
    value.statements = ko.observableArray(value.statements);
    return value;
};

lookup.try_restore_RDF_entry = function(value)
{
    value.name = ko.observable(value.name);
    value.statements = ko.observableArray(value.statements);
    value.newVersionExists = ko.observable(false);
    value.newName = ko.observable("");
    lookup.restore_splitted_view(value);
    return value;
};

lookup.try_restore_RDF_statement = function(value)
{
    value.predicate_id = ko.observable(value.predicate_id);
    value.value_id = ko.observable(value.value_id);
    value.statements = ko.observableArray(value.statements);
    return value;
};

lookup.getCurrentDateTimeString = function()
{
    var currentdate = new Date(); 
    const timeZone = currentdate.getTimezoneOffset()/(-60);
    var timeZoneString = "";
    if(timeZone > 0)
    {
        timeZoneString = " (+" + timeZone + ")";
    }
    if(timeZone < 0)
    {
        timeZoneString = " (-" + timeZone + ")";
    }
    var day = currentdate.getDate();
    if(day < 10)
    {
        day = "0" + day;
    }
    var month = currentdate.getMonth() + 1;
    if(month < 10)
    {
        month = "0" + month;
    }
    var datetime = 
        currentdate.getFullYear() + "-"
        + month + "-"
        + day + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds()
        + timeZoneString;
    return datetime;
};

lookup.createUIObject = function()
{
    var guid = lookup.uuidv4();
    
    var toAdd = {
        id: guid,
        creation_time: lookup.getCurrentDateTimeString()
    };
    lookup.tryRestoreOffsetCoordinates(toAdd);

    lookup.customObjects[guid] = toAdd;
    return toAdd;
};


lookup.open_rdf_entry_by_name = function(word_object)
{
    if( !lookup.allow_to_open_definition() )
    {
        return true;
    }
    event.stopPropagation();
    const name = word_object.word;
    const rdf_entry_id = lookup.find_or_create_rdf_entry_with_name(name);
    const rdf_entry = lookup.customObjects[rdf_entry_id];
    var ui_object = document.getElementById(word_object.id);
    const main_rdf_entry = lookup.customObjects[ui_object.offsetParent.id];
    const offset_X = main_rdf_entry.offsetX();
    const offset_Y = main_rdf_entry.offsetY();
    var offset =  
    {
        x:  offset_X + ui_object.offsetParent.offsetWidth,
        y:  offset_Y + ui_object.offsetTop
    };
    lookup.desiredOffset = offset;
    console.log(offset);
    lookup.openElement(rdf_entry);
};

lookup.names_lookup = {};


lookup.create_RDF_Entry = function(name)
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "rdf-entry";
    toAdd.name = ko.observable(name);
    toAdd.statements = ko.observableArray([]);
    toAdd.newVersionExists = ko.observable(false);
    toAdd.newName = ko.observable("");

    lookup.restore_splitted_view(toAdd);
    

    var operation = 
    {
        operation: "create-rdf-entry",
        id: toAdd.id,
        name: name
    };
    lookup.operationsPush(operation);
    return toAdd;
};

lookup.create_and_show_RDF_entry = function(name)
{
    var toShow = lookup.create_RDF_Entry(name);
    lookup.openElement(toShow);
    lookup.hideOmniBox();
};

lookup.define_rdf_statement = function(predicate, objId)
{
    var toAdd = lookup.define_full_rdf_statement(objId, lookup.find_or_create_rdf_predicate(predicate), undefined);
    
    var operation = 
    {
        operation: "define-rdf-statement-with-predicate-only",
        id: toAdd.id,
        "predicate-text": predicate,
        predicate_id: toAdd.predicate_id(),
        object_id: objId
    };
    lookup.operationsPush(operation);
    return toAdd.id;
};


lookup.rdf_predicates_Array = ko.observableArray([]);

lookup.filtered_rdf_predicates_Array = ko.computed(function()
{
    var searchQuery = lookup.omniBoxTextInput().trim().toLowerCase();
    var filtered = [];

    const mapped = ko.utils.arrayMap(lookup.rdf_predicates_Array(), function(obj) {
        var name = obj["name"]();
        return { 
            id: obj.id, 
            text: name
        };
    });

    if(searchQuery === "")
    {
        filtered = mapped;
    }
    else
    {
        filtered = ko.utils.arrayFilter(mapped, function(item)
        {
            return item.text.toLowerCase().indexOf(searchQuery) >= 0;
        });
    }

    return filtered;
});

lookup.find_or_create_rdf_predicate = function(predicate)
{
    const predicateNameInLowerCase = predicate.toLowerCase();
    var filtered = ko.utils.arrayFilter(lookup.rdf_predicates_Array(), function(item)
        {
            return lookup.customObjects[item.id].name().toLowerCase() === predicateNameInLowerCase;
        });
    if(filtered.length === 1)
    {
        return filtered[0].id;
    }
    else
    {
        return lookup.create_RDF_predicate(predicate);
    }

};

lookup.find_or_create_rdf_entry_with_name = function(entry_name)
{
    const nameInLowerCase = entry_name.toLowerCase();
    const objects = Object.entries(lookup.customObjects);
    var filtered = objects.filter(function(entry)
    {
        const item = entry[1];
        return  (
                        item.type === "rdf-entry" 
                    ||  item.type === "rdf-predicate"
                ) &&
                item.name().toLowerCase() === nameInLowerCase;
    });
    if(filtered.length > 0)
    {
        return filtered[0][1].id;
    }
    else
    {
        var object = lookup.create_RDF_Entry(entry_name);
        return object.id;
    }
};

lookup.create_RDF_predicate = function(predicate_name)
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "rdf-predicate";
    toAdd.name = ko.observable(predicate_name);
    toAdd.statements = ko.observableArray([]);

    var operation = 
    {
        operation: "create-rdf-predicate",
        id: toAdd.id,
        predicate_name: predicate_name
    };

    lookup.rdf_predicates_Array.push(toAdd);

    lookup.operationsPush(operation);
    return toAdd.id;
}


lookup.uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

lookup.activeOperation = ko.observable("");


lookup.focusedObj = ko.observable({});

lookup.isOmniBoxOpen = ko.computed(function()
{
    return lookup.activeOperation() !== "" ;
});



lookup.add_statement_predicate_to_rdf_entry = function(name, rdf_object_in_focus)
{
    // [lives-in] [Odesa]
    // I decided that by convention every rdf-entry and rdf-predicate will have a name field

    var obj = rdf_object_in_focus || lookup.focusedObj();
    const predicateName = name || lookup.omniBoxTextInput().trim();
    if(predicateName === "")
        return;
    var toAdd_id = lookup.define_rdf_statement(predicateName, obj.id);
    obj.statements.push(toAdd_id);
    var operation = 
    {
        operation: "add-rdf-statement-to-rdf-entry",
        statement_id: toAdd_id,
        object_id: obj.id
    };
    lookup.operationsPush(operation);
    lookup.hideOmniBox();
    return toAdd_id;

};

lookup.add_maybe_existing_RDF_value_in_statement = function()
{
    var obj = lookup.focusedObj();
    const rdf_name = lookup.omniBoxTextInput().trim();
    if ( typeof(obj.value_id()) === 'undefined')
    {
        var value_id = lookup.find_or_create_rdf_entry_with_name(rdf_name);
        obj.value_id(value_id);
        var operation = 
        {
            operation: "complete-rdf-statement-with-previously-missing-value",
            statement_id: obj.id,
            value_id: value_id,
            value_name: rdf_name
        };
        lookup.operationsPush(operation);
    }


    lookup.hideOmniBox();

};

lookup.add_existing_RDF_value_to_statement_from_omnibox_list = function(filtered_rdf_entry, rdf_statemnt_object_in_focus)
{
    var obj = rdf_statemnt_object_in_focus || lookup.focusedObj();
    if ( typeof(obj.value_id()) === 'undefined')
    {
        const value_id = filtered_rdf_entry.id;
        obj.value_id(value_id);
        var operation = 
        {
            operation: "complete-rdf-statement-with-previously-missing-value",
            statement_id: obj.id,
            value_id: value_id,
            value_name: filtered_rdf_entry.text
        };
        lookup.operationsPush(operation);
    }


    lookup.hideOmniBox();
}


lookup.add_name_to_rdf_entry = function()
{
    var obj = lookup.focusedObj();
    const rdf_name = lookup.omniBoxTextInput().trim();
    if ( typeof(obj.name()) === 'undefined')
    {
        obj.name(rdf_name);
        var operation = 
        {
            operation: "add-name-to-rdf-entry",
            object_id: obj.id,
            object_name: rdf_name
        };
        lookup.operationsPush(operation);
    }


    lookup.hideOmniBox();

};

lookup.listOfOpenElements = ko.observableArray([]);
lookup.mapOfOpenElements = {};
lookup.closeElement = function(obj)
{
    delete lookup.mapOfOpenElements[obj.id];
    lookup.listOfOpenElements.remove(obj);
};

lookup.openElement = function(obj)
{
    lookup.closeElement(obj);
    lookup.tryRestoreOffsetCoordinates(obj);
    if(typeof(lookup.mapOfOpenElements[obj.id]) === "undefined")
    {
        lookup.listOfOpenElements.push(obj);
        lookup.mapOfOpenElements[obj.id] = true;
    }
    if(typeof(lookup.desiredOffset) !== "undefined")
    {
        obj.offsetX(lookup.desiredOffset.x);
        obj.offsetY(lookup.desiredOffset.y);
        console.log("set coordinates to desired offset: " + JSON.stringify(lookup.desiredOffset));
        lookup.desiredOffset = undefined;
    }
    else
    {
        var foundAnchor = lookup.findAnchor();
        const newLocalX = -lookup.globalOffsetX() + foundAnchor.offsetLeft;
        obj.offsetX(newLocalX);
        const newLocalY = -lookup.globalOffsetY() + foundAnchor.offsetTop;
        obj.offsetY(newLocalY);
        console.log("set coordinates to anchor offsetted:" + JSON.stringify({x: newLocalX, y: newLocalY}  ));
    }
    console.log("finished openElement");
};


lookup.timerForFunctions = undefined;

lookup.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};

lookup.normalizeVector = function(point)
{
    var newLength = Math.sqrt(lookup.vectorLengthSquared(point));
    point.x /= newLength;
    point.y /= newLength;
    return point;
};

lookup.alignOffset = function(point)
{
    if(Math.abs(point.x) > Math.abs(point.y) )
    {
        point.y = 0;
    }
    else
    {
        point.x = 0;
    }
    point = lookup.normalizeVector(point);
    return point;
};

lookup.moveElementsOnCanvasIteration = function()
{
    var elements = lookup.listOfOpenElements();
    const anchorWidth = lookup.anchorWidth();
    const margin = anchorWidth ;
    for (const [key, value] of Object.entries(elements)) 
    {
        var box = lookup.getUIBoxOfElement(value, margin);
        if(typeof(box) === "undefined")
        {
            continue;
        }
        
        for (const [innerKey, innerValue] of Object.entries(elements)) 
        {
            if(value.id == innerValue.id)
            {
                continue;
            }
            var boxToAvoid = lookup.getUIBoxOfElement(innerValue, margin);
            if(typeof(boxToAvoid) === "undefined")
            {
                continue;
            }
            
            if(lookup.doBoxesIntersect(box, boxToAvoid))
            {
                offset = lookup.getMinimalOffsetForBox(box, boxToAvoid, 0);
                if(lookup.vectorLengthSquared(offset) > 0)
                {
                    offset = lookup.normalizeVector(offset);
                    var factor = anchorWidth / 10.0;
                    offset.x *= factor;
                    offset.y *= factor;
                    value.offsetX(value.offsetX() + offset.x);
                    value.offsetY(value.offsetY() + offset.y);
                }
            }
        }
    }

};

lookup.defineTimerForFunctions = function()
{
    lookup.timerForFunctions = setInterval(lookup.moveElementsOnCanvasIteration, 30);
};


lookup.filloutOmniBoxDataForFunction = function(callerId, omniBox, root) 
{
    var foundUI = $("#" + callerId)[0];
    omniBox.visible(true);
    var offsetX = foundUI.offsetLeft;
        offsetX += root.offsetX();
    omniBox.left(offsetX );
    var offsetY = foundUI.offsetTop + foundUI.offsetHeight ;
        offsetY += root.offsetY();
    omniBox.top(offsetY);

    $("#" + omniBox.id ).focus();
    event.stopPropagation();
};

lookup.filloutGlobalOmniBox = function(omniBox, offset) 
{
    lookup.focusedObj(undefined);
    lookup.activeOperation("global-omni-box-activated");
    var foundAnchor = lookup.findAnchor();
    omniBox.visible(true);
    var offsetX = offset.x;
        offsetX -= lookup.globalOffsetX();
    omniBox.left(offsetX );
    var offsetY = offset.y;
        offsetY -= lookup.globalOffsetY();
    omniBox.top(offsetY);

    lookup.desiredOffset = {
        x: offsetX,
        y: offsetY
    };

    $("#" + omniBox.id ).focus();
    event && event.stopPropagation();
};

lookup.getUIBoxOfElement = function(obj, margin = 0.0)
{
    var objId = obj.id
    var foundUI = $("#" + objId)[0];
    if(typeof(foundUI) === "undefined")
    {
        return undefined;
    }
    else
    {
        var toReturn = 
        {
            left: obj.offsetX() - margin,
            top: obj.offsetY() - margin,
            width: foundUI.offsetWidth + 2 * margin,
            height: foundUI.offsetHeight + 2 * margin
        };
        return toReturn;

    }
    
};

lookup.isPointInsideTheBox = function(point, box, margin = 0)
{
    var result =
        point.x >= (box.left - margin)
        && point.x <= (box.left + box.width + margin)  
        && point.y >= (box.top - margin)
        && point.y <= (box.top + box.height + margin);
    return result;
};

lookup.generateCornersOfTheBox = function(box)
{
    var result = [
        {
            x: box.left,
            y: box.top
        },
        {
            x: box.left + box.width,
            y: box.top
        },
        {
            x: box.left,
            y: box.top + box.height
        },
        {
            x: box.left + box.width,
            y: box.top + box.height
        }
    ];
    return result;
};

lookup.doBoxesIntersect = function(firstBox, secondBox)
{
    var firstCorners = lookup.generateCornersOfTheBox(firstBox);
    var resultFirst = firstCorners.find(point => lookup.isPointInsideTheBox(point, secondBox, margin=1));
    if(typeof(resultFirst) === "undefined")
    {
        var secondCorners = lookup.generateCornersOfTheBox(secondBox);
        var resultSecond = secondCorners.find(point => lookup.isPointInsideTheBox(point, firstBox, margin=1));
        if(typeof(resultSecond) === "undefined")
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        return true;
    }

};

lookup.getVectorsFromBox = function(point, box, margin)
{
    var result = [
        lookup.createVector(point, {x: point.x, y: box.top - margin}), // to Up
        lookup.createVector(point, {x: point.x, y: box.top + box.height + margin}), // to Bottom
        lookup.createVector(point, {x: box.left - margin, y: point.y}), // to Left
        lookup.createVector(point, {x: box.left + box.width + margin, y: point.y}) // to Right
    ];
    return result;
    
};

lookup.generateVectors = function(point, otherPoints)
{
    var result = [];
    for (const [key, somePoint] of Object.entries(otherPoints)) 
    {
        result.push(lookup.createVector(point, somePoint));
    }
    return result;
};

lookup.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};

lookup.vectorLength = function(v)
{
    var result = Math.sqrt(lookup.vectorLengthSquared(v));
    return result;
};

lookup.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};

lookup.vectorsAreCoAligned = function(bv, obv)
{
    var dp = lookup.vectorsDotProduct(bv, obv);
    var cosAlpha = dp / (lookup.vectorLength(bv) * lookup.vectorLength(obv));
    var result = lookup.epsilonEqual(cosAlpha, 1.0);
    return result;
};


lookup.getMinimalOffsetForBox = function(firstBox, secondBox, margin)
{
    var offsets = []; 
    var firstBoxCorners = lookup.generateCornersOfTheBox(firstBox);
    for (const [key, pointF] of Object.entries(firstBoxCorners)) 
    {
        if(lookup.isPointInsideTheBox(pointF, secondBox, margin=2))
        {
            var escapesFromSecondBox = lookup.getVectorsFromBox(pointF, secondBox, margin=2);
            var firstBoxVectors = lookup.getVectorsFromBox(pointF, firstBox, margin=0);
            for (const [key, escapeV] of Object.entries(escapesFromSecondBox)) 
            {
                for (const [key, firstV] of Object.entries(firstBoxVectors)) 
                {
                    if(lookup.vectorLengthSquared(firstV) > 0.1)
                    {
                        if(lookup.vectorsAreCoAligned(escapeV, firstV))
                        {
                            offsets.push(escapeV);
                        }
                    }
                }
            }
        }
    }
    if(offsets.length == 0)
    {
        return {x: 0, y: 0};
    }
    else
    {
        var minimalOffset = offsets[0];
        for (const [key, o] of Object.entries(offsets)) 
        {
            if(lookup.vectorLengthSquared(o) < lookup.vectorLengthSquared(minimalOffset))
            {
                minimalOffset = o;
            }
        }
        return minimalOffset;
    }
    
};

lookup.createVector = function(a, b)
{
    var result = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    return result;
    
};

lookup.vectorBetweenBoxes = function(firstBox, secondBox)
{
    var a = 
    { 
        x: firstBox.left + firstBox.width / 2,
        y: firstBox.top + firstBox.height / 2
    };

    var b =
    {
        x: secondBox.left + secondBox.width / 2,
        y: secondBox.top + secondBox.height / 2
    };
    var v = lookup.createVector(a, b);
    return v;

};

lookup.desiredOffset = {x: 0, y: 0};

lookup.calledObj = undefined;

lookup.showBorders = ko.observable(false);

lookup.toggleShowBorders = function()
{
    lookup.showBorders(!lookup.showBorders());
};

lookup.open_OmniBox_for_adding_statement_to_rdf_entry = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("add-statement-predicate-to-rdf-entry");

    lookup.filloutOmniBoxDataForFunction('add-statement-to-rdf-entry--' + caller.id, lookup.canvasOmniBox, caller);
};

lookup.open_OmniBox_for_adding_name_to_rdf_entry = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("add-name-to-rdf-entry");

    lookup.filloutOmniBoxDataForFunction('add-rdf-entry-name-value--' + caller.id, lookup.canvasOmniBox, caller);
};

lookup.open_OmniBox_for_RDF_value_in_statement = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("add_RDF_value_in_statement");

    var root = lookup.findRoot(caller);

    lookup.filloutOmniBoxDataForFunction('add-RDF-value-in-statement--' + caller.id, lookup.canvasOmniBox, root);

};

lookup.hideOmniBox = function()
{
    lookup.canvasOmniBox.visible(false);
    lookup.focusedObj(undefined);
    lookup.activeOperation("");
    lookup.omniBoxTextInput("");
};


lookup.omniBox_open_predicate_definition_from_statement = function()
{
    var predicateToOpen = lookup.focusedObj();
    lookup.hideOmniBox();
    lookup.hideMenu();
    lookup.hideOptions();
    event.stopPropagation();
    lookup.openElement(predicateToOpen);
};

lookup.omniBox_open_value_definition_from_statement = function()
{
    var valueToOpen = lookup.focusedObj();
    lookup.hideOmniBox();
    lookup.hideMenu();
    lookup.hideOptions();
    event.stopPropagation();
    lookup.openElement(valueToOpen);
};




lookup.openFunctionDefinitionFromOmniBox = function(obj)
{
    event.stopPropagation();
    lookup.hideOmniBox();
    var functionToOpen = lookup.customObjects[obj.id];
    lookup.openElement(functionToOpen);
};

lookup.add_existing_RDF_predicate_from_omnibox = function(obj)
{
    event.stopPropagation();
    lookup.add_statement_predicate_to_rdf_entry(obj.text);
    lookup.hideOmniBox();
};

lookup.omniBoxClick = function()
{
    event.stopPropagation();
};

lookup.stopPropagation = function()
{
    event.stopPropagation();
};

lookup.stopPropagation2 = function(data, event)
{
    event.stopPropagation();
};


lookup.omniBoxInputKeyDown = function(data, event)
{
    //console.log(event.originalEvent);
    if(event.originalEvent.code == "Tab")
    {
        // const availableFunctions = lookup.functionsLookup();
        // if(availableFunctions.length === 1)
        // {
        //     var autocompleteName = lookup.customObjects[availableFunctions[0].id].name();
        //     lookup.omniBoxTextInput(autocompleteName);
        //     event.stopPropagation();
        //     return false;
        // }
    }
    return true;
};

lookup.create_RDF_entry_with_name_from_omnibox = function()
{

    const name = lookup.omniBoxTextInput().trim();
    if(name.length === 0)
        return;

    lookup.create_and_show_RDF_entry(name);
};

lookup.omniBoxInputKeyPress = function(data, event) 
{
    if(event.shiftKey && event.keyCode === 13)
    {
        if(lookup.activeOperation() === "global-omni-box-activated")
        {
            lookup.create_RDF_entry_with_name_from_omnibox();
        }

    }
    else
    {
        if(event.keyCode == 13)
        {
            if(lookup.activeOperation() === "add-statement-predicate-to-rdf-entry")
            {
                lookup.add_statement_predicate_to_rdf_entry();
            }
            else if(lookup.activeOperation() === "add_RDF_value_in_statement") 
            {
                lookup.add_maybe_existing_RDF_value_in_statement();
            }
            else if(lookup.activeOperation() === "add-name-to-rdf-entry")
            {
                lookup.add_name_to_rdf_entry();
            }
            else if(lookup.activeOperation() === "global-omni-box-activated")
            {
                const availableEntries = lookup.filteredSearch();
                var searchQuery = lookup.omniBoxTextInput().trim().toLowerCase();
                const exactMatch = availableEntries.filter(entry => entry.text === searchQuery);
                if(exactMatch.length > 0)
                {
                    var functionToOpen = lookup.customObjects[exactMatch[0].id];
                    lookup.openElement(functionToOpen);
                    lookup.hideOmniBox();
                }
                else
                {
                    lookup.create_RDF_entry_with_name_from_omnibox();
                }
            }
        }
        else
        {
            //console.log(event.keyCode);
        }
    }
    return true;
};

lookup.omniBoxInputKeyUp = function( data, event)
{
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lookup.hideOmniBox();
    }
    event.stopPropagation();
};

lookup.allow_to_open_definition = ko.observable(false);

lookup.bodyKeyDown = function( data, event)
{
    // turns out Firefox has a bug 
    // see https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
    if (event.isComposing || event.keyCode === 229) {
        console.log("Fixign composing bug in Firefox")
        return;
    }
    console.log(event.code);
    if(event.code === "Escape")
    {
        lookup.hideOmniBox();
        lookup.hideMenu();
    }
    if(event.code === "KeyI" && !lookup.isOmniBoxOpen())
    {
        lookup.toggleMenu();
    }

    if(event.code === "KeyO" && !lookup.isOmniBoxOpen())
    {
        lookup.toggleOptions();
    }

    if(event.code === "KeyF" && !lookup.isOmniBoxOpen())
    {
        lookup.toggleFullScreen();
    }

    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lookup.isOmniBoxOpen())
    {
        lookup.allow_to_open_definition(true);
    }

    return true;

};

lookup.bodyKeyUp = function( data, event)
{
    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lookup.isOmniBoxOpen())
    {
        lookup.allow_to_open_definition(false);
    }

    return true;

};

lookup.editorKeyUp = function(event)
{
    event.stopPropagation();
    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lookup.isOmniBoxOpen())
    {
        lookup.allow_to_open_definition(false);
    }
};

lookup.editorKeyDown = function(event)
{
    event.stopPropagation();
    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lookup.isOmniBoxOpen())
    {
        lookup.allow_to_open_definition(true);
    }
};

lookup.editor_on_input = function(obj)
{
    const innerText = event.target.innerText;
    const original_name = obj.name();
    obj.newVersionExists(innerText != original_name);
    obj.newName(innerText);
};

lookup.apply_new_version_of_rdf_value = function(statement)
{
    const main_ui = document.getElementById(statement.object_id);
    const main_rdf_entry = lookup.customObjects[statement.object_id];
    const offset = {
        x: main_rdf_entry.offsetX() + main_ui.offsetWidth,
        y: main_rdf_entry.offsetY()
    };
    lookup.desiredOffset = offset;
    
    const previous_value_entry = lookup.customObjects[statement.value_id()];
    event.stopPropagation();
    const new_value_id = lookup.find_or_create_rdf_entry_with_name(previous_value_entry.newName());
    
    previous_value_entry.newVersionExists(false);
    const previousWords = previous_value_entry.splitted()
    previous_value_entry.splitted([]);
    previous_value_entry.splitted(previousWords);

    statement.value_id(new_value_id);
    const new_main_rdf_entry = lookup.create_copy_of_RDF_entry(main_rdf_entry);
    statement.value_id(previous_value_entry.id);

    var operation = 
    {
        operation: "new-version-of-rdf-entry",
        previous_id: main_rdf_entry.id,
        new_id: new_main_rdf_entry.id
    };

    lookup.operationsPush(operation);

    lookup.openElement(new_main_rdf_entry);

    const definition_predicate_id = lookup.find_or_create_rdf_predicate("definition");
    if(statement.predicate_id() === definition_predicate_id)
    {
        const to_evaluate = lookup.customObjects[new_value_id].name();
        const to_replace = main_rdf_entry.name();
        window.eval("lookup['" + to_replace + "'] = " + to_evaluate);
    }

};

lookup.open_rdf_value_by_id_on_the_left = function(statement)
{
    event.stopPropagation();
    const id = statement.value_id();
    const main_ui = document.getElementById(statement.object_id);
    const main_rdf_entry = lookup.customObjects[statement.object_id];
    const offset = {
        x: main_rdf_entry.offsetX() - main_ui.offsetWidth,
        y: main_rdf_entry.offsetY()
    };
    lookup.desiredOffset = offset;
    const rdf_entry = lookup.customObjects[id];
    lookup.openElement(rdf_entry);
};


lookup.isFieldPresent = function(obj, fieldName) 
{
    return typeof(obj[fieldName]) !== "undefined";
};

lookup.findRoot = function(obj) 
{
    // var ui_object = document.getElementById(obj.id);
    // const found_parent_id = ui_object.offsetParent.id;
    // const found_parent_object = lookup.customObjects[found_parent_id];
    // return found_parent_object;
    var currentObj = obj;
    for (var k = 0; typeof (currentObj.assignedToGuid) !== 'undefined' && k < 10000; k++) {
        currentObj = lookup.customObjects[currentObj.assignedToGuid];
    }
    return currentObj;
};

lookup.defineOmniBox = function() {
    var omniBox = {
        visible: ko.observable(false),
        left: ko.observable(0),
        top: ko.observable(0),
        id: 'global--popup-omni-box-input' 
    };
    return omniBox;
};

lookup.canvasOmniBox = lookup.defineOmniBox();

lookup.rejoin = function(name, splitBy) {
    var result = [];
    while(name != "")
    {
        const index = name.indexOf(splitBy);
        if(index < 0 )
        {
            result.push(name);
            break;
        }

        if(index > 0)
        {
            var toAdd = name.substring(0, index);
            result.push(toAdd);
        }
        var middle = name.substring(index, index + splitBy.length);
        result.push(middle);
        name = name.substring(index + splitBy.length);
    }
    return result;
};

lookup.rejoin_many = function(newRejoined, splitBy)
{
    var result = [];
    for (var k = 0; k < newRejoined.length; k++) {
        var sub_name = newRejoined[k];
        var sub_array = lookup.rejoin(sub_name, splitBy);
        result = result.concat(sub_array);
    }
    return result;
};

lookup.restore_splitted_view = function (toAdd)
{
    lookup.names_lookup[toAdd.name()] = true;
    var newRejoined = lookup.rejoin_many([toAdd.name()], " ");
    var newRejoined = lookup.rejoin_many(newRejoined, "(");
    var newRejoined = lookup.rejoin_many(newRejoined, ")");
    var newRejoined = lookup.rejoin_many(newRejoined, "{");
    var newRejoined = lookup.rejoin_many(newRejoined, "}");
    var newRejoined = lookup.rejoin_many(newRejoined, ",");
    var newRejoined = lookup.rejoin_many(newRejoined, "[");
    var newRejoined = lookup.rejoin_many(newRejoined, "]");
    var newRejoined = lookup.rejoin_many(newRejoined, ".");
    var newRejoined = lookup.rejoin_many(newRejoined, ";");
    var newRejoined = lookup.rejoin_many(newRejoined, "'");
    var newRejoined = lookup.rejoin_many(newRejoined, '"');
    var newRejoined = lookup.rejoin_many(newRejoined, '//');
    var newRejoined = lookup.rejoin_many(newRejoined, '\r\n');
    toAdd.splitted = newRejoined.map((element, index) => {
        return {
            id: toAdd.id + "--" + index,
            word: element == '\r\n' ? '\n' : element
        };
    });

    toAdd.local_lookup = {};
    toAdd.reserved_lookup = {
        "if": true,
        "var": true,
        "const": true,
        "while": true,
        "for": true,
        "return": true,
        ".": true,
        "(": true,
        ")": true,
        "[": true,
        "]": true,
        "break": true,
        ";": true,
        "'": true,
        '"': true,
        '//': true,
        '{': true,
        '}': true,
    };
    toAdd.splitted.forEach(element => {
        if (typeof (toAdd.reserved_lookup[element.word]) === "undefined") {
            const count = toAdd.local_lookup[element.word];
            if (typeof (count) === "undefined") {
                toAdd.local_lookup[element.word] = 1;
            }

            else {
                toAdd.local_lookup[element.word] = count + 1;
            }
        }
    });
    toAdd.splitted = ko.observableArray(toAdd.splitted);
};

lookup.define_full_rdf_statement = function(objId, predicate_id, value_id) {
    var toAdd = lookup.createUIObject();

    toAdd.type = "rdf-statement";
    toAdd.object_id = objId;
    toAdd.predicate_id = ko.observable(predicate_id);
    toAdd.value_id = ko.observable(value_id);
    toAdd.assignedToGuid = objId;
    toAdd.statements = ko.observableArray([]);
    return toAdd;
};

lookup.create_copy_of_RDF_entry = function(main_rdf_entry)
{
    const new_main_rdf_entry = lookup.create_RDF_Entry(main_rdf_entry.name());
    const predicate_id_for_previos_version = lookup.find_or_create_rdf_predicate("previous-version");
    var previous_version_predicate_was_present = false;
    for (var k = 0; k < main_rdf_entry.statements().length; k++) {
        const current_statement_id = main_rdf_entry.statements()[k];
        const current_statement = lookup.customObjects[current_statement_id];
        if (current_statement.predicate_id() === predicate_id_for_previos_version) {
            previous_version_predicate_was_present = true;
            const copy_of_statement = lookup.define_full_rdf_statement(new_main_rdf_entry.id, current_statement.predicate_id(), main_rdf_entry.id);
            new_main_rdf_entry.statements.push(copy_of_statement.id);
        }

        else {
            const copy_of_statement = lookup.define_full_rdf_statement(new_main_rdf_entry.id, current_statement.predicate_id(), current_statement.value_id());
            new_main_rdf_entry.statements.push(copy_of_statement.id);
        }

    }

    if (previous_version_predicate_was_present === false) {
        const previous_version_statement = lookup.define_full_rdf_statement(new_main_rdf_entry.id, predicate_id_for_previos_version, main_rdf_entry.id);
        new_main_rdf_entry.statements.push(previous_version_statement.id);
    }
    return new_main_rdf_entry;
};

function Lisperanto()
{
    var self = this;

    self.ApplyLookupToSelf = function()
    {
        for(var x in lookup)
        {
            self[x] = lookup[x];
        }
    };

};

lookup.anchorWidth = ko.observable(0);

lookup.findSandboxAnchorPosition = function()
{
    var foundAnchor = lookup.findAnchor();

    lookup.desiredOffset.x = foundAnchor.offsetLeft;
    lookup.desiredOffset.y = foundAnchor.offsetTop;

    lookup.anchorWidth(foundAnchor.offsetWidth)

};

lookup.findAnchor = function()
{
    var foundAnchor = $(".lisperanto-anchor-sandbox")[0];
    return foundAnchor;
};

lookup.open_OmniBox_for_RDF_predicate_in_statement = function(caller)
{
    lookup.hideOmniBox();
    var toWorkOn = lookup.customObjects[caller.predicate_id()];
    lookup.focusedObj(toWorkOn);
    lookup.activeOperation("focus-on-RDF-predicate-in-statement");
    var root = lookup.findRoot(caller);

    lookup.filloutOmniBoxDataForFunction('rdf-predicate-in-statement--' + caller.id, lookup.canvasOmniBox, root);

    var foundAnchor = lookup.findAnchor();

    var foundUI = $("#rdf-statement--" + caller.id)[0];
    
    lookup.desiredOffset = 
    { 
        x : foundAnchor.offsetWidth,
        y : foundUI.offsetTop
    };
    
    var foundRoot = $("#" + root.id)[0];
    lookup.desiredOffset.x += root.offsetX() + foundRoot.offsetWidth;
    lookup.desiredOffset.y += root.offsetY();

};


lookup.open_OmniBox_for_actual_RDF_value_in_statement = function(caller)
{
    lookup.hideOmniBox();
    var toWorkOn = lookup.customObjects[caller.value_id()];
    lookup.focusedObj(toWorkOn);
    lookup.activeOperation("focus-on-RDF-value-in-statement");
    var root = lookup.findRoot(caller);

    lookup.filloutOmniBoxDataForFunction('rdf-value-in-statement--' + caller.id, lookup.canvasOmniBox, root);

    var foundAnchor = lookup.findAnchor();

    var foundUI = $("#rdf-statement--" + caller.id)[0];
    
    lookup.desiredOffset = 
    { 
        x : foundAnchor.offsetWidth,
        y : foundUI.offsetTop
    };
    
    var foundRoot = $("#" + root.id)[0];
    lookup.desiredOffset.x += root.offsetX() + foundRoot.offsetWidth;
    lookup.desiredOffset.y += root.offsetY();

};

lookup.bodyOnClick = function(e)
{
    //console.log(event);
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };
    if(lookup.canvasOmniBox.visible())
    {
        lookup.hideOmniBox();
    }
    else
    {
        if(lookup.menuIsOpen() || lookup.optionsIsOpen())
        {
            lookup.hideMenu();
            lookup.hideOptions();
        }
        else
        {
            lookup.showOmniBox();
        }
    }
};

lookup.stopPropagation = function()
{
    event.stopPropagation();
};

lookup.optionsOnClick = function()
{
    event.stopPropagation();
};

lookup.infoOnClick = function()
{
    event.stopPropagation();
};

lookup.patreonLinkOnClick = function()
{
    event.stopPropagation();
};

lookup.emailMeLinkOnClick = function()
{
    event.stopPropagation();
};

lookup.githubLinkOnClick = function()
{
    event.stopPropagation();
};


lookup.showOmniBox = function()
{
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };
    lookup.filloutGlobalOmniBox(lookup.canvasOmniBox, offset);
};

lookup.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};

lookup.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};

lookup.add_key_and_value = function(created_rdf_object, predicate_name, value_name_or_value) 
{
    var predicate_id = lookup.find_or_create_rdf_predicate(predicate_name);
    var value_id = lookup.find_or_create_rdf_entry_with_name(value_name_or_value);
    for( var k = 0; k < created_rdf_object.statements().length; k++)
    {
        var statement_id = created_rdf_object.statements()[k];
        var statement_object = lookup.customObjects[statement_id];
        if (statement_object.predicate_id() === predicate_id && statement_object.value_id() === value_id)
        {
            return;
        }
    }

    var statement_id = lookup.add_statement_predicate_to_rdf_entry(predicate_name, created_rdf_object);
    
    var statement_object = lookup.customObjects[statement_id];
    var value_object = lookup.customObjects[value_id];
    lookup.add_existing_RDF_value_to_statement_from_omnibox_list(value_object, statement_object);
};


lookup.print_all_functions_from_lookup = function()
{
    for(var key_name in lookup)
    {
        console.log(key_name);
        const rdf_entry_name = key_name;
        var created_rdf_object_id = lookup.find_or_create_rdf_entry_with_name(rdf_entry_name);
        var created_rdf_object = lookup.customObjects[created_rdf_object_id];
        const predicate_name = "type";
        const entry_in_lookup = lookup[key_name];
        const type_of_entry = typeof(entry_in_lookup);
        lookup.add_key_and_value(created_rdf_object, predicate_name, type_of_entry);
        if(type_of_entry === "function")
        {
            lookup.add_key_and_value(created_rdf_object, "definition", entry_in_lookup.toString());
        }
        lookup.add_key_and_value(created_rdf_object, "project", "lisperanto");
        lookup.add_key_and_value(created_rdf_object, "namespace", "lookup");
    }
};




$(document).ready(function()
{
    var viewModel = new Lisperanto();
    lookup.loadFromStorage();
    lookup.backgroundApplySaved();
    viewModel.ApplyLookupToSelf();
    lookup.findSandboxAnchorPosition();
    lookup.restore_RDF_predicates_array();
    lookup.defineTimerForFunctions();
    
    ko.applyBindings(viewModel);

    lookup.filloutGlobalOmniBox(lookup.canvasOmniBox, {x: 0, y: 0});

    lookup.print_all_functions_from_lookup();
});