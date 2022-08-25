// this code was taken from https://stackoverflow.com/questions/19370098/knockout-contenteditable-binding

ko.bindingHandlers.htmlLazy = {
    init: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        element.innerHTML = value;
    },
    update: function (element, valueAccessor) {
        event.stopPropagation();
        var value = ko.unwrap(valueAccessor());
        
        if (!element.isContentEditable) {
            element.innerHTML = value;
        }
    }
};
ko.bindingHandlers.contentEditable = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var value = ko.unwrap(valueAccessor()),
            htmlLazy = allBindingsAccessor().htmlLazy;
        
        $(element).on("keydowm", function(){
            event.stopPropagation();
        });

        $(element).on("keyup", function(){
            event.stopPropagation();
        });
        $(element).on("input", function () {
            if (this.isContentEditable && ko.isWriteableObservable(htmlLazy)) {
                htmlLazy(this.innerHTML);
            }
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.unwrap(valueAccessor());
        
        element.contentEditable = value;
        
        if (!element.isContentEditable) {
            $(element).trigger("input");
        }
    }
};