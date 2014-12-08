define([
  'jquery',
  'html!./template.html'
],
function( $, template ){

  function Component( data ){
    this.fragment = template.cloneNode( true );

    this.set = function( name, content ){
      switch( name ){
        case 'title':
          $( this.fragment.querySelector( '#title' ) ).text( content );
          break;
      }
    }

    for( var prop in data ){
      if( !data.hasOwnProperty( prop ) ){
        continue;
      }
      var content = data[prop];

      this.set( prop, content );
    }
  }

  return Component;
});