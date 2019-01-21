/* 
Name: imageZoom js lib 
Last update: 2019-01-21 11:36
Link: https://github.com/yevsikov/imageZoom
*/
(function ( $ ) {
    $( document ).ready(function () {
        //if zoomedArea element is missing -  create new
        if ( $( '#zoomedArea' ).length<1 ) {
            $( '<div id="zoomedArea" style="z-index:999;"></div>' ).appendTo( 'body' );
        }
        var zoomedElement = $( 'img.zoom-js' );
        var zoomedArea = $( '#zoomedArea' );
        //set margin for zoomedArea
        var margin = 20;
        //if images for zooming found - make some action for its hover
        if ( zoomedElement.length > 0 ) {
            zoomedElement.hover(function() {
                var currentThumb = $(this);
                //get coordinates of current image for zoomedArea hiding
                zoomedArea.attr( 'data-outx', ( currentThumb.offset().left+currentThumb.width() ) );
                zoomedArea.attr( 'data-outy', ( currentThumb.offset().top+currentThumb.height() ) );
                zoomedArea.attr( 'data-inx', ( currentThumb.offset().left ) ) ;
                zoomedArea.attr( 'data-iny', ( currentThumb.offset().top ) ) ;
                //if fullsize image doesn't set - use the same image, but with some css zoom
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
                //get callback data if exists
                zoomedArea.attr( 'data-callback', ( currentThumb.attr('data-callback') ? currentThumb.attr('data-callback'): '') ) ;
                //change styles for zoomedArea (bg, coords, position)
                zoomedArea.css( 'background-image', 'url(' + fullsizeImage + ')' );
                zoomedArea.css( 'top',  currentThumb.offset().top-margin );
                zoomedArea.css( 'left', currentThumb.offset().left-margin  );
                zoomedArea.css( 'height',  currentThumb.height()+margin*2 );
                zoomedArea.css( 'width', currentThumb.width()+margin*2  );
                zoomedArea.css( 'position', 'absolute'  );
                //show zoomedArea
                zoomedArea.show();
            });
        } else {
            console.error( 'ERROR: .zoom-js elements are not found' );
        }
        //listen for mouse moving out of zoomed image area
        if ( zoomedArea.length > 0 ) {
            $( 'body' ).mousemove(function( event ) {
                //check if cursor coordinates are out of zoomed image area
                if (
                    ( (event.pageY-margin)>zoomedArea.attr( 'data-outy' ) )
                    ||
                    ( (event.pageX-margin)>zoomedArea.attr( 'data-outx' ) )
                    ||
                    ( (event.pageY+margin)<zoomedArea.attr( 'data-iny' ) )
                    ||
                    ( (event.pageX+margin)<zoomedArea.attr( 'data-inx' ) )
                ) {
                    //hide zoomedArea and clear callback
                    zoomedArea.hide();
                    zoomedArea.attr( 'data-callback', '' ) ;
                } else {
                    //scroll zoomed image with mouse moving (X coords)
                    var fullX = zoomedArea.attr('data-outx')-zoomedArea.attr('data-inx')+margin*2;
                    var positionX =  (( event.pageX - zoomedArea.attr('data-inx')+margin )*100)/fullX;
                    zoomedArea.css( 'background-position-x', positionX+'%' );
                    //scroll zoomed image with mouse moving (Y coords)
                    var fullY = zoomedArea.attr('data-outy')-zoomedArea.attr('data-iny')+margin*2;
                    var positionY =  (( event.pageY - zoomedArea.attr('data-iny')+margin )*100)/fullY;
                    zoomedArea.css( 'background-position-y', positionY+'%' );
                }
            });
            //hide zoomedArea and clear callback after window resize
            $( window ).resize(function() {
                zoomedArea.hide();
                zoomedArea.attr( 'data-callback', '' ) ;
            });
        } else {
            console.error( 'ERROR: #zoomedArea element is not found' );
        }
    });
})(jQuery);