<?php
header('Content-Type: application/json');

// Database configuration
define('DB_HOST', 'localhost');
define('DB_USER', 'ivrveghy_ashik');
define('DB_PASS', 'ashikASHIK');
define('DB_NAME', 'ivrveghy_ashik');
define('DB_TABLE', 'form_submissions');

$response = [
    'success' => false,
    'message' => '',
    'errors' => []
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanitize inputs
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

    // Validation
    if (empty($name)) $response['errors']['name'] = 'Name is required';
    if (empty($email)) {
        $response['errors']['email'] = 'Email is required';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $response['errors']['email'] = 'Invalid email format';
    }
    if (empty($message)) $response['errors']['message'] = 'Message is required';

    if (empty($response['errors'])) {
        try {
            // Create database connection
            $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
            
            // Check connection
            if ($conn->connect_error) {
                throw new Exception("Database connection failed: " . $conn->connect_error);
            }

            // Prepare and bind
            $stmt = $conn->prepare("INSERT INTO ".DB_TABLE." (name, email, message, submitted_at) VALUES (?, ?, ?, NOW())");
            if (!$stmt) {
                throw new Exception("Prepare failed: " . $conn->error);
            }
            
            $stmt->bind_param("sss", $name, $email, $message);
            
            // Execute
            if ($stmt->execute()) {
                $response['success'] = true;
                $response['message'] = 'Thank you! Your message has been submitted.';
                
                // Optional: Send email notification
                $this->sendNotificationEmail($name, $email, $message);
            } else {
                throw new Exception("Execution failed: " . $stmt->error);
            }

            $stmt->close();
            $conn->close();
            
        } catch (Exception $e) {
            $response['message'] = 'Database error: ' . $e->getMessage();
            error_log($e->getMessage());
        }
    } else {
        $response['message'] = 'Please correct the errors below.';
    }
} else {
    $response['message'] = 'Invalid request method.';
}

echo json_encode($response);

// Optional email notification function
function sendNotificationEmail($name, $email, $message) {
    $to = 'admin@example.com';
    $subject = 'New Form Submission';
    $headers = "From: $email\r\nReply-To: $email";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    
    mail($to, $subject, $body, $headers);
}
?>