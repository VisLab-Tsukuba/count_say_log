$( function(){
  $.ajax( {
    type: "GET",
    url: "get_log_list.php",
    dataType: "json",
    async: false,
    success: function( json ){
      vislab.file_paths = json;
    },
    error: function( err ){
      console.log( err );
    }
  } );

  $.getJSON( "member.json", function( json ){
    vislab.members = json;

    vislab.file_paths.forEach( function( path ){
      vislab.analyzeLog( path );
    } );

    vislab.showSayCount();
  } );
} );
