async function findUser(e) {
    e.preventDefault();

    const inputElem = document.querySelector("input");
    const username = inputElem.value;

    const userData = await fetchUser(username);

    displayUserData(await userData);
}


async function fetchUser (username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);

        if (response.status == "404") throw new Error("User Not Found");
        if (!response.ok) throw new Error("Something went wrong");

        showElem(document.querySelector("#result"));
        addBorderBottom(document.querySelector("#inputs"));

        return response.json();

    } catch (err) {        
        hideElem(document.querySelector("#result"));
        removeBorderBottom(document.querySelector("#inputs"));
        console.log(err);
    }
}


function displayUserData(userData) {
    displayAvatar(userData);
    displayUserInfo(userData);

    if (+userData.public_repos > 0) fetchRepos(userData.repos_url);
    else hideElem(document.querySelector("#repos"));
}


function displayAvatar (userData) {
    const imgElem = document.querySelector("img");

    imgElem.src = `${userData.avatar_url}`;
    imgElem.alt = `${userData.login}'s profile picture.`;
}


function displayUserInfo (userData) {
    const divElem = document.querySelector("#user-data");

    const name = !userData.name ? " " : " aka. " + userData.name;
    const location = !userData.location ? "<br>" : userData.location;

    divElem.innerHTML = `
    <span>
        <h2><a href="${userData.profile_url}">${userData.login}</a></h2><p>${name}</p>
        <h5>${location}</h5>
    </span>
    <span>
        <h4>Member since: ${userData.created_at.substring(0, 7)}</h4>
        <h4>Repo count: ${userData.public_repos}</h4>
    </span>`;
}


async function fetchRepos(repos_url) {
    try {
        let response = await fetch(repos_url);

        if (!response.ok) throw new Error("Something went wrong");

        addBorderBottom(document.querySelector("#user"));

        displayRepos(await response.json());

    } catch (err) {
        console.log(err);
    }
}


function displayRepos(repos) {
    const reposElem = document.querySelector("#repos");
    reposElem.innerHTML = "<span><h2>Repos</h2></span>";
    reposElem.style = "";

    repos.forEach((repo) => {
        let div = document.createElement("div");
        div.className = "repo";
        let desc;

        if (!repo.description) desc = "";
        else desc = repo.description.length > 25 ? repo.description.substring(0, 22) + "..." : repo.description;

        div.innerHTML = `
        <span>
            <h4>${repo.name}</h4>
            <p>${desc}</p>
        </span>
        <a href="${repo.html_url}"><i class="fa-solid fa-link"></i></a>`;

        reposElem.append(div);
    });
}


function addBorderBottom (elem) {
    elem.classList.add("border-bottom");
}

function removeBorderBottom (elem) {
    elem.classList.remove("border-bottom");
}

function hideElem (elem) {
    elem.style = "display: none";
}

function showElem (elem) {
    elem.style = "";
}

function init() {
    document.querySelector("form").addEventListener("submit", findUser);
    document.querySelector("input").addEventListener("onkeydown", (e) => findUser(e));
}

init();

