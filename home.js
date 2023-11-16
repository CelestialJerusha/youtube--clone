// const apiKey = "AIzaSyDSwVSoW595O1GdRCL0fFksI3EvDQnI6wI";
const apiKey = "AIzaSyBBI_FA_9qRLYGY6gWAoAOfR6NUFqAzXX4"
const baseUrl = `https://www.googleapis.com/youtube/v3`;

/**
 * @param {String} searchString
 *  */ 

const searchButton = document.getElementById("search");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("container");

async function getVideos(){
    let url = `${baseUrl}/search?key=${apiKey}&part=snippet&maxResults=30`
    console.log(url);
    const response = await fetch(url, {method:"GET"});
    const result = await response.json();
    console.log(result.items);

    addDataToUI(result.items);
}
getVideos()

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
    console.log(url);
    const response = await fetch(url, {method:"GET"});
    const result = await response.json();
    console.log(result);

    addDataToUI(result.items);
}


function addDataToUI(videosList){
    container.innerHTML = '';
    videosList.forEach((video) => {
        const {snippet} = video;
        const videoElement = document.createElement("div");
        videoElement.className = "video";
        // console.log(video.id.videoId)
        videoElement.innerHTML = `
        <div onclick="openVideo('${video.id.videoId}','${snippet.channelId}')">
            <img src="${snippet.thumbnails.high.url}">
                <p>${snippet.title}</p>
                <b>${snippet.channelTitle}</b>
        </div>
        `;
        container.appendChild(videoElement)
    })

}

function openVideo(videoId,channelId){
    localStorage.setItem("videoId", videoId);
    localStorage.setItem("channelId", channelId);
    window.open("videoDetails.html");
}