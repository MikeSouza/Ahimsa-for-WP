
<?php global $options, $sectprefix; ?>

<td id='tdsidebarright' class='tdsidebar'  valign='top'>
    <!-- inline style required for easy JavaScript mods, without getting computed styles -->
    <div id='sidebarright' class='sidebar' style='display: block; opacity: 1.0;'>
        <?php if ( !function_exists('dynamic_sidebar') || !dynamic_sidebar('rightbar') ) : ?>
        <?php endif; ?>
    </div>
</td>

<td valign='top' class='tdsidetabs'>
    <div id='sidebartabright' class='sidebartab' onclick='slideSideBar("right");'>
    <!--
    <font color='#22bb00'>&raquo;</font><br/>S<br/>I<br/>D<br/>E<br/>B<br/>A<br/>R<br/><font color='#22bb00'>&laquo;</font>
    -->
    SIDEBAR
    </div>
</td>

