<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the submitted flag value
    $flag = $_POST['flag'] ?? '';
    $flag = escapeshellarg($flag);
    $output = shell_exec("truncate -s 0 ../flag.txt");
    $output = shell_exec("echo $flag > ../flag.txt");  
    header("Location: /");
    exit();
} else {
    // Display the form if no POST request
    ?>
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baylor University - PATH to Research Excellence</title>
  <style>
    :root {
      --baylor-green: #154734;
      --baylor-gold: #FFC629;
      --light-gold: rgba(255, 198, 41, 0.15);
      --white: #ffffff;
      --shadow: rgba(0, 0, 0, 0.1);
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    body {
      background-color: var(--baylor-green);
      background-image: linear-gradient(135deg, rgba(21, 71, 52, 0.98) 0%, rgba(21, 71, 52, 0.9) 100%), url('/api/placeholder/1600/900');
      background-size: cover;
      background-position: center;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 20px;
    }

    input[type="text"] {
      width: 100%;
      max-width: 400px;
      padding: 10px;
      border: 1px solid var(--baylor-gold);
      border-radius: 5px;
      margin-bottom: 20px;
    }

    button {
      padding: 10px 20px;
      background-color: var(--baylor-gold);
      color: var(--baylor-green);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
    }

    button:hover {
      background-color: #e5b800;
    }
    
    .header {
      width: 100%;
      max-width: 1200px;
      text-align: center;
      padding: 40px 20px;
      position: relative;
    }
    
    .university-logo {
      width: 80px;
      height: 80px;
      background-color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px auto;
      box-shadow: 0 6px 15px var(--shadow);
      overflow: hidden;
    }
    
    .main-title {
      color: var(--baylor-gold);
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 15px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
    
    .subtitle {
      color: var(--baylor-gold);
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 25px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="university-logo">
      <img src="../logo.png" alt="Baylor University Logo" style="max-width: 60px; max-height: 60px;" />
    </div>
    <h1 class="main-title">You Found Me!</h1>
    <h2 class="subtitle">Welcome to The Dancing Bear</h2>
    <form class="input-container" action="" method="POST">
    <form method="POST" action="">
                <input type="text" name="flag" placeholder="Enter your flag" required>
                <br>
                <button type="submit">Submit</button>
            </form>
    </form>
  </div>
</body>
</html>
    <?php
}
?>