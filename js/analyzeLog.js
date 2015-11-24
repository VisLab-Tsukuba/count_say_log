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
    var contents = false;
    var speech = false;
    var chair = false
    var writer = false;
    var attend = false;
    var absense = false;
    var late = false;

    nicknames.forEach( function( nickname ){
      counts.say += log_string.split( nickname ).length - 1;

      var contents_re = new RegExp("内容.*" + nickname + ".*[\n\r]");
      var speech_re = new RegExp("発表.*" + nickname + ".*[\n\r]");
      var chair_re = new RegExp("司会.*" + nickname + ".*[\n\r]");
      var writer_re = new RegExp("議事録.*" + nickname + ".*[\n\r]");
      var attend_re = new RegExp("出席.*" + nickname + ".*[\n\r]");
      var absense_re = new RegExp("欠席.*" + nickname + ".*[\n\r]");
      var late_re = new RegExp("遅刻.*" + nickname + ".*[\n\r]");

      contents = contents || log_string.match( contents_re );
      speech = speech || log_string.match( speech_re );
      chair = chair || log_string.match( chair_re );
      writer = writer || log_string.match( writer_re );
      attend = attend || log_string.match( attend_re );
      absense = absense || log_string.match( absense_re );
      late = late || log_string.match( late_re );
    } );

    if( contents ){
      counts.say --;
    }
    if( speech ){
      counts.say --;
    }
    if( chair ){
      counts.say --;
    }
    if( writer ){
      counts.say --;
    }
    if( attend || late ){
      counts.attend ++;
      counts.say --;
    }
    if( absense ){
      counts.absense ++;
      counts.say --;
    }
    if( late ){
      counts.late ++;
      counts.say --;
    }

    return counts;
  }
};
