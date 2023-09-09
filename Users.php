<!DOCTYPE html>
<html style="font-size: 16px;" lang="tr">
  <head>
    <style>      
      section {
        padding: 1%;
        padding-left: 3%;
        padding-right: 3%;
        width: 100%;
        background-color: #D6D6D6;
      }
      body {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
      .watchlist {
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto;
      }
    </style>
    <meta name="keywords" content="Ramazan Eyüp Gültekin​">
    <title>Users</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/3/w3.css">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Users">
    <meta property="og:type" content="website">
  </head>
  <body>
    <header>        
      <nav class="w3-bar w3-black">
        <h1 style="float: left; margin-left: 2%;" >Movie DB</h1>
        <div style="float: right; margin-right: 2%; margin-top: 1%;">
          <a href="/movies.php" class="w3-button w3-bar-item">Movies</a>
          <a href="/watched.php" class="w3-button w3-bar-item">Watched</a>
          <a href="/users.php" class="w3-button w3-bar-item">Users</a>
          <a href="/directors.php" class="w3-button w3-bar-item">Directors</a>
        </div>
      </nav>
    </header>
    <section>
      <?php
        $servername = "localhost";
        $username = "root";
        $password = "1234";
        $dbname = "movie_db";

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);
        // Check connection
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM movie_db.users";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              echo '<div style="float: left; margin: 2%">
                        <img src="users/' . $row["u_id"] . '.png" style="margin-left: auto; margin-right: auto;" height="150" width="150">
                        <p style="text-align: center">' . $row["user_name"] . ' (' .$row["age"] . ')</p>
                    </div>';
            }
        }
        $conn->close();
      ?>
    </section> 
  </body> 
  <footer style="background-color:#000">
    <div>
      <p style="text-align: center; color:#fff">Ramazan Eyüp Gültekin - 200401003</p>
    </div>
  </footer>
</html>