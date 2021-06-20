var lookup = {};
lookup.customObjects = {};
lookup.functionsArray = ko.observableArray([]);
lookup.functionsLookup = ko.computed(function()
{
    return ko.utils.arrayMap(lookup.functionsArray(), function(item) {
        return { id: item.id, 
            text: lookup.customObjects[item.id].name() + '(' + lookup.customObjects[item.id].parameters().join(", ") +')'
        };
    });
    
});
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
    console.log(toSerialize);
    var data = JSON.stringify(toSerialize);
    localStorage.setItem('customObjects', data);
};

lookup.defineBuiltInFunction = function (name, parameters_list) 
{
    var toAdd ={
        id: name,
        type: "built-in-function",
        name: ko.observable(name),
        parameters: ko.observableArray(parameters_list),
        body: ko.observableArray([])
    };
    lookup.customObjects[name] = toAdd;
    
    lookup.functionsArray.push(toAdd);
};

lookup.defineListOfPredefinedFunctions = function()
{
    lookup.defineBuiltInFunction("if", ["check", "if-true-run", "else-run"]);
    lookup.defineBuiltInFunction("+", ["a", "b"]);
    lookup.defineBuiltInFunction("-", ["a", "b"]);
    lookup.defineBuiltInFunction("*", ["a", "b"]);
    lookup.defineBuiltInFunction("/", ["a", "b"]);
    lookup.defineBuiltInFunction("<=", ["a", "b"]);
}

//TODO: need to parse https://en.wikipedia.org/wiki/List_of_computer_scientists
lookup.defaultNamesForFunctions =
[
    "Edsger Dijkstra",
    "Alan Turing",
    "Alan Kay",
    "Dines Bjørner",
    "John McCarthy"
];
lookup.getRandomInt = function(max) {
    return Math.floor(Math.random() * max);
  };  

lookup.createFunction = function()
{
    var guid = lookup.uuidv4();
    
    var toAdd = {
        id: guid,
        type: "function",
        name: ko.observable(lookup.defaultNamesForFunctions[this.getRandomInt(lookup.defaultNamesForFunctions.length)]),
        body: ko.observableArray([]),
        parameters: ko.observableArray([])

    };

    lookup.customObjects[guid] = toAdd;
    var operation = 
    {
        operation: "define-function",
        guid: guid
    };
    lookup.operationsPush(operation);
    lookup.functionsArray.push(toAdd);
};

lookup.defineConstantInt = function(c)
{
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-constant-int",
        guid: guid,
        constantValue: c
    };
    lookup.operationsPush(operation);
    lookup.customObjects[guid] = 
    {
        type: "constant-int",
        value: c
    };
    return guid;
}

lookup.defineSymbolUsage = function(symbol)
{
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-symbol-usage",
        guid: guid,
        symbolName: symbol
    };
    lookup.operationsPush(operation);
    lookup.customObjects[guid] = 
    {
        type: "symbol-usage",
        symbolName: symbol
    };
    return guid;
}

lookup.defineFunctionCall = function( functionGuid)
{
    var toWorkWith = lookup.customObjects[functionGuid];
    var functionToCallName = toWorkWith.name
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-function-call",
        guid: guid,
        functionName: functionToCallName,
        functionGuid: functionGuid
    };
    lookup.operationsPush(operation);
    var toAdd = {
        type: "function-usage",
        functionName: functionToCallName,
        functionGuid: functionGuid,
        parameters: []
    };
    for(var k = 0; k < toWorkWith.parameters().length; k++)
    {
        toAdd.parameters.push({ name: toWorkWith.parameters()[k], guidToUse: ko.observable(undefined), functionCallGuid: guid});
    }

    
    lookup.customObjects[guid] = toAdd;

    

    return guid;
}

lookup.defineParameter = function(parameter)
{
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-parameter",
        guid: guid,
        parameterName: parameter
    };
    lookup.operationsPush(operation);
    lookup.customObjects[guid] = 
    {
        type: "parameter",
        parameterName: parameter
    };
    return guid;
}


lookup.uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  };

lookup.activeOperation = ko.observable("");


lookup.focusedObj = ko.observable({});

lookup.focusOnBody = function(obj)
{
    lookup.focusedObj(obj);
    lookup.activeOperation("focusOnBody");

};

lookup.focusOnParameter = function(obj)
{
    lookup.focusedObj(obj);
    lookup.activeOperation("focusOnParameter");

};

lookup.constantIntValue = ko.observable(0);
lookup.addConstant = function()
{
    var guid = lookup.defineConstantInt(lookup.constantIntValue());
    var obj = lookup.focusedObj();
    if(lookup.activeOperation() === "focusOnBody" )
    {
        lookup.customObjects[obj.id].body.push(guid);
    }
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        var functionCall = lookup.customObjects[obj.functionCallGuid];
        for( var k = 0; k < functionCall.parameters.length; k++)
        {
            var some = functionCall.parameters[k];
            if(some.name === obj.name)
            {
                some.guidToUse(guid);
            }

        }
    }
    lookup.activeOperation("");

};

lookup.functionToAdd = ko.observable();
lookup.addFunction = function()
{
    var obj = lookup.focusedObj();
    var guid = lookup.defineFunctionCall(lookup.functionToAdd().id);
    if(lookup.activeOperation() === "focusOnBody" )
    {
        lookup.customObjects[obj.id].body.push(guid);
        var operation = 
        {
            operation: "push-to-function-body",
            guidToPush: guid,
            functionGuid: obj.id
        };
        lookup.operationsPush(operation);
    }
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        var functionCall = lookup.customObjects[obj.functionCallGuid];
        for( var k = 0; k < functionCall.parameters.length; k++)
        {
            var some = functionCall.parameters[k];
            if(some.name === obj.name)
            {
                some.guidToUse(guid);
            }

        }
    }
    lookup.activeOperation("");

};

lookup.symbolToAdd = ko.observable("");

lookup.addSymbol = function()
{
    var obj = lookup.focusedObj();
    var guid = lookup.defineSymbolUsage(lookup.symbolToAdd());
    if(lookup.activeOperation() === "focusOnBody" )
    {
        lookup.customObjects[obj.id].body.push(guid);
    }
    if(lookup.activeOperation() === "focusOnParameter" )
    {
        var functionCall = lookup.customObjects[obj.functionCallGuid];
        for( var k = 0; k < functionCall.parameters.length; k++)
        {
            var some = functionCall.parameters[k];
            if(some.name === obj.name)
            {
                some.guidToUse(guid);
            }

        }
    }
    lookup.activeOperation("");
};

lookup.activateRenameFunctionTool = function(obj)
{
    lookup.focusedObj(obj);
    lookup.activeOperation("activateRenameFunctionTool");
    lookup.newFunctionName(obj.name());
};

lookup.renameFunction = function()
{
    var obj = lookup.focusedObj();
    obj.name(lookup.newFunctionName());
    lookup.activeOperation("");
};

lookup.newFunctionName = ko.observable("");

lookup.activateAddingParameterTool = function(obj)
{
    lookup.focusedObj(obj);
    lookup.activeOperation("activateAddingParameterTool");
    lookup.newParameterName("");
    //TODO: find undefined symbols in a function to suggest them
    //TODO: find undefined symbols in a subtree when adding (let x someting)
};

lookup.addParameter = function()
{
    var obj = lookup.focusedObj();
    obj.parameters.push(lookup.newParameterName());
    lookup.newParameterName("");
};

lookup.newParameterName = ko.observable("");

  function AstLispyViewModel()
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



$(document).ready(function()
{
    var viewModel = new AstLispyViewModel();
    viewModel.ApplyLookupToSelf();
    lookup.defineListOfPredefinedFunctions();
    ko.applyBindings(viewModel);
});
  