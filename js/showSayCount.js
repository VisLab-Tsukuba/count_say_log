vislab.showSayCount = function(){
  var d3_svg = d3.select( "#vis-area" )
    .append( "svg" )
    .attr( "width", vislab.graph.width )
    .attr( "height", vislab.graph.height );

  var d3_graph = d3_svg.append( "g" )
    .attr( "transform", "translate(" + vislab.graph.margin_left + "," + vislab.graph.margin_top + ")");

  d3_graph.append( "g" ).attr( "class", "x axis" );
  d3_graph.append( "g" ).attr( "class", "y axis" );

  vislab.drawGraph( "say" );

  $( "#select-area #count-type" ).on( "change", function(){
    vislab.drawGraph();
  } );

  $( "#select-area #sort-type" ).on( "change", function(){
    vislab.drawGraph();
  } );
};

vislab.drawGraph = function(){
  var counts_type = $( "#count-type" ).val();
  var sort_type = $( "#sort-type" ).val();

  var width = vislab.graph.width - vislab.graph.margin_left - vislab.graph.margin_right;
  var height = vislab.graph.height - vislab.graph.margin_top - vislab.graph.margin_bottom;

  var d3_graph = d3.select( "#vis-area svg>g" );

  var x = d3.scale.ordinal()
    .rangeRoundBands( [ 0, width ], .2 );

  var y = d3.scale.linear()
    .range( [ height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" )
    .tickFormat( function( d ){
      return vislab.members[ d ].name;
    } );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .ticks( 5 );

  var data = [];
  for( id in vislab.members ){
    var member = vislab.members[ id ];
    data.push( {
      id: id,
      value: member.counts[ counts_type ]
    } );
  };

  var member_ids = data.map( function( d ){ return d.id; } );

  switch( sort_type ){
    case "count":
      var sort_data = data.concat();
      sort_data.sort( function( a, b ){
        if( a.value.length > b.value.length )
          return -1;
        return 1;
      } );
      member_ids = sort_data.map( function( d ){ return d.id; } );
      break;
  }

  x.domain( member_ids );
  y.domain( [ 0, d3.max( data, function( d ){ return d.value.length; } ) ] );

  d3_graph.select( ".x.axis" )
    .attr( "transform", "translate(0," + height + ")" )
    .call( xAxis )
    .selectAll( "text" )
    .style( "text-anchor", "end" )
    .attr( "dx", "-.8em" )
    .attr( "dy", ".15em" )
    .attr( "transform", "rotate(-45)" );

  d3_graph.select( ".y.axis" ).call( yAxis );

  d3_graph.selectAll( ".bar" )
    .data( data )
    .enter().append( "rect" )
    .attr( "class", "bar" );

  d3_graph.selectAll( ".bar" )
    .transition().duration( 500 )
    .delay( function( d, i ){ return i * 10; } )
    .attr( "x", function( d ){ return x( d.id ); } )
    .attr( "y", function( d ){ return y( d.value.length ); } )
    .attr( "width", x.rangeBand() )
    .attr( "height", function( d ){ return height - y( d.value.length ); } );
};
