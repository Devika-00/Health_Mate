export const doctorVerificationRejectedEmailPage = (name: string, reason: string) => {
    return `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          /* Add your custom styles here */
          /* Example styles */
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
          }
      
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
      
          h1, h2 {
            color: #333;
            margin-bottom: 20px;
          }
      
          p {
            color: #666;
            margin-bottom: 10px;
          }
      
          /* Bolden the reason text */
          .reason {
            font-weight: bold;
          }
      
          .footer {
            margin-top: 30px;
            font-size: 14px;
            color: #888;
          }
      
          .footer a {
            color: #007bff;
            text-decoration: none;
          }
      
          @media screen and (max-width: 600px) {
            .container {
              padding: 10px;
            }
          }
        </style>
      </head>
      <body>
      
        <div class="container">
          <h1>Doctor Verification Rejected</h1>
          <p>Dear ${name},</p>
          <p>We regret to inform you that your verification request has been rejected due to the following reason:</p>
          <!-- Apply the reason class to bolden the reason text -->
          <p class="reason">${reason}</p>
          <p>If you have any questions or concerns, please feel free to contact us.</p>
          <div class="footer">
            <p>Best regards,<br>Health Mate Team</p>
            <p><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
          </div>
        </div>    
      </body>
      </html>
      `;
  };
  