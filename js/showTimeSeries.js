vislab.initTimeArea = function(){
  var d3_svg = d3.select( "#vis-area" )
    .append( "svg" )
    .attr( "id", "time-area" )
    .attr( "width", vislab.graph.width )
    .attr( "height", vislab.graph.height );

  var d3_graph = d3_svg.append( "g" )
    .attr( "transform", "translate(" + vislab.graph.margin_left + "," + vislab.graph.margin_top + ")");

  d3_graph.append( "g" ).attr( "class", "x axis" );
  d3_graph.append( "g" ).attr( "class", "y axis" );

  vislab.drawTimeArea();
};

vislab.drawTimeArea = function(){
  var counts_type = $( "#count-type" ).val();

  var width = vislab.graph.width - vislab.graph.margin_left - vislab.graph.margin_right;
  var height = vislab.graph.height - vislab.graph.margin_top - vislab.graph.margin_bottom;

  var d3_graph = d3.select( "#time-area g" );

  var x = d3.time.scale()
    .range( [ 0, width ] );

  var y = d3.scale.linear()
    .range( [ height, 0 ] );

  var xAxis = d3.svg.axis()
    .scale( x )
    .orient( "bottom" );

  var yAxis = d3.svg.axis()
    .scale( y )
    .orient( "left" )
    .ticks( 5 );

  var data = [];
  for( date_string in vislab.time_series ){
    if( date_string == "unknown" )
      continue;
    data.push( {
      date: vislab.time_series[ date_string ].date,
      value: vislab.time_series[ date_string ][ counts_type ]
    } );
  };

  var start_date = d3.min( data, function( d ){ return d.date; } );
  var end_date =  d3.max( data, function( d ){ return d.date; } );
  var margin_time = ( end_date.getTime() - start_date.getTime() ) /10;

  x.domain( [ new Date( start_date.getTime() - margin_time ), new Date( end_date.getTime() + margin_time ) ] );
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
    .on( "mouseover", function( d ){
      d3.select( ".text.time-" + d.date.getTime() )
        .style( "opacity", "1" );
    } )
    .on( "mouseout", function( d ){
      d3.select( ".text.time-" + d.date.getTime() )
        .style( "opacity", "0" );
    } )
    .transition().duration( 500 )
    .delay( function( d, i ){ return i * 10; } )
    .attr( "x", function( d ){ return x( d.date ) - 15; } )
    .attr( "y", function( d ){ return y( d.value.length ); } )
    .attr( "width", 10 )
    .attr( "height", function( d ){ return height - y( d.value.length ); } );

  d3_graph.selectAll( ".text" )
    .data( data )
    .enter().append( "text" )
    .attr( "class", function( d ){
      return "text time-" + d.date.getTime();
    } );

  d3_graph.selectAll( ".text" )
    .attr( "x", function( d ){ return x( d.date ); } )
    .attr( "y", function( d ){ return y( d.value.length ) - 10; } )
    .attr( "text-anchor", "middle" )
    .text( function( d ){ return d3.time.format( "%m/%d (%a)" )( d.date ); } );
};
