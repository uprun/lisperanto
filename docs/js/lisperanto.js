if(typeof(lisperanto) === 'undefined')
{
    lisperanto = {};
} 

lisperanto.define_objects = function()
{
    lisperanto.customObjects = {};
    lisperanto.operations = [];
    lisperanto.has_new_version_map = {};
    lisperanto.mapOfOpenElements = {};
    lisperanto.desiredOffset = {x: 0, y: 0};
};
lisperanto.define_omniBoxTextInput = () => {
    lisperanto.omniBoxTextInput = ko.observable("");
    lisperanto.omniBoxTextInput
        .extend({ rateLimit: 100 });
};

lisperanto.define_somethingChanged = () => {
    lisperanto.somethingChanged = ko.observable(0);
    lisperanto.somethingChanged.extend({ rateLimit: 100 });
};

lisperanto.define_filteredSearch = () => {
    lisperanto.filteredSearch = ko.computed(
        function()
        {
            var changeOccured = lisperanto.somethingChanged();
            var searchQuery = lisperanto.omniBoxTextInput().trim().toLowerCase();
            var filtered = [];
            const availableKeys = Object.keys(lisperanto.customObjects);
    
            const non_statements = ko.utils.arrayFilter(availableKeys, function(key)
                {
                    const has_new_version = key in lisperanto.has_new_version_map;
                    return has_new_version == false;
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
                
                var toReturn = {
                    id: key,
                    text: name,
                    full_text: JSON.stringify(obj).toLowerCase()
                };
    
                toReturn["search_index_text"] = toReturn.text.toLowerCase().indexOf(searchQuery);
                toReturn["search_index_full_text"] = toReturn.full_text.indexOf(searchQuery);
                return toReturn;
                
            });
    
            if(searchQuery === "")
            {
                filtered = mapped;
            }
            else
            {
                filtered = ko.utils.arrayFilter(mapped, function(item)
                {
                    return item["search_index_text"] >= 0 || item["search_index_full_text"]  >= 0;
                });
            }
    
            filtered = filtered.map(element => {
                const index = element["search_index_full_text"];
                if (searchQuery !== "" && element["search_index_text"] < 0 &&  index >= 0)
                {
                    const new_text = element.full_text.substring(index - 5, index + searchQuery.length + 5);
                    element.text = element.text + "  ..." + new_text;
                }
                return element;
            });
    
            return filtered;
        }
    );
};

lisperanto.operationsPush_async = async function(some)
{
    lisperanto.operations.push(some);
    const key = some["id_to"] ;
    const value = lisperanto.customObjects[key];

    if ("previous-version@lisperanto" in value)
    {
        const previous_version = value["previous-version@lisperanto"];
        lisperanto.has_new_version_map[previous_version] = key;
    }

    var toAdd = {};
    for (const [keyInner, valueInner] of Object.entries(value)) {
        if(typeof(valueInner) === 'function')
        {
        }else
        {
            toAdd[keyInner] = valueInner;
        }
    }
    var data = JSON.stringify(toAdd);
    localStorage.setItem(key, data);
    lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
    $.post("Home/SaveCustomObject",
    {
        hash: key,
        value: data
    });
    if ("time" in some)
    {
        const operation_hash = await lisperanto.calculate_hash_promise(some);
        $.post("Home/SaveOperation",
        {
            hash: some["time"] + " " + operation_hash,
            value: JSON.stringify(some)
        });
    }
};

lisperanto.find_latest_version = function(key)
{
    if (key in lisperanto.has_new_version_map)
    {
        return lisperanto.find_latest_version(lisperanto.has_new_version_map[key])
    }
    else
    {
        return key;
    }
};

lisperanto.loadFromStorage = function()
{
    for (const [keyInner, valueInner] of Object.entries(localStorage)) 
    {
        try 
        {
            var parsed = JSON.parse(valueInner);
            if ("previous-version@lisperanto" in parsed)
            {
                const previous_version = parsed["previous-version@lisperanto"];
                lisperanto.has_new_version_map[previous_version] = keyInner;
            }
            lisperanto.customObjects[keyInner] = parsed;
            lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
        } catch(e) 
        {
            console.log("Failed to parse: ", {key: keyInner, value: valueInner});
        }
    }
};

lisperanto.open_json_entry_from_search_list_async = async function(obj)
{
    await lisperanto.openElement_async(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};

lisperanto.create_wrapper_for_canvas_async = async function(value)
{
    var wrapper_for_canvas = 
    {
        wrapped_one: ko.observable(value),
        "key_with_changes@lisperanto": ko.observable(""),
        "new_value@lisperanto": ko.observable(""),
        offsetX: ko.observable(0),
        offsetY: ko.observable(0),
    };

    wrapper_for_canvas["id"] = ko.observable(await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]()));
    wrapper_for_canvas["wrapped_one"].subscribe(async () => wrapper_for_canvas["id"](await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]())));

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
    var day = currentdate.getDate().toString().padStart(2, '0');
    var month = (currentdate.getMonth() + 1).toString().padStart(2, '0');
    const hours = currentdate.getHours().toString().padStart(2, '0');
    const minutes = currentdate.getMinutes().toString().padStart(2, '0');
    const seconds = currentdate.getSeconds().toString().padStart(2, '0');
    var datetime = 
        currentdate.getFullYear() + "-"
        + month + "-"
        + day + " "
        + hours + ":"  
        + minutes + ":" 
        + seconds
        + timeZoneString;
    return datetime;
};

lisperanto.create_object_with_id = function()
{
    var guid = crypto.randomUUID();
    
    var toAdd = {
        id: guid,
        creation_time: lisperanto.getCurrentDateTimeString()
    };

    lisperanto.customObjects[guid] = toAdd;
    return toAdd;
};

lisperanto.calculate_hash_promise = function(obj)
{
    // from stackoverflow site I read that you can firt sort keys alphabetically then apply hash
    // but will do this later .. maybe 2022-09-21
    const string = JSON.stringify(obj);

    //https://remarkablemark.medium.com/how-to-generate-a-sha-256-hash-with-javascript-d3b2696382fd

    const utf8 = new TextEncoder().encode(string);
    return crypto.subtle.digest('SHA-256', utf8).then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((bytes) => bytes.toString(16).padStart(2, '0'))
            .join('');
        return hashHex;
    });
};

lisperanto.clone = (obj) => JSON.parse(JSON.stringify(obj));


lisperanto.create_RDF_Entry = async function(name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = name;
    return await lisperanto.create_object_with_hash_async(toAdd);
};

lisperanto.create_object_with_hash_async = async function(original_object)
{
    const hash = await lisperanto.calculate_hash_promise(original_object);
    if ( !(hash in lisperanto.customObjects))
    {
        lisperanto.customObjects[hash] = original_object;
        var operation = 
        {
            operation: "create-initial-version",
            id_to: hash,
            'initial-data': lisperanto.clone(original_object),
            'time': lisperanto.getCurrentDateTimeString()
        };
        await lisperanto.operationsPush_async(operation);
    }
    return original_object;
}

lisperanto.create_and_show_RDF_entry = async function(name)
{
    var toShow = await lisperanto.create_RDF_Entry(name);
    await lisperanto.openElement_async(toShow);
    lisperanto.hideOmniBox();
};


lisperanto.define_rdf_predicates_Array = () => lisperanto.rdf_predicates_Array = ko.observableArray([]);

lisperanto.define_filtered_rdf_predicates_Array = () =>
{
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

}; 

lisperanto.find_or_create_rdf_predicate_async = async function(predicate)
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
        return await lisperanto.create_RDF_predicate_async(predicate);
    }

};

lisperanto.equal_exists = function(obj)
{
    const objects = Object.entries(lisperanto.customObjects);
    var result = objects.some(function(entry_key)
    {
        const entry = lisperanto.customObjects[entry_key[0]];
        for( var key in obj)
        {
            if (! (key in entry))
            {
                return false;
            }
            if (obj[key] !== entry[key])
            {
                return false;
            }
        }
        return true;
    });
    return result;
};

lisperanto.equal_exists_async = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    return hash in lisperanto.customObjects;
};

lisperanto.create_RDF_predicate_async = async function(predicate_name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = predicate_name;
    toAdd["type"] = "rdf-predicate";

    const created = await lisperanto.create_object_with_hash_async(toAdd);

    lisperanto.rdf_predicates_Array.push(
        {
            id: await lisperanto.calculate_hash_promise(toAdd),
            "name@lisperanto": toAdd["name@lisperanto"]
        }
    );
    return toAdd.id;
};


lisperanto.define_activeOperation = () => lisperanto.activeOperation = ko.observable("");


lisperanto.define_focusedObj = () => lisperanto.focusedObj = ko.observable({});


lisperanto.copy_json_and_add_key_and_value_async = async function(obj, key, value)
{
    var new_obj = {};
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
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};


lisperanto.copy_json_and_transform_keyholder_async = async function(obj, value)
{
    var new_obj = {};
    const available_keys = Object.keys(obj);
    const key = obj["new-key-holder@lisperanto"];
    available_keys.forEach(k =>
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            new_obj[k] = k_value;
        }
    });
    delete new_obj["new-key-holder@lisperanto"];
    new_obj[key] = value;
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};

lisperanto.create_json_entry_from_object = function(obj)
{
    var new_obj = lisperanto.create_object_with_id();
    for(var k in obj)
    {
        if(!(k in new_obj))
        {
            var k_value = obj[k];
            if(typeof(k_value) !== "function")
            {
                new_obj[k] = k_value;
            }
        }
    }
    return new_obj;
}

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

lisperanto.add_statement_key_to_json_entry = async function()
{
    const wrapper = lisperanto.focusedObj();
    // [lives-in] [Odesa]
    // I decided that by convention every rdf-entry and rdf-predicate will have a name field 

    var obj = wrapper.wrapped_one();
    const predicateName = lisperanto.omniBoxTextInput().trim();
    if(predicateName === "")
        return;
    var created_copy = await lisperanto.add_to_be_added_key_to_json_async(predicateName, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    lisperanto.open_OmniBox_for_adding_text_value_to_json_entry(wrapper);
    return created_copy;
};

lisperanto.add_text_value_to_json_entry_async = async function()
{
    const wrapper = lisperanto.focusedObj();
    var obj = wrapper.wrapped_one();
    const text_value = lisperanto.omniBoxTextInput().trim();
    var created_copy = await lisperanto.copy_json_and_transform_keyholder_async(obj, text_value);
    
    var operation = {
        id_from: await lisperanto.calculate_hash_promise(obj),
        id_to: await lisperanto.calculate_hash_promise(created_copy),
        operation: "set-value-to-holded-key",
        value: text_value,
        time: lisperanto.getCurrentDateTimeString()
    };
    wrapper.wrapped_one(created_copy);
    await lisperanto.operationsPush_async(operation);
    lisperanto.hideOmniBox();
    await lisperanto.open_OmniBox_for_adding_statement_to_json_entry_async(wrapper);
};

lisperanto.add_statement_key_to_json_entry_by_name = async function(statement_key)
{
    var obj = lisperanto.focusedObj().wrapped_one();
    var created_copy = await lisperanto.add_to_be_added_key_to_json_async(statement_key, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    return created_copy;
};

lisperanto.define_listOfOpenElements = () => lisperanto.listOfOpenElements = ko.observableArray([]);

lisperanto.closeElement = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    if(hash in lisperanto.mapOfOpenElements)
    {
        const wrapper = lisperanto.mapOfOpenElements[hash];
        lisperanto.listOfOpenElements.remove(wrapper);
        delete lisperanto.mapOfOpenElements[hash];
    }
};

lisperanto.openElement_async = async function(obj)
{
    await lisperanto.closeElement(obj);
    var wrapper = await lisperanto.create_wrapper_for_canvas_async(obj);
    if( !(wrapper.id() in lisperanto.mapOfOpenElements))
    {
        lisperanto.listOfOpenElements.push(wrapper);
        lisperanto.mapOfOpenElements[wrapper.id()] = wrapper;
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
            if(wrapper.id() == inner_wrapper.id())
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


lisperanto.filloutOmniBoxDataForFunction = function(query, omniBox, root) 
{
    var foundUI = $(query)[0];
    omniBox.visible(true);
    var offsetX = foundUI.offsetLeft;
        offsetX += root.offsetX();
    omniBox.left(offsetX );
    var offsetY = foundUI.offsetTop + foundUI.offsetHeight ;
        offsetY += root.offsetY();
    omniBox.top(offsetY);

    $("#" + omniBox.id ).focus();
    event && event.stopPropagation();
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
    var objId = obj.id()
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



lisperanto.open_OmniBox_for_adding_statement_to_json_entry_async = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-statement-key-to-json-entry");

    const id = await caller.id();
    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-statement-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};

lisperanto.open_OmniBox_for_adding_text_value_to_json_entry = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-text-value-to-json-entry");

    const id = await caller.id();

    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-text-value-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};

lisperanto.hideOmniBox = function()
{
    lisperanto.canvasOmniBox.visible(false);
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("");
    lisperanto.omniBoxTextInput("");
};

lisperanto.add_existing_RDF_predicate_to_json_from_omnibox = async function(obj)
{
    event.stopPropagation();
    await lisperanto.add_statement_key_to_json_entry_by_name(obj.text);
    lisperanto.hideOmniBox();
};

lisperanto.replace_existing_json_key_from_omnibox = function(obj)
{
    event.stopPropagation();
    const new_key = obj.text;
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();

};

lisperanto.replace_existing_json_key_from_omnibox_text_async = async function()
{
    const new_key = lisperanto.omniBoxTextInput().trim();
    var new_key_id = await lisperanto.find_or_create_rdf_predicate_async(new_key);
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


lisperanto.omniBoxInputKeyDown = function(data, event)
{
    //console.log(event.originalEvent);
    if(event.originalEvent.code == "Tab")
    {
        // here I will need to cycle through available options
    }
    return true;
};

lisperanto.create_RDF_entry_with_name_from_omnibox = async function()
{
    const name = lisperanto.omniBoxTextInput().trim();
    if(name.length === 0)
        return;

    await lisperanto.create_and_show_RDF_entry(name);
};

lisperanto.omniBoxClick_on_keydown = function()
{
    event.stopPropagation();
    if(event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        if(lisperanto.activeOperation() === "global-omni-box-activated")
        {
            lisperanto.create_RDF_entry_with_name_from_omnibox();
        }
    }
    return true;
};

lisperanto.omniBoxInputKeyPress_async = async function() 
{
    if(event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
    }
    else
    {
        if(event.keyCode == 13)
        {
            const key = lisperanto.activeOperation();
            var map = 
            {
                "add-statement-key-to-json-entry": () => lisperanto.add_statement_key_to_json_entry(),
                'add-text-value-to-json-entry':async () => await lisperanto.add_text_value_to_json_entry_async(),
                'replace-existing-json-key': async () => await lisperanto.replace_existing_json_key_from_omnibox_text_async()
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
                if(exactMatch.length === 1)
                {
                    var functionToOpen = lisperanto.customObjects[exactMatch[0].id];
                    await lisperanto.openElement_async(functionToOpen);
                    lisperanto.hideOmniBox();
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

lisperanto.define_body_is_dragged = () => lisperanto.body_is_dragged = ko.observable(false);

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

lisperanto.define_total_movement_while_body_drag = () => lisperanto.total_movement_while_body_drag = ko.observable(0);

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

    return true;

};

lisperanto.bodyKeyUp = function( data, event)
{

    return true;

};

lisperanto.editorKeyUp = function(event)
{
    event.stopPropagation();
};

lisperanto.editorKeyDown_async = async function()
{
    event.stopPropagation();
    if (event.code == "Enter" && (event.metaKey || event.ctrlKey))
    {
        const id = event.target.offsetParent.id;
        const parent = lisperanto.mapOfOpenElements[id];
        await lisperanto.confirm_change_to_json_async(parent);
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

lisperanto.define_canvasOmniBox = () => lisperanto.canvasOmniBox = lisperanto.defineOmniBox();

lisperanto.add_to_be_added_key_to_json_async = async function (predicateName, obj) {
    var toAdd_id = await lisperanto.find_or_create_rdf_predicate_async(predicateName);
    var created_copy = await lisperanto.copy_json_and_add_key_and_value_async(obj, "new-key-holder@lisperanto", predicateName);
    var operation = {
        operation: "hold-json-key",
        id_from: await lisperanto.calculate_hash_promise(obj),
        id_to: await lisperanto.calculate_hash_promise(created_copy),
        time: lisperanto.getCurrentDateTimeString()
    };
    await lisperanto.operationsPush_async(operation);
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
        id: copy["id"],
        remove_key: lisperanto.key_in_json_to_focus,
        'time': lisperanto.getCurrentDateTimeString()
    };
    lisperanto.operationsPush(operation);
    lisperanto.hideOmniBox();
};

lisperanto.confirm_change_to_json_async = async function(parent)
{
    event.stopPropagation();
    var obj = parent.wrapped_one();
    const updated_key = parent["key_with_changes@lisperanto"]();
    const new_value = parent["new_value@lisperanto"]();
    const copy = await lisperanto.copy_json_and_add_key_and_value_async(obj, updated_key, new_value);
    parent.wrapped_one(copy);
    var operation = {
        operation: "change_value_of_json_key",
        id_from: await lisperanto.calculate_hash_promise(obj),
        id_to: await lisperanto.calculate_hash_promise(copy),
        updated_key: updated_key,
        new_value: new_value,
        time: lisperanto.getCurrentDateTimeString()
    };
    await lisperanto.operationsPush_async(operation);
    parent["key_with_changes@lisperanto"]("");
    parent["new_value@lisperanto"]("")
};

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};

lisperanto.replace_focused_json_key_with_new = async function(new_key) {
    const old_key = lisperanto.key_in_json_to_focus;
    const wrapper = lisperanto.focusedObj();
    var copy = lisperanto.copy_json_and_replace_key(wrapper.wrapped_one(), old_key, new_key);
    wrapper.wrapped_one(copy);
    var operation = {
        operation: "replace_json_key",
        id: copy["id"],
        new_key: new_key,
        old_key: old_key,
        'time': lisperanto.getCurrentDateTimeString()
    };
    await lisperanto.operationsPush_async(operation);
};

lisperanto.define_anchorWidth = () => lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));

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


lisperanto.migrate_all_function_to_storage_async = async function()
{
    for(var key_name in lisperanto)
    {
        if (key_name == "customObjects")
        {
            // ignore customObjects
            continue;
        }
        const rdf_entry_name = key_name;
        const entry_in_lisperanto = lisperanto[key_name];
        const type_of_entry = typeof(entry_in_lisperanto);
        var expected_object = {};
        expected_object["name@lisperanto"] = rdf_entry_name;
        expected_object["type@lisperanto"] = type_of_entry;
        expected_object["module@lisperanto"] = "lisperanto";

        if(type_of_entry === "function")
        {
            const function_definition = entry_in_lisperanto.toString();
            if(function_definition.toLowerCase().indexOf("[object") == 0 )
            {
                continue;
            }
            expected_object["programming-language@lisperanto"] = "javascript";

            const headers_only = lisperanto.clone(expected_object);
            const initial_hash = await lisperanto.calculate_hash_promise(headers_only);
            if (!(initial_hash in lisperanto.customObjects))
            {
                await lisperanto.create_object_with_hash_async(headers_only);
            }
            const latest_version_hash = lisperanto.find_latest_version(initial_hash);
            const latest_object = lisperanto.customObjects[latest_version_hash];
            if( "previous-version@lisperanto" in latest_object)
            {
                expected_object["previous-version@lisperanto"] = latest_object["previous-version@lisperanto"];
            }
            else
            {
                expected_object["previous-version@lisperanto"] = latest_version_hash;
            }

            expected_object["javascript-function-definition@lisperanto"] = function_definition;
            const present = await lisperanto.equal_exists_async(expected_object);

            if (!present)
            {
                await lisperanto.create_object_with_hash_async(expected_object);
                console.log("creating json entry for", expected_object);
            }
        }
        else
        {
            console.log("Non function found")
            console.log(key_name);
        }
    }
};

lisperanto.define_lookups = function()
{
    lisperanto.define_omniBoxTextInput(); // initialization
    lisperanto.define_somethingChanged(); // initialization
    lisperanto.define_filteredSearch(); // initialization

    lisperanto.define_rdf_predicates_Array(); // initialization
    lisperanto.define_filtered_rdf_predicates_Array(); // initialization
};

lisperanto.body_onload_async = async function()
{
    lisperanto.main_initialization(); // initialization
    
    lisperanto.loadFromStorage();
    lisperanto.backgroundApplySaved();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(lisperanto);

    lisperanto.center_omni_box();

    // this is for getting new version from text to storage

    await lisperanto.migrate_all_function_to_storage_async();
};

lisperanto.define_global_offsets = function() {
    lisperanto.define_globalOffsetX(); // initialization
    lisperanto.define_globalOffsetY(); // initialization
    lisperanto.define_globalOffsetZ(); // initialization
    lisperanto.define_globalMaxX(); // initialization
    lisperanto.define_globalMaxY(); // initialization
    lisperanto.define_globalMinX(); // initialization
    lisperanto.define_globalMinY();
};

lisperanto.main_initialization = function () {
    lisperanto.define_objects();

    lisperanto.define_lookups();

    lisperanto.define_activeOperation(); // initialization
    lisperanto.define_focusedObj(); // initialization

    lisperanto.define_listOfOpenElements(); // initialization

    lisperanto.define_body_is_dragged(); // initialization

    lisperanto.define_total_movement_while_body_drag(); // initialization

    lisperanto.define_canvasOmniBox(); // initialization

    lisperanto.define_anchorWidth(); // initialization

    lisperanto.define_backgroundColor(); // initialization

    lisperanto.define_global_offsets(); // initialization

    lisperanto.define_menuIsOpen(); // initialization
    lisperanto.define_menuWasAlreadyOpen(); // initialization

    lisperanto.define_optionsIsOpen(); // initialization
    lisperanto.define_optionsWasAlreadyOpen();
};

lisperanto.center_omni_box = function () {
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: 0,
            y: document.body.offsetHeight / 3
        });

    const width_of_omnibox = document.getElementById("contextual-omni-box").offsetWidth;
    const delta_x_2 = Math.max(0, (document.body.offsetWidth / 2 - width_of_omnibox / 2));
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox,
        {
            x: delta_x_2,
            y: document.body.offsetHeight / 3
        });
};

