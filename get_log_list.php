<?php
$file_paths = [];

foreach( glob( 'log/*.txt' ) as $file ){
  if( is_file( $file ) ){
    $file_paths[] = $file;
  }
}

echo json_encode( $file_paths );
?>
