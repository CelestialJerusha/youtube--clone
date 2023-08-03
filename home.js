const apiKey = "AIzaSyDSwVSoW595O1GdRCL0fFksI3EvDQnI6wI";
const baseUrl = `https://www.googleapis.com/youtube/v3`;

/**
 * @param {String} searchString
 *  */ 

const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");

searchButton.addEventListener("click",() => {
    let searchString = searchInput.value.trim();
    //console.log(searchString);
    if(searchString ===""){
        return ;
    }
    getSearchResult(searchString);
})

async function getSearchResult(searchString){
    let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
    //console.log(url);
    const response = await fetch(url, {method:"GET"});
    const result = await response.json();
    //console.log(result);

    addDataToUI(result.items);
}

function addDataToUI(videosList){
    videosList.forEach((video) => {
        const {snippet} = video;

        const videoElement = document.createElement("div");
        videoElement.className = "video";

        videoElement.innerHTML = `
        <img src="${snippet.thumbnails.high.url}">
            <p>${snippet.title}</p>
            <b>${snippet.channelTitle}</b>
        `;
        container.appendChild(videoElement)
    })

}