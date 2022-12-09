(function($) {
    var urlParams = new URLSearchParams(window.location.search);
    var keys = urlParams.keys();
    var entries = urlParams.entries();

    
    //check if redux options page
    $(document).ready(function(){
        if(urlParams.get('page') == "options"){
            // alert('yes');
            $(".group_title:contains('Admin Settings')").parent().addClass('admin-only');
            $(".group_title:contains('Import / Export')").parent().addClass('admin-only');
        }
    });
    
})( jQuery );