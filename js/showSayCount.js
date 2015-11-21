vislab.showSayCount = function(){
  for( id in this.members){
    member = vislab.members[ id ];
    $( "#member-list" ).append( $( "<li></li>", {
      "class": "member"
    } ).text( member.name + " : " + member.say_count + "回"  ) );
  }
};
