<?php

if ( ! defined( 'WP_CONTENT_URL' ) )
    define( 'WP_CONTENT_URL', get_option( 'siteurl' ) . '/wp-content' );

function ahimsa_util_get_skin_files()
{
    $ahimsaskins = glob(TEMPLATEPATH . "/skins/skin_*.css");
    $customskins = glob(WP_CONTENT_DIR . "/themestore/ahimsa/skin_*.css");
    return(array_merge($ahimsaskins, $customskins));
}

function ahimsa_util_get_skin_url($skin)
{
    // First check for user defined skins
    if( glob(WP_CONTENT_DIR . "/themestore/ahimsa/skin_$skin.css") )
        $skin_url = WP_CONTENT_URL . "/themestore/ahimsa/skin_$skin.css";
    elseif( glob(TEMPLATEPATH . "/skins/skin_$skin.css") )
        $skin_url = get_template_directory_uri() . "/skins/skin_$skin.css";
    else
        $skin_url = "";

    return($skin_url);
}

function ahimsa_util_get_skin_path($skin)
{
    if( glob(WP_CONTENT_DIR . "/themestore/ahimsa/skin_$skin.css") )
        return(WP_CONTENT_DIR . "/themestore/ahimsa/skin_$skin.css");
    elseif( glob(TEMPLATEPATH . "/skins/skin_$skin.css") )
        return(TEMPLATEPATH . "/skins/skin_$skin.css");
    else
        return("");
}

function ahimsa_util_get_customss_url()
{
    if( file_exists(WP_CONTENT_DIR . "/themestore/ahimsa/custom.css") )
        return(WP_CONTENT_URL . "/themestore/ahimsa/custom.css");
    elseif( file_exists(TEMPLATEPATH . "/custom.css") )
        return(TEMPLATEPATH . "/custom.css");
    else
        return("");
}

?>
