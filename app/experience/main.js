define([
  'jquery',
  'underscore',
  'html!./template.html',
  'markdown'
],
function( $, _, template, markdown ){

  // Remove the content template and cache it
  var contentElement = template.querySelector( '#company' );
  if( contentElement && contentElement.parentNode ){
    contentElement.parentNode.removeChild( contentElement );
  }

  // Remove the description element
  var rmEl = contentElement.querySelector( '#description' );
  if( rmEl && rmEl.parentNode ){
    rmEl.parentNode.removeChild( rmEl );
  }

  function Component( data ){

    // Expose fragment
    this.fragment = document.createElement( 'div' );

    $( this.fragment )
      .addClass( 'container-fluid' )
      .append( template.cloneNode( true ) );

    this.addCompany = function( data ){
      if( !data.job ) return;

      var el = contentElement.cloneNode( true );

      var products = data.products || [];
      var lastTask = products[0];
      var firstTask = products[ products.length - 1 ];

      // Job, start - end
      var text = '**' + data.job + '**, ' + firstTask.dateStart + ' - ' + lastTask.dateEnd;
      $( el ).find( '#job' ).html( markdown.toHTML( text ) );

      // Company, city, state, country
      var fields = [];
      if( data.name ) fields.push( '**' + data.name + '**' );
      if( data.city ) fields.push( data.city );
      if( data.state ) fields.push( data.state );
      if( data.country ) fields.push( data.country );
      text = fields.join(', ');
      $( el ).find( '#office' ).html( markdown.toHTML( text ) );

      var tags = [];

      // Add resume of each project
      products.forEach( function( product ){
        if( !product.resume ) return;
        var resume = markdown.toHTML( product.resume );
        $( resume ).addClass( 'lead text ' ).appendTo( el );

        tags = _( tags ).union( product.tags || [] );
      });

      tags = _( tags ).map( function( item ){
        return '<code>' + item + '</code>';
      });

      text = tags.join(', ');

      $( '<p>' + text + '</p>' ).addClass( 'text' ).appendTo( el );

      $( el ).appendTo( this.fragment );
    };

    this.set = function( name, content ){
      switch( name ){
        case 'title':
          var el = this.fragment.querySelector('#title');
          $( el ).text( content );
          break;
        case 'companies':
          content.forEach( this.addCompany.bind( this ) );
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