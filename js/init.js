$( function(){
  $.ajax( {
    type: "GET",
    url: "member.json",
    dataType: "json",
    success: function( json ){
      vislab.members = json;
      vislab.analyzeLog( "log/sample_log.txt" );
    },
    error: function( err ){
      console.log( err );
    }
  } );
} );
