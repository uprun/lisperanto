// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var lookup = {};
lookup.customObjects = {};
lookup.functionsArray = ko.observableArray([]);
lookup.operations = [];
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
        body: ["123", 122]

    };
    lookup.functionsArray.push({id: guid});
    console.log("createFunction");
};

lookup.defineConstantInt = function(c)
{
    var guid = lookup.uuidv4();
    var operation = 
    {
        operation: "define-constant",
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
  }

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
    ko.applyBindings(viewModel);
});
  