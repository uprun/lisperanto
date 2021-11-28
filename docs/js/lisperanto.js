var lookup = {};
lookup.customObjects = {};
lookup.omniBoxTextInput = ko.observable("");

lookup.omniBoxTextInput
    .extend({ rateLimit: 100 });

lookup.omniBoxTextInput
    .subscribe(function()
    {
        lookup.preParseOmniBox();
    });

lookup.functionsArray = ko.observableArray([]);
lookup.functionsLookup = ko.computed(function()
{
    var searchQuery = lookup.omniBoxTextInput().trim().toLowerCase();
    var filtered = [];

    if(searchQuery === "")
    {
        filtered = lookup.functionsArray();
    }
    else
    {
        filtered = ko.utils.arrayFilter(lookup.functionsArray(), function(item)
        {
            return lookup.customObjects[item.id].name().toLowerCase().indexOf(searchQuery) >= 0;
        });

    }
     
    return ko.utils.arrayMap(filtered, function(item) {
        var parameters_names_list = ko.utils.arrayMap(lookup.customObjects[item.id].parameters(), function(item)
        {
            return lookup.customObjects[item].parameterName;
        });
        return { id: item.id, 
            text: lookup.customObjects[item.id].name() + '(' + parameters_names_list.join(", ") +')'
        };
    });
    
});
lookup.operations = [];

lookup.operationsPush = function(some)
{
    if(some.operation === "set-parameter-value")
    {
        var parameterValueObj = lookup.customObjects[some.parameterValueGuid];
        var functionCallObj = lookup.customObjects[parameterValueObj.assignedToGuid];
        if(functionCallObj.functionGuid === "code-block")
        {
            const lastParameterId = functionCallObj.parameters().length - 1;
            var lastParameterGuid = functionCallObj.parameters()[lastParameterId];
            var lastParameterObj = lookup.customObjects[lastParameterGuid];
            if( typeof(lastParameterObj.guidToUse()) !== "undefined" )
            {
                lookup.addParameterValueByNumber(functionCallObj, functionCallObj.functionGuid, 0);
            }
        }
    }
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
    // TODO: refresh functionsArray
    // on load refresh functions array
    // on load first  load data because there might not be any saved data then set default functions then if there are not present
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
                if(value.type === "built-in-function")
                {
                    lookup.customObjects[key] = lookup.tryRestoreBuiltInFunction(value);
                }
                if(value.type === "built-in-function-parameter")
                {
                    lookup.customObjects[key] = value;
                }
                if(value.type === "function")
                {
                    lookup.customObjects[key] = lookup.tryRestoreFunction(value);
                }
                if(value.type === "sandbox-unique")
                {
                    lookup.customObjects[key] = lookup.tryRestoreFunction(value);
                }
                if(value.type === "function-usage")
                {
                    lookup.customObjects[key] = lookup.tryRestoreFunctionUsage(value);
                }
                if(value.type === "constant-int")
                {
                    lookup.customObjects[key] = lookup.tryRestoreConstantInt(value);
                }
                if(value.type === "parameter")
                {
                    lookup.customObjects[key] = value;
                }
                if(value.type === "symbol-usage")
                {
                    lookup.customObjects[key] = value;
                }
                if(value.type === "parameter-value")
                {
                    lookup.customObjects[key] = lookup.tryRestoreParameterValue(value);
                }
                
            }
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


lookup.restoreFunctionsArray = function()
{
    for (const [key, value] of Object.entries(lookup.customObjects)) 
    {
        if(typeof(value.type) !== 'undefined')
        {
            if(value.type === "built-in-function" )
            {
                lookup.functionsArray.push(value);
            }
            if(value.type === "function" )
            {
                lookup.functionsArray.push(value);
            }
        }
    }
};



lookup.tryRestoreBuiltInFunction = function(value)
{
    value.name = ko.observable(value.name);
    value.parameters = ko.observableArray(value.parameters);
    value.body = ko.observableArray(value.body);
    return value;
};

lookup.defineBuiltInFunction = function (obj) 
{
    var parameters_list = obj.parameters
    if(typeof(lookup.customObjects[obj.id]) === 'undefined')
    {
        var toAdd ={
            id: obj.id,
            type: "built-in-function",
            name: ko.observable(obj.name),
            parameters: ko.observableArray([]),
            body: ko.observable(undefined)
        };
        for(var k = 0; k < parameters_list.length; k++)
        {
            toAdd.parameters.push(lookup.defineBuiltInFunctionParameter(obj.id, parameters_list[k]))
        }
        lookup.customObjects[obj.id] = toAdd;
    }
    
};

lookup.defineBuiltInFunctionParameter = function(functionName, parameter)
{
    var id = functionName + "#" +  parameter;
    var toAdd = 
    {
        id: id ,
        type: "built-in-function-parameter",
        parameterName: parameter
    };
    lookup.customObjects[id] = toAdd;
    return id;
};

lookup.builtInFunctionsArray = [
    {
        id: "if",
        name: "if",
        parameters: ["check", "if-true-run", "else-run"]
    },
    {
        id: "plus",
        name: "+",
        parameters: ["a", "b"]
    },
    {
        id: "minus",
        name: "-",
        parameters: ["a", "b"]
    },
    {
        id: "multiply",
        name: "*",
        parameters: ["a", "b"]
    },
    {
        id: "divide",
        name: "/",
        parameters: ["a", "b"]
    },
    {
        id: "less-or-equal",
        name: "<=",
        parameters: ["a", "b"]
    },
    {
        id: "code-block",
        name: "code-block",
        parameters: ["next"]
    }
];

lookup.defineListOfPredefinedFunctions = function()
{
    for( var k = 0; k < lookup.builtInFunctionsArray.length; k++)
    {
        var obj = lookup.builtInFunctionsArray[k];
        lookup.defineBuiltInFunction(obj);
    }
};

lookup.sandbox = ko.observable(undefined);

lookup.defineSandbox = function()
{
    var name = "sandbox-unique";
    if(typeof(lookup.customObjects[name]) === 'undefined')
    {
        var toAdd ={
            id: "sandbox-unique",
            type: "sandbox-unique",
            name: ko.observable(name),
            parameters: ko.observableArray([]),
            body: ko.observable(lookup.defineFunctionCall("code-block", "sandbox-unique")),
            evaluationResult: ko.observable("")
        };
        
        lookup.customObjects[toAdd.id] = toAdd;
        var operation = 
        {
            operation: "define-sandbox",
            guid: toAdd.id
        };
        lookup.operationsPush(operation);
    }

    var foundSandbox = lookup.customObjects[name];

    lookup.tryRestoreOffsetCoordinates(foundSandbox);

    lookup.sandbox(foundSandbox);
};

lookup.clearSandbox = function()
{
    lookup.hideOmniBox();
    var name = "sandbox-unique";
    var sandboxObj = lookup.customObjects[name];
    // maybe need to remove previous body function tree
    var nextSandBoxBody = lookup.defineFunctionCall("code-block", "sandbox-unique");
    sandboxObj.body(nextSandBoxBody);
    var operation = 
    {
        operation: "clear-sandbox",
        guid: nextSandBoxBody.id
    };
    lookup.operationsPush(operation);
};

//this is my personal list of people who inspire me
lookup.defaultNamesForFunctions =
[
    "Edsger Dijkstra (Dijkstra graph algorithm)",
    "Alan Turing (Turing machine)",
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
    "Premature optimization is the root of all evil - Sir Tony Hoare"
];

lookup.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  };  

lookup.createFunction = function()
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "function";
    toAdd.name = ko.observable(lookup.defaultNamesForFunctions[lookup.getRandomInt(lookup.defaultNamesForFunctions.length)]);
    toAdd.body = ko.observable(lookup.defineFunctionCall("code-block", toAdd.id));
    toAdd.parameters = ko.observableArray([]);
    
    
    var operation = 
    {
        operation: "define-function",
        guid: toAdd.id,
        name: toAdd.name
    };
    lookup.operationsPush(operation);
    lookup.functionsArray.push(toAdd);
    lookup.openElement(toAdd);
    event.stopPropagation();
    lookup.hideOmniBox();
};

lookup.tryRestoreFunction = function(value)
{
    value.name = ko.observable(value.name);
    value.parameters = ko.observableArray(value.parameters);
    value.body = ko.observable(value.body);
    lookup.addEvaluationVariables(value);
    return value;
};

lookup.addEvaluationVariables = function(obj)
{
    obj.evaluationResult = ko.observable("");
    obj.prettyPrintEvaluationResult = ko.computed(function()
        {
            if( lookup.isFailToEvaluate(obj.evaluationResult()) )
            {
                return "[failed to evaluate]";
            }
            else
            {
                return obj.evaluationResult();
            }
        }
    );
};

lookup.createUIObject = function()
{
    var guid = lookup.uuidv4();
    
    var toAdd = {
        id: guid
    };
    lookup.addEvaluationVariables(toAdd);
    lookup.tryRestoreOffsetCoordinates(toAdd);

    lookup.customObjects[guid] = toAdd;
    return toAdd;
};


lookup.defineRecord = function()
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "record";
    toAdd.name = ko.observable("some new object");
    toAdd.fields = ko.observableArray([]);

    var operation = 
    {
        operation: "define-record",
        guid: toAdd.id
    };
    lookup.operationsPush(operation);
    return toAdd;
};


lookup.createAndShowRecord = function()
{
    var toShow = lookup.defineRecord();
    lookup.openElement(toShow);
};





lookup.defineConstantInt = function(c)
{
    var toAdd = lookup.createUIObject();
    
    toAdd.type = "constant-int";
    toAdd.value = c;
    
    if(typeof(c) !== 'number')
    {
        toAdd.value = parseInt(c.trim())
    }
    

    var operation = 
    {
        operation: "define-constant-int",
        guid: toAdd.id,
        constantValue: c
    };
    lookup.operationsPush(operation);
    return toAdd.id;
};

lookup.tryRestoreConstantInt = function(value)
{
    if(typeof(value.value) !== 'number')
    {
        value.value = parseInt(value.value.trim())
    }
    return value;
};

lookup.defineSymbolUsage = function(symbol)
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "symbol-usage";
    toAdd.symbolName = symbol;

    var operation = 
    {
        operation: "define-symbol-usage",
        guid: toAdd.id,
        symbolName: symbol
    };
    lookup.operationsPush(operation);
    return toAdd.id;
};

lookup.defineParameterValue = function(parameterGuid, guidToUse, assignedToGuid)
{
    var toAdd = lookup.createUIObject();
    toAdd.type = "parameter-value";
    toAdd.parameterGuid = parameterGuid;
    toAdd.guidToUse = ko.observable(guidToUse);
    toAdd.assignedToGuid = assignedToGuid;

    var operation = 
    {
        operation: "parameter-value",
        guid: toAdd.id,
        parameterGuid: parameterGuid,
        assignedToGuid: assignedToGuid
    };
    lookup.operationsPush(operation);
    return toAdd.id;
};

lookup.tryRestoreParameterValue = function(value)
{
    value.guidToUse = ko.observable(value.guidToUse);
    return value;
};

lookup.defineFunctionCall = function( functionGuid, objId)
{
    var toWorkWith = lookup.customObjects[functionGuid];
    var functionToCallName = toWorkWith.name
    var toAdd = lookup.createUIObject();

    toAdd.type = "function-usage";
    toAdd.functionName = functionToCallName;
    toAdd.functionGuid = functionGuid;
    toAdd.parameters = ko.observableArray([]);
    lookup.addEvaluationVariables(toAdd);
    toAdd.assignedToGuid = objId;

    for(var k = 0; k < toWorkWith.parameters().length; k++)
    {
        var parameterValue = lookup.defineParameterValue(toWorkWith.parameters()[k], undefined, toAdd.id);
        toAdd.parameters.push(parameterValue);
    }


    var operation = 
    {
        operation: "define-function-call",
        guid: toAdd.id,
        functionName: functionToCallName,
        functionGuid: functionGuid
    };
    lookup.operationsPush(operation);

    return toAdd.id;
};

lookup.unplug = function()
{
    var usedObj = lookup.calledObj;
    var obj = lookup.customObjects[usedObj.assignedToGuid];
    
    usedObj.assignedToGuid = undefined;
    if(typeof(obj["guidToUse"]) !== 'undefined')
    {
        obj.guidToUse(undefined);
    }
    

    var operation = 
    {
        operation: "unplug",
        objId: obj.id,
        usedObjId: usedObj.id
    };
    lookup.openElement(usedObj);
    lookup.operationsPush(operation);
    lookup.hideOmniBox();
};

lookup.addParameterValueByNumber = function(functionUsageToAdd, functionGuid, parameterNumber)
{
    var toWorkWith = lookup.customObjects[functionGuid];
    if( parameterNumber < toWorkWith.parameters().length)
    {
        var parameterValue = lookup.defineParameterValue(toWorkWith.parameters()[parameterNumber], undefined, functionUsageToAdd.id);
        functionUsageToAdd.parameters.push(parameterValue);
    }
};


lookup.tryRestoreFunctionUsage = function(value)
{
    value.parameters = ko.observableArray(value.parameters);
    for (const [key, parameterValue] of Object.entries(value.parameters())) 
    {
        parameterValue.guidToUse = ko.observable(parameterValue.guidToUse);
    }
    lookup.addEvaluationVariables(value);
    return value;
};


lookup.defineParameter = function(parameter, objId)
{
    var toAdd = lookup.createUIObject();

    toAdd.type = "parameter";
    toAdd.parameterName = parameter;
    toAdd.assignedToGuid = objId;
    
    var operation = 
    {
        operation: "define-parameter",
        guid: toAdd.id,
        parameterName: parameter,
        assignedToGuid: objId
    };
    lookup.operationsPush(operation);
    return toAdd.id;
};


lookup.uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

lookup.activeOperation = ko.observable("");


lookup.focusedObj = ko.observable({});

lookup.focusOnParameter = function(objId)
{
    lookup.hideOmniBox();
    const objToWorkOn = lookup.customObjects[objId];
    lookup.focusedObj(objToWorkOn);
    lookup.activeOperation("focusOnParameter");
    var root = lookup.findRoot(objToWorkOn);
    lookup.filloutOmniBoxDataForFunction(objId, lookup.canvasOmniBox, root);

};

lookup.isOmniBoxOpen = ko.computed(function()
{
    return lookup.activeOperation() !== "" ;
});

lookup.goBackwardAndEvaluate = function(obj)
{
    var currentObj = lookup.findRoot(obj);
    lookup.startEvaluation(currentObj);

};

lookup.addConstant = function(text, obj)
{
    var guid = lookup.defineConstantInt(text);
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        obj.guidToUse(guid);
        var operation = 
        {
            operation: "set-parameter-value",
            guidToUse: guid,
            parameterValueGuid: obj.id
        };
        lookup.operationsPush(operation);
    }
    lookup.goBackwardAndEvaluate(obj);
    //if there is a parameter assignment then start evaluation
    lookup.activeOperation("");

};


lookup.addFunction = function(funcObj, obj)
{
    var guid = lookup.defineFunctionCall(funcObj.id, obj.id);
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        obj.guidToUse(guid);
        var operation = 
        {
            operation: "set-parameter-value",
            guidToUse: guid,
            parameterValueGuid: obj.id
        };
        lookup.operationsPush(operation);
    }
    lookup.activeOperation("");
    lookup.hideOmniBox();
    lookup.goBackwardAndEvaluate(obj);
    return guid;

};

lookup.addFunctionByClick = function(funcObj)
{
    lookup.addFunction(funcObj, lookup.focusedObj());
};

lookup.addSymbol = function(text, obj)
{
    var guid = lookup.defineSymbolUsage(text);
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        obj.guidToUse(guid);
        var operation = 
        {
            operation: "set-parameter-value",
            guidToUse: guid,
            parameterValueGuid: obj.id
        };
        lookup.operationsPush(operation);
    }
    lookup.activeOperation("");
};

lookup.renameFunction = function()
{
    var obj = lookup.focusedObj();
    
    const newName = lookup.omniBoxTextInput().trim();
    var operation = 
    {
        operation: "rename-function",
        functionGuid: obj.id,
        newName: newName,
        oldName: obj.name()
    };

    obj.name(newName);
    lookup.omniBoxTextInput("");

    lookup.operationsPush(operation);
    lookup.hideOmniBox();


};





lookup.addParameter = function()
{
    var obj = lookup.focusedObj();
    var toAdd = lookup.defineParameter(lookup.omniBoxTextInput(), obj.id);
    obj.parameters.push(toAdd);
    
    var operation = 
    {
        operation: "added-parameter-to-function",
        functionGuid: obj.id,
        parameterGuid: toAdd.id
    };
    lookup.operationsPush(operation);
    lookup.omniBoxTextInput("");
    lookup.hideOmniBox();
};

lookup.makeCopyOfContext = function( context)
{
    if(typeof(context) === 'undefined')
    {
        context = {};
    }
    var toParse = JSON.stringify(context);
    return JSON.parse(toParse);
};

lookup.findBuiltInParameterById = function (parameters, name, functionDefinition)
{
    var toCheck = functionDefinition.id + '#' + name;
    for(var k = 0; k < parameters().length; k++)
    {
        var parameterUsage = lookup.customObjects[parameters()[k]];
        if(lookup.customObjects[parameterUsage.parameterGuid].id === toCheck)
        {
            return parameterUsage;
        }
    }
};

lookup.startEvaluation = function(obj)
{
    var rootContext = {};
    var result = "";
    if(typeof(obj.body) !== "undefined")
    {
        if(typeof(obj.body()) !== "undefined")
        {
            var result = lookup.evaluate(obj.body(), rootContext);
            obj.evaluationResult(result);
        }
    }
    else
    {
        var result = lookup.evaluate(obj, rootContext);
    }
    
};


lookup.evaluate = function(guid, context)
{
    if(typeof(guid) === "undefined")
    {
        return lookup.generateFailToEvaluate();
    }
    else
    {
        var toWork = lookup.customObjects[guid];
        if(toWork != null )
        {
            if(typeof(toWork.type) != undefined)
            {
                if(toWork.type === 'function-usage')
                {
                    var functionDefinition = lookup.customObjects[toWork.functionGuid];
                    var result = "";
                    if(functionDefinition.type === "built-in-function")
                    {
                        result = lookup.evaluateBuiltInFunctions(context, functionDefinition, result, toWork);
                    }
                    if(functionDefinition.type === "function")
                    {
                        result = lookup.evaluateUserFunctionCall(toWork, functionDefinition, context);
                    }
                    toWork.evaluationResult(result);
                    return result;
                }
                if(toWork.type === 'symbol-usage')
                {
                    if(lookup.isFieldPresent(context, toWork.symbolName))
                    {
                        return context[toWork.symbolName];
                    }
                    else
                    {
                        return lookup.generateFailToEvaluate();
                    }
                    
                }
                if(toWork.type === 'constant-int')
                {
                    return toWork.value;
                }
            }
        }
    }

};

lookup.evaluateUserFunctionCall = function(toWork, functionDefinition, context)
{
    var localContext = lookup.makeCopyOfContext(context);
    for(var k = 0; k < toWork.parameters().length; k++)
    {
        var parameterUsage = lookup.customObjects[toWork.parameters()[k]];
        if(parameterUsage.type === 'parameter-value')
        {
            var parameterDefinition = lookup.customObjects[parameterUsage.parameterGuid];
            localContext[parameterDefinition.parameterName] = lookup.evaluate(parameterUsage.guidToUse(), context);
        }
    }
    var result = "";
    if(typeof(functionDefinition.body()) !== "undefined")
    {
        result = lookup.evaluate(functionDefinition.body(), localContext);
    }

    return result;
};

lookup.evaluateBuiltInIf = function(toWork, functionDefinition, localContext)
{
    var checkParameter = lookup.findBuiltInParameterById(toWork.parameters, "check", functionDefinition);
    var check = lookup.evaluate(checkParameter.guidToUse(), localContext);

    if
    ( 
        lookup.isFailToEvaluate(check)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    else
    {
        if(check)
        {
            var ifTrueRunParameter = lookup.findBuiltInParameterById(toWork.parameters, "if-true-run", functionDefinition);
            return lookup.evaluate(ifTrueRunParameter.guidToUse(), localContext);
        }
        else
        {
            var elseRunParameter = lookup.findBuiltInParameterById(toWork.parameters, "else-run", functionDefinition);
            return lookup.evaluate(elseRunParameter.guidToUse(), localContext);
        }
    }
};


lookup.evaluateBuiltInPlus = function(toWork, functionDefinition, localContext) {
    var aParameter = lookup.findBuiltInParameterById(toWork.parameters, "a", functionDefinition);
    var a = lookup.evaluate(aParameter.guidToUse(), localContext);
    var bParameter = lookup.findBuiltInParameterById(toWork.parameters, "b", functionDefinition);
    var b = lookup.evaluate(bParameter.guidToUse(), localContext);
    if
    ( 
        lookup.isFailToEvaluate(a)
        || lookup.isFailToEvaluate(b)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    return a + b;
};

lookup.generateFailToEvaluate = function()
{
    var obj = {
        type: "fail-to-evaluate"
    };
    return obj;
};

lookup.isFailToEvaluate = function(obj)
{
    return lookup.isFieldPresent(obj, "type") && obj.type === "fail-to-evaluate";
};

lookup.evaluateBuiltInLessOrEqual = function(toWork, functionDefinition, localContext) {
    var aParameter = lookup.findBuiltInParameterById(toWork.parameters, "a", functionDefinition);
    var a = lookup.evaluate(aParameter.guidToUse(), localContext);
    var bParameter = lookup.findBuiltInParameterById(toWork.parameters, "b", functionDefinition);
    var b = lookup.evaluate(bParameter.guidToUse(), localContext);
    if
    ( 
        lookup.isFailToEvaluate(a)
        || lookup.isFailToEvaluate(b)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    return a <= b;
};

lookup.evaluateBuiltInMinus = function(toWork, functionDefinition, localContext) {
    var aParameter = lookup.findBuiltInParameterById(toWork.parameters, "a", functionDefinition);
    var a = lookup.evaluate(aParameter.guidToUse(), localContext);
    var bParameter = lookup.findBuiltInParameterById(toWork.parameters, "b", functionDefinition);
    var b = lookup.evaluate(bParameter.guidToUse(), localContext);
    if
    ( 
        lookup.isFailToEvaluate(a)
        || lookup.isFailToEvaluate(b)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    return a - b;
};

lookup.evaluateBuiltInMultiply = function(toWork, functionDefinition, localContext) {
    var aParameter = lookup.findBuiltInParameterById(toWork.parameters, "a", functionDefinition);
    var a = lookup.evaluate(aParameter.guidToUse(), localContext);
    var bParameter = lookup.findBuiltInParameterById(toWork.parameters, "b", functionDefinition);
    var b = lookup.evaluate(bParameter.guidToUse(), localContext);
    if
    ( 
        lookup.isFailToEvaluate(a)
        || lookup.isFailToEvaluate(b)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    return a * b;
};

lookup.evaluateBuiltInDivide = function(toWork, functionDefinition, localContext) {
    var aParameter = lookup.findBuiltInParameterById(toWork.parameters, "a", functionDefinition);
    var a = lookup.evaluate(aParameter.guidToUse(), localContext);
    var bParameter = lookup.findBuiltInParameterById(toWork.parameters, "b", functionDefinition);
    var b = lookup.evaluate(bParameter.guidToUse(), localContext);
    if
    ( 
        lookup.isFailToEvaluate(a)
        || lookup.isFailToEvaluate(b)
    )
    {
        return lookup.generateFailToEvaluate();
    }
    return a / b;
};

lookup.evaluateBuiltInCodeBlock = function(toWork, functionDefinition, localContext) {
    var result = undefined;
    for(var k = 0; k < toWork.parameters().length; k++)
    {
        var parameterUsage = lookup.customObjects[toWork.parameters()[k]];
        if(typeof(parameterUsage.guidToUse()) !== "undefined")
        {
            result = lookup.evaluate(parameterUsage.guidToUse(), localContext);
        }
    }
    if(typeof(result) === 'undefined')
    {
        result = lookup.generateFailToEvaluate();
    }
    return result;
};


lookup.listOfOpenElements = ko.observableArray([]);
lookup.mapOfOpenElements = {};
lookup.functionDefinitionIsActive = ko.observable(false);
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
    lookup.preParseOmniBox();
    event.stopPropagation();
};

lookup.filloutGlobalOmniBox = function(omniBox) 
{
    lookup.focusedObj(undefined);
    lookup.activeOperation("global-omni-box-activated");
    var foundAnchor = lookup.findAnchor();
    omniBox.visible(true);
    var offsetX = foundAnchor.offsetLeft;
        offsetX -= lookup.globalOffsetX();
    omniBox.left(offsetX );
    var offsetY = foundAnchor.offsetTop ;
        offsetY -= lookup.globalOffsetY();
    omniBox.top(offsetY);

    lookup.desiredOffset = {
        x: offsetX,
        y: offsetY
    };

    $("#" + omniBox.id ).focus();
    lookup.preParseOmniBox();
    event.stopPropagation();
};

lookup.openSandbox = function()
{
    lookup.openElement(lookup.sandbox());
    //event.stopPropagation();
    lookup.hideOmniBox();
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

lookup.omniBoxRenameFunctionAction = function()
{
    lookup.activeOperation("renameFunction");
    var obj = lookup.focusedObj();
    lookup.omniBoxTextInput(obj.name());
    lookup.filloutOmniBoxDataForFunction('function-definition-header--' + obj.id, lookup.canvasOmniBox, obj);
};

lookup.desiredOffset = {x: 0, y: 0};

lookup.calledObj = undefined;

lookup.openOmniBoxForFunctionUsage = function(caller)
{
    lookup.hideOmniBox();
    lookup.calledObj = caller;
    lookup.focusedObj(lookup.customObjects[caller.functionGuid]);
    lookup.activeOperation("functionUsageIsSelected");

    var root = lookup.findRoot(caller);
    
    lookup.filloutOmniBoxDataForFunction("function-name-" + caller.id, lookup.canvasOmniBox, root);

    var foundAnchor = lookup.findAnchor();

    var foundUI = $("#function-name-" + caller.id)[0];
    
    lookup.desiredOffset = 
    { 
        x : foundAnchor.offsetWidth,
        y : foundUI.offsetTop
    };
    
    var foundRoot = $("#" + root.id)[0];
    lookup.desiredOffset.x += root.offsetX() + foundRoot.offsetWidth;
    lookup.desiredOffset.y += root.offsetY();
};

lookup.openOmniBoxForAddingParametersInFunctionDefiniton = function(caller)
{
    lookup.hideOmniBox();
    lookup.focusedObj(caller);
    lookup.activeOperation("addingFunctionParameter");

    lookup.filloutOmniBoxDataForFunction('add-function-parameter--' + caller.id, lookup.canvasOmniBox, caller);

};

lookup.hideOmniBox = function()
{
    lookup.canvasOmniBox.visible(false);
    lookup.focusedObj(undefined);
    lookup.activeOperation("");
};

lookup.omniBoxOpenFunctionAction = function()
{
    var functionToOpen = lookup.focusedObj();
    lookup.hideOmniBox();
    lookup.hideMenu();
    lookup.hideOptions();
    event.stopPropagation();
    lookup.openElement(functionToOpen);
};

lookup.openFunctionDefinitionFromOmniBox = function(obj)
{
    event.stopPropagation();
    lookup.hideOmniBox();
    var functionToOpen = lookup.customObjects[obj.id];
    lookup.openElement(functionToOpen);
};

lookup.openFunctionFromTheListOfFunctions = function(obj)
{
    lookup.hideMenu();
    lookup.hideOptions();
    lookup.openElement(obj);
};

lookup.omniBoxClick = function()
{
    event.stopPropagation();
};

lookup.stopPropagation = function()
{
    event.stopPropagation();
};

lookup.preParsedOmniBoxValueInformation = ko.observable("");

lookup.preParseOmniBox = function()
{
    var toTest = lookup.omniBoxTextInput().trim();
    if(toTest === "")
    {
        lookup.preParsedOmniBoxValueInformation("empty");
    }
    else
    {
        var result = "";
        var intRegExp = new RegExp('^\\d+$');
        if(intRegExp.test(toTest))
        {
            result = "integer";
        }
        else
        {
            //var symbolRegExp = new RegExp('^\\D.*$');

            // this is either symbol either function call
            // this can also be command or macros
            // or image or matrix or float or string but later

            var lowerCasedToTest = toTest.toLowerCase();
            var filtered = ko.utils.arrayFilter(lookup.functionsArray(), function(item)
            {
                return lookup.customObjects[item.id].name().toLowerCase() === lowerCasedToTest;
            });
            if(filtered.length === 1)
            {
                result = "function";
            }
            else
            {
                let words = toTest.split(' ').filter(x => x.length > 0);
                if(words.length === 2 )
                {
                    result = "1 word from binary";
                }
                else
                {
                    if(words.length === 3)
                    {
                        result = "maybe binary";
                    }
                    else
                    {
                        result = "symbol";
                    }
                }
                
            }
        }
        lookup.preParsedOmniBoxValueInformation(result);
    }
    

};

lookup.tryParseOmniBox = function(toTest, obj)
{
    if(toTest !== "")
    {
        var intRegExp = new RegExp('^\\d+$');
        if(intRegExp.test(toTest))
        {
            lookup.addConstant(toTest, obj);
        }
        else
        {
            //var symbolRegExp = new RegExp('^\\D.*$');

            // this is either symbol either function call
            // this can also be command or macros
            // or image or matrix or float or string but later
            var lowerCasedToTest = toTest.toLowerCase();
            var foundFunctions = lookup.findFunctionsWithSameName(lowerCasedToTest);
            if(foundFunctions.length === 1)
            {
                lookup.addFunction(foundFunctions[0], obj);
            }
            else
            {
                let words = toTest.split(' ').filter(x => x.length > 0);
                if(words.length === 3)
                {
                    var foundFunctionsTriple = lookup.findFunctionsWithSameName(words[1]);
                    if(foundFunctionsTriple.length >= 1)
                    {
                        var guidOfFunction = lookup.addFunction(foundFunctionsTriple[0], obj);
                        
                        var firstParameterUsageObj = lookup.customObjects[lookup.customObjects[guidOfFunction].parameters()[0]];
                        var secondParameterUsageObj = lookup.customObjects[lookup.customObjects[guidOfFunction].parameters()[1]];
                        lookup.activeOperation("focusOnParameter");
                        lookup.tryParseOmniBox(words[0], firstParameterUsageObj);
                        lookup.activeOperation("focusOnParameter");
                        lookup.tryParseOmniBox(words[2], secondParameterUsageObj);
                    }
                    else
                    { 
                        // no binary function found
                        lookup.addSymbol(toTest, obj);
                    }
                }
                else
                {
                    lookup.addSymbol(toTest, obj);
                }
                
            }
        }
    }
    lookup.omniBoxTextInput("");
    lookup.hideOmniBox();
};

lookup.omniBoxInputKeyPress = function(data, event) 
{
    if(event.shiftKey)
    {
    }
    else
    {
        if(event.keyCode == 13)
        {
            if(lookup.activeOperation() ===  "renameFunction")
            {
                lookup.renameFunction();

            }
            else if(lookup.activeOperation() ===  "addingFunctionParameter")
            {
                lookup.addParameter();
            }
            else
            {
                if(typeof(lookup.focusedObj()) !== 'undefined')
                {
                    lookup.tryParseOmniBox(lookup.omniBoxTextInput().trim(), lookup.focusedObj());
                }
                else
                {
                    lookup.hideOmniBox();
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

lookup.tryParseOmniBoxByClick = function()
{
    lookup.tryParseOmniBox(lookup.omniBoxTextInput().trim(), lookup.focusedObj());
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
    if(event.code === "KeyM" && !lookup.isOmniBoxOpen())
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

    return true;

};

lookup.findFunctionsWithSameName = function (lowerCasedToTest) 
{
    return ko.utils.arrayFilter(lookup.functionsArray(), function (item) {
        return lookup.customObjects[item.id].name().toLowerCase() === lowerCasedToTest;
    });
};

lookup.isFieldPresent = function(obj, fieldName) 
{
    return typeof(obj[fieldName]) !== "undefined";
};

lookup.evaluateBuiltInFunctions = function(context, functionDefinition, result, toWork) {
    var localContext = lookup.makeCopyOfContext(context);

    var localDictionary = {};
    localDictionary["if"] = () => lookup.evaluateBuiltInIf(toWork, functionDefinition, localContext);
    localDictionary["plus"] = () => lookup.evaluateBuiltInPlus(toWork, functionDefinition, localContext);
    localDictionary["minus"] = () => lookup.evaluateBuiltInMinus(toWork, functionDefinition, localContext);
    localDictionary["less-or-equal"] = () => lookup.evaluateBuiltInLessOrEqual(toWork, functionDefinition, localContext);
    localDictionary["multiply"] = () => lookup.evaluateBuiltInMultiply(toWork, functionDefinition, localContext);
    localDictionary["divide"] = () => lookup.evaluateBuiltInDivide(toWork, functionDefinition, localContext);
    localDictionary["code-block"] = () => lookup.evaluateBuiltInCodeBlock(toWork, functionDefinition, localContext);

    if( lookup.isFieldPresent(localDictionary, functionDefinition.id) )
    {
        return localDictionary[functionDefinition.id]();
    }
    else
    {
        return lookup.generateFailToEvaluate();
    }
};

lookup.findRoot = function(obj) 
{
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

lookup.openOmniBoxForFunctionHeaderDefinition = function(obj)
{
    lookup.hideOmniBox();
    
    lookup.focusedObj(obj);
    lookup.activeOperation("focusOnFunctionHeaderDefinition");
    lookup.filloutOmniBoxDataForFunction('function-definition-header--' + obj.id, lookup.canvasOmniBox, obj);

};

lookup.openOmniBoxForSandboxHeaderDefinition = function(obj)
{
    lookup.hideOmniBox();
    lookup.focusedObj(obj);
    lookup.activeOperation("focusOnSandboxHeaderDefinition");
    lookup.filloutOmniBoxDataForFunction('sandbox-definition-header--' + obj.id, lookup.canvasOmniBox, obj);
};

lookup.bodyOnClick = function()
{
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
            lookup.filloutGlobalOmniBox(lookup.canvasOmniBox);
        }
    }
};

lookup.theFunctionsListOffsetY = ko.observable(0);

lookup.theListOfFunctionsOnWheel = function()
{
    event.stopPropagation();

    lookup.refreshTheListOfFunctionsScroll();
};

lookup.refreshTheListOfFunctionsScroll = function() {
    var foundList = $("#the-functions-list")[0];
    lookup.theFunctionsListOffsetY(-foundList.parentNode.scrollTop);
};

lookup.omniBoxOnWheel = function()
{
    event.stopPropagation();
};





$(document).ready(function()
{
    var viewModel = new Lisperanto();
    lookup.loadFromStorage();
    lookup.backgroundApplySaved();
    viewModel.ApplyLookupToSelf();
    lookup.defineListOfPredefinedFunctions();
    lookup.defineSandbox();
    lookup.findSandboxAnchorPosition();
    lookup.openElement(lookup.sandbox());
    lookup.restoreFunctionsArray();
    lookup.refreshTheListOfFunctionsScroll();
    lookup.defineTimerForFunctions();
    
    
    ko.applyBindings(viewModel);
});


  