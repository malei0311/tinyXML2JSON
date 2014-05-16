var tinyXML2JSON = (function(){
  function convertX2J(xmlDoc) {
    var attr,
        child,
        attrs = xmlDoc.attributes,
        children = xmlDoc.childNodes,
        key = xmlDoc.nodeType,
        obj = {},
        i = -1;

    if (key == 1 && attrs.length) {
      obj[key = '@attributes'] = {};
      while (attr = attrs.item(++i)) {
        obj[key][attr.nodeName] = attr.nodeValue;
      }
      i = -1;
    } else if (key == 3) {
      obj = xmlDoc.nodeValue;
    }
    while (child = children.item(++i)) {
      key = child.nodeName;
      if (obj.hasOwnProperty(key)) {
        if (obj.toString.call(obj[key]) != '[object Array]') {
          obj[key] = [obj[key]];
        }
        obj[key].push(convertX2J(child));
      }
      else {
        obj[key] = convertX2J(child);
      }
    }
    return obj;
  }

  function parseXML(xmlStr) {
    var xmlDoc;
    if (window.DOMParser) {
      xmlDoc = (new DOMParser()).parseFromString(xmlStr,'text/xml');
    } else if (window.ActiveXObject) {
      xmlDoc = [new ActiveXObject('Microsoft.XMLDOM'), xmlStr];
      xmlDoc[0].async = false;
      xmlDoc[0].loadXML(xmlDoc[1]);
      xmlDoc = xmlDoc[0];
    }
    return xmlDoc;
  }

  return {
    convert: function(xmlStr) {
      var xmlDoc = parseXML(xmlStr);
      return convertX2J(xmlDoc);
    }
  }
})();
