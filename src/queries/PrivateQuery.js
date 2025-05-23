const query = (slug, status='listed') =>{
    let findMod = ''
    if (status != 'listed'){
        findMod = 'AndDrafts'
    }
    return JSON.stringify({
        "query":`site.find('private-pages').children${findMod}.find('${slug}')`,
        "select": {
            "id": true,
            "slug": true,
            "title": true,
            "caption": true,
            "password": true,
            "slides": {
                "query":"page.gallery.toFiles",
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