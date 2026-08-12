"use strict";

var polygon = window.polygon || function(points, cls) {
  return '<polygon points="' + String(points || '') + '" class="' + String(cls || 'shape') + '"/>';
};
window.polygon = polygon;
