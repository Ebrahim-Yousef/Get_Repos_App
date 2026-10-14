let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repos) => {
        reposData.innerHTML = "";
        repos.forEach((repo) => {
          let mainDiv = document.createElement("div"),
            repoName = document.createTextNode(repo.name);
          mainDiv.appendChild(repoName);

          let theUrl = document.createElement("a"),
            urlText = document.createTextNode("Visit");
          theUrl.appendChild(urlText);
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;
          theUrl.setAttribute("target", "_blanck");
          theUrl.className =
            "bg-pink-600 hover:bg-pink-700 max-[500px]:order-1";
          mainDiv.appendChild(theUrl);

          let starsSpan = document.createElement("span"),
            starsText = document.createTextNode(
              `Start ${repo.stargazers_count}`,
            );
          starsSpan.appendChild(starsText);
          mainDiv.appendChild(starsSpan);
          starsSpan.style.backgroundColor = "#009688";

          mainDiv.className = "repo-box";

          reposData.appendChild(mainDiv);
        });
      });
  }
}
