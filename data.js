var globalId="";
var langChart=null;
var chart2=null;

function inputFunction(){
    var userId=document.getElementById("user").value ;
    globalId=userId;
    try{
    main(userId)
    }
    catch(e){
        alert("Invalid Input")
    }
    if (langChart != null) langChart.destroy();
    if (chart2 != null) chart2.destroy();
}

async function main(userId){

    url = `https://api.github.com/users/${userId}`;
    let userInfo = await getRequest(url).catch(error => console.error(error));

    userInfo_col(userInfo)
    repoSearchBox(); 
}

async function getRequest(url) {
    let token='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';
    const headers = {
        'Authorization': `Token ${token}`
    }

    const response = (token == undefined ||token=='') ? await fetch(url) : await fetch(url, {
        "method": "GET",
        "headers": headers
    });

    let data = await response.json();
    return data;
}

//sidebar with all information of user
function userInfo_col(userInfo){
    let img = document.getElementById('img');
    img.src = userInfo.avatar_url

    let name = document.getElementById('name');
    name.innerHTML = `<b>Name: </b>${userInfo.name}`;

    let username = document.getElementById('userName');
    username.innerHTML = `<b>Username: </b>${userInfo.login}`;

    let bio = document.getElementById('bio');
    bio.innerHTML = `<b>Bio: </b>${userInfo.bio !== null ? userInfo.bio: "No Bio"}`;

    let followers = document.getElementById('followers');
    followers.innerHTML = `<b>Followers: </b>${userInfo.followers}`;

    let following = document.getElementById('following');
    following.innerHTML = `<b>Following: </b>${userInfo.following}`;

    let location = document.getElementById('location');
    location.innerHTML = `<b>Location: </b>${userInfo.location}`;

    let public_repos = document.getElementById('public_repos');
    public_repos.innerHTML = `<b>Public Repositories: </b>${userInfo.public_repos}`;
}

function repoSearchBox(){
    document.getElementById("repoSearchBox").style.display = "block";
    
}

async function show(value){    
    url=`https://api.github.com/users/${globalId}/repos`;
    let repoInfo=await getRequest(url).catch(error => console.error(error)); 

    document.getElementById("datalist").innerHTML="";
    for(let i=0;i<repoInfo.length;i++){
        if((((repoInfo[i].name).toLowerCase()).indexOf(value.toLowerCase()))>-1){
            var n=document.createElement("option");
            var v=document.createTextNode(repoInfo[i].name);
            n.appendChild(v);
            document.getElementById("datalist").appendChild(n);

        }
    }
}


async function findRepo(){

    if (langChart != null) langChart.destroy();    
    if (chart2 != null) chart2.destroy(); 

    var repoName=document.getElementById("repo").value ;

    url=`https://api.github.com/repos/${globalId}/${repoName}/languages`;
    let repoInfo=await getRequest(url).catch(error => console.error(error));
    get_languages(repoInfo);

    url=`https://api.github.com/repos/${globalId}/${repoName}/stats/contributors`;
    repoInfo=await getRequest(url).catch(error => console.error(error));
    get_graph(repoInfo);

    
}

async function get_languages(repo) {
    let label = [];
    let data = [];
    let backgroundColor = [];
    let languages=repo;

        for (language in languages) {
            
            if (label.includes(language)) {
                for (i = 0; i < label.length; i++)
                    if (language == label[i])
                        data[i] = data[i] + languages[language];

            } else {
                label.push(language);
                data.push(languages[language]);
                backgroundColor.push(`rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.5)`);       
            }
        }
    draw1('language', 'doughnut', 'languages', "Languages in the Repository", label, data, backgroundColor);
}

function draw1(ctx, type, datasetLabel, titleText, label, data, backgroundColor) {
    let myChart = document.getElementById(ctx).getContext('2d');
    langChart = new Chart(myChart, {
        type: type,
        data: {
            labels: label,
            datasets: [{
                label: datasetLabel,
                data: data,
                backgroundColor: backgroundColor,
                borderWidth: 1,
                borderColor: '#777',
                hoverBorderWidth: 2,
                hoverBorderColor: '#000'
            }],

        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: titleText
              }
            }
          },
    });
}

async function get_graph(repo) {
    let label = [];
    let commits = [];
    let addition = [];
    let deletion = [];
    let stats=repo;
    
    for (stat in stats) {
        if (stats[stat].author.login == globalId) {   
            for (ad in stats[stat].weeks) {
                    label.push(ad);
                    addition.push(stats[stat].weeks[ad].a);                    
                    deletion.push(stats[stat].weeks[ad].d);
  
            }

        }
    }
    draw2('insertion', 'bar', 'line', 'Additions and Deletions of '+ globalId+ " for this repository", label, addition, deletion);

}

function draw2(ctx, type, type2, titleText, datasetLabel, dataset1, dataset2) {
    let myChart = document.getElementById(ctx).getContext('2d');

    chart2 = new Chart(myChart, {
        type: type,
        data: {
            labels: datasetLabel,
            datasets: [{
                type: type,
                label: 'Addition',
                borderColor: 'rgba(0, 0, 255, 0.5)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: '#000',
                fill: true,
                data: dataset1,
                
            },
            {
                type: type2,
                label: 'Deletion',
                borderColor: 'rgba(0, 255,0, 0.5)',
                borderWidth: 1,
                hoverBorderWidth: 2,
                hoverBorderColor: '#000',
                fill: true,
                data: dataset2,

            }
           ]

        },
        options: {
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
              title: {
                display: true,
                text: titleText
              }
            }
          },
    });
}