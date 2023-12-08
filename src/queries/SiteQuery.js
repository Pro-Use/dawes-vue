const query = (status='listed') =>{
    return JSON.stringify({
        "query":"site",
        "select": {
            "url": true,
            "title": true,
            "meta_title": true,
            "meta_description": true,
            "news_on": "site.news_on.toBool",
            "news_text": "site.news_text.upper()",
            "contact": {
                "query": "site.children.find('contact')",
                "select": {
                    "contact": true,
                    "id": true
                }
            },
            "children": {
                "query": `site.children.${status}`,
                "select": {
                    "title": true,
                    "id": true
                }
            },
            "artists": {
                "query":`page('artists').children.${status}`,
                "select": {
                    "id": true,
                    "slug": true,
                    "title": true,
                    "caption": true,
                    "display": true,
                    "biography": true,
                    "contact": true,
                    "categories": true,
                    "placeholder": true,
                    "covers": {
                        "query": "page.cover.toFiles",
                        "select":{
                            "srcset": "file.srcset('full')"
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