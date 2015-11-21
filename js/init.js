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

  $.ajax( {
    type: "GET",
    url: "member.json",
    dataType: "json",
    async: false,
    success: function( json ){
      vislab.members = json;
    },
    error: function( err ){
      console.log( err );
    }
  } );

  if( vislab.members )
    vislab.file_paths.forEach( function( path ){
      vislab.analyzeLog( path );
    } );

  vislab.showSayCount();
} );
