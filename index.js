window.Bindable = (function() {
  'use strict';

  function Bindable(context, dataKey) {
    context = context || 'body'
    this.dataKey = dataKey || 'data-bindable'
    this.instanceKey = this.dataKey.replace(/data-/g, '') + 'Instance'
    this.bindables = document[context].querySelectorAll('[' + this.dataKey + ']')
  }


  Bindable.prototype.bindAll = function() {
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      this.bind(this.bindables[i])
    }
    return this
  };


  Bindable.prototype.getRefs = function() {
    var refs = []
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      refs.push(this.bindables[i][this.instanceKey])
    }
    return refs
  };


  Bindable.prototype.dispose = function() {
    var instance
    for (var i = 0, len = this.bindables.length; i < len; i += 1) {
      var bindable = this.bindables[i]
      if (instance = bindable[this.instanceKey]) {
        if (typeof (instance != null ? instance.dispose : void 0) === 'function') {
          instance.dispose()
        }
        bindable[this.instanceKey] = null
      }
    }
    this.bindables = []
    return this
  };


  Bindable.prototype.bind = function(el, dataKey) {
    dataKey = dataKey || this.dataKey
    var _class
    var key = el.getAttribute(dataKey)
    if (_class = this.constructor.getClass(key)) {
      if (!el[this.instanceKey]) {
        el[this.instanceKey] = new _class(el)
      }
      return el[this.instanceKey]
    } else  {
      if (typeof console !== "undefined" && console !== null) {
        console.error('Bindable for key: ' + key + ' not found in Bindable.registry for instance ' + el)
      }
      return void 0
    }
  };


  Bindable.getClass = function(key) {
    key = '"' + key + '"'
    return (this.registry[key] ? this.registry[key]['class'] : void 0)
  };


  Bindable.register = function(key, klass) {
    this.registry = this.registry || {}
    this.registry['"' + key + '"'] = {'class': klass}
    return this.registry
  };


  return Bindable

})();
