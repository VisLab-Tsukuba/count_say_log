$( function(){
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
    vislab.analyzeLog( "log/sample_log.txt" );

  vislab.showSayCount();
} );
