# Github_Visualizer

Visualising Github accounts' data pulled using documents from **[GitHub REST API](https://docs.github.com/en/rest)** with **[Chart.js](https://www.chartjs.org/)** library.

## To Note

Languages used:
* JavaScript
* HTML
* CSS

Use of Github Authentication token is recommended for less restricted access. It SHOULD NOT be pushed onto Github for other users to see. 
Place the token in data.js --> getRequest().  

## Running the Project

To run the project in your machine,  **Docker** should be installed. 

Create a directory on your machine
```mkdir <name>```\
Clone the repository onto the directory created.

Pull nginx image \
```docker run --name website -v %cd%:/usr/share/nginx/html -d -p 8080:80 nginx``` (Windows)\
```docker run --name website -v $(pwd):/usr/share/nginx/html -d -p 8080:80 nginx``` (Linux)\
(eg. name=website)

To visit the webpage: ```localhost:8080```

<ins>OR</ins>

Visit my website to access the project online
**[GitHub Visualizer](https://nadineel.github.io/github-visualiser.html)**

## Demo


## Reflection

This project uses JavaScript for its backend and HTML and CSS for the front end. I chose these languages because I have had little experience of them and I wanted to take the opportunity to learn how to use it more. \
On the otherhand, GitHub API Docs and Chart.js are two components of the project that I was not aware of beforehand. It took me awhile to get started because I was struggling to decide what I want to showcase and how I should implement.

Overall, this assignment definitely improved my skills as a programmer and coding it has been great and satisfying especially when things started going my way. At the beginning, I constantly forget to commit my changes in the repository but as I kept working on it, I commit changes every so often as I found the need to constantly return to the previous version of my repository after some unsuccessful attempts to progress with the project. 


