<?php
require_once 'config/database.php';

try {
    $database = new Database();
    $pdo = $database->connect();
    
    // Check if admin user already exists
    $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = ?");
    $stmt->execute(['admin@primenews.com']);
    $count = $stmt->fetchColumn();
    
    if ($count > 0) {
        echo "Admin user already exists!<br>";
        
        // Update the password
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->execute([$hashedPassword, 'admin@primenews.com']);
        echo "Admin password updated to: admin123<br>";
    } else {
        // Create new admin user
        $hashedPassword = password_hash('admin123', PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->execute(['admin', 'admin@primenews.com', $hashedPassword, 'admin']);
        echo "Admin user created successfully!<br>";
    }
    
    echo "<br>Login details:<br>";
    echo "Email: admin@primenews.com<br>";
    echo "Password: admin123<br>";
    echo "<br><a href='admin.html'>Go to Admin Panel</a>";
    
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>