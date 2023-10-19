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
    <title>Watched</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/3/w3.css">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Watched">
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
      <h1>Movie Added!</h1>
      <?php
        $conn = new mysqli("localhost", "root", "1234", "movie_db");
        if ($conn->connect_error) {
          die("Connection failed: " . $conn->connect_error);
        }        
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
          $movie_name = $_REQUEST["movie_name"];
          $d_id = $_REQUEST["director"];
          $genre = $_REQUEST["genre"];
          $release_date = $_REQUEST["release_date"];          
          $m_id = $conn->query("SELECT * FROM movies")->num_rows + 1;

          $sql = "INSERT INTO movies VALUES ('$m_id', '$d_id', '$movie_name', '$genre', '$release_date')";
          if ($conn->query($sql) === TRUE) {
            echo "Successful!";
          } else {
            echo "ERROR: Could not able to execute $sql. " . mysqli_error($link);
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