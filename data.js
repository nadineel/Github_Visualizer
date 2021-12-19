function hiFunction(){
    var userId=document.getElementById("user").value ;
    console.log("hi "+userId);

}
var globalId="";

function inputFunction(){
    var userId=document.getElementById("user").value ;
    globalId=userId;
    try{
    main(userId)
    }
    catch(e){
        alert("Invalid Input")
    }
    
}

async function main(userId){

    url = `https://api.github.com/users/${userId}`;
    let userInfo = await getRequest(url).catch(error => console.error(error));

    userInfo_col(userInfo)

    
    url=`https://api.github.com/users/${userId}/repos`;
    let repoInfo=await getRequest(url).catch(error => console.error(error)); 
    repoSearchBox(repoInfo); 
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

function repoSearchBox(repoInfo){
    document.getElementById("repoSearchBox").style.display = "block";
    let repoNames=document.querySelectorAll('name');
    repoNames.innerHTML = `${repoInfo[1].name}`;
    

}

async function show(value){    
    url=`https://api.github.com/users/${globalId}/repos`;
    let repoInfo=await getRequest(url).catch(error => console.error(error)); 

    document.getElementById("datalist").innerHTML="";
    list=value.length
    for(let i=0;i<repoInfo.length;i++){
        if((((repoInfo[i].name).toLowerCase()).indexOf(value.toLowerCase()))>-1){
            var n=document.createElement("option");
            var v=document.createTextNode(repoInfo[i].name);
            n.appendChild(v);
            document.getElementById("datalist").appendChild(n);

        }
    }
}


function findRepo(repo){
    console.log("searching");
}