vislab.analyzeLog = function( log_path ){
  $.ajax( {
    type: "GET",
    url: log_path,
    dataType: "text",
    async: false,
    success: function( txt ){
      for( id in vislab.members ){
        member = vislab.members[ id ];
        if( !member.say_count )
          member.say_count = 0;
        member.say_count += countName( txt, member.nicknames );
      }
    },
    error: function( err ){
      console.log( err );
    }
  } );

  function countName( log_string, nicknames ){
    say_count = 0;

    nicknames.forEach( function( nickname ){
      say_count += log_string.split( nickname ).length - 1;
    } );

    return say_count;
  }
};
