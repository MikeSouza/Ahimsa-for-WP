
jQuery(document).ready
(
    function()
    {
        // add our classes to WP generated elements
        ahimsa_reclass_wp_elements();

        // display vertical or rotated text depending on browser support
        // test in the order of browser popularity to save a few cycles ;-)
        // checking to see if at least one sidebar is active/defined...
        ahimsa_sidebartab_setup();
        
        // support for faded bottom bar in index page
        jQuery('.fadedbottombar').hover(
                function() { jQuery(this).css('opacity', '1.0'); },
                function() { jQuery(this).css('opacity', '0.3'); }
        );

        // display Comment edit/reply bottombar on hover
        jQuery('.comment').hover(
                function()
                {
                    jQuery('.replybuttonbox').css('visibility', 'hidden');
                    jQuery(this).children('.replybuttonbox').css('visibility', 'visible');
                },
                function() { jQuery('.replybuttonbox').css('visibility', 'hidden'); }
        );

        // display tags permitted in comments when focus is on response box
        jQuery('#comment').focus(function() { jQuery('.form-allowed-tags').fadeIn(); });
        jQuery('#comment').blur(function() { jQuery('.form-allowed-tags').fadeOut(); });

        // if user has declared a DIV of type "download" then make the whole thing clickable
        // We could have used a shortcode for this, but shortcodes are not expanded for RSS feeds.
        jQuery('.downloadbox').click
        (
            function() { document.location = jQuery(this).find('.downlink').attr('href'); }
        );

        // style and add prefix text for sourcelink
        ahimsa_sourcelink_setup();

        // comment form input elements styling on focus
        ahimsa_reply_focus_setup();
    }
);

//------------------------------------------------------------------------------
function ahimsa_reply_focus_setup()
{
    jQuery('.comment-form-author, .comment-form-email, .comment-form-url, .comment-form-comment')
        .focusin(function() { jQuery(this).addClass('comment-field-focused'); });
    jQuery('.comment-form-author, .comment-form-email, .comment-form-url, .comment-form-comment')
        .focusout(function() { jQuery(this).removeClass('comment-field-focused'); });
}

//------------------------------------------------------------------------------
function ahimsa_reclass_wp_elements()
{
    // add classes to the comment submit button
    if( jQuery('#submit').length )
    {
        jQuery('#submit').addClass('capsule');
        jQuery('#submit').addClass('actbubble');
    }

    // WP's comment_form() is rendered in a DIV id '#respond', and this
    // id is used later by WP to move this response form around when a
    // reader clicks "reply" on a comment. Problem for us is that we want
    // the response form to be in a FIELDSET. So, in comments.php we
    // wrap the comment_form() in our FIELDSET, and then here, we move
    // the id '#respond' to our FIELDSET, so that when WP moves the form
    // around our FIELDSET moves around with it.
    if( jQuery('#respond').length )
    {
        jQuery('#respond').attr('id', 'oldrespond');
        jQuery('#newrespond').attr('id', 'respond');

        var cancel = jQuery('#cancel-comment-reply-link').detach();
        jQuery('#submit').after(cancel);
        jQuery('#cancel-comment-reply').show();
    }
}

//------------------------------------------------------------------------------
function ahimsa_sidebartab_setup()
{
    if( jQuery('#sidebartableft').length > 0 )
        tab = '#sidebartableft';
    else
    if( jQuery('#sidebartabright').length > 0 )
        tab = '#sidebartabright';
    else
        tab = "";
    if( tab != "" )
    {
        // safari returns the CSS property even if it doesn't implement it
        // so we have a special check below for safari3 which does not
        // support CSS transform
        var safari3re = /Version\/3\.0.*Safari/;
        if( !safari3re.test(navigator.appVersion) &&
            ((jQuery(tab).css('filter') != '' &&
                jQuery(tab).css('filter') != 'none') ||
            (jQuery(tab).css('-moz-transform') != '' &&
                jQuery(tab).css('-moz-transform') != 'none') ||
            (jQuery(tab).css('-webkit-transform') != '' &&
                jQuery(tab).css('-webkit-transform') != 'none') ||
            (jQuery(tab).css('-o-transform') != '' &&
                jQuery(tab).css('-o-transform') != 'none')) )
        {
            jQuery('#sidebartableft').addClass('sidebartableftrotated');
            jQuery('#sidebartabright').addClass('sidebartabrightrotated');
            jQuery('.sidebartabnorotatetext').hide();
            jQuery('.sidebartabrotatedtext').show();
        }
        else
        {
            jQuery('.sidebartab').addClass('sidebartabnorotate');
            jQuery('#sidebartableft').addClass('sidebartableftnorotate');
            jQuery('#sidebartabright').addClass('sidebartabrightnorotate');
            jQuery('.sidebartabrotatedtext').hide();
            jQuery('.sidebartabnorotatetext').show();
        }
        jQuery('.sidebartab').show();
    }
}

//------------------------------------------------------------------------------
function ahimsa_sourcelink_setup()
{
    jQuery('.sourcelink').wrap('<div class="sourceboxtext" />');
    jQuery('.sourceboxtext').prepend('This post includes content from, and/or is a response to ');
    jQuery('.sourceboxtext').wrap('<div class="sourcelinkbox" />');
    jQuery('.sourcelinkbox').prepend('<div class="sourcemarker">&rarr;</div>');
    jQuery('.sourcelinkbox').append('<div style="height: 1px; clear: both;"></div>');
}

//------------------------------------------------------------------------------
function ahimsa_slide_sidebar(side)
{
    if( ! document.getElementById('sidebar'+side) )
        return;

    var tdid    = '#tdsidebar'+side;
    var sbid    = '#sidebar'+side;

    if( jQuery(sbid).is(':visible') )
    {
        jQuery(tdid).hide("slide", { direction: side }, 600, function() { jQuery(sbid).hide(); });
    }
    else
    {
        jQuery(sbid).show();
        jQuery(tdid).show("slide", { direction: side }, 600);
    }
}

//------------------------------------------------------------------------------
function ahimsa_recalc_block()
{
    document.getElementById("container").style.height = ahimsa_get_win_height() + "px";
}

//------------------------------------------------------------------------------
// code borrowed from: http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
function ahimsa_get_win_height()
{
    var myHeight = 0;
    if( typeof( window.innerHeight ) == 'number' )
    {
        //Non-IE
        myHeight = window.innerHeight;
    }
    else
    if( document.documentElement && document.documentElement.clientHeight )
    {
        //IE 6+ in 'standards compliant mode'
        myHeight = document.documentElement.clientHeight;
    }
    else
    if( document.body && document.body.clientHeight )
    {
        //IE 4 compatible
        myHeight = document.body.clientHeight;
    }

    return(myHeight);
}

//------------------------------------------------------------------------------
function ahimsa_toggle_cattags(postid, type)
{
    var postsel = '#post-'+postid;
    var boxsel  = '#post-'+postid+' .cattagsbox';

    var catsVisible = jQuery(postsel+' .postcats').is(':visible');
    var tagsVisible = jQuery(postsel+' .posttags').is(':visible');

    if( ! catsVisible && ! tagsVisible )
        jQuery(boxsel).show();

    if( (type == 'cats' && catsVisible && ! tagsVisible) ||
        (type == 'tags' && tagsVisible && ! catsVisible) )
        jQuery(boxsel).fadeOut(500);

    var sel = postsel+' .post'+type;
    if( jQuery(sel).is(':visible') )
        jQuery(sel).fadeOut(500);
    else
        jQuery(sel).fadeIn(500);
}

