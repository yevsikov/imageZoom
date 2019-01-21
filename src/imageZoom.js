/* 
Name: imageZoom js lib 
Last update: 2019-01-21 11:36
Link: https://github.com/yevsikov/imageZoom
*/
(function ( $ ) {
    $( document ).ready(function () {

        if ( $( '#zoomedArea' ).length<1 ) {
            $( '<div id="zoomedArea" style="z-index:999;"></div>' ).appendTo( 'body' );
        }
        var zoomedElement = $( '.zoom-js' );
        var zoomedArea = $( '#zoomedArea' );
        var margin = 20;

        if ( zoomedElement.length > 0 ) {
            zoomedElement.hover(function() {
                var currentThumb = $(this);

                zoomedArea.attr( 'data-outx', ( currentThumb.offset().left+currentThumb.width() ) );
                zoomedArea.attr( 'data-outy', ( currentThumb.offset().top+currentThumb.height() ) );
                zoomedArea.attr( 'data-inx', ( currentThumb.offset().left ) ) ;
                zoomedArea.attr( 'data-iny', ( currentThumb.offset().top ) ) ;

                if ( currentThumb.attr('data-fullsize') ) {
                    var fullsizeImage = currentThumb.attr( 'data-fullsize' );
                    zoomedArea.css( 'background-size', 'unset' );
                } else {
                    var fullsizeImage = currentThumb.attr('src');
                    if ( ((this.naturalHeight-margin)<=(currentThumb.height())) || ((this.naturalWidth-margin)<=(currentThumb.width())) ) {
                        currentThumb.height( ( currentThumb.height()>0 ) ? currentThumb.height() : 1 );
                        zoomedArea.css( 'background-size', (((margin*100)/currentThumb.height())+110)+'%' );
                    } else {
                        zoomedArea.css( 'background-size', 'unset' );
                    }
                }

                zoomedArea.attr( 'data-callback', ( currentThumb.attr('data-callback') ? currentThumb.attr('data-callback'): '') ) ;

                zoomedArea.css( 'background-image', 'url(' + fullsizeImage + ')' );

                zoomedArea.css( 'top',  currentThumb.offset().top-margin );
                zoomedArea.css( 'left', currentThumb.offset().left-margin  );
                zoomedArea.css( 'height',  currentThumb.height()+margin*2 );
                zoomedArea.css( 'width', currentThumb.width()+margin*2  );

                zoomedArea.css( 'position', 'absolute'  );

                zoomedArea.show();
            });
        } else {
            console.error( 'ERROR: .zoom-js elements are not found' );
        }

        if ( zoomedArea.length > 0 ) {
            $( 'body' ).mousemove(function( event ) {
                if (
                    ( (event.pageY-margin)>zoomedArea.attr( 'data-outy' ) )
                    ||
                    ( (event.pageX-margin)>zoomedArea.attr( 'data-outx' ) )
                    ||
                    ( (event.pageY+margin)<zoomedArea.attr( 'data-iny' ) )
                    ||
                    ( (event.pageX+margin)<zoomedArea.attr( 'data-inx' ) )
                ) {
                    zoomedArea.hide();
                    zoomedArea.attr( 'data-callback', '' ) ;
                } else {
                    var fullX = zoomedArea.attr('data-outx')-zoomedArea.attr('data-inx')+margin*2;
                    var positionX =  (( event.pageX - zoomedArea.attr('data-inx')+margin )*100)/fullX;
                    zoomedArea.css( 'background-position-x', positionX+'%' );

                    var fullY = zoomedArea.attr('data-outy')-zoomedArea.attr('data-iny')+margin*2;
                    var positionY =  (( event.pageY - zoomedArea.attr('data-iny')+margin )*100)/fullY;
                    zoomedArea.css( 'background-position-y', positionY+'%' );
                }
            });

            $( window ).resize(function() {
                zoomedArea.hide();
                zoomedArea.attr( 'data-callback', '' ) ;
            });
        } else {
            console.error( 'ERROR: #zoomedArea element is not found' );
        }

    });
})(jQuery);