<?php
require_once 'api/auth.php';

echo "<h2>Authentication Test</h2>";

try {
    $auth = new Auth();
    
    // Test login
    $result = $auth->login('admin@primenews.com', 'admin123');
    echo "<h3>Login Test:</h3>";
    echo "<pre>" . json_encode($result, JSON_PRETTY_PRINT) . "</pre>";
    
    if ($result['success']) {
        $token = $result['token'];
        echo "<h3>Token Test:</h3>";
        echo "Token: " . $token . "<br>";
        
        // Test token verification
        $user = $auth->verifyToken($token);
        echo "<h3>Token Verification:</h3>";
        echo "<pre>" . json_encode($user, JSON_PRETTY_PRINT) . "</pre>";
    }
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>