const apiKey = "AIzaSyDSwVSoW595O1GdRCL0fFksI3EvDQnI6wI";
const baseUrl = `https://www.googleapis.com/youtube/v3`;

const videoId = localStorage.getItem("videoId");
console.log(videoId)
const channelId = localStorage.getItem("channelId");
console.log(channelId)

async function fetchChannelDetails(){
    let url = `${baseUrl}/channels?key=${apiKey}&part=snippet,statistics&id=${channelId}`
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function fetchVideoDetails() {
    let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`
    const response = await fetch(url, {method:"GET"});
    const videoInfo = await response.json();
    console.log(videoInfo)
    const channelDetails = await fetchChannelDetails(channelId);
    console.log(channelDetails)
    addDetailstoDOM(videoInfo, channelDetails)
}

function addDetailstoDOM(videoInfo, channelDetails) {

    const container = document.createElement("div");
    container.id="container";

    container.innerHTML = `
    
      <div id="video">
        <iframe id="player" type="text/html" width="1240" height="290"
        src="https://www.youtube.com/embed/${videoId}"
        frameborder="0"></iframe>
      </div>
      
      <div class="statistics">
        <div class="left">${videoInfo.items[0].statistics.viewCount}</div>
        <div class="right">
            <div>
                <span class="material-icons">
                    thumb_up
                </span>
                <span>${videoInfo.items[0].statistics.likeCount}</span>
            </div>
            <div>
                <span class="material-icons">
                    thumb_down
            </span>
            <span>${"NA"}</span>
            </div>
            
        </div>

      </div>
      <div class="channel-container">
        <div class="left">
            <img src="${channelDetails.items[0].snippet.thumbnails.high.url}" alt="img1">
            <div>
                <span>${channelDetails.items[0].snippet.title}</span>
                <span style="color:#AAA">${channelDetails.items[0].statistics.subscriberCount}</span>
            </div>
        </div>
        <button class="right">Subscribe</button>
      </div>
     

    `
    document.body.appendChild(container);
}

fetchVideoDetails();




    // <div id="container">
    //   <div id="video">

    //   </div>
    //   <p>aacacadc</p>
    //   <div class="statistics">
    //     <div class="left">1111views. oct 7, 2021</div>
    //     <div class="right">
    //         <div>
    //             <span class="material-icons">
    //                 thumb_up
    //             </span>
    //             <span>1.7k</span>
    //         </div>
    //         <div>
    //             <span class="material-icons">
    //                 thumb_down
    //         </span>
    //         <span>1k</span>
    //         </div>
            
    //     </div>

    //   </div>
    //   <div class="channel-container">
    //     <div class="left">
    //         <img src="https://i.ytimg.com/vi/ER9SspLe4Hg/default.jpg" alt="img1">
    //         <div>
    //             <span>marcus</span>
    //             <span style="color:#AAA">1.2M subscribers</span>
    //         </div>
    //     </div>
    //     <button class="right">Subscribe</button>
    //   </div>
    // </div>