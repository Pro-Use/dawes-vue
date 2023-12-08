const query = () =>{
    return JSON.stringify({
    "query":"site",
    "select": {
        "title": true,
        "meta_title": true,
        "meta_description": true,
        "children": {
            "query": "site.children",
            "select": {
                "slug": true,
                "title": true,
                "meta_title": true,
                "meta_description": true
            }
        },
        "artists": {
            "query": "page('artists').children",
            "select": {
                "slug": true,
                "title": true,
                "meta_title": true,
                "meta_description": true
            }
        }
    }
})
}

export default
{
	query
}