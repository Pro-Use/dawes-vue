const query = (status='listed') =>{
    let findMod = ''
    if (status != 'listed'){
        findMod = 'AndDrafts'
    }
    return JSON.stringify({
        "query":`page('news').children${findMod}`,
        "select": {
            "url": true,
            "title": true,
            "meta_title": true,
            "meta_description": true,
            "caption": true,
            "date": "page.date.toDate('d.m.Y')",
            "cover": {
                "query": "page.cover.toFile",
                "select": {
                    "height":true,
                    "width":true,
                    "slideType": true,
                    "video": "file.videoFile.toFile",
                    "orientation": true,
                    "autoplayVideo": "file.autoplayVideo.toBool()",
                    "url":true,
                    "alt":true,
                    "ratio":true,
                    "vimeoLink":true,
                    "srcset": "file.srcset('full')",
                    "resized": "file.resize(1500).url"
                }
            }
        }
    })
}

export default
{
	query
}