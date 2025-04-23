# Helix Craftworks Mail Handler

This is a Node.js Express backend for handling contact form submissions and sending emails using Nodemailer.

## Features
- Exposes a POST `/contact` endpoint
- Accepts `name`, `email`, `subject`, and `message` in the request body
- Sends emails to info@helixcraftworks.com
- Returns JSON success/failure

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Set environment variables for your SMTP server:
   - `SMTP_HOST`
   - `SMTP_PORT`
   - `SMTP_USER`
   - `SMTP_PASS`

3. Start the server:
   ```sh
   node index.js
   ```

## Example Request
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Request",
  "message": "I'd like a quote for a custom bookshelf."
}
```

## Notes
- You must use real SMTP credentials for email sending to work.
- This project does not include a frontend.
