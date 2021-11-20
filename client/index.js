function displayPlaces(id) { // eslint-disable-line no-unused-vars
    var x = document.getElementById(id);
    console.log(x);
    if (x.classList.contains('hidden')) {
        x.classList.remove('hidden');
    } else {
        x.classList.add('hidden');
    }
}


function displayIdeas(){ // eslint-disable-line no-unused-vars
    var x = document.getElementById('upload-ideas');
    console.log(x);
    if (x.classList.contains('hidden')) {
        x.classList.remove('hidden');
    } else {
        x.classList.add('hidden');
    }
}


// Comment part

function displayComments() { // eslint-disable-line no-unused-vars
    var x = document.getElementById('upload-comments');
    console.log(x);
    if (x.classList.contains('hidden')) {
        x.classList.remove('hidden');
    } else {
        x.classList.add('hidden');
    }
}

function addComment(){
    fetch('/comments',{
    }).then((res)=>{
        return res.json();
    }).then((a)=>{
        console.log(a);
        document.getElementById('usercomments').innerHTML = '';
        a.forEach((i) =>{
            let newBox = `<div class="card mb-3">
                <div class="card-header">
                    <b>${i.username}</b>
                </div>
                <div class="card-body">
                    <p class="card-text">${i.usercomment}</p>
                </div>
            </div>`;
            document.getElementById('usercomments').innerHTML += newBox;
        });
    });
}

function getComment(e){ // eslint-disable-line no-unused-vars
    e.preventDefault();
    const username = document.getElementById('username').value;
    const usercomment = document.getElementById('user-comment').value;

    let data = new FormData;

    data.append('username', username);
    data.append('usercomment',usercomment);

    fetch('/comments', {
        method: 'POST',
        body: data
    }).then((response)=>{
        if (response.ok) {
            console.log('It worked!');
            addComment();
        } else {
            console.error('It didn\'t work :(');
            throw new Error('Not ok');
        }
    }).catch((err)=>{
        console.error(err);
        myModal.show();
    });
}


/* global bootstrap */
const myModal = new bootstrap.Modal(document.getElementById('myModal'));

// eslint-disable-next-line no-unused-vars
function getIdeas(e) { 
    e.preventDefault();
    const cityname =  document.getElementById('cityname').value;
    const citysummary = document.getElementById('citysummary').value;
    const attractions = document.getElementById('attractions').value;
    const photo = document.getElementById('photo').files[0];
    let data = new FormData;
    data.append('cityname',cityname);
    data.append('citysummary',citysummary);
    data.append('attractions',attractions);
    data.append('photo',photo,photo.name);
    

    fetch('/upload',{
        method: 'POST',
        body: data
    }).then((response)=>{
        if (response.ok) {
            console.log('It worked!');
            addBox();
        } else {
            console.error('It didn\'t work :(');
            throw new Error('Not ok');
        }
    }).catch((err)=>{
        console.error(err);
        myModal.show();
    });
}


function addBox(){
    fetch('/ideas',{
    }).then ((res)=>{
        return res.json();
    }).then((data)=>{
        console.log(data);
        document.getElementById('places').innerHTML = '';
        data.forEach((i) =>{
            let newTile = `
                <div class="col">
                    <div class="card h-100">
                        <img src="upload/${i.photo}" class="card-img-top" alt="Photo of ${i.cityname}">
                        <div class="card-body">
                            <h5 class="card-title">${i.cityname}</h5>
                            <p class="card-text overflow-auto">${i.citysummary}</p>
                        </div>
                        
                        
                        <div class="hidden" id="poi-${i.photo}">
                            <h5 class="title">Attractions to go!</h5>
                            <ul id="places-list">`;
            i.attractions.split(/,\s*/).forEach((item) => {
                newTile += `<li>${item}</li>`;
            });
            newTile +=              `</ul>
                        </div>
                        <button type="button" class="btn btn-success" onclick="displayPlaces('poi-${i.photo}')">Worthy Attractions</button>
                    </div>
                </div>`;
            document.getElementById('places').innerHTML += newTile; 

        });

        
    });      
}