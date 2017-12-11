( function( $, _ ) {
	var submit               = $( '#submit' ),
		notificationArea = $( document.getElementById( 'adstxt-notification-area' ) ),
		notificationTemplate = wp.template( 'adstext-notice' );

	submit.on( 'click', function( e ){
		e.preventDefault();

		var	textarea    = $( '#adstxt_content' ),
			notices     = $( '.adstxt-notice' ),
			submit_wrap = $( 'p.submit' ),
			spinner     = submit_wrap.find( '.spinner' );

		spinner.addClass( 'is-active' );

		// clear any existing messages
		notices.remove();

		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: ajaxurl,
			data: $( '.adstxt-settings-form' ).serialize(),
			success: function( r ) {
				spinner.removeClass( 'is-active' );

				if ( 'undefined' !== typeof r.sanitized ) {
					textarea.val( r.sanitized );
				}

				if ( 'undefined' !== typeof r.saved && r.saved ) {
					data = {
						'class':   'success',
						'message': adstxt.saved
					}
				} else {
					data = {
						'class':   'error',
						'message': adstxt.error_intro,
						'errors': ( typeof r.errors != 'undefined' ) ? r.errors : [ adstxt.unknown_error ]
					}
				}
				notificationArea.html( notificationTemplate( data ) );
			}
		})
	});

	$( '.wrap' ).on( 'click', '#adstxt-ays-checkbox', function(e){
		submit.removeAttr( 'disabled' );
	})
} )( jQuery, _ );
