vislab.analyzeLog = function(){
  $.ajax( {
    type: "GET",
    url: "log/sample_log.txt",
    success: function( txt ){
      for( id in  vislab.members){
        member = vislab.members[ id ];
        if( !member.say_count )
          member.say_count = 0;

        member.nicknames.forEach( function( nickname ){
          member.say_count += txt.split( nickname ).length - 1;
        } );

        $( "#member-list" ).append( $( "<li></li>", {
          "class": "member"
        } ).text( member.name + " : " + member.say_count + "回"  ) );
      }
    }
  } );
};
