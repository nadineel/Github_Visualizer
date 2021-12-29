# Github_Visualizer

Visualising Github accounts' data pulled using documents from **[GitHub REST API](https://docs.github.com/en/rest)** with **[Chart.js](https://www.chartjs.org/)** library.

## Dependencies

To run the project in your machine,  **Docker** should be installed. 

Languages used:
* JavaScript
* HTML
* CSS

Use of Github Authentication token is recommended for less restricted access. It SHOULD NOT be pushed onto Github for other users to see. 
Place the token in data.js --> getRequest().  

## Running the Project

Create a directory on your machine
```mkdir <name>```\
Clone the repository onto the directory created.

Pull nginx image
```docker run --name website -v %cd%:/usr/share/nginx/html -d -p 8080:80 nginx``` (Windows)\
```docker run --name website -v $(pwd):/usr/share/nginx/html -d -p 8080:80 nginx``` (Linux)\
(eg. name=website)

To visit the page: ```localhost:8080```

## Demo
  
