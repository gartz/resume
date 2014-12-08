define([
  'jquery',
  'html!./template.html',
  'markdown'
],
function( $, template, markdown ){

  // Remove the content template and cache it
  var contentElement = template.querySelector( '.text' );
  if( contentElement && contentElement.parentNode ){
    contentElement.parentNode.removeChild( contentElement );
  }

  function Component( data ){

    // Expose fragment
    this.fragment = document.createElement( 'div' );

    $( this.fragment )
      .addClass( 'container-fluid' )
      .append( template.cloneNode( true ) );

    this.addContent = function( text ){
      $( markdown.toHTML( text ) )
        .addClass( 'lead text' )
        .appendTo( this.fragment );
    };

    this.set = function( name, content ){
      switch( name ){
        case 'title':
          var el = this.fragment.querySelector('#title');
          $( el ).text( content );
          break;
        case 'contents':
          content.forEach( this.addContent.bind( this ) );
          break;
        case 'printable':
          if( content === false ){
            $( this.fragment ).addClass( 'hidden-print' );
          }
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