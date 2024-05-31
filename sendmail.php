<?php
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect the form data
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    // Specify the recipient email (the front desk)
    $recipient = "frontdesk@yourcompany.com";

    // Set the email subject
    $subject = "New contact from $name";

    // Build the email content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Message:\n$message\n";

    // Build the email headers
    $email_headers = "From: $name <$email>";

    // Send the email
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        // Redirect to a thank you page or display a success message
        header("Location: thank_you.html");
        exit;
    } else {
        // Redirect or display an error message
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
} else {
    // Not a POST request, redirect or display an error
    echo "There was a problem with your submission, please try again.";
}
?>