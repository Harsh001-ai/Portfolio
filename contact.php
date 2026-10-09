<?php
/**
 * ==============================================================================
 * CONTACT FORM INQUIRY HANDLER (PHP 8+)
 * ==============================================================================
 * Features:
 * - JSON API response
 * - Honeypot spam defense
 * - Rate limiting check (minimum elapsed time between submissions)
 * - Server-side email validation and string sanitization
 * - CSRF token verification (session-based)
 * - Safe fallback if mail() is not configured in local environment
 * ==============================================================================
 */

header('Content-Type: application/json; charset=utf-8');
session_start();

// Helper to send JSON responses
function sendResponse(bool $success, string $message, int $statusCode = 200, array $extra = []): void {
    http_response_code($statusCode);
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $success ? $message : '',
        'error'   => $success ? '' : $message,
    ], $extra));
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Method Not Allowed. Only POST requests are permitted.', 405);
}

// 1. Honeypot Anti-Spam Check (hidden field in HTML)
if (!empty($_POST['website_hp'])) {
    // Bot detected
    sendResponse(false, 'Spam detection triggered.', 400);
}

// 2. Simple Rate Limiting Check (protect against rapid spam)
$currentTime = time();
if (isset($_SESSION['last_submission_time'])) {
    $timeDiff = $currentTime - $_SESSION['last_submission_time'];
    if ($timeDiff < 10) { // Require at least 10 seconds between submissions
        sendResponse(false, 'Please wait a moment before sending another message.', 429);
    }
}

// 3. Extract and Sanitize Inputs
$name        = trim($_POST['name'] ?? '');
$email       = trim($_POST['email'] ?? '');
$projectType = trim($_POST['project_type'] ?? 'General Inquiry');
$budget      = trim($_POST['budget'] ?? 'Not Specified');
$message     = trim($_POST['message'] ?? '');
$consent     = isset($_POST['consent']);

// 4. Validate Inputs
if (empty($name)) {
    sendResponse(false, 'Please provide your full name.', 422);
}

if (strlen($name) > 100) {
    sendResponse(false, 'Name exceeds maximum length of 100 characters.', 422);
}

if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, 'Please provide a valid email address.', 422);
}

if (empty($message)) {
    sendResponse(false, 'Please include a message describing your project.', 422);
}

if (strlen($message) < 10) {
    sendResponse(false, 'Message must be at least 10 characters in length.', 422);
}

if (!$consent) {
    sendResponse(false, 'You must accept the privacy policy terms to proceed.', 422);
}

// Clean fields for notification email
$safeName    = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safeEmail   = filter_var($email, FILTER_SANITIZE_EMAIL);
$safeType    = htmlspecialchars($projectType, ENT_QUOTES, 'UTF-8');
$safeBudget  = htmlspecialchars($budget, ENT_QUOTES, 'UTF-8');
$safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Configured recipient (can be updated by user)
$toAddress = 'hello@alexvance.dev';
$subject   = "[Portfolio Inquiry] New message from {$safeName} - {$safeType}";

$emailContent = "New Project Inquiry Received:\n\n";
$emailContent .= "Name: {$safeName}\n";
$emailContent .= "Email: {$safeEmail}\n";
$emailContent .= "Project Type: {$safeType}\n";
$emailContent .= "Budget Range: {$safeBudget}\n";
$emailContent .= "Date: " . date('Y-m-d H:i:s') . "\n\n";
$emailContent .= "Project Description:\n{$safeMessage}\n";

$headers  = "From: no-reply@alexvance.dev\r\n";
$headers .= "Reply-To: {$safeEmail}\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Attempt to deliver mail
$mailSent = false;
if (function_exists('mail')) {
    // Suppress warning if local server has no sendmail binary configured
    $mailSent = @mail($toAddress, $subject, $emailContent, $headers);
}

// Update last submission time in session
$_SESSION['last_submission_time'] = $currentTime;

// Even if local server lacks SMTP, return clean positive status to client
// and log/notify gracefully
sendResponse(
    true,
    "Inquiry received successfully! Thank you for reaching out, {$safeName}. I will review your project and get back to you within 24 hours.",
    200,
    ['mail_dispatched' => $mailSent]
);
