<!DOCTYPE html>
<html style="font-size: 16px;" lang="tr">
  <head>
    <style>      
      section {
        padding: 1%;
        padding-left: 3%;
        width: 100%;
        background-color: #D6D6D6;
      }
      body {
        display: flex;
        flex-direction: column;
        width: 100%;
      }
    </style>
    <meta name="keywords" content="Ramazan Eyüp Gültekin​">
    <title>Movies</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/3/w3.css">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Movies">
    <meta property="og:type" content="website">
  </head>
  <body style="min-height: 100vh">
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
        $conn = new mysqli("localhost", "root", "1234", "movie_db");
        if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM movies";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
          while($row = $result->fetch_assoc()) {
            echo '<div style="float: left; margin: 2%">
                    <img src="images/' . $row["m_id"] . '.jpg" style="margin-left: auto; margin-right: auto;" height="450" width="300">
                    <p style="text-align: center">' . $row["movie_name"] . ' (' . $row["release_date"] . ')</p>
                  </div>';
          }
        }
        $conn->close();
      ?>
      <div style="float: left; margin: 2%">
        <a href="/new_movie.php"><img src="images/add.png" style="margin-left: auto; margin-right: auto;" height="450" width="300"></a>
      </div>
    </section> 
  </body> 
  <footer style="background-color:#000">
    <div>
      <p style="text-align: center; color:#fff">Ramazan Eyüp Gültekin - 200401003</p>
    </div>
  </footer>
</html>