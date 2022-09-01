<?php
    session_start();
    
    if( !isset($_SESSION['login']) && $_SERVER["REQUEST_URI"] != '/login' ) {
?>
        <script>
                location.href= '/login';    
        </script>
<?php
    }    
?>