vislab.analyzeLog = function( log_path ){
  $.ajax( {
    type: "GET",
    url: log_path,
    dataType: "text",
    async: false,
    success: function( txt ){
      for( id in vislab.members ){
        member = vislab.members[ id ];
        if( !member.counts )
          member.counts = {
            say: 0,
            attend: 0,
            absense: 0,
            late: 0
          };
        member.counts = countName( txt, member.nicknames, member.counts );
      }
    },
    error: function( err ){
      console.log( err );
    }
  } );

  function countName( log_string, nicknames, counts ){
    nicknames.forEach( function( nickname ){
      counts.say += log_string.split( nickname ).length - 1;

      var contents_re = new RegExp("内容.*" + nickname + ".*\n");
      var speech_re = new RegExp("発表.*" + nickname + ".*\n");
      var chair_re = new RegExp("司会.*" + nickname + ".*\n");
      var writer_re = new RegExp("議事録.*" + nickname + ".*\n");
      var attend_re = new RegExp("出席.*" + nickname + ".*\n");
      var absense_re = new RegExp("欠席.*" + nickname + ".*\n");
      var late_re = new RegExp("遅刻.*" + nickname + ".*\n");

      if( log_string.match( contents_re ) ){
        counts.say --;
      }
      if( log_string.match( speech_re ) ){
        counts.say --;
      }
      if( log_string.match( chair_re ) ){
        counts.say --;
      }
      if( log_string.match( writer_re ) ){
        counts.say --;
      }
      if( log_string.match( attend_re ) ){
        counts.attend ++;
        counts.say --;
      }
      if( log_string.match( absense_re ) ){
        counts.absense ++;
        counts.say --;
      }
      if( log_string.match( late_re ) ){
        counts.late ++;
        counts.say --;
      }
    } );

    return counts;
  }
};
