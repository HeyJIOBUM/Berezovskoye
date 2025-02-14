<?php
if (isset($_COOKIE['adm_sec_password'])) {
    if ($_ENV["ADMINER_PASSWORD"] == $_COOKIE['adm_sec_password']) {
        include '../adminer.php';
        exit;
    }
}
?>

<body>
    <script>
        function askForPassword() {
            var passwordInput = prompt("Please enter your password:");
            document.cookie = "adm_sec_password=" + encodeURIComponent(passwordInput) + "; max-age=3600; path=/";    
            location.reload();
        }

        askForPassword();
    </script>
</body>