const query = (artist, status='listed') =>{
    let findMod = ''
    if (status != 'listed'){
        findMod = 'AndDrafts'
    }
    return JSON.stringify({
        "query":`page('artists').children${findMod}.find('${artist}')`,
        "select": {
            "slug": true,
            "title": true,
            "social": true,
            "text": {
                "query": "page.text.toBlocks",
                "select": {
                    "type": "block.type",
                    "text": "block.content.text",
                    "image": {
                        "query":"block.content.image.toFile",
                            "select": {
                                "height":true,
                                "width":true,
                                "url":true,
                                "alt":true,
                                "ratio":true,
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