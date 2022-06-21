async function getVideoFileFromVimeo(video) {

        if(!/^https?:\/\//i.test(url)){
          url = "http://" + url
        }
        let parsed = new URL(video)
        vimeoID = parsed.pathname.split('/')[1]
        console.log(vimeoID);


const videoFile = await axios.get(
    'https://player.vimeo.com/video/${vimeoID}/config')
    .then(res => this.setState({
        thumbnailUrl: res.video.thumbs['640'],
         videoUrl: res.request.files.hls.cdns[res.request.files.hls.default_cdn].url,
         video: res.video,
    }));   
    console.log(videoFile)
    return module.exports.getVideoFileFromVimeo(video);
}