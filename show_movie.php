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
    <title></title>
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
      <?php
        $conn = new mysqli("localhost", "root", "1234", "movie_db");
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        $sql = "SELECT * FROM movies";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              echo '<div style="display: grid; grid-template-columns: 100px auto; background-color: #C6C6C6; float: left; padding-left: 5px; margin-bottom: 1%; width: 100%">
                      <img style="margin: 5px" src="users/' . $row["u_id"] . '.png" height="75" width="75">
                      <div>
                        <h1 style="text-align: left; margin-top: 10px">'.$row["movie_name"].'</h1>
                        <p style="text-align: left; margin-top: 10px">Director: '.$row["d_id"].'</p>
                        <p style="text-align: left; margin-top: 10px"></p>
                        <p style="text-align: left; margin-top: 10px"></p>
                      </div>
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