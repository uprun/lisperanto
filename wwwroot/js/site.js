// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
var lookup = {};
lookup.functionsArray = ko.observableArray();
lookup.createFunction = function()
{
    var guid = lookup.uuidv4();
    lookup[guid] = 
    {
        operation: "define-function"
    };
    console.log("createFunction");
};

lookup.uuidv4 = function() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  