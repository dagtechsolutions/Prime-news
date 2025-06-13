<?php
require_once 'config/database.php';

echo "<h2>Reset Admin User</h2>";

try {
    $database = new Database();
    $pdo = $database->connect();
    
    // Delete existing admin
    $stmt = $pdo->prepare("DELETE FROM users WHERE email = ?");
    $stmt->execute(['admin@primenews.com']);
    echo "Deleted existing admin user<br>";
    
    // Create new admin with proper password hash
    $email = 'admin@primenews.com';
    $password = 'admin123';
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role, is_active) VALUES (?, ?, ?, ?, ?)");
    $success = $stmt->execute(['admin', $email, $hashedPassword, 'admin', 1]);
    
    if ($success) {
        echo "<div style='color: green;'>";
        echo "<h3>✓ Admin user created successfully!</h3>";
        echo "Email: admin@primenews.com<br>";
        echo "Password: admin123<br>";
        echo "Hash: " . $hashedPassword . "<br>";
        echo "</div>";
        
        // Test password verification
        if (password_verify($password, $hashedPassword)) {
            echo "<div style='color: green;'>✓ Password verification test: PASSED</div>";
        } else {
            echo "<div style='color: red;'>✗ Password verification test: FAILED</div>";
        }
        
    } else {
        echo "<div style='color: red;'>Failed to create admin user</div>";
    }
    
    echo "<br><br>";
    echo "<a href='api/debug.php' style='margin-right: 20px;'>Test Database</a>";
    echo "<a href='admin.html'>Go to Admin Panel</a>";
    
} catch (Exception $e) {
    echo "<div style='color: red;'>Error: " . $e->getMessage() . "</div>";
}
?>