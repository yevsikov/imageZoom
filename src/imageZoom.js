(function ($) {
    $(document).ready(function () {

        $('<div id="zoomedArea"></div>').appendTo('body');
        var zoomedElement = $('.zoom-js');
        var zoomedArea = $('#zoomedArea');
        var margin = 20;

        if (zoomedElement.length > 0) {
            zoomedElement.hover(function( event ) {
                var currentThumb = $(this);

                zoomedArea.attr('data-outx', ( currentThumb.position().left+currentThumb.width() ));
                zoomedArea.attr('data-outy', ( currentThumb.position().top+currentThumb.height() ));
                zoomedArea.attr('data-inx', ( currentThumb.position().left )) ;
                zoomedArea.attr('data-iny', ( currentThumb.position().top )) ;

                if( currentThumb.attr('data-fullsize') ) {
                    var fullsizeImage = currentThumb.attr('data-fullsize');
                    zoomedArea.css('background-size', 'unset');
                } else {
                    var fullsizeImage = currentThumb.attr('src');
                    zoomedArea.css('background-size', '125%');
                }

                zoomedArea.css('background-image', 'url(' + fullsizeImage + ')');

                zoomedArea.css('top',  currentThumb.position().top-margin );
                zoomedArea.css('left', currentThumb.position().left-margin  );
                zoomedArea.css('height',  currentThumb.height()+margin*2 );
                zoomedArea.css('width', currentThumb.width()+margin*2  );

                zoomedArea.css('position', 'absolute'  );

                zoomedArea.show();
            });
        } else {
            console.error('ERROR: .zoom-js elements are not found');
        }

        if (zoomedArea.length > 0) {
            $('body').mousemove(function( event ) {
                if (
                    ( (event.pageY-margin)>zoomedArea.attr('data-outy') )
                    ||
                    ( (event.pageX-margin)>zoomedArea.attr('data-outx') )
                    ||
                    ( (event.pageY+margin)<zoomedArea.attr('data-iny') )
                    ||
                    ( (event.pageX+margin)<zoomedArea.attr('data-inx') )
                ) {
                    zoomedArea.hide();
                } else {
                    var fullX = zoomedArea.attr('data-outx')-zoomedArea.attr('data-inx')+margin*2;
                    var positionX =  (( event.pageX - zoomedArea.attr('data-inx')+margin )*100)/fullX;
                    zoomedArea.css('background-position-x', positionX+'%' );

                    var fullY = zoomedArea.attr('data-outy')-zoomedArea.attr('data-iny')+margin*2;
                    var positionY =  (( event.pageY - zoomedArea.attr('data-iny')+margin )*100)/fullY;
                    zoomedArea.css('background-position-y', positionY+'%' );
                }
            });
        } else {
            console.error('ERROR: #zoomedArea element is not found');
        }

    });
})(jQuery);