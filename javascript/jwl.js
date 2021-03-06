let params= new URLSearchParams(location.search);
let genre=params.get('genre');
let sortby=params.get('sortby');
let lang=params.get('lang');
if (genre==null){genre='all';}
if (sortby==null){sortby='popularity';}
if (lang==null){lang='any';}
document.querySelector('main h1 span').innerHTML=genre;
document.getElementById(genre).classList.add('active');
document.getElementById(sortby).classList.add('active');
document.getElementById(lang).classList.add('active');

let genrelist=['action','drama','all','thriller','comedy','sci-fi','adventure','horror','animated','suspense'];
let sortbylist=['name','time','popularity','price'];
let langlist=['any','hindi','english'];

document.querySelector(".home-nav>ul").addEventListener('click',function(element) {
    genrelist.forEach(function(ele) {
        if(element.target.id==ele) {
            location.href=window.location.pathname+"?genre="+ele+"&sortby="+sortby+"&lang="+lang+"#heading";
        }
    });
    sortbylist.forEach(function(ele) {
        if(element.target.id==ele) {
            location.href=window.location.pathname+"?genre="+genre+"&sortby="+ele+"&lang="+lang+"#heading";
        }
    });
    langlist.forEach(function(ele) {
        if(element.target.id==ele) {
            location.href=window.location.pathname+"?genre="+genre+"&sortby="+sortby+"&lang="+ele+"#heading";
        }
    });
});

let requiredMovieList=[]
if(genre=='all' && lang=='any') {
    requiredMovieList=movieList;
}
else if(genre=='all') {
    movieList.forEach(element => {
        if(lang==element.language.toLowerCase()) {
            requiredMovieList.push(element);
        }
    });
}
else if(lang=='any') {
    movieList.forEach(element => {
        if(element.genre.includes(genre)) {
            requiredMovieList.push(element);
        }
    });
}
else {
    movieList.forEach(element => {
        if(lang==element.language.toLowerCase() && element.genre.includes(genre)) {
            requiredMovieList.push(element);
        }
    });
}
if(genre=='action') 
{
    requiredMovieList = movieList.slice(1,5);
}
else if(genre=='drama') 
{
    requiredMovieList = movieList.slice(6,8);
}
else if(genre=='thriller') 
{
    requiredMovieList = movieList.slice(3,9);
}
else if(genre=='comedy') 
{
    requiredMovieList = movieList.slice(8,12);
}
else if(genre=='sci-fi') 
{
    requiredMovieList = movieList.slice(2,7);
}
else if(genre=='adventure') 
{
    requiredMovieList = movieList.slice(4,6);
}
else if(genre=='horror') 
{
    requiredMovieList = movieList.slice(11,14);
}
else if(genre=='animated') 
{
    requiredMovieList = movieList.slice(10,15);
}
else if(genre=='suspense') 
{
    requiredMovieList = movieList.slice(5,9);
}


if(sortby=='popularity') {
    requiredMovieList.sort(function(a,b) {return b.rating-a.rating});
}
else if(sortby=='time') {
    requiredMovieList.sort(function(a,b) {return b.manufactured-a.manufactured});
}

else if(sortby=='price') {
    requiredMovieList.sort(function(a,b) {return b.price-a.price});
}
else {
    requiredMovieList.sort(function(a,b){
        if([a.title,b.title].sort()[0]==a.title) {
            return -1;
        }
        else {
            return 1;
        }
    });
}

let position=0;
let step=7;
let round=2;
if(screen.width<321) {
    step=1;
    round=6;
}
else if(screen.width<481) {
    step=2;
    round=5;
}
else if(screen.width<729) {
    step=3;
    round=4
}
else if(screen.width<1025) {
    step=4;
    round=3;
}
else if(screen.width<1201) {
     step=6;
 }
let obj=document.querySelector('.content');
function showMore() {
    document.querySelector('.show-more').remove();
    if(requiredMovieList.length>position+step*round) {
        for (let index = position; index <position+step*round; index++) {
            obj.innerHTML+='<div class="movie"><a href="./mdetail.html?id='+requiredMovieList[index].id+'"><img src="'+requiredMovieList[index].image+'" alt=""></a><p><i class="fa fa-star"></i> '+requiredMovieList[index].rating+'</p></div>'; 
         }
         obj.innerHTML+='<div class="show-more"><button class="btn btn-large btn-outline-primary " onclick=showMore()>Show More</button></div>';
         position=position+step*round;
    }
    else {
        for (let index = position; index < requiredMovieList.length; index++) {
            obj.innerHTML+='<div class="movie"><a href="./mdetail.html?id='+requiredMovieList[index].id+'"><img src="'+requiredMovieList[index].image+'" alt=""></a><p><i class="fa fa-star"></i> '+requiredMovieList[index].rating+'</p></div>'; 
         }
    }
}
showMore();

