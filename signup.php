<?php
session_start();
include("connection.php");
$data3 = "";
if (isset($_POST['sign-btn'])) {
    $user1 = trim($_POST['user']);
    $email = trim($_POST['email']);
    $password_1 = trim($_POST['password_1']);

    // Check if username is valid and starts with a letter
    if (!empty($user1) && !is_numeric($user1) && preg_match('/^[a-zA-Z]/', $user1)) {
        
        // Check if email and password are not empty
        if (!empty($email) && !empty($password_1)) {
            
            // Check if the email is already registered
            $query = "SELECT * FROM users WHERE email = '$email' OR user_name = '$user1' LIMIT 1";
            $result = mysqli_query($con, $query);

            if ($result && mysqli_num_rows($result) == 0) {
                
            

                // Insert user into the database
                $sql = "INSERT INTO users (email, password, user_name) VALUES ('$email', '$password_1', '$user1')";
                mysqli_query($con, $sql);
 
            } else {
                $data3 = "Sorry, this email is already registered.";
            }
        } else {
            $data3 = "Please enter a valid email and password.";
        }
    } else {
        $data3 = "Username must start with a letter and contain only letters.";
    }
}

if (isset($_POST['log-btn'])) {

    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Check if email and password are not empty
    if (!empty($email) && !empty($password)) {

        // Prepare and execute a query to check if the user exists
        $query = "SELECT * FROM users WHERE email = ? OR user_name = ? LIMIT 1";
        $stmt = mysqli_prepare($con, $query);
        mysqli_stmt_bind_param($stmt, 'ss', $email, $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        if ($result && mysqli_num_rows($result) > 0) {
            $user_data = mysqli_fetch_assoc($result);

            // Use password_verify to compare hashed passwords if applicable
            if ($user_data) {
                $_SESSION['id'] = $user_data['user_id'];
                $_SESSION['email'] = $user_data['email'];

                // Redirect on successful login
                header("Location: home.php");
                exit;
            } else {
                $data3 = 'Wrong email or password.';
            }
        } else {
            $data3 = 'User Not Registered.';
        }
    } else {
        $data3 = 'Email or Password is empty.';
    }
}

?>


<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Login</title>
		<link
			rel="stylesheet"
			href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

		<link rel="stylesheet" href="singup.css" />
		<script src="sign.js"></script>
	</head>
	<body>
		<h2>Auti Predict</h2>
		<h6 style="color: red;"><?php echo $data3;?></h6>
		<div class="container" id="container">
			<div class="form-container sign-up-container">
				<form method="post" onsubmit= "return validateForm()">
					<h1>Create Account</h1>
					
					<span>or use your email for registration</span>
					<input type="text" name = "user" placeholder="Name" />
					<input type="email" name="email" placeholder="Email" />
					<input type="password" name="password_1" placeholder="Password" />
					<button type="submit" name="sign-btn">Sign Up</button>
				</form>
			</div>
			<div class="form-container sign-in-container">
				<form method="post" onsubmit="return validateSignInForm()">
					<h1>Sign in</h1>
					
					<span>or use your account</span>
					<input type="text" name = "email"placeholder="Email or username" />
					<input type="password" name = "password"placeholder="Password" />
					<!-- <a href="#">Forgot your password?</a> -->
					 
					<button type="submit" name="log-btn">Sign In</button>
				</form>
			</div>
			<div class="overlay-container">
				<div class="overlay">
					<div class="overlay-panel overlay-left">
						<h1>Welcome Back!</h1>
						<p>
							To keep connected with us please login with your personal info
						</p>
						<button class="ghost" id="signIn">Sign In</button>
					</div>
					<div class="overlay-panel overlay-right">
						<h1>Hello, Friend!</h1>
						<p>Enter your personal details and start journey with us</p>
						<button class="ghost" id="signUp">Sign Up</button>
					</div>
				</div>
			</div>
		</div>
		<script>
			const signUpButton = document.getElementById('signUp');
			const signInButton = document.getElementById('signIn');
			const container = document.getElementById('container');

			signUpButton.addEventListener('click', () => {
				container.classList.add('right-panel-active');
			});

			signInButton.addEventListener('click', () => {
				container.classList.remove('right-panel-active');
			});
		</script>
	</body>
</html>
