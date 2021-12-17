function hiFunction(){
    var userId=document.getElementById("user").value ;
    console.log("hi "+userId);

}

function inputFunction(){
    var userId=document.getElementById("user").value ;

    try{
    main(userId)
    }
    catch(e){
        alert("Invalid Input")
    }
}

async function main(userId){
    //let url = `https://api.github.com/users/${userId}/repos`;
    
    //let repo = await getRequest(url).catch(error => console.error(error));

    url = `https://api.github.com/users/${userId}`;
    let userInfo = await getRequest(url).catch(error => console.error(error));



    userInfo_col(userInfo)

}

async function getRequest(url) {
    let token='';
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