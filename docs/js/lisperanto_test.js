// Version hash: 922167480bc3e9a0076354110ca36091a4498ae927fb7ad1cc13d678a22cbdc0
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.activate_replace_json_key = function()
{
    lisperanto.activeOperation("replace-existing-json-key");
    $("#" + lisperanto.canvasOmniBox.id ).focus();
};// Version hash: 7480f9ed8011de722b6674e539afd3ef6609a388f00777b53534ac751dacb560
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.add_existing_RDF_predicate_to_json_from_omnibox = async function(obj)
{
    event.stopPropagation();
    await lisperanto.add_statement_key_to_json_entry_by_name(obj.text);
    lisperanto.hideOmniBox();
};// Version hash: d5fd5d4814eecd49c690d1123c46d0680feb588065b0bac012278f8ba31d4eb7
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
};// Version hash: bd8a87247b9e0cb6ab3fb621a6c0365be12e1e6ce708296a15d4ca87b8800ee6
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
};// Version hash: b5cd5bfa5a33deaa0faa16fbd984c7a3be78de2967a5aae20098f347bee006e5
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
};// Version hash: f6c59fb2e8da851afb7977bdae6dc1d5eeb072151c55e8e210cf78d0db0b7b50
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
};// Version hash: 0e404d814766efaa29b538dd62d4b17d0a1313bb4244a00d9cffc168ec7edc2e
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
};// Version hash: 9dfc897f322a115384302085cf39a579151982b3897939bfda08f3c89c2677ea
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
};// Version hash: e1b8930a8b59daec2636e7a28dc21f37dd846c8f2b4f182e1242ee5e41668784
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.backgroundApplySaved = function() 
{
    var background = localStorage["backgroundColor"] || "#000000";
    lisperanto.backgroundColor(background);
};// Version hash: f473f7b64492a7c28467fb385a1675ebdff69acd2d475853c0aabe0bef5a1e32
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 25ed1b8e6188caaabdb4e0969d42268b2c976ff3c49620fad293a8738d94a620
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmousedown = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(true);
    lisperanto.total_movement_while_body_drag(0)
};// Version hash: 1a0dd5b7535b036c51910d6960d3d29e41ecb242d3d9a173c7f35fa0e3cb80e8
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
};// Version hash: 1f7992b14a66b5a932d07249f09bba34611b2b80095cc99b596b9ecdcfc06673
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmouseout = function()
{
    lisperanto.body_is_dragged(false);
};// Version hash: 36ce602446a81bb8acf5d99920e061ad5806408f53a7f2a2141b166458ceddd8
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.body_onmouseup = function()
{
    //console.log(event);
    lisperanto.body_is_dragged(false);
};// Version hash: 83cd780380c4bfdb671bfda270679e1c48a76097da3f321001a877a08c166bc7
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

};// Version hash: 8af7f0050dea0c4bf8213ffe1da9c68c08aae6088ce4f9bec4a5c43f4c78399a
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyKeyUp = function( data, event)
{

    return true;

};// Version hash: db469ba25354771d54c0690a864f258b4450b2156ebdd7179d2382f7fc42575a
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
};// Version hash: 4d0cbed65c8f809951e214f489efbdb25ce61f2644f7a0d10eb8912cfd0142bd
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnPointerMove = function()
{
    //console.log(event);

};// Version hash: 0fbd7dc2dd2bd20c631c4de247e11dcda6b644aed826b02b13fbaf1a3e71464e
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnTouchEnd = function()
{
    lisperanto.previosTouch = undefined;
};// Version hash: a81036f79ea4449558ef891a92c7c34d7d7a53f015b75c6714387f5240ed8f54
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
};// Version hash: d63c5d526d17455ef49a34c87db0c185bfca6a9963e38ce847e6e7d85a3264ed
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.bodyOnWheel = function() {
    event.preventDefault();
    const deltaY = event.deltaY;
    const deltaX = event.deltaX;
    //console.log(event);
    lisperanto.applyMovement(deltaY, deltaX);
  
    //scale += event.deltaY * -0.01;
};// Version hash: 3decd86784a63780b18c722fb0ec855c65e436dce9733e370b99311665befc52
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
};// Version hash: 0abfb4a57770d7ecaa5e03b0334ad884793f4624e6dbb996a148ee7f6e1dfd0f
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
};// Version hash: 6da9270cb063fb1b99819e42732af6fb17bca80771ada4dd3696bafe53e457f6
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
};// Version hash: 1456ebf30dce3aeb57f41e33b958df70fc3b7740440d0e88ddada58d7133bb65
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
};// Version hash: e0f234b8a2dbf88a5c8ac953e03726b41bca7f01edabbe1dc6680e554545943c
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.clone = (obj) => JSON.parse(JSON.stringify(obj));// Version hash: 23ce29162dc0ad87b2120282a795d52a16d94a7b305e30a3e6dd1140a577b3be
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
};// Version hash: d8551bd1acb3cc7a391d60f1a3c02dfc4b1d695d2320b72d922bcc02eae7af6b
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
};// Version hash: d9749bb0758871b052869130c2fae52db8540cf386ab11ba42519f41c11925fb
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
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};// Version hash: 8d47d838354a81df636ea2ebbab39012ab46e43f78859f11ab0f3c19110a25c3
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
};// Version hash: 9cf490b12a8b4ce470997929ff32f64eee2821d05e55a90f2849b1548cfacd16
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
    new_obj["previous-version@lisperanto"] = await lisperanto.calculate_hash_promise(obj);
    return await lisperanto.create_object_with_hash_async(new_obj);
};// Version hash: 104df536dc42bf7d3871cfc113c23c5131ec9aa38a2245af289e2b0e9433ae03
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_and_show_RDF_entry = async function(name)
{
    var toShow = await lisperanto.create_RDF_Entry(name);
    await lisperanto.openElement_async(toShow);
    lisperanto.hideOmniBox();
};// Version hash: d19077d176252dcd3a02fe420792f6b5cdb422411a2727192ba2b818d65bb1f2
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
};// Version hash: 112f3f8f3ca6eae3cf2a2f5c49b4b12a19a542715bc4e993cee9e9bba64a06a6
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: 2a0cb52ccd2e9ea444310f4927a89acc1c6db0ad451b74b1a53adec14067cb83
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
};// Version hash: fd892b7748b2a451254c4eaeb71aaf862d5e36eee5fccdf88e431bee6364792f
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
};// Version hash: c37cd6948ca809812c9a68555245f89501ba3826cb6398979ff42771469e18de
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
};// Version hash: 515ad07457a368e3507cc6a96d3c675ad5a53d372ddeaffc45d4d1010e70e233
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.create_RDF_Entry = async function(name)
{
    var toAdd = {};
    toAdd["name@lisperanto"] = name;
    return await lisperanto.create_object_with_hash_async(toAdd);
};// Version hash: 25030f3498cb9f7f444f80993291e7b63d342d5f5fc30b155aef5f5ff4a9de9e
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
};// Version hash: cc747b67416752b15327b3f0913a9c959a054a724c6799dcbca9028b25a42280
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
            
            const previous_hash = wrapper_for_canvas["id"]();
            lisperanto.mapOfOpenElements[new_hash] = lisperanto.mapOfOpenElements[previous_hash];
            delete lisperanto.mapOfOpenElements[previous_hash];
            const new_hash = await lisperanto.calculate_hash_promise(wrapper_for_canvas["wrapped_one"]());
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
};// Version hash: 356c0a06cec9de80b3c7ab39128d1227ec04daf6d47754c01e8e5f2cf5045cc7
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
};// Version hash: 1399a8b1ac1786dae335020c4189cdbeb729061ac2cba6d715817a76aafd2361
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_activeOperation = () => lisperanto.activeOperation = ko.observable("");// Version hash: b10a2c510dcb0d9317a6615b4f10a5e6670fd4c80dadc2ddc7159c84910f3e64
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_anchorWidth = () => lisperanto.anchorWidth = ko.observable(2 * parseFloat(getComputedStyle(document.documentElement).fontSize));// Version hash: d00754dd7d81451a871e2002b3342f073c0537f0bf155f0edb934561a74e791f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_backgroundColor = () => lisperanto.backgroundColor = ko.observable("#000000");// Version hash: 188a26a327f0f1fe31930e6b3509aaa04895da81d0effb448da7e026b2a520fc
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_body_is_dragged = () => lisperanto.body_is_dragged = ko.observable(false);// Version hash: c072de3335025cbb9541fa8241631f983003e94ab268c051a916d53a9bcb5827
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_canvasOmniBox = () => lisperanto.canvasOmniBox = lisperanto.defineOmniBox();// Version hash: c88cb70046875cbe9477f844f973c6ba1ab6b2e477b032ddb0f6726099faba19
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

};// Version hash: eb511e57ccfc722eb69e6fba584348ae7b429d5b374536cf9ad4bb7dd337bf11
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
};// Version hash: 97bf243e31be386abe6b9fb762a685eb2fff84770c544086e3d2331326f0bf93
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_focusedObj = () => lisperanto.focusedObj = ko.observable({});// Version hash: 8ea6d4f7020d385dc3963206409109e3b299a6f571f9d4a41ed6a82e017c852b
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
};// Version hash: d1142e2990c1dc0440bc005864b817888bd6db2fcc0e4ed785c86d75e80375df
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMaxX = () => lisperanto.globalMaxX = ko.observable(screen.width);// Version hash: 9bdc16d0a04302375967bf8913999ea6949de1440d29419a900b2d8fac3ccd64
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMaxY = () => lisperanto.globalMaxY = ko.observable(screen.height);// Version hash: 7d46dc09ef5bbb4ccd63def5fc9a726de3507dca43a7485e8a02101be96443ff
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinX = () => lisperanto.globalMinX = ko.observable(-screen.width * 2);// Version hash: 66830964e9f374aedb3f92d212f6d611dfeb9b0f3b8f1a6be630cfbc957f5605
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalMinY = () => lisperanto.globalMinY = ko.observable(-screen.height * 2);// Version hash: 32f82708389bdbeb332743cec29ae3d3f88697ded9409db3d000c0c969e49d58
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetX = () => lisperanto.globalOffsetX = ko.observable(0.0);// Version hash: a0891590960a428592e42f72b6ce314ad2dcc87e1b90199cee43d6fc9a637306
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetY = () => lisperanto.globalOffsetY = ko.observable(0.0);// Version hash: 06359931a17e34a3879d27dfe6ff14382bdd4da48ffd7cab6a19f675acffa977
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_globalOffsetZ = () => lisperanto.globalOffsetZ = ko.observable(1.0);// Version hash: 1d42a44c9212194dbef4dfa8f33b2b553e3440626526517607b6fa641797c649
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_listOfOpenElements = () => lisperanto.listOfOpenElements = ko.observableArray([]);// Version hash: 3f262abe90236ec3a60fa74560abebe737e3173bb0f20662d49513b5ae369e9e
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
};// Version hash: 950e3a38f34a2883a2a0cf68cdc47e326a6dd7a4fa3f391c79a3a1a5f5934308
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_menuIsOpen = () => lisperanto.menuIsOpen = ko.observable(false);// Version hash: f394e901e50ca64cd7b6267ebe5deddfad5d4afb733b408d416a2fc7674f9622
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_menuWasAlreadyOpen = () => lisperanto.menuWasAlreadyOpen = ko.observable(false);// Version hash: 3149a36baa7e67a43bc82fd560489d0e349a150201b49f0d6a26103a4164c38c
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
};// Version hash: 7ec92c115447d162fe7f2f33d65ad917727abd05c1738d2cd4ad890d44cd5753
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_omniBoxTextInput = () => {
    lisperanto.omniBoxTextInput = ko.observable("");
    lisperanto.omniBoxTextInput
        .extend({ rateLimit: 100 });
};// Version hash: 1d1fc320ea708ccd28e0f997952ba43efa189d9df38cb577b95fea42022279d4
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_optionsIsOpen = () => lisperanto.optionsIsOpen = ko.observable(false);// Version hash: 98a5bdd166b071da2d5da7dfa3e9fcf79ad0956af492c3558015901c7042dcda
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_optionsWasAlreadyOpen = () => lisperanto.optionsWasAlreadyOpen = ko.observable(false);// Version hash: da34150648d3f110353e7bb532b3c0d34a4ad5730da5278c20db7981809a5680
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_rdf_predicates_Array = () => lisperanto.rdf_predicates_Array = ko.observableArray([]);// Version hash: 19e2bf02c539123e09b709ecec9696820fc34c2b802012251a98a485c98e7b48
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_somethingChanged = () => {
    lisperanto.somethingChanged = ko.observable(0);
    lisperanto.somethingChanged.extend({ rateLimit: 100 });
};// Version hash: 14579e906580eb1bba8f8ea65c72d62ca953019d50a1668c04c4c0ae1962e708
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.define_total_movement_while_body_drag = () => lisperanto.total_movement_while_body_drag = ko.observable(0);// Version hash: e42fbde32533ae56f6b774bd55903d7c28635139dfff8801c658fbcdfdd44c39
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
};// Version hash: a4d3e769ead7e5fd5a1f6be1a261d8300c67c48755c63d830d9fd5d266c5f6c5
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.defineTimerForFunctions = function()
{
    lisperanto.timerForFunctions = setInterval(lisperanto.moveElementsOnCanvasIteration, 30);
};// Version hash: faa079ae8fa92ee1b59e5f35ac4d03692d5e67f0ee6e704f54da3562079ba3c3
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
};// Version hash: 3a4a8eb11bcc2c0ee35afa5beb378b9a0a2013233cdd09085e4fa76e9c06154b
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

};// Version hash: da666db0c3a01d5e9726d9124eecca38388d4bb5af45f768363416588fd399df
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
};// Version hash: 5368f532e6a2baa5481434e7e9c41d738b3abcb09bf5d07d4cf1797fd5e3b99c
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
};// Version hash: a592a68dbd2cfa65823064d741563c57e350d0fefcb8075ecd4d3a7af44e0bc2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.editorKeyUp = function(event)
{
    event.stopPropagation();
};// Version hash: 3652d0bbf887ad0ffa5d0625e239dbf1a12aefc17f30616e41717e2f1c702429
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.epsilonEqual = function(a, b, e = 0.00001 )
{
    var result = Math.abs(a-b) < e;
    return result;
};// Version hash: b15136b4f5090b281507cb1721411f7a36a90dd229b4bc0f8d6f1bd896658a76
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.equal_exists_async = async function(obj)
{
    const hash = await lisperanto.calculate_hash_promise(obj);
    return hash in lisperanto.customObjects;
};// Version hash: 14c86dbb6e63c100d97d383c9a04a5954ecc6d518aac6bb468c5e0574e812de2
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
};// Version hash: 335de47ac07204e16ae6a5c86678a199cce3aeea3fcdc7bea32533773cffffdc
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
};// Version hash: 34d9b61ac4c359165a10872380205008f8bb7462a31a189e6d81bab334289731
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
};// Version hash: 8324b6f94828992ebdf945bd9d61321e1bfb19df033a6635ec5e6f7c2c735a10
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
};// Version hash: 3b13c932f2b03d90a892788fb402e9baca0b9f20a9c5b90961e279ce59ea43dc
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

};// Version hash: d1f17bc1e68559a59d67f2c78580d7276950c392e2f3711ed63e5aaf4d414a5c
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
};// Version hash: ad49e764dd4991be9db9cf9f7e16b4cdd060d34a84e580b3879afa572a0d9884
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
};// Version hash: 2714556ee96897a36109e8723c14818691e72e75d6f3d913ec23fa15b5970467
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
};// Version hash: 6e0a91bbdabe7b843414b9f94d5a45a5d4d8831f13154894d71ac908213856d5
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
};// Version hash: fe44fcc751a0bdd41823060758db9cd166e97b4852186dcd0955be2bd267ca0d
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
};// Version hash: f5ecd538f9006c8e888636b021cb506f7ad6c91382bbf3e12e2ff904d2c700d3
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
    
};// Version hash: 40b2c946784af798d33e273eae7da96cbc2b7d105fbe0b25913ff2fbdfda957e
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
};// Version hash: 2b9aca33b2d2c113a22669ffd2c67ea91ee097f3538aed032cc6a97eae51ec45
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
};// Version hash: 995c2c3e142b0bbe951b99908009c6f96211225511cc7715bc1b1747f025bb20
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
};// Version hash: 1f64e3733eb166b989315256563f8d7fbc267f0ad8615e890d9ab3bfaf7b884b
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
};// Version hash: b6c4639babe0b6b1dd40819b610bbb581b00da936fcde1704d6c9ab1af361732
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
};// Version hash: 3230184f25346d113b61db98397cfad4db9c3f150a350ece581cb0f423e646b0
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
};// Version hash: 6f1f6f1063c9efab9ca92671fa02fd80c19f6c561ff5f263fafa770b5690d37f
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
};// Version hash: 7c3982ea24600fe7ad1df7a4688fe7352b45ef4e14ef28502cc68760231b5440
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
};// Version hash: fb2a30ffed5385e8f3dba8e9ba55a6004f8ea5b6815a71d951ac399505b1e1cf
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

};// Version hash: a88e01844aea1b7e61952ccdf6d424ded068e2706816102b772fc24e0a307aff
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
};// Version hash: 3e2dc3188e682fd8bf8935f27c44e62483a5b6dc3e55354b686703865b713dae
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
};// Version hash: 8971e39622bab2434794a4ef9c8890f8e6e8831a218fcfb7b8931f4d687227d2
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxClick = function()
{
    event.stopPropagation();
};// Version hash: bc23131e07b17df711826972afa4a158053b267ee176a2f9ba22b7bf13623ccb
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
};// Version hash: 0cdca10e101c417e8bf3136d8a5df02c8525f0631c28a5da577e9e2b20781b26
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
};// Version hash: d4472e59cae1319a7338e075051d1273aa7933ab9c4679fb0f21160e6bffbc21
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
};// Version hash: 3e4e85c8dd9a4b20b434f5477e82383de896d2c0c13ad92e1e22e6b3ed59484b
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniBoxOnWheel = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};// Version hash: 70cf16a66f1d1ec560d92ba9806cf93a34b1c42694486fc3a0c2925eab21ca5d
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.omniWheelOnWheelEvent = function()
{
    // i need this to block scroll event, probably
    event.stopPropagation();
};// Version hash: f39397ecdb337e7c73fa51657375c3aef6e0f7eabc9a781f56c70dd15ee5bbe7
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.open_json_entry_from_search_list_async = async function(obj)
{
    await lisperanto.openElement_async(lisperanto.customObjects[obj.id]);
    lisperanto.hideOmniBox();
};// Version hash: 4c07612625ab6f1d1002ed6a98be62e13fd85ee5301c9d1cde668a4c7c745293
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
};// Version hash: 396762e033c5d3c872c80f7356884a07a4bb87332f7287be953ef4b967010e7f
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
};// Version hash: 0ceff1ea007ef9bc75c9eb439e48fe0504572bc06c6abc413c07a86e95930375
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
};// Version hash: 65c421e4d2d1b9f113994e0b93bb7ddc8f39966802bd7ef61685bcbde82a0dcf
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
};// Version hash: b76322bf71674f5311dd3c4cd47af32577b999ae32bddfa27697a914e5fc12ee
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

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
};// Version hash: d2009e4fc7eb92fe48b34e2b6d70a91d32aa498e33902ad7f7c85c0fcc5b36bb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.removeEverything = function()
{
    localStorage.clear();
    location.reload();
};// Version hash: 9ce03d9c254f5fae87dda82497ba375a777de992182c00d8ad0d1ca0dd976a0a
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
};// Version hash: 489773c1b6e7d16c1dd84783200c5e8b3477d9193649f11462527d1934a21a35
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

};// Version hash: 1707c2e17e3aced8af13ce610a22bea55bfc98390ba5c61b58057fc0517c7c2d
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
};// Version hash: 6b119ba07861ec2243fe4d0c88865820ca1a08e9b9d610934f38f8041a92a43e
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
};// Version hash: fc714e837337f9a471d55662627d61dbba352b3ecffb8c7a630a9d5c20ff90e7
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
};// Version hash: a3422509458c8f2a9b4ecd6a92cb1a618499aa85a3537cba05dfc3b28bbb9c5d
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
};// Version hash: 5296bcaf6b54cabda6e8452839b71139976e10554b934262f49734f848fba67f
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.stopPropagation = function()
{
    event.stopPropagation();
};// Version hash: 235cbf136cd39c18f740290768c1dda243328c51f044b8206906cc9eee443a68
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
};// Version hash: ee11c805d4bad03d1f8d3c2794abbda936cbd832ed96e91947dea3d55f892734
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleMenu = function() 
{
    event.stopPropagation();
    lisperanto.menuIsOpen(!lisperanto.menuIsOpen());
    lisperanto.menuWasAlreadyOpen(true);
};// Version hash: a792a985818a334fd335206397bd977bbc5a65189a2dab03e5b21c7dc1c81770
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.toggleOptions = function() 
{
    event.stopPropagation();
    lisperanto.optionsIsOpen(!lisperanto.optionsIsOpen());
    lisperanto.optionsWasAlreadyOpen(true);
};// Version hash: 87669851222f1a15444dbea65993c53bb1bc391f31bed86b3d4e968891487dfc
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
};// Version hash: d3136524874923759b8d261d3840869a52c02a111ebe6c1af055948bd08ac468
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLength = function(v)
{
    var result = Math.sqrt(lisperanto.vectorLengthSquared(v));
    return result;
};// Version hash: 89217caa8b741581143f010db363805c0988f0a6cbffeaaa3314fe64eef786fb
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorLengthSquared = function(point)
{
    return point.x * point.x + point.y * point.y;
};// Version hash: e10ebe99bb30d15ec53d09e0685bff65ef0c8933d6e0b6345df755f0de3c1e61
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
};// Version hash: b4f57c042f71592943dbd423c5d36b00fde48ca3de1cc3623209476e9f893d64
if(typeof(lisperanto) === 'undefined')
{
	lisperanto = {};
}

lisperanto.vectorsDotProduct = function(a, b)
{
    result = a.x * b.x + a.y * b.y;
    return result;
};