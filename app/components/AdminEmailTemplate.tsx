export const adminEmailTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  signupDate,
  approveUrl,
  denyUrl,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  signupDate: string;
  approveUrl: string;
  denyUrl: string;
}) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New User Signup</title>
    <style>
      body { font-family: Arial, sans-serif; background-color: #f4f6f8; margin:0; padding:0;}
      .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 10px;}
      h1 { color: #1d4ed8; }
      p { color: #374151; }
      .btn { display: inline-block; padding: 10px 20px; margin: 5px 0; border-radius: 6px; text-decoration: none; color: #fff; font-weight: bold;}
      .approve { background-color: #10b981; }
      .deny { background-color: #ef4444; }
      table { width: 100%; border-collapse: collapse; margin-top: 10px; }
      th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e5e7eb; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>New User Signup</h1>
      <p>A new user has registered and requires your approval:</p>
      <table>
        <tr><th>First Name</th><td>${firstName}</td></tr>
        <tr><th>Last Name</th><td>${lastName}</td></tr>
        <tr><th>Email</th><td>${email}</td></tr>
        <tr><th>Phone</th><td>${phone}</td></tr>
        <tr><th>Signed Up At</th><td>${signupDate}</td></tr>
      </table>
  
      <p>Approve or deny the account by clicking one of the buttons below:</p>
      <a href="${approveUrl}" class="btn approve">Approve</a>
      <a href="${denyUrl}" class="btn deny">Deny</a>
    </div>
  </body>
  </html>
  `;
