
<link
    rel='stylesheet'
    href='<?php print get_template_directory_uri(); ?>/shortcodes.css'
    type='text/css'
    media='screen' />

<?php

// [qfgallery]
// add if for option check for qfgallery activation
add_shortcode('qfgallery', 'qfgallery_handler');

?>

<link
    rel='stylesheet'
    href='<?php print get_template_directory_uri(); ?>/lib/jquery.fancybox/jquery.fancybox.css'
    type='text/css'
    media='screen' />

<script
    type="text/javascript"
    src="<?php print get_template_directory_uri(); ?>/lib/jquery.fancybox/jquery.easing.1.3.js">
</script>

<script
    type="text/javascript"
    src="<?php print get_template_directory_uri(); ?>/lib/jquery.fancybox/jquery.fancybox-1.2.1.js">
</script>

<?php

$galleryctr = 0;

function qfgallery_handler($atts, $content)
{
    global $galleryctr;

    extract
    (
        shortcode_atts
        (
            array
            (
                'title'     => '',
                'scale'     => '',
                'float'     => '',
                'orient'    => ''
            ),
            $atts
        )
    );

    $newcontent =
    "
        <div
            class='qfcontainer' " .
            (
                $float != "" ?
                "style=
                '
                    float: $float;
                    margin: 5px 15px;
                    margin-$float: 0px;
                    padding: 3px;
                '"
                :
                ""
            ) . "
        >
    ";

    if( $title != "" ) $newcontent .= "<h2>$title</h2>\n";
    foreach( explode("\n", $content) as $line )
    {
        // strip all HTML tags (such as <br>, <p> and other stuff inserted by wp_autop()
        $line = preg_replace("/\s*<[^>]*>\s*/", "", $line);
        
        // now get per-image options:
        // arg1 = URL [required]
        // arg2 = alt and title value
        // arg3 = top/left point in image: X
        // arg4 = top/left point in image: Y
        $matches = preg_split("/\s*\|\s*/", $line);
        if( sizeof($matches) < 1 || preg_match("/^\s*$/", $matches[0]) )
            continue;

        $x = $matches[2] or $x = 0;
        $y = $matches[3] or $y = 0;

        $newcontent .=
        "
            <div class='qfgallerytnail'>
            <a class='qfgallery' rel='qfgallery$galleryctr' href='$matches[0]' title='$matches[1]'>
            <img
                style='margin-left: -${x}px; margin-top: -${y}px;'
                src='$matches[0]' " . ($scale == 1 ? "width='128' height='128' " : "") . "
                alt='$matches[1]' />
            </a>
            </div>
        ";

        if( $orient == 'portrait' )
            $newcontent .= "<br/>";
    }

    $newcontent .= "<br clear='all' /></div>\n";
    $galleryctr++;

    return($newcontent);
}

?>

<script language='JavaScript'>

jQuery(document).ready(
    function()
    {
	    jQuery("a.qfgallery").
            fancybox
            ({
                'imageScale':   true,
                'zoomOpacity':  true,
                'overlayShow':  true,
                'easingIn':     'easeInElastic',
                'easingOut':    'easeOutBounce',
                'easingChange': 'easeInOutSine'
            });
    }
);

</script>

<?php

// [faqinway]
add_shortcode('faqinway', 'faqinway_handler');

?>

<?php

function faqinway_handler($atts, $content)
{
    extract
    (
        shortcode_atts
        (
            array
            (
                'dummy' => ''
            ),
            $atts
        )
    );

    $content = preg_replace("/\<br\s*\/?\>/", " ", $content);
    $newcontent = "<div class='faqinwaycontainer'>\n";
    foreach( explode("$$$", $content) as $qa )
    {
        if( ! (list($q, $a) = preg_split("/\@\@\@/", $qa, 2)) )
            continue;

        $newcontent .=
        "
            <div class='faqinwayqa'>
                <div class='faqinwayq'>$q</div>
                <div class='faqinwaya'>$a</div>
            </div>
        ";
    }
    $newcontent .= "</div>\n";

    return($newcontent);
}

?>

<script language='JavaScript'>

jQuery(document).ready(
    function()
    {
        jQuery('.faqinwayq').click(
            function()
            {
                jQuery('.faqinwaya').hide();
                jQuery(this).parent().find('.faqinwaya').show();
            }
        );
    }
);
	
</script>

