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
            if("name" in obj)
            {
                name = obj["name"];
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
        for ([key, value] of Object.entries(parsed)) 
        {
            lookup.customObjects[key] = value;
            lookup.somethingChanged(lookup.somethingChanged() + 1);
        }
    }
    
};

lookup.open_json_entry_from_search_list = function(obj)
{
    lookup.openElement(lookup.customObjects[obj.id]);
    lookup.hideOmniBox();
};

lookup.create_wrapper_for_canvas = function(value)
{
    var wrapper_for_canvas = 
    {
        wrapped_one: ko.observable(value),
        "key_with_changes@lisperanto": ko.observable(""),
        "new_value@lisperanto": ko.observable(""),
        offsetX: ko.observable(0),
        offsetY: ko.observable(0)
    };

    wrapper_for_canvas.inWorldOffsetX = ko.computed(function()
    {
        return wrapper_for_canvas.offsetX() + lookup.globalOffsetX();
    });

    wrapper_for_canvas.inWorldOffsetY = ko.computed(function()
    {
        return wrapper_for_canvas.offsetY() + lookup.globalOffsetY();
    });
    return wrapper_for_canvas;
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

lookup.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
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

lookup.create_object_with_id = function()
{
    var guid = lookup.uuidv4();
    
    var toAdd = {
        id: guid,
        creation_time: lookup.getCurrentDateTimeString()
    };

    lookup.customObjects[guid] = toAdd;
    return toAdd;
};


lookup.create_RDF_Entry = function(name)
{
    var toAdd = lookup.create_object_with_id();
    toAdd.name = name;

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


lookup.rdf_predicates_Array = ko.observableArray([]);

lookup.filtered_rdf_predicates_Array = ko.computed(function()
{
    var searchQuery = lookup.omniBoxTextInput().trim().toLowerCase();
    var filtered = [];

    const mapped = ko.utils.arrayMap(lookup.rdf_predicates_Array(), function(obj) {
        var name = obj["name"];
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
            return item.name.toLowerCase() === predicateNameInLowerCase;
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
        return  ("name" in item) &&
                item.name.toLowerCase() === nameInLowerCase;
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
    var toAdd = lookup.create_object_with_id(predicate_name);
    toAdd.type = "rdf-predicate";
    toAdd.name = predicate_name;

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

lookup.copy_json_and_add_key_and_value = function(obj, key, value)
{
    var new_obj = lookup.create_object_with_id();
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    new_obj[key] = value;
    new_obj["previous-version@lisperanto"] = obj["id"];
    return new_obj;
};

lookup.copy_json_and_replace_key = function(obj, old_key, new_key)
{
    var new_obj = lookup.create_object_with_id();
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            if(k === old_key)
            {
                new_obj[new_key] = k_value;
            }
            else
            {
                new_obj[k] = k_value;
            }
        }
    });
    new_obj["previous-version@lisperanto"] = obj["id"];
    return new_obj;
};


lookup.create_plain_json_copy = function(obj)
{
    var new_obj = lookup.create_object_with_id();
    const available_keys = Object.keys(obj);
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    new_obj["previous-version@lisperanto"] = obj["id"];
    return new_obj;
};

lookup.add_statement_key_to_json_entry = function()
{
    // [lives-in] [Odesa]
    // I decided that by convention every rdf-entry and rdf-predicate will have a name field 

    var obj = lookup.focusedObj().wrapped_one();
    const predicateName = lookup.omniBoxTextInput().trim();
    if(predicateName === "")
        return;
    var created_copy = lookup.add_to_be_added_key_to_json(predicateName, obj);
    lookup.focusedObj().wrapped_one(created_copy);
    lookup.hideOmniBox();
    return created_copy;
};

lookup.add_text_value_to_json_entry = function()
{
    var obj = lookup.focusedObj().wrapped_one();
    const text_value = lookup.omniBoxTextInput().trim();
    const key = obj["new-key-holder@lisperanto"];
    var created_copy = lookup.copy_json_and_add_key_and_value(obj, key, text_value);
    delete created_copy["new-key-holder@lisperanto"];
    var operation = {
        operation: "set-json-key-text-value",
        key: key,
        text_value: text_value
    };
    lookup.focusedObj().wrapped_one(created_copy);
    lookup.operationsPush(operation);
    lookup.hideOmniBox();
};

lookup.add_statement_key_to_json_entry_by_name = function(statement_key)
{
    var obj = lookup.focusedObj().wrapped_one();
    var created_copy = lookup.add_to_be_added_key_to_json(statement_key, obj);
    lookup.focusedObj().wrapped_one(created_copy);
    lookup.hideOmniBox();
    return created_copy;
};

lookup.listOfOpenElements = ko.observableArray([]);
lookup.mapOfOpenElements = {};
lookup.closeElement = function(obj)
{
    if(obj.id in lookup.mapOfOpenElements)
    {
        const wrapper = lookup.mapOfOpenElements[obj.id];
        lookup.listOfOpenElements.remove(wrapper);
        delete lookup.mapOfOpenElements[obj.id];
    }
};

lookup.openElement = function(obj)
{
    lookup.closeElement(obj);
    if ( !( "id" in obj))
    {
        obj["id"] = lookup.uuidv4();
    }
    var wrapper = lookup.create_wrapper_for_canvas(obj);
    if( !(obj.id in lookup.mapOfOpenElements))
    {
        lookup.listOfOpenElements.push(wrapper);
        lookup.mapOfOpenElements[obj.id] = wrapper;
    }

    if(typeof(lookup.desiredOffset) !== "undefined")
    {
        wrapper.offsetX(lookup.desiredOffset.x);
        wrapper.offsetY(lookup.desiredOffset.y);
        console.log("set coordinates to desired offset: " + JSON.stringify(lookup.desiredOffset));
        lookup.desiredOffset = undefined;
    }
    else
    {
        const newLocalX = -lookup.globalOffsetX();
        wrapper.offsetX(newLocalX);
        const newLocalY = -lookup.globalOffsetY();
        wrapper.offsetY(newLocalY);
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
    for (const [key, wrapper] of Object.entries(elements)) 
    {
        const value = wrapper.wrapped_one();

        var box = lookup.getUIBoxOfElement(wrapper, margin);
        if(typeof(box) === "undefined")
        {
            continue;
        }
        
        for (const [innerKey, inner_wrapper] of Object.entries(elements)) 
        {
            const innerValue = inner_wrapper.wrapped_one();
            if(value.id == innerValue.id)
            {
                continue;
            }
            var boxToAvoid = lookup.getUIBoxOfElement(inner_wrapper, margin);
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
                    wrapper.offsetX(wrapper.offsetX() + offset.x);
                    wrapper.offsetY(wrapper.offsetY() + offset.y);
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
    var objId = obj.wrapped_one().id
    var foundUI = document.getElementById(objId);//$("#" + objId)[0];
    if(foundUI == null || typeof(foundUI) === "undefined")
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

lookup.open_OmniBox_for_adding_statement_to_json_entry = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("add-statement-key-to-json-entry");

    lookup.filloutOmniBoxDataForFunction('add-statement-to-json-entry--' + caller.wrapped_one().id, lookup.canvasOmniBox, caller);
};

lookup.open_OmniBox_for_adding_text_value_to_json_entry = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("add-text-value-to-json-entry");

    lookup.filloutOmniBoxDataForFunction('add-text-value-to-json-entry--' + caller.wrapped_one().id, lookup.canvasOmniBox, caller);
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

lookup.add_existing_RDF_predicate_to_json_from_omnibox = function(obj)
{
    event.stopPropagation();
    lookup.add_statement_key_to_json_entry_by_name(obj.text);
    lookup.hideOmniBox();
};

lookup.replace_existing_json_key_from_omnibox = function(obj)
{
    event.stopPropagation();
    const new_key = obj.text;
    lookup.replace_focused_json_key_with_new(new_key);
    lookup.hideOmniBox();

};

lookup.replace_existing_json_key_from_omnibox_text = function()
{
    const new_key = lookup.omniBoxTextInput().trim();
    var new_key_id = lookup.find_or_create_rdf_predicate(new_key);
    lookup.replace_focused_json_key_with_new(new_key);
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
            const key = lookup.activeOperation();
            var map = 
            {
                "add-statement-key-to-json-entry": () => lookup.add_statement_key_to_json_entry(),
                'add-text-value-to-json-entry': () => lookup.add_text_value_to_json_entry(),
                'replace-existing-json-key': () => lookup.replace_existing_json_key_from_omnibox_text()
            };

            if ( key in map)
            {
                map[key]();
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

lookup.body_is_dragged = ko.observable(false);

lookup.body_onmousedown = function()
{
    //console.log(event);
    lookup.body_is_dragged(true);
    lookup.total_movement_while_body_drag(0)
};

lookup.body_onmouseup = function()
{
    //console.log(event);
    lookup.body_is_dragged(false);
};

lookup.body_onmouseout = function()
{
    lookup.body_is_dragged(false);
};

lookup.total_movement_while_body_drag = ko.observable(0);

lookup.body_onmousemove = function()
{
    //console.log(event);
    if(lookup.body_is_dragged())
    {
        const deltaX = event.movementX;
        const deltaY = event.movementY;
        lookup.globalOffsetX(lookup.globalOffsetX() + deltaX);
        lookup.globalOffsetY(lookup.globalOffsetY() + deltaY);
        lookup.applyMovement(0,0);
        lookup.total_movement_while_body_drag(lookup.total_movement_while_body_drag() + Math.abs(deltaX) + Math.abs(deltaY));
    }
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
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lookup.hideOmniBox();
        lookup.hideMenu();
    }
    if(event.code === "KeyI")
    {
        lookup.toggleMenu();
    }

    if(event.code === "KeyO")
    {
        lookup.toggleOptions();
    }

    if(event.code === "KeyF")
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

lookup.editorKeyDown = function(parent)
{
    event.stopPropagation();
    if (event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        lookup.confirm_change_to_json(parent);
    }
    //console.log(event);
    return true;
};

lookup.editor_on_input = function(key_name, parent)
{
    // console.log(event);
    // console.log(key_name);
    //console.log(event.target.innerText);
    var inner_text = event.target.innerText;
    //console.log(inner_text);

    const obj = parent.wrapped_one();
    if (inner_text === obj[key_name])
    {
        parent["key_with_changes@lisperanto"]("");
        parent["new_value@lisperanto"]("");
    }
    else
    {
        parent["key_with_changes@lisperanto"](key_name);
        parent["new_value@lisperanto"](inner_text);
    }
};

lookup.getAllKeysWithName = function(predicateKey)
{
    var result = [predicateKey];
    var sub = lookup.rdf_predicates_Array()
        .filter(element => element.name === predicateKey)
        .map(element => element.id);
    return result.concat(sub);
};

lookup.checkIfAnyVersionOfKeyIsPresent = function(predicateKey, obj)
{
    var all_possible_keys = lookup.getAllKeysWithName(predicateKey);
    return all_possible_keys.some(key => key in obj);
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


lookup.add_to_be_added_key_to_json = function (predicateName, obj) {
    var toAdd_id = lookup.find_or_create_rdf_predicate(predicateName);
    var created_copy = lookup.copy_json_and_add_key_and_value(obj, "new-key-holder@lisperanto", predicateName);
    var operation = {
        operation: "hold-json-key",
        toAdd_id: toAdd_id,
        object_id: obj.id
    };
    lookup.operationsPush(operation);
    return created_copy;
};

lookup.json_key_oncontextmenu = function(obj, parent)
{
    event.stopPropagation();
    const foundObj = parent.wrapped_one();
    //console.log(obj);
    //console.log(parent);
    lookup.desiredOffset = {
        x: parent.offsetX() + event.target.offsetLeft,
        y: parent.offsetY() + event.target.offsetTop + event.target.offsetHeight
    };
    
    lookup.focusedObj(parent);
    lookup.key_in_json_to_focus = obj;
    lookup.activeOperation("focused-on-existing-json-key");
    event.stopPropagation();
    //console.log(event);
    lookup.canvasOmniBox.visible(true);
    lookup.canvasOmniBox.left(lookup.desiredOffset.x);
    lookup.canvasOmniBox.top(lookup.desiredOffset.y);
    return false;
};

lookup.delete_json_key = function()
{
    var copy = lookup.create_plain_json_copy(lookup.focusedObj().wrapped_one());
    delete copy[lookup.key_in_json_to_focus];
    lookup.focusedObj().wrapped_one(copy);
    var operation = {
        operation: "delete_json_key",
        object_id: lookup.focusedObj().wrapped_one().id,
        remove_key: lookup.key_in_json_to_focus
    };
    lookup.operationsPush(operation);
    lookup.hideOmniBox();
};

lookup.confirm_change_to_json = function(parent)
{
    event.stopPropagation();
    var obj = parent.wrapped_one();
    const updated_key = parent["key_with_changes@lisperanto"]();
    const new_value = parent["new_value@lisperanto"]();
    const copy = lookup.copy_json_and_add_key_and_value(obj, updated_key, new_value);
    parent.wrapped_one(copy);
    var operation = {
        operation: "change_value_of_json_key",
        object_id: copy.id,
        updated_key: lookup.key_in_json_to_focus
    };
    lookup.operationsPush(operation);
    parent["key_with_changes@lisperanto"]("");
    parent["new_value@lisperanto"]("")
};

lookup.activate_replace_json_key = function()
{
    lookup.activeOperation("replace-existing-json-key");
    $("#" + lookup.canvasOmniBox.id ).focus();
};

lookup.replace_focused_json_key_with_new = function(new_key) {
    const old_key = lookup.key_in_json_to_focus;
    var copy = lookup.copy_json_and_replace_key(lookup.focusedObj().wrapped_one(), old_key, new_key);
    lookup.focusedObj().wrapped_one(copy);
    var operation = {
        operation: "replace_json_key",
        new_version_id: lookup.focusedObj().wrapped_one().id,
        new_key: new_key,
        old_key: old_key
    };
    lookup.operationsPush(operation);
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

lookup.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));

lookup.bodyOnClick = function(e)
{
    //console.log(event);
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };

    const drag_threshold = 3 * lookup.anchorWidth();
    if ( lookup.total_movement_while_body_drag() > drag_threshold )
    {
        // to prevent click handler after drag, but allow it if drag was small
        lookup.total_movement_while_body_drag(0);
        return;
    }
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
    lookup.restore_RDF_predicates_array();
    lookup.defineTimerForFunctions();
    
    ko.applyBindings(viewModel);

    lookup.filloutGlobalOmniBox(lookup.canvasOmniBox, {x: 0, y: 0});

    //lookup.print_all_functions_from_lookup();
});