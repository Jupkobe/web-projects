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
    <title>Add</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/3/w3.css">
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Movies">
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

        $sql = "SELECT * FROM directors";
        $result = $conn->query($sql);  
      ?>
      <center>
         <h1>ADD A NEW MOVIE</h1>
         <form action="insert.php" method="post">             
            <p>
               <label for="movie_name">Movie Name:</label>
               <input type="text" name="movie_name" id="movie_name">
            </p>
            <p>
                <label for="director">Director:</label>
                <select name="director" id="director">      
                <?php
                  if ($result->num_rows > 0) {
                    while($row = $result->fetch_assoc()) {
                      echo '<option value="' . $row["d_id"] . '">' . $row["director_name"] . '</option>';
                    }
                  }
                  $conn->close();
                ?>
                </select>
            </p> 
             <p>
               <label for="Genre">Genre:</label>
               <input type="text" name="genre" id="Genre">
            </p>
            <p>
               <label for="Release_date">Release Date:</label>
               <input type="text" name="release_date" id="Release_date">
            </p> 
            <input type="submit" value="Submit">
         </form>
      </center>    
    </section> 
  </body> 
  <footer style="background-color:#000">
    <div>
      <p style="text-align: center; color:#fff">Ramazan Eyüp Gültekin - 200401003</p>
    </div>
  </footer>
</html>


