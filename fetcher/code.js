let moreTex = '<div class="lin" id="l1">user</div>';
let final = '<div id="topSec"><section id="userName">ayush31yadav</section></div><div id="midSec"><div id="left"><div class="data"><div class="text" id="follower">Followers : 5</div><div class="but" onclick="seeMore(1)"><em>></em></div></div><div class="data"><div class="text" id="following">Following : 5</div><div class="but" onclick="seeMore(2)"><em>></em></div></div><div class="data"><div class="text" id="p_Repos">public Repos : 5</div><div class="but" onclick="seeMore(3)"><em>></em></div></div><div class="data"><div class="text" id="p_gists">public Gists : 5</div></div><div class="data"><div class="text" id="txt">acc. Created : 31/5/2005</div></div></div><div id="right"><div id="moreContent"></div></div></div><div id="botSec"><input type="text" name="username" id="userIn" placeholder="USERNAME"><div id="selectUser2" onclick="selectUser()">ENTER</div><div id="message"></div></div>';

let userName = "";

function purifyDate(date){
    // 2019-07-11T13:01:47Z
    trueDate = "";
    trueDate += date.slice(0,4);
    trueDate += " : ";
    trueDate += date.slice(5,7);
    trueDate += " : ";
    trueDate += date.slice(8,10);
    return trueDate;
}

async function change(out){
    console.log(out);
    if (out["message"] == "Not Found") {
        document.getElementById("cenV").innerHTML = '<input type="text" name="username" id="userIn" placeholder="USERNAME"><div id="selectUser" onclick="selectUser()">ENTER</div><div id="message"></div>'
        document.getElementById("message").innerHTML = "This user does not exist : retype userName";
    } else {
        document.getElementById("cenV").innerHTML = final;
        document.getElementById("userName").innerHTML = out["login"];
        document.getElementById("follower").innerHTML = "Followers : " + out["followers"];
        document.getElementById("following").innerHTML = "Following : " + out["following"];
        document.getElementById("p_Repos").innerHTML = "public Repos : " + out["public_repos"];
        document.getElementById("p_gists").innerHTML = "public Gists : " + out["public_gists"];
        document.getElementById("txt").innerHTML = "acc. Created : " + out["created_at"].slice(0,10);
    }
}

async function update(){
    var link = "https://api.github.com/users/" + userName;
    console.log(link);
    var response = await fetch(link);
    var out = await response.json();
    change(out);
}

async function selectUser(){
    userName = document.getElementById('userIn').value;
    update();
}

async function seeMore(id) {
    document.getElementById("moreContent").innerHTML = '<div class="lin">DISPLAYING A FEW</div>';
    if (id==1){
        var link1 = "https://api.github.com/users/" + userName + "/followers";
        var response1 = await fetch(link1);
        var followersData = await response1.json();
        console.log(followersData);
        for (let i = 0; i < followersData.length; i++) {
            const element = followersData[i];
            document.getElementById("moreContent").innerHTML += '<div class="lin" onclick="userClick(\'' + element["login"] + '\')">' + element["login"] + '</div>';
        }
    }
    if (id==2){
        var link1 = "https://api.github.com/users/" + userName + "/following";
        var response1 = await fetch(link1);
        var followingData = await response1.json();
        console.log(followingData);
        for (let i = 0; i < followingData.length; i++) {
            const element = followingData[i];
            document.getElementById("moreContent").innerHTML += '<div class="lin" onclick="userClick(\'' + element["login"] + '\')">' + element["login"] + '</div>';
        }
    }
    if (id==3){
        var link2 = "https://api.github.com/users/" + userName + "/repos";
        var response2 = await fetch(link2);
        var repoData = await response2.json();
        console.log(repoData);
        for (let i = 0; i < repoData.length; i++) {
            const element = repoData[i];
            document.getElementById("moreContent").innerHTML += '<div class="lin" onclick="repoClick(\'' + element["html_url"] + '\')">' + element["name"] + ' ⭐ ' + element["stargazers_count"] + '</div>';
        }
    }
}

async function userClick(n){
    userName = n;
    update();
}

async function repoClick(n){
    console.log(n);
    window.open(n, '_blank');
}


