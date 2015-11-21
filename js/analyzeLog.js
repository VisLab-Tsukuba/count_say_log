vislab.analyzeLog = function( log_path ){
  $.ajax( {
    type: "GET",
    url: log_path,
    success: function( txt ){
      for( id in vislab.members){
        member = vislab.members[ id ];
        if( !member.say_count )
          member.say_count = 0;
        member.say_count += countName( txt, member.nicknames );
      }

      vislab.showSayCount();
    }
  } );

  var countName = function( log_string, nicknames ){
    say_count = 0;

    nicknames.forEach( function( nickname ){
      say_count += log_string.split( nickname ).length - 1;
    } );

    return say_count;
  }
};
