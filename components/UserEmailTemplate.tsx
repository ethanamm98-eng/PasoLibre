export const userEmailTemplate = ({
  firstName,
  loginUrl,
}: {
  firstName: string;
  loginUrl: string;
}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Approved</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin:0; padding:0;}
      .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px; text-align: center;}
      h1 { color: #1d4ed8; }
      p { color: #374151; font-size: 16px; }
      .btn { display: inline-block; padding: 12px 25px; margin-top: 20px; border-radius: 6px; background-color: #1d4ed8; color: #fff; font-weight: bold; text-decoration: none; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome, ${firstName}!</h1>
      <p>Your account has been approved by the administrator. You can now log in and start using your account.</p>
      <a href="${loginUrl}" class="btn">Log In</a>
    </div>
  </body>
  </html>
  `;
