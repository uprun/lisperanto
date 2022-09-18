var lisperanto = {};
lisperanto.customObjects = {};
lisperanto.omniBoxTextInput = ko.observable("");

lisperanto.omniBoxTextInput
    .extend({ rateLimit: 100 });


lisperanto.somethingChanged = ko.observable(0);

lisperanto.filteredSearch = ko.computed(
    function()
    {
        var changeOccured = lisperanto.somethingChanged();
        var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
        var filtered = [];
        const availableKeys = Object.keys(lisperanto.customObjects);

        const non_statements = ko.utils.arrayFilter(availableKeys, function(key)
            {
                const obj = lisperanto.customObjects[key];
                return obj.type !== "rdf-statement";
            });

        const mapped = ko.utils.arrayMap(non_statements, function(key) {
            const obj = lisperanto.customObjects[key];
            var name = "";
            if("name@lisperanto" in obj)
            {
                name = obj["name@lisperanto"];
            }

            if( "name" in obj )
            {
                name = obj["name"]
            }

            if(name === "")
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



lisperanto.operations = [];

lisperanto.operationsPush = function(some)
{
    lisperanto.operations.push(some);
    var toSerialize = {};
    for (const [key, value] of Object.entries(lisperanto.customObjects)) {
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
    lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
};

lisperanto.loadFromStorage = function()
{
    lisperanto.localStorage = localStorage;
    var stored = localStorage.getItem('customObjects');
    if(typeof(stored) !== 'undefined' && stored != null)
    {
        var parsed = JSON.parse(stored);
        for ([key, value] of Object.entries(parsed)) 
        {
            lisperanto.customObjects[key] = value;
            lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
        }
    }
    
};

lisperanto.open_json_entry_from_search_list = function(obj)
{
    lisperanto.openElement(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};

lisperanto.create_wrapper_for_canvas = function(value)
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
        return wrapper_for_canvas.offsetX() + lisperanto.globalOffsetX();
    });

    wrapper_for_canvas.inWorldOffsetY = ko.computed(function()
    {
        return wrapper_for_canvas.offsetY() + lisperanto.globalOffsetY();
    });
    return wrapper_for_canvas;
};

lisperanto.restore_RDF_predicates_array = function()
{
    for (const [key, value] of Object.entries(lisperanto.customObjects)) 
    {
        if(typeof(value.type) !== 'undefined')
        {
            if(value.type === "rdf-predicate" )
            {
                lisperanto.rdf_predicates_Array.push(value);
            }
        }
    }
};

lisperanto.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  };

lisperanto.getCurrentDateTimeString = function()
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

lisperanto.create_object_with_id = function()
{
    var guid = lisperanto.uuidv4();
    
    var toAdd = {
        id: guid,
        creation_time: lisperanto.getCurrentDateTimeString()
    };

    lisperanto.customObjects[guid] = toAdd;
    return toAdd;
};


lisperanto.create_RDF_Entry = function(name)
{
    var toAdd = lisperanto.create_object_with_id();
    toAdd["name@lisperanto"] = name;

    var operation = 
    {
        operation: "create-rdf-entry",
        id: toAdd.id,
        name: name
    };
    lisperanto.operationsPush(operation);
    return toAdd;
};

lisperanto.create_and_show_RDF_entry = function(name)
{
    var toShow = lisperanto.create_RDF_Entry(name);
    lisperanto.openElement(toShow);
    lisperanto.hideOmniBox();
};


lisperanto.rdf_predicates_Array = ko.observableArray([]);

lisperanto.filtered_rdf_predicates_Array = ko.computed(function()
{
    var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
    var filtered = [];

    const mapped = ko.utils.arrayMap(lisperanto.rdf_predicates_Array(), function(obj) {
        var name = obj["name@lisperanto"];
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

lisperanto.find_or_create_rdf_predicate = function(predicate)
{
    const predicateNameInLowerCase = predicate.toLowerCase();
    var filtered = ko.utils.arrayFilter(lisperanto.rdf_predicates_Array(), function(item)
        {
            return item["name@lisperanto"].toLowerCase() === predicateNameInLowerCase;
        });
    if(filtered.length === 1)
    {
        return filtered[0].id;
    }
    else
    {
        return lisperanto.create_RDF_predicate(predicate);
    }

};

lisperanto.find_or_create_rdf_entry_with_name = function(entry_name)
{
    const nameInLowerCase = entry_name.toLowerCase();
    const objects = Object.entries(lisperanto.customObjects);
    var filtered = objects.filter(function(entry)
    {
        const item = entry[1];
        return  ("name@lisperanto" in item) &&
                item["name@lisperanto"].toLowerCase() === nameInLowerCase;
    });
    if(filtered.length > 0)
    {
        return filtered[0][1].id;
    }
    else
    {
        var object = lisperanto.create_RDF_Entry(entry_name);
        return object.id;
    }
};

lisperanto.create_RDF_predicate = function(predicate_name)
{
    var toAdd = lisperanto.create_object_with_id(predicate_name);
    toAdd["type"] = "rdf-predicate";
    toAdd["name@lisperanto"] = predicate_name;

    var operation = 
    {
        operation: "create-rdf-predicate",
        id: toAdd.id,
        predicate_name: predicate_name
    };

    lisperanto.rdf_predicates_Array.push(toAdd);

    lisperanto.operationsPush(operation);
    return toAdd.id;
}


lisperanto.uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

lisperanto.activeOperation = ko.observable("");


lisperanto.focusedObj = ko.observable({});

lisperanto.isOmniBoxOpen = ko.computed(function()
{
    return lisperanto.activeOperation() !== "" ;
});

lisperanto.copy_json_and_add_key_and_value = function(obj, key, value)
{
    var new_obj = lisperanto.create_object_with_id();
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

lisperanto.copy_json_and_replace_key = function(obj, old_key, new_key)
{
    var new_obj = lisperanto.create_object_with_id();
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


lisperanto.create_plain_json_copy = function(obj)
{
    var new_obj = lisperanto.create_object_with_id();
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

lisperanto.add_statement_key_to_json_entry = function()
{
    // [lives-in] [Odesa]
    // I decided that by convention every rdf-entry and rdf-predicate will have a name field 

    var obj = lisperanto.focusedObj().wrapped_one();
    const predicateName = lisperanto.omniBoxTextInput().trim();
    if(predicateName === "")
        return;
    var created_copy = lisperanto.add_to_be_added_key_to_json(predicateName, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    return created_copy;
};

lisperanto.add_text_value_to_json_entry = function()
{
    var obj = lisperanto.focusedObj().wrapped_one();
    const text_value = lisperanto.omniBoxTextInput().trim();
    const key = obj["new-key-holder@lisperanto"];
    var created_copy = lisperanto.copy_json_and_add_key_and_value(obj, key, text_value);
    delete created_copy["new-key-holder@lisperanto"];
    var operation = {
        operation: "set-json-key-text-value",
        key: key,
        text_value: text_value
    };
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.operationsPush(operation);
    lisperanto.hideOmniBox();
};

lisperanto.add_statement_key_to_json_entry_by_name = function(statement_key)
{
    var obj = lisperanto.focusedObj().wrapped_one();
    var created_copy = lisperanto.add_to_be_added_key_to_json(statement_key, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    return created_copy;
};

lisperanto.listOfOpenElements = ko.observableArray([]);
lisperanto.mapOfOpenElements = {};
lisperanto.closeElement = function(obj)
{
    if(obj.id in lisperanto.mapOfOpenElements)
    {
        const wrapper = lisperanto.mapOfOpenElements[obj.id];
        lisperanto.listOfOpenElements.remove(wrapper);
        delete lisperanto.mapOfOpenElements[obj.id];
    }
};

lisperanto.openElement = function(obj)
{
    lisperanto.closeElement(obj);
    if ( !( "id" in obj))
    {
        obj["id"] = lisperanto.uuidv4();
    }
    var wrapper = lisperanto.create_wrapper_for_canvas(obj);
    if( !(obj.id in lisperanto.mapOfOpenElements))
    {
        lisperanto.listOfOpenElements.push(wrapper);
        lisperanto.mapOfOpenElements[obj.id] = wrapper;
    }

    if(typeof(lisperanto.desiredOffset) !== "undefined")
    {
        wrapper.offsetX(lisperanto.desiredOffset.x);
        wrapper.offsetY(lisperanto.desiredOffset.y);
        console.log("set coordinates to desired offset: " + JSON.stringify(lisperanto.desiredOffset));
        lisperanto.desiredOffset = undefined;
    }
    else
    {
        const newLocalX = -lisperanto.globalOffsetX();
        wrapper.offsetX(newLocalX);
        const newLocalY = -lisperanto.globalOffsetY();
        wrapper.offsetY(newLocalY);
        console.log("set coordinates to anchor offsetted:" + JSON.stringify({x: newLocalX, y: newLocalY}  ));
    }
    console.log("finished openElement");
};


lisperanto.timerForFunctions = undefined;

lisperanto.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};

lisperanto.normalizeVector = function(point)
{
    var newLength = Math.sqrt(lisperanto.vectorLengthSquared(point));
    point.x /= newLength;
    point.y /= newLength;
    return point;
};

lisperanto.alignOffset = function(point)
{
    if(Math.abs(point.x) > Math.abs(point.y) )
    {
        point.y = 0;
    }
    else
    {
        point.x = 0;
    }
    point = lisperanto.normalizeVector(point);
    return point;
};

lisperanto.moveElementsOnCanvasIteration = function()
{
    var elements = lisperanto.listOfOpenElements();
    const anchorWidth = lisperanto.anchorWidth();
    const margin = anchorWidth ;
    for (const [key, wrapper] of Object.entries(elements)) 
    {
        const value = wrapper.wrapped_one();

        var box = lisperanto.getUIBoxOfElement(wrapper, margin);
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
            var boxToAvoid = lisperanto.getUIBoxOfElement(inner_wrapper, margin);
            if(typeof(boxToAvoid) === "undefined")
            {
                continue;
            }
            
            if(lisperanto.doBoxesIntersect(box, boxToAvoid))
            {
                offset = lisperanto.getMinimalOffsetForBox(box, boxToAvoid, 0);
                if(lisperanto.vectorLengthSquared(offset) > 0)
                {
                    offset = lisperanto.normalizeVector(offset);
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

lisperanto.defineTimerForFunctions = function()
{
    lisperanto.timerForFunctions = setInterval(lisperanto.moveElementsOnCanvasIteration, 30);
};


lisperanto.filloutOmniBoxDataForFunction = function(callerId, omniBox, root) 
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

lisperanto.filloutGlobalOmniBox = function(omniBox, offset) 
{
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("global-omni-box-activated");
    omniBox.visible(true);
    var offsetX = offset.x;
        offsetX -= lisperanto.globalOffsetX();
    omniBox.left(offsetX );
    var offsetY = offset.y;
        offsetY -= lisperanto.globalOffsetY();
    omniBox.top(offsetY);

    lisperanto.desiredOffset = {
        x: offsetX,
        y: offsetY
    };

    $("#" + omniBox.id ).focus();
    event && event.stopPropagation();
};

lisperanto.getUIBoxOfElement = function(obj, margin = 0.0)
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

lisperanto.isPointInsideTheBox = function(point, box, margin = 0)
{
    var result =
        point.x >= (box.left - margin)
        && point.x <= (box.left + box.width + margin)  
        && point.y >= (box.top - margin)
        && point.y <= (box.top + box.height + margin);
    return result;
};

lisperanto.generateCornersOfTheBox = function(box)
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

lisperanto.doBoxesIntersect = function(firstBox, secondBox)
{
    var firstCorners = lisperanto.generateCornersOfTheBox(firstBox);
    var resultFirst = firstCorners.find(point => lisperanto.isPointInsideTheBox(point, secondBox, margin=1));
    if(typeof(resultFirst) === "undefined")
    {
        var secondCorners = lisperanto.generateCornersOfTheBox(secondBox);
        var resultSecond = secondCorners.find(point => lisperanto.isPointInsideTheBox(point, firstBox, margin=1));
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

lisperanto.getVectorsFromBox = function(point, box, margin)
{
    var result = [
        lisperanto.createVector(point, {x: point.x, y: box.top - margin}), // to Up
        lisperanto.createVector(point, {x: point.x, y: box.top + box.height + margin}), // to Bottom
        lisperanto.createVector(point, {x: box.left - margin, y: point.y}), // to Left
        lisperanto.createVector(point, {x: box.left + box.width + margin, y: point.y}) // to Right
    ];
    return result;
    
};

lisperanto.generateVectors = function(point, otherPoints)
{
    var result = [];
    for (const [key, somePoint] of Object.entries(otherPoints)) 
    {
        result.push(lisperanto.createVector(point, somePoint));
    }
    return result;
};

lisperanto.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};

lisperanto.vectorLength = function(v)
{
    var result = Math.sqrt(lisperanto.vectorLengthSquared(v));
    return result;
};

lisperanto.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};

lisperanto.vectorsAreCoAligned = function(bv, obv)
{
    var dp = lisperanto.vectorsDotProduct(bv, obv);
    var cosAlpha = dp / (lisperanto.vectorLength(bv) * lisperanto.vectorLength(obv));
    var result = lisperanto.epsilonEqual(cosAlpha, 1.0);
    return result;
};


lisperanto.getMinimalOffsetForBox = function(firstBox, secondBox, margin)
{
    var offsets = []; 
    var firstBoxCorners = lisperanto.generateCornersOfTheBox(firstBox);
    for (const [key, pointF] of Object.entries(firstBoxCorners)) 
    {
        if(lisperanto.isPointInsideTheBox(pointF, secondBox, margin=2))
        {
            var escapesFromSecondBox = lisperanto.getVectorsFromBox(pointF, secondBox, margin=2);
            var firstBoxVectors = lisperanto.getVectorsFromBox(pointF, firstBox, margin=0);
            for (const [key, escapeV] of Object.entries(escapesFromSecondBox)) 
            {
                for (const [key, firstV] of Object.entries(firstBoxVectors)) 
                {
                    if(lisperanto.vectorLengthSquared(firstV) > 0.1)
                    {
                        if(lisperanto.vectorsAreCoAligned(escapeV, firstV))
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
            if(lisperanto.vectorLengthSquared(o) < lisperanto.vectorLengthSquared(minimalOffset))
            {
                minimalOffset = o;
            }
        }
        return minimalOffset;
    }
    
};

lisperanto.createVector = function(a, b)
{
    var result = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    return result;
    
};

lisperanto.vectorBetweenBoxes = function(firstBox, secondBox)
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
    var v = lisperanto.createVector(a, b);
    return v;

};

lisperanto.desiredOffset = {x: 0, y: 0};

lisperanto.open_OmniBox_for_adding_statement_to_json_entry = function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-statement-key-to-json-entry");

    lisperanto.filloutOmniBoxDataForFunction('add-statement-to-json-entry--' + caller.wrapped_one().id, lisperanto.canvasOmniBox, caller);
};

lisperanto.open_OmniBox_for_adding_text_value_to_json_entry = function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-text-value-to-json-entry");

    lisperanto.filloutOmniBoxDataForFunction('add-text-value-to-json-entry--' + caller.wrapped_one().id, lisperanto.canvasOmniBox, caller);
};

lisperanto.hideOmniBox = function()
{
    lisperanto.canvasOmniBox.visible(false);
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("");
    lisperanto.omniBoxTextInput("");
};


lisperanto.omniBox_open_predicate_definition_from_statement = function()
{
    var predicateToOpen = lisperanto.focusedObj();
    lisperanto.hideOmniBox();
    lisperanto.hideMenu();
    lisperanto.hideOptions();
    event.stopPropagation();
    lisperanto.openElement(predicateToOpen);
};

lisperanto.omniBox_open_value_definition_from_statement = function()
{
    var valueToOpen = lisperanto.focusedObj();
    lisperanto.hideOmniBox();
    lisperanto.hideMenu();
    lisperanto.hideOptions();
    event.stopPropagation();
    lisperanto.openElement(valueToOpen);
};

lisperanto.add_existing_RDF_predicate_to_json_from_omnibox = function(obj)
{
    event.stopPropagation();
    lisperanto.add_statement_key_to_json_entry_by_name(obj.text);
    lisperanto.hideOmniBox();
};

lisperanto.replace_existing_json_key_from_omnibox = function(obj)
{
    event.stopPropagation();
    const new_key = obj.text;
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();

};

lisperanto.replace_existing_json_key_from_omnibox_text = function()
{
    const new_key = lisperanto.omniBoxTextInput().trim();
    var new_key_id = lisperanto.find_or_create_rdf_predicate(new_key);
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();
};

lisperanto.omniBoxClick = function()
{
    event.stopPropagation();
};

lisperanto.stopPropagation = function()
{
    event.stopPropagation();
};

lisperanto.stopPropagation2 = function(data, event)
{
    event.stopPropagation();
};


lisperanto.omniBoxInputKeyDown = function(data, event)
{
    //console.log(event.originalEvent);
    if(event.originalEvent.code == "Tab")
    {
        // here I will need to cycle through available options
    }
    return true;
};

lisperanto.create_RDF_entry_with_name_from_omnibox = function()
{
    const name = lisperanto.omniBoxTextInput().trim();
    if(name.length === 0)
        return;

    lisperanto.create_and_show_RDF_entry(name);
};

lisperanto.omniBoxInputKeyPress = function(data, event) 
{
    if(event.shiftKey && event.keyCode === 13)
    {
        if(lisperanto.activeOperation() === "global-omni-box-activated")
        {
            lisperanto.create_RDF_entry_with_name_from_omnibox();
        }
    }
    else
    {
        if(event.keyCode == 13)
        {
            const key = lisperanto.activeOperation();
            var map = 
            {
                "add-statement-key-to-json-entry": () => lisperanto.add_statement_key_to_json_entry(),
                'add-text-value-to-json-entry': () => lisperanto.add_text_value_to_json_entry(),
                'replace-existing-json-key': () => lisperanto.replace_existing_json_key_from_omnibox_text()
            };

            if ( key in map)
            {
                map[key]();
            }
            else if(lisperanto.activeOperation() === "global-omni-box-activated")
            {
                const availableEntries = lisperanto.filteredSearch();
                var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
                const exactMatch = availableEntries.filter(entry => entry.text === searchQuery);
                if(exactMatch.length > 0)
                {
                    var functionToOpen = lisperanto.customObjects[exactMatch[0].id];
                    lisperanto.openElement(functionToOpen);
                    lisperanto.hideOmniBox();
                }
                else
                {
                    lisperanto.create_RDF_entry_with_name_from_omnibox();
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

lisperanto.body_is_dragged = ko.observable(false);

lisperanto.body_onmousedown = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(true);
    lisperanto.total_movement_while_body_drag(0)
};

lisperanto.body_onmouseup = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(false);
};

lisperanto.body_onmouseout = function()
{
    lisperanto.body_is_dragged(false);
};

lisperanto.total_movement_while_body_drag = ko.observable(0);

lisperanto.body_onmousemove = function()
{
    //console.log(event);
    if(lisperanto.body_is_dragged())
    {
        const deltaX = event.movementX;
        const deltaY = event.movementY;
        lisperanto.globalOffsetX(lisperanto.globalOffsetX() + deltaX);
        lisperanto.globalOffsetY(lisperanto.globalOffsetY() + deltaY);
        lisperanto.applyMovement(0,0);
        lisperanto.total_movement_while_body_drag(lisperanto.total_movement_while_body_drag() + Math.abs(deltaX) + Math.abs(deltaY));
    }
};

lisperanto.omniBoxInputKeyUp = function( data, event)
{
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lisperanto.hideOmniBox();
    }
    event.stopPropagation();
};

lisperanto.allow_to_open_definition = ko.observable(false);

lisperanto.bodyKeyDown = function( data, event)
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
        lisperanto.hideOmniBox();
        lisperanto.hideMenu();
    }
    if(event.code === "KeyI")
    {
        lisperanto.toggleMenu();
    }

    if(event.code === "KeyO")
    {
        lisperanto.toggleOptions();
    }

    if(event.code === "KeyF")
    {
        lisperanto.toggleFullScreen();
    }

    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lisperanto.isOmniBoxOpen())
    {
        lisperanto.allow_to_open_definition(true);
    }

    return true;

};

lisperanto.bodyKeyUp = function( data, event)
{
    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lisperanto.isOmniBoxOpen())
    {
        lisperanto.allow_to_open_definition(false);
    }

    return true;

};

lisperanto.editorKeyUp = function(event)
{
    event.stopPropagation();
    if(
        (
            event.code === "AltLeft" ||
            event.code === "AltRight" 
        )
        &&
        !lisperanto.isOmniBoxOpen())
    {
        lisperanto.allow_to_open_definition(false);
    }
};

lisperanto.editorKeyDown = function(parent)
{
    event.stopPropagation();
    if (event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        lisperanto.confirm_change_to_json(parent);
    }
    //console.log(event);
    return true;
};

lisperanto.editor_on_input = function(key_name, parent)
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

lisperanto.open_rdf_value_by_id_on_the_left = function(statement)
{
    event.stopPropagation();
    const id = statement.value_id();
    const main_ui = document.getElementById(statement.object_id);
    const main_rdf_entry = lisperanto.customObjects[statement.object_id];
    const offset = {
        x: main_rdf_entry.offsetX() - main_ui.offsetWidth,
        y: main_rdf_entry.offsetY()
    };
    lisperanto.desiredOffset = offset;
    const rdf_entry = lisperanto.customObjects[id];
    lisperanto.openElement(rdf_entry);
};

lisperanto.defineOmniBox = function() {
    var omniBox = {
        visible: ko.observable(false),
        left: ko.observable(0),
        top: ko.observable(0),
        id: 'global--popup-omni-box-input' 
    };
    return omniBox;
};

lisperanto.canvasOmniBox = lisperanto.defineOmniBox();

lisperanto.add_to_be_added_key_to_json = function (predicateName, obj) {
    var toAdd_id = lisperanto.find_or_create_rdf_predicate(predicateName);
    var created_copy = lisperanto.copy_json_and_add_key_and_value(obj, "new-key-holder@lisperanto", predicateName);
    var operation = {
        operation: "hold-json-key",
        toAdd_id: toAdd_id,
        object_id: obj.id
    };
    lisperanto.operationsPush(operation);
    return created_copy;
};

lisperanto.json_key_oncontextmenu = function(obj, parent)
{
    event.stopPropagation();
    const foundObj = parent.wrapped_one();
    //console.log(obj);
    //console.log(parent);
    lisperanto.desiredOffset = {
        x: parent.offsetX() + event.target.offsetLeft,
        y: parent.offsetY() + event.target.offsetTop + event.target.offsetHeight
    };
    
    lisperanto.focusedObj(parent);
    lisperanto.key_in_json_to_focus = obj;
    lisperanto.activeOperation("focused-on-existing-json-key");
    event.stopPropagation();
    //console.log(event);
    lisperanto.canvasOmniBox.visible(true);
    lisperanto.canvasOmniBox.left(lisperanto.desiredOffset.x);
    lisperanto.canvasOmniBox.top(lisperanto.desiredOffset.y);
    return false;
};

lisperanto.delete_json_key = function()
{
    var copy = lisperanto.create_plain_json_copy(lisperanto.focusedObj().wrapped_one());
    delete copy[lisperanto.key_in_json_to_focus];
    lisperanto.focusedObj().wrapped_one(copy);
    var operation = {
        operation: "delete_json_key",
        object_id: lisperanto.focusedObj().wrapped_one().id,
        remove_key: lisperanto.key_in_json_to_focus
    };
    lisperanto.operationsPush(operation);
    lisperanto.hideOmniBox();
};

lisperanto.confirm_change_to_json = function(parent)
{
    event.stopPropagation();
    var obj = parent.wrapped_one();
    const updated_key = parent["key_with_changes@lisperanto"]();
    const new_value = parent["new_value@lisperanto"]();
    const copy = lisperanto.copy_json_and_add_key_and_value(obj, updated_key, new_value);
    parent.wrapped_one(copy);
    var operation = {
        operation: "change_value_of_json_key",
        object_id: copy.id,
        updated_key: lisperanto.key_in_json_to_focus
    };
    lisperanto.operationsPush(operation);
    parent["key_with_changes@lisperanto"]("");
    parent["new_value@lisperanto"]("")
};

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};

lisperanto.replace_focused_json_key_with_new = function(new_key) {
    const old_key = lisperanto.key_in_json_to_focus;
    var copy = lisperanto.copy_json_and_replace_key(lisperanto.focusedObj().wrapped_one(), old_key, new_key);
    lisperanto.focusedObj().wrapped_one(copy);
    var operation = {
        operation: "replace_json_key",
        new_version_id: lisperanto.focusedObj().wrapped_one().id,
        new_key: new_key,
        old_key: old_key
    };
    lisperanto.operationsPush(operation);
};

function Lisperanto()
{
    var self = this;

    self.ApplyLookupToSelf = function()
    {
        for(var x in lisperanto)
        {
            self[x] = lisperanto[x];
        }
    };

};

lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));

lisperanto.bodyOnClick = function(e)
{
    //console.log(event);
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };

    const drag_threshold = 3 * lisperanto.anchorWidth();
    if ( lisperanto.total_movement_while_body_drag() > drag_threshold )
    {
        // to prevent click handler after drag, but allow it if drag was small
        lisperanto.total_movement_while_body_drag(0);
        return;
    }

    if(lisperanto.menuIsOpen() || lisperanto.optionsIsOpen())
    {
        lisperanto.hideMenu();
        lisperanto.hideOptions();
    }

    lisperanto.showOmniBox();
};

lisperanto.stopPropagation = function()
{
    event.stopPropagation();
};


lisperanto.showOmniBox = function()
{
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox, offset);
};

lisperanto.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};

lisperanto.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};


lisperanto.print_all_functions_from_lookup = function()
{
    for(var key_name in lisperanto)
    {
        console.log(key_name);
        const rdf_entry_name = key_name;
        var created_rdf_object_id = lisperanto.find_or_create_rdf_entry_with_name(rdf_entry_name);
        var created_rdf_object = lisperanto.customObjects[created_rdf_object_id];
        const entry_in_lisperanto = lisperanto[key_name];
        const type_of_entry = typeof(entry_in_lisperanto);
        created_rdf_object["type@lisperanto"] = type_of_entry;

        if(type_of_entry === "function")
        {
            created_rdf_object["programming-language@lisperanto"] = "javascript";
            created_rdf_object["javascript-function-definition@lisperanto"] = entry_in_lisperanto.toString();
        }
        created_rdf_object["project@lisperanto"] = "lisperanto";
    }
};

$(document).ready(function()
{
    var viewModel = new Lisperanto();
    lisperanto.loadFromStorage();
    lisperanto.backgroundApplySaved();
    viewModel.ApplyLookupToSelf();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(viewModel);

    const one_rem_in_pixels = parseFloat(getComputedStyle(document.documentElement).fontSize)

    const expected_witdh_of_omnibox = 20 * one_rem_in_pixels;
    const delta_x = Math.max(0, (document.body.offsetWidth / 2 - expected_witdh_of_omnibox/2));
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox, {x: delta_x , y: document.body.offsetHeight / 3});

    const width_of_omnibox = document.getElementById("contextual-omni-box").offsetWidth;
    const delta_x_2 = Math.max(0, (document.body.offsetWidth / 2 - width_of_omnibox/2));
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox, {x: delta_x_2 , y: document.body.offsetHeight / 3});

    //lisperanto.print_all_functions_from_lookup();
});