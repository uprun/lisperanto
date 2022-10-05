// Version hash: 1087f7f57e549531cdce9f1bd6396c13f950fb87ee61e3664029259aea4d6120
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};// Version hash: bfc4528eac8d9a3975d87dfc80ff6527c97e63349bbe6af4b9086d51f2d3919e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_existing_RDF_predicate_to_json_from_omnibox = async function(obj)
{
    event.stopPropagation();
    await lisperanto.add_statement_key_to_json_entry_by_name(obj.text);
    lisperanto.hideOmniBox();
};// Version hash: 4024a3b4e6fe6c1574c7345d42345e60aebe9a25b4c54a20769ee3194f8849ef
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_statement_key_to_json_entry_by_name = async function(statement_key)
{
    var obj = lisperanto.focusedObj().wrapped_one();
    var created_copy = await lisperanto.add_to_be_added_key_to_json_async(statement_key, obj);
    lisperanto.focusedObj().wrapped_one(created_copy);
    lisperanto.hideOmniBox();
    return created_copy;
};// Version hash: 515eae0f95e2be014bc668e8af709d01abc8831733014e718063c5e2fc3b1bee
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: c3e4438faa2f3b96c8b49e3adeda80a548b54306c9f92777b87403fa44f29ee0
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 9be9357841f8d6c0e8241b9d546bb344e4167312b55c8d2b688a3ad7f021d995
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: d747077a9d8a02bb35262b86c1e20fb0c5c390726b3ad0112845dba1545720e2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 8b5fb6b9b059714a7562219300e38476e2a389a8efaaa3fce1336907c42d76b4
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.applyMovement = function (deltaY, deltaX) 
{
    var newOffsetY = lisperanto.globalOffsetY() - deltaY * lisperanto.globalOffsetZ();
    const max_Y = lisperanto.globalMaxY();
    newOffsetY = Math.min(newOffsetY, max_Y);
    const min_Y = lisperanto.globalMinY() + document.body.offsetHeight;
    newOffsetY = Math.max(newOffsetY, min_Y);
    lisperanto.globalOffsetY(newOffsetY);

    var newOffsetX = lisperanto.globalOffsetX() - deltaX * lisperanto.globalOffsetZ();
    const max_X = lisperanto.globalMaxX();
    newOffsetX = Math.min(newOffsetX, max_X);
    const min_X = lisperanto.globalMinX() + document.body.offsetWidth;
    newOffsetX = Math.max(newOffsetX, min_X);
    lisperanto.globalOffsetX(newOffsetX);
    //console.log({x: newOffsetX, min_X: min_X, y: newOffsetY, min_Y: min_Y});
};// Version hash: 1e6bc74346755c8b44b1183ccf599a2bd6db10e25d8ee269404b3ecb47506633
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.backgroundApplySaved = function() 
{
    var background = localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};// Version hash: 25422bbe2453cf3db214f6d86254196d7b5f9bde159c4de63203a27d2b03bd6c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onload_async = async function()
{
    lisperanto.main_initialization(); // initialization
    
    lisperanto.loadFromStorage();
    lisperanto.loadCustomObjectsFromServer();

    lisperanto.load_operations_from_server();
    lisperanto.backgroundApplySaved();
    lisperanto.restore_RDF_predicates_array();
    lisperanto.defineTimerForFunctions();
    
    ko.applyBindings(lisperanto);

    lisperanto.center_omni_box();

    // this is for getting new version from text to storage

    await lisperanto.migrate_all_function_to_storage_async();
};// Version hash: c3abc317d99b0dc49723f862b0e7e5ad6bdab6688d36f1675a689799979925eb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmousedown = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(true);
    lisperanto.total_movement_while_body_drag(0)
};// Version hash: df45448180dadfa8772c676793394eadf2e9b0b13b9ccb5416afd88455c246f1
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: d4c0d506b346fc6a672211f8b79c0f32d40739cc4f3ba67496b8ae5ae560c079
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmouseout = function()
{
    lisperanto.body_is_dragged(false);
};// Version hash: c08561f1d5ce9985cb3337ddbf71ee816ea9cc560110b7222112e67bdaedbc9c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmouseup = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(false);
};// Version hash: 4892b5a9b7a93abb7dc264585680bc73bac93e2de411054aef6675a89efba10c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

};// Version hash: fcb75995b858cb0faf96b9ffd1c559701e396ec0af2e81844993a75001c0d758
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyKeyUp = function( data, event)
{

    return true;

};// Version hash: 5df30aa8594ea63738fc740a4b56f924d2a26a0ebd2e0bda1fbb5fc3e415106a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 74fae67206eddbfc2c4894052a44b6d244d89b159f94a2640753ebba7ed49bd5
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnPointerMove = function()
{
    //console.log(event);

};// Version hash: 296c8e2164a52381ef330767b1d1533826c4da5d53c82bc3eae902ae00718e3a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnTouchEnd = function()
{
    lisperanto.previosTouch = undefined;
};// Version hash: 797c14f0775fe607a62b439aa20ba31d3ee91deb50c8fec54c87498883615f9a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnTouchMove = function()
{
    //console.log(event);
    var touches = event.changedTouches;
    if(touches.length > 0 )
    {
        const clientX = touches[0].clientX;
        const clientY = touches[0].clientY;
        if(typeof(lisperanto.previosTouch) !== "undefined")
        {
            var deltaX = lisperanto.previosTouch.x - clientX;
            var deltaY = lisperanto.previosTouch.y - clientY;
            lisperanto.applyMovement(deltaY, deltaX);
        }
        lisperanto.previosTouch = {x: clientX, y: clientY};
    }
};// Version hash: 73ca0b42112060e59588e88b65241b1845a80e0e50867a55e0c406ec5fe4de7c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
console.log("42");  

    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;



    console.log('body_on_wheel');

};// Version hash: 7c5d8a93acfd0b878bfbc10fe881fded275e551976dbdd3e0bc822a49ed22365
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: ced913b6a91ad6de80e7a9c46bfd8ba5f00243dff128cc11efc2fe7fe5dc7b20
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 88422a96540999c0b66509d0306485263367a633beab795c778ca415cb4953f3
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.changeBackground = function() 
{
    var background = "#333333";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};// Version hash: e1ce7166cc52d8f6cad4e22c76a5944ce36d7bce0e10d0c5f32efcd995f4df12
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.changeBackgroundToDefault = function() 
{
    var background = "#000000";
    lisperanto.backgroundColor(background);
    localStorage["backgroundColor"] = background;
    event.stopPropagation();
};// Version hash: 939c1b1968d7e17a085e72b6861644e0b17e1547eec2be7671c7295ee850258b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.clone = (obj) => JSON.parse(JSON.stringify(obj));// Version hash: 38d415cab2b367b662d9b8c659dbdcb2ce83835ec2887d18402bc8ef09672102
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.closeElement = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    if(hash in lisperanto.mapOfOpenElements)
    {
        const wrapper = lisperanto.mapOfOpenElements[hash];
        lisperanto.listOfOpenElements.remove(wrapper);
        delete lisperanto.mapOfOpenElements[hash];
    }
};// Version hash: 135ee77ae76ca9383c33639c291c89a2aa21998c242752fecbd226db7ad08b42
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: a63242229f79da537a06a3bb32ae24a91bd46ab75d228747f7e5d1bff6e739a2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
    const previous_hash = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj, previous_hash);
};// Version hash: 3ca173851dead66b197f3b7e43c4644432d62bb0683c69b26407465003b93f62
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
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
};// Version hash: 1ce47bb5176da17966ea6ffc57a88b3af5be4a934bbb11b360e7ec553a8b9f43
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
    const previous_hash = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj, previous_hash);
};// Version hash: 55d7f24e8c40c37fa699ce4da142c82cfe790fc65c6f09d8356c398c840c5a1a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_and_show_RDF_entry = async function(name)
{
    var toShow = await lisperanto.create_RDF_Entry(name);
    await lisperanto.openElement_async(toShow);
    lisperanto.hideOmniBox();
};// Version hash: 1bd783bda0c263720adc67afb979695418002f7a3af76648fc3a09d86fd5e9f5
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 2b24fd7a1d1068cfc89301b32101c7897e3f66e0fa1252787758628635f8a134
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_object_with_hash_async = async function(original_object, previous_hash)
{
    const hash = await lisperanto.calculate_hash_promise(original_object);
    if ( !(hash in lisperanto.customObjects))
    {
        lisperanto.customObjects[hash] = original_object;
        var operation = 
        {

            operation: "create-initial-version-time-only",
            id_to: hash,
            'time': lisperanto.getCurrentDateTimeString()
        };

        if (typeof(previous_hash) !== 'undefined')
        {
            operation["id_from"] = previous_hash;

        }

        await lisperanto.operationsPush_async(operation);
    }
    return original_object;
};// Version hash: 0ea23d2ce3e806d2ca652e5732a7dbe1f4a1b9a98931ecb71d714acde78ca99d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_object_with_id = function()
{
    var guid = crypto.randomUUID();
    
    var toAdd = {
        id: guid,
        creation_time: lisperanto.getCurrentDateTimeString()
    };

    lisperanto.customObjects[guid] = toAdd;
    return toAdd;
};// Version hash: 1339a84999d5af4f9f21cbcdb81425c844d34bd823d262e53d072b93f8f7f85f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: ce9d46638f13b3b85447100b56a010b1b9d0f94cfcda0e65977f5f4c507f1bf2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_entry_with_name_from_omnibox = async function()
{
    const name = lisperanto.omniBoxTextInput().trim();
    if(name.length === 0)
        return;

    await lisperanto.create_and_show_RDF_entry(name);
};// Version hash: dcb05f012afb05d8031f513fd18999d81190a7c8605ff961289561227755cf55
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_Entry = async function(name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = name;
    return await lisperanto.create_object_with_hash_async(toAdd);
};// Version hash: 80860d1992c6f789989abffc3c530a3a3e32bdec4879faf36b52a00710b468d2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 6b7ad9506b962f9d0bc371dc478d7900de3b7bd6483af3fd4f01942a3c3590be
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
    wrapper_for_canvas["wrapped_one"].subscribe(async () => 
        {
            const new_hash = await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]());
            const previous_hash = wrapper_for_canvas["id"]();
            lisperanto.mapOfOpenElements[new_hash] = lisperanto.mapOfOpenElements[previous_hash];
            delete lisperanto.mapOfOpenElements[previous_hash];
            return wrapper_for_canvas["id"](new_hash);
        });

    wrapper_for_canvas.inWorldOffsetX = ko.computed(function()
    {
        return wrapper_for_canvas.offsetX() + lisperanto.globalOffsetX();
    });

    wrapper_for_canvas.inWorldOffsetY = ko.computed(function()
    {
        return wrapper_for_canvas.offsetY() + lisperanto.globalOffsetY();
    });
    return wrapper_for_canvas;
};// Version hash: 120b94bad4b4b6d1a5c8d179efa4b723ce50b1a8fb7fd6c67e4ff3e584838a18
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.createVector = function(a, b)
{
    var result = {
        x: b.x - a.x,
        y: b.y - a.y
    };
    return result;
};// Version hash: d3b3a72a927006aa9ead4b11adf28d283488b99f0be62630da3750f7db89f177
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_activeOperation = () => lisperanto.activeOperation = ko.observable("");// Version hash: 136080994379ade002af289371dbfa5827a4c92dfab2e9fe09ae96add9765ea2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_anchorWidth = () => lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));// Version hash: 916b8e8304ecdb152bbd59aa6452ee42c957b71d77e2e195a49a8f124498c872
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_backgroundColor = () => lisperanto.backgroundColor = ko.observable("#000000");// Version hash: 6cde43aa1820c9e4ec4bb652af6aa7fb4675c18eae36797729390bb89493ef70
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_body_is_dragged = () => lisperanto.body_is_dragged = ko.observable(false);// Version hash: 449a749a9f2068c1aa284283981acde847c12ce0a977453b4d8326fe71448bb9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_canvasOmniBox = () => lisperanto.canvasOmniBox = lisperanto.defineOmniBox();// Version hash: 9f88afe400f02a52ed415ad5278bb230098f9f132201be962ea4e3a41fb8a9ff
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

};// Version hash: 733858d866bc4fc3f5cc3368130437f3b91b1f614f1214f68051a8a7cd322684
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

                    if(has_new_version)
                        return false;

                    const obj = lisperanto.customObjects[key];
                    var name = "";
                    if("name@lisperanto" in obj)
                    {
                        name = obj["name@lisperanto"];

                    }

                    
                    return true;

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

};// Version hash: 21ff728288f24b6aab9bf3b5c85de9071db46143e255ed30913e6d2106ebe9af
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_focusedObj = () => lisperanto.focusedObj = ko.observable({});// Version hash: 1c8f27f3640350673a6f86cd41c17e8155e74336c59fe4e9adf358d8ff4db00e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_global_offsets = function() {
    lisperanto.define_globalOffsetX(); // initialization
    lisperanto.define_globalOffsetY(); // initialization
    lisperanto.define_globalOffsetZ(); // initialization
    lisperanto.define_globalMaxX(); // initialization
    lisperanto.define_globalMaxY(); // initialization
    lisperanto.define_globalMinX(); // initialization
    lisperanto.define_globalMinY();
};// Version hash: c9eb9f2531fd9c54b47b22787c3a220e9ae883b58e6ecdfc4e9bee5ea6dbf29e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMaxX = () => lisperanto.globalMaxX = ko.observable(screen.width);// Version hash: 94a5b755ee9acd97e4bfe1c281ef88c990fec2187aefa6cdffc0d4bef0316dc4
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMaxY = () => lisperanto.globalMaxY = ko.observable(screen.height);// Version hash: 40217577bf951f2a64ec1b7b3c1e915786d1d5c4226086d94f304aee3b0e5872
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinX = () => lisperanto.globalMinX = ko.observable(-screen.width * 2);// Version hash: 64f76ce6b7fe7906f4aa9495766c3f9a421c352011dc078dab72e36c97bb459c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinY = () => lisperanto.globalMinY = ko.observable(-screen.height * 2);// Version hash: eab27d1c1a2aa561e8f3a14edff5e7340dab88757533d20cf37b23551326ce30
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetX = () => lisperanto.globalOffsetX = ko.observable(0.0);// Version hash: 0aff454d1fbe9917e3a1ea62acc491d673c3b1b4a187463a56c3118dd4b4d071
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetY = () => lisperanto.globalOffsetY = ko.observable(0.0);// Version hash: f9cc22e287506875a9b29f0967013851314359e29320987b55af6f743d84e18b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetZ = () => lisperanto.globalOffsetZ = ko.observable(1.0);// Version hash: 7af72c9bd300ce2d7b3fe5dd78cfc87f9cd0f2de494db726e771e43dd81ffa5a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_listOfOpenElements = () => lisperanto.listOfOpenElements = ko.observableArray([]);// Version hash: 1c940fd560749a29c06a229bee850cd4504e11360be7d5b7125acf64cd41ff81
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_lookups = function()
{
    lisperanto.define_omniBoxTextInput(); // initialization
    lisperanto.define_somethingChanged(); // initialization
    lisperanto.define_filteredSearch(); // initialization

    lisperanto.define_rdf_predicates_Array(); // initialization
    lisperanto.define_filtered_rdf_predicates_Array(); // initialization
};// Version hash: 0be2bc04087edff79acb24c9c94bc163506f298b8e035041913568fa72b13723
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_menuIsOpen = () => lisperanto.menuIsOpen = ko.observable(false);// Version hash: 54f680f1620b743ff0010670ad1566c063e7dcf020e60468b3d2307d8dab268d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_menuWasAlreadyOpen = () => lisperanto.menuWasAlreadyOpen = ko.observable(false);// Version hash: fd523bb3973d60dde5f52e8c6b697fd1b549784fe3a7d45978f26e49bf0e74d0
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



    lisperanto["lookup_by_name"] = {};

    lisperanto["operations"] = {};
};// Version hash: 878ad3896c8e8a9e0ada7c15dfbbf9b32c50d9e0c209d429ea5f189edc8ec7af
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_omniBoxTextInput = () => {
    lisperanto.omniBoxTextInput = ko.observable("");
    lisperanto.omniBoxTextInput
        .extend({ rateLimit: 100 });
};// Version hash: 7e5de4b5949af8bd87504bf0c0febd428a738bf23557a206d4f9b3cd5f800028
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_optionsIsOpen = () => lisperanto.optionsIsOpen = ko.observable(false);// Version hash: be80a9df52135596fd63fd3adfe1a7f8f5fc0c4897a99d7d7367a327b9c0e7fd
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_optionsWasAlreadyOpen = () => lisperanto.optionsWasAlreadyOpen = ko.observable(false);// Version hash: 5448d9c8d1f9c8979d92dbde84c39b9f74a50fe08d937c761435871e4d7b5b5f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_rdf_predicates_Array = () => lisperanto.rdf_predicates_Array = ko.observableArray([]);// Version hash: ca530581a641133ba20044bf2a4c83586b2c3d86e54d032cf8fb50a2be550f10
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_somethingChanged = () => {
    lisperanto.somethingChanged = ko.observable(0);
    lisperanto.somethingChanged.extend({ rateLimit: 100 });
};// Version hash: 677d74fbd7cfabb44100dc47bbdc3eab37094b57ed0c018ce033771d6db06c43
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_total_movement_while_body_drag = () => lisperanto.total_movement_while_body_drag = ko.observable(0);// Version hash: 14b2cdfe85d81e21e6076da00985506c1fdfd8aad611b208e4d8f5abe5b77951
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineOmniBox = function() {
    var omniBox = {
        visible: ko.observable(false),
        left: ko.observable(0),
        top: ko.observable(0),
        id: 'global--popup-omni-box-input' 
    };
    return omniBox;
};// Version hash: 380724b588ac5d3a8e9c06d43b62aaec5c13ec1cc96165c30200b576e6ff1fb6
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineTimerForFunctions = function()
{
    lisperanto.timerForFunctions = setInterval(lisperanto.moveElementsOnCanvasIteration, 30);
};// Version hash: 3cb55c382ae008db3e489b21726565d094d00e20839c04d1ddc119a1620cd91b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: ea9641e3a1ef6bf1811364fc764924737d71839c2fab942a42342c5ba1e72ac1
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

};// Version hash: 96708d2462c176619f43d161f0762458fbd729fa178c1b81a20ba64a1b868174
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: eeb9fefc515fe0d22e562944ee2e6addd45a3a597e7748411f2ce70526326dbb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 5bc87127f310372352cd1f14a1fbc0cb4199c3e491bd4320a84d1f0a69e53577
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.editorKeyUp = function(event)
{
    event.stopPropagation();
};// Version hash: 39054453aa68674a568799a3cbbe9fe200098d3f9da86762462796a9beeec8db
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};// Version hash: d18d800c471f922d36f3d99ca034e0aace2c1402aa0140a6c6c6f447dea795f7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.equal_exists_async = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    return hash in lisperanto.customObjects;
};// Version hash: 7691697726a6bfc9b5a10e934a917e2f850216ba8951aca797d5f06d3d7e7213
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: ed0f8cf55b8e9a15b43dfe0ae7283ca4882b7af6a5457eff35a93eff345d4c10
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 37f5177ff2a1d92aee24401ecaa28aa0f85daeff95e7a0701590b877541edc52
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: d42b3a622b5dc20099e78c2c3176f75657aa764ab689ed127b7f946af6ce0ddf
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 04319320d442c03938f99a04bd2d5902bd35d55f84c524d4c641f35a6f497914
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

};// Version hash: 1ff49b7862d89b0d311680040bd4139b3d3ec4d08c5cd32f9824add62224c8a1
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 4c2b7218469b25ae97828e35b444830bf78b34741919db1eda64ea8ad9855458
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.generateVectors = function(point, otherPoints)
{
    var result = [];
    for (const [key, somePoint] of Object.entries(otherPoints)) 
    {
        result.push(lisperanto.createVector(point, somePoint));
    }
    return result;
};// Version hash: d4e347929a246f572e464c0761e84dc516cb04a83393816423b22a37affa0ccc
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: cac39f54ef35b0aec8ecb64128fb8105aecfb44c2aa6ea7792debb6b1a31b1a8
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 2e0d9c7a94a4ce64d89d8e33147657da0f29d84ef07fd5403a80cc9cc61e1cd9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 71142b721515b10ec169ac948391ffd2d6e23ca5890614c1f8fc922c644f8f8f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.getVectorsFromBox = function(point, box, margin)
{
    var result = [
        lisperanto.createVector(point, {x: point.x, y: box.top - margin}), // to Up
        lisperanto.createVector(point, {x: point.x, y: box.top + box.height + margin}), // to Bottom
        lisperanto.createVector(point, {x: box.left - margin, y: point.y}), // to Left
        lisperanto.createVector(point, {x: box.left + box.width + margin, y: point.y}) // to Right
    ];
    return result;
    
};// Version hash: 3aa2c89fc97029a741ff5e230b0ec9184f30a615427fca87e6dd6ea2424085ec
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideMenu = function()
{
    if(lisperanto.menuIsOpen())
    {
        lisperanto.toggleMenu();
    }
};// Version hash: 069dfbe61d18f8273ce85ab479e2f551a777e91d354c2a3d77fa3782798ccc0b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideOmniBox = function()
{
    lisperanto.canvasOmniBox.visible(false);
    lisperanto.focusedObj(undefined);
    lisperanto.activeOperation("");
    lisperanto.omniBoxTextInput("");
};// Version hash: 62f26c674fcd1eb70aa74d030bbe9e0f2cc2ee92695f44ef3df68f5f47c0f59f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.hideOptions = function()
{
    if(lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};// Version hash: 23d22e602d46e37a0c67b0a1942bacab1ab12eeecc494d527e072f7a95705bc3
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.isPointInsideTheBox = function(point, box, margin = 0)
{
    var result =
        point.x >= (box.left - margin)
        && point.x <= (box.left + box.width + margin)  
        && point.y >= (box.top - margin)
        && point.y <= (box.top + box.height + margin);
    return result;
};// Version hash: f6b68230e29797ac2e4eb64376ce9737197914afc366b74f012cc77780fa22ac
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: c2365a9ec611fa2d59aff24fe619eba1a857427a7aa5482eefca3800fca16e5b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.load_operations_from_server = function()

{



    if ( !("lookup_by_name" in lisperanto))
    {
        lisperanto["lookup_by_name"] = {};

    }


    if ( !("operations" in lisperanto))
    {
        lisperanto["operations"] = {};

    }

    $.get('Home/ListOfOperations', function(data, status){
        for(var k in data)
        {
            const key = data[k];
            console.log(k);
            if( !(key in lisperanto.operations))
            {
                $.get("Home/GetOperation", {key: key})
                    .done(function(data_obj)
                    {
                        console.log(data_obj)
                        var parsed = JSON.parse(data_obj.value);



                        lisperanto.operations[data_obj.key] = parsed;

                        if (("id_from" in parsed) && ("id_to" in parsed))

                        {
                            const id_from = parsed["id_from"];
                            const id_to = parsed["id_to"];
                            lisperanto.has_new_version_map[id_from] = id_to;
                        }

                        else
                        {
                            if (("id_to" in parsed))
                            {
                                const id_to = parsed["id_to"];
                                const obj = lisperanto.customObjects[id_to];
                                if (("name@lisperanto" in obj))
                                {
                                    const name = obj["name@lisperanto"];
                                    if (name in lisperanto["lookup_by_name"])
                                    {
                                        const latest_key = lisperanto["lookup_by_name"][name];
                                        if(data_obj.key > latest_key )
                                        {
                                            lisperanto["lookup_by_name"][name] = data_obj.key;
                                        }
                                    }
                                    else
                                    {
                                        lisperanto["lookup_by_name"][name] = data_obj.key;
                                    }
                                }


                            }
                        }

                        //lisperanto.customObjects[data_obj.hash] = parsed;
                        lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
                    });
            }
        }
      });
};// Version hash: 559d0b3b32ef0af03bd11ac007c181c33bbd18ec11c1b46a549f20ec6ba95774
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.loadCustomObjectsFromServer = function()
{
    $.get('Home/ListOfCustomObjects', function(data, status){
        for(var k in data)
        {
            const hash = data[k];
            console.log(k);
            if( !(hash in lisperanto.customObjects))
            {
                $.get("Home/GetCustomObject", {hash: hash})
                    .done(function(data_obj)
                    {
                        console.log(data_obj)
                        var parsed = JSON.parse(data_obj.value);
                        lisperanto.customObjects[data_obj.hash] = parsed;
                        lisperanto.somethingChanged(lisperanto.somethingChanged() + 1);
                    });
            }
        }
      });
};// Version hash: d1cd4f7938530bff8531b0eb62ad6ccdd807162105acf9eaf4c0021a56762c7a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 45a101de9f047b719f0d423e861d7ed410a767be941070c47b3d25a5643d74c7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 931b2eb5be52541e88d408e3b2995eaf840a15738259be5bb5da6adadb035528
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: decf157b4d107cb317083ed535299cd8bfe503b2b8fbde0c2295e1f2906115fe
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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

};// Version hash: 2f05247ed6543ad32dda6845a3bbca971613deb3c7f7a4f1afe320cbc2b659fd
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.normalizeVector = function(point)
{
    var newLength = Math.sqrt(lisperanto.vectorLengthSquared(point));
    point.x /= newLength;
    point.y /= newLength;
    return point;
};// Version hash: 89d2f428a2df4101ea18aac7df7ba98ca7a695d4baa45d33988af248effe1064
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: fce3256bc299f386aa10e92ff88b820509d047fd1d1f5ea2f8fb5b92832333cd
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxClick = function()
{
    event.stopPropagation();
};// Version hash: 2c681c7a88dbf83449bd4042c1ba7e607d404659d08d020b0e5cd0a36febed11
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxInputKeyDown = function(data, event)
{
    //console.log(event.originalEvent);
    if(event.originalEvent.code == "Tab")
    {
        // here I will need to cycle through available options
    }
    return true;
};// Version hash: 9055a4ce3b6963833062b2eaab83a0323990a6d15124e965493591b64a01c814
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: bfe5b3368e2c44f0960eb7f1a24e639c212a55b725529004b165733ce22b8022
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxInputKeyUp = function( data, event)
{
    //console.log(event.code);
    if(event.code === "Escape")
    {
        lisperanto.hideOmniBox();
    }
    event.stopPropagation();
};// Version hash: abfe246c80cb78bf87cf3b25c2042e374a9c8cfbe1feca8f0a2aafe4c93c7721
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};// Version hash: e274f9e8c997c862463bff66b8ef9f36a665f6ae8fa14e92f5b5a2d134504b48
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};// Version hash: 048342f80cb7bfa18fbc661847be6a40a38eff3c0c29f08897d1fd46e7aa6e93
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_json_entry_from_search_list_async = async function(obj)
{
    await lisperanto.openElement_async(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};// Version hash: 1533157d6b79f35e462717efbf918652d0db6fe8739b5c37c52367b831b68532
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_OmniBox_for_adding_statement_to_json_entry_async = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-statement-key-to-json-entry");

    const id = await caller.id();
    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-statement-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};// Version hash: 8c1e09b95c87a0440ee493d03a81513d5933f770d6ef04820a74cf0b87eebf0e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_OmniBox_for_adding_text_value_to_json_entry = async function(caller)
{
    lisperanto.hideOmniBox();
    lisperanto.focusedObj(caller);
    lisperanto.activeOperation("add-text-value-to-json-entry");

    const id = await caller.id();

    lisperanto.filloutOmniBoxDataForFunction(`#${id} #add-text-value-to-json-entry--`, lisperanto.canvasOmniBox, caller);
};// Version hash: 8bca7c940e497023a25d3cf83f1d93986eba2b96290fff8a7183cbcfc6b20ebe
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: e5fe3532cae87efb2824ad48df925811958475bcd01ef5052e25143e48668bc9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: b4a8a4044b4b31e13bc393cfaad45f1ff7c31c37ba2d6aa12516ae5381d2c036
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.operationsPush_async = async function(some)
{
    //lisperanto.operations.push(some);
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
};// Version hash: 4cc02f01ff55083e3071be45c665bdc90264ae41e07627c895589d748ec8a0b9
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};// Version hash: 681a3ae60368e96cd8e5e5c905459c5f81635c209f63641be4edaeba3789df69
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.replace_existing_json_key_from_omnibox_text_async = async function()
{
    const new_key = lisperanto.omniBoxTextInput().trim();
    var new_key_id = await lisperanto.find_or_create_rdf_predicate_async(new_key);
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();
};// Version hash: 801f75b503858a1f44a4e71d0de466eae0362a9d6c5be275b70472469bd9212a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.replace_existing_json_key_from_omnibox = function(obj)
{
    event.stopPropagation();
    const new_key = obj.text;
    lisperanto.replace_focused_json_key_with_new(new_key);
    lisperanto.hideOmniBox();

};// Version hash: 017bf6319295bc4f36226acbcb2d9ad975fd3ca0105d902268adee42c9d6d16e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: e5129be716af50a63ae33ce05dbd1ce50541aea8e6674ee993f45606ac0d6288
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 96b85289c5163e153f375b42c0baec7f514b141450e2bfb1aac860400b473482
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.showMenu = function()
{
    if(!lisperanto.optionsIsOpen())
    {
        lisperanto.toggleOptions();
    }
};// Version hash: c50e2deb54a57352f8d806292724733fb6f9c8d726e381dd47c6e06f575a0d2f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.showOmniBox = function()
{
    var offset = 
    {
        x: event.pageX,
        y: event.pageY
    };
    lisperanto.filloutGlobalOmniBox(lisperanto.canvasOmniBox, offset);
};// Version hash: 132473f4703f8dbaea26b3e7f5a1431127fe9070f15fc66bab1a9c0861688b2c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.stopPropagation = function()
{
    event.stopPropagation();
};// Version hash: 87823d4f3e1d8d780b3c6b9ed9030c8135ff0613b9ce768e370a0fb0bd9877a5
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleFullScreen = function() 
{
    var element = document.documentElement;
    const rfs = element.requestFullscreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
  
    if (!document.fullscreenElement) 
    {
        rfs.call(element);
        //document.documentElement.requestFullscreen();
    } else 
    {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    event.stopPropagation();
};// Version hash: c687e210f27c57a1f5c1542427be69b6570eaaa91c4d630f82c6366cf96d2d72
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleMenu = function() 
{
    event.stopPropagation();
    lisperanto.menuIsOpen(!lisperanto.menuIsOpen());
    lisperanto.menuWasAlreadyOpen(true);
};// Version hash: f365b3416ec9b167b7258e673ee2f4bfb0d7d41351bee40d95ec21310e16e8ce
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleOptions = function() 
{
    event.stopPropagation();
    lisperanto.optionsIsOpen(!lisperanto.optionsIsOpen());
    lisperanto.optionsWasAlreadyOpen(true);
};// Version hash: 061fa46e59ee2cbb844907e500f126fed3c98080415e5e37908aaed95694a2fe
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: cf02528fc83549af9cf86471a58e4b0f810af1c4bb4c7bd5a83aa1a6bcb37f5b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLength = function(v)
{
    var result = Math.sqrt(lisperanto.vectorLengthSquared(v));
    return result;
};// Version hash: 7c73eb65c4d98844f1672a194431b5d987680591efafdc383200415089d57678
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};// Version hash: fb5872f0afa4b725018da7af7a9a214c3ee0e53020227cae910ca8a6e7540b32
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsAreCoAligned = function(bv, obv)
{
    var dp = lisperanto.vectorsDotProduct(bv, obv);
    var cosAlpha = dp / (lisperanto.vectorLength(bv) * lisperanto.vectorLength(obv));
    var result = lisperanto.epsilonEqual(cosAlpha, 1.0);
    return result;
};// Version hash: 00ee6e2b4a386d2fd031438c0f7239041f62a707e97edad085cca7b960a6ea6a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};