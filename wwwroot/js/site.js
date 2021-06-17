var lookup = {};
lookup.customObjects = {};
lookup.functionsArray = ko.observableArray([]);
lookup.operations = [];

lookup.defineBuiltInFunction = function (name, parameters_list) 
{
    lookup.customObjects[name] = 
    {
        type: "built-in-function",
        name: name,
        parameters: parameters_list
    };
    lookup.functionsArray.push({id: name, body: ko.observableArray([])});
};

lookup.defineListOfPredefinedFunctions = function()
{
    lookup.defineBuiltInFunction("if", ["check", "if-true-run", "else-run"]);
    lookup.defineBuiltInFunction("+", ["a", "b"]);
    lookup.defineBuiltInFunction("<=", ["a", "b"]);
}

lookup.createFunction = function()
{
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-function",
        guid: guid
    };
    lookup.operations.push(operation);
    lookup.customObjects[guid] = 
    {
        type: "function",
        name: "Fibbonachi",
        body: []

    };
    lookup.functionsArray.push({id: guid, body: ko.observableArray([])});
    console.log("createFunction");
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
    lookup.operations.push(operation);
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
    lookup.operations.push(operation);
    lookup.customObjects[guid] = 
    {
        type: "symbol-usage",
        symbolName: symbol
    };
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
    lookup.operations.push(operation);
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

lookup.constantIntValue = ko.observable(0);
lookup.addConstant = function()
{
    if(lookup.activeOperation() === "focusOnBody" )
    {
        var obj = lookup.focusedObj();
        var guid = lookup.defineConstantInt(lookup.constantIntValue());
        lookup.customObjects[obj.id].body.push(guid);
        obj.body(lookup.customObjects[obj.id].body);
    }
};


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
  