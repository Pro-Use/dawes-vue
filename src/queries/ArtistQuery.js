const query = (artist, status='listed') =>{
    let findMod = ''
    if (status != 'listed'){
        findMod = 'AndDrafts'
    }
    return JSON.stringify({
        "query":`page('artists').children${findMod}.find('${artist}')`,
        "select": {
            "id": true,
            "slug": true,
            "title": true,
            "meta_title": true,
            "meta_description": true,
            "caption": true,
            "display": true,
            "biography": true,
            "contact": true,
            "categories": "page.categories.split",
            "placeholder": true,
            "covers": {
                "query": "page.cover.toFiles",
                "select":{
                    "srcset": "file.srcset('full')"
                }
            },
            "albums":{
                "query": `page.children${findMod}.template('slideshow')`,
                "select": {
                    "categories": "page.categories.split",
                    "url": true,
                    "title": true,
                    "slug": true,
                    "caption": "page.caption.inline",
                    "cover": {
                        "query": "page.cover.toFile",
                        "select": {
                            "orientation": true,
                            "type": true,
                            "slideType": true,
                            "height": true,
                            "width": true,
                            "srcset": "file.srcset('half')",
                            "src": "file.videoFile.toFile",
                            "id":true,
                            "url":true,
                        }
                    },
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
            }
        }
    })
}

export default
{
	query
}