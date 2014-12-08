// Configure requirejs
requirejs.config({
  baseUrl: '/app',
  paths: {
    jquery: '../bower_components/jquery/dist/jquery',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',
    ObjectEventTarget: '../bower_components/ObjectEventTarget/ObjectEventTarget',
    moment: '../bower_components/moment/moment',
    modernizr: '../bower_components/modernizr/modernizr',
    text: '../bower_components/text/text',
    json: '../bower_components/requirejs-plugins/src/json',
    html: '../bower_components/html/html',
    markdown: '../bower_components/markdown-js/lib/markdown',
    underscore: '../bower_components/underscore/underscore'
  },
  shim: {
    markdown: {
      exports: 'markdown'
    },
    underscore: {
      exports: 'underscore'
    }
  }
});

require([
  'jquery',
  'json!resume.json',
  'menu/main',
  'section/main',
  'experience/main'
], function( $, jsonResume ){

  var components = {
    'menu': require('menu/main'),
    'section': require('section/main'),
    'experience': require('experience/main'),
  };

  var container = $('body .container');

  // Update document title
  document.title = jsonResume.title;

  var modules = jsonResume.modules || [];

  modules.forEach( function( module ){
    var Component = components[module.component];
    if( !Component ){
      return;
    }

    var component = new Component( module.data );

    container.append( component.fragment );
  });
  
});