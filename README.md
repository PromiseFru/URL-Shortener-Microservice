## URL-Shortener-Microservice

1. I can POST a URL to [project_url]/api/shorturl/new and I will receive a shortened URL in the JSON response.
Example : {"original_url":"www.google.com","short_url":1}
2. If I pass an invalid URL that doesn't follow the http(s)://www.example.com(/more/routes) format, the JSON response will contain an error like {"error":"invalid URL"}
HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.
3. When I visit the shortened URL, it will redirect me to my original link.

## Problem Explanation
The core features to complete this exercise are the creation and retrieval of URLs from the Database.

### Creating Short URL
* Connect to your database instance.
> Note: It’s important to check your Mongoose connection status before dive into the problem, just to check if everything is okay with your database configuration. This should help: mongoose.connection.readyState
* Receive a POST request containing an URL to be saved on Database.
* Check if it is a valid URL using dns.lookup(url, callback)
    * Remember you need to import the dns module with required.
* Generate some kind of identifier to save your original URL in database.
    * A SHA-1 hash could be used, or even the object ID when saving the element.
    * There is a bunch of samples over the internet how to generate some kind of identifier, try to explore it or create your own.
    * An example of how this should look like: {'url': www.freecodecamp.org, 'hash': 'ef49fa8b4'}

### Retrieving Short URL
* Receive a GET request containing an identifier used to find a stored URL.
* Try to find one URL saved for this identifier
* Redirect user to URL.
Note: The res.redirect(url) function need that the given url, has a defined protocol (http://, https://), or it will just concatenate it as an extension of your current domain. eg: Good URL: https://www.freecodecamp.org, Bad URL: www.freecodecamp.org. Try it out.

* Remember to handle error situations with proper response like, `res.json({“error”:“invalid URL”});
