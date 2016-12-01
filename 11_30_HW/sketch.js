//Katharine LoScalzo
//30 November 2016
//NY Times API - user inputs a keyword and hits the submit button to search for articles 

var url;
var globalData;
var urlBase;
var apiKey;
var queryStr;
var keyword;
var article;

function setup() {

    createCanvas(900, 900);
 
    //create input box
    input = createInput("Enter a keyword");
    input.position(100, 40);
    inputButton = createButton("Submit");
    inputButton.position(264, 40);
    inputButton.mousePressed(readValue);

    urlBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    apiKey = "84cb43cf32194333a1f0620944c24abd";
    queryStr = "search";

    loadNewData();
    listArticles();
    
    setInterval(listArticles, 3000);
    
}

function readValue() {

    queryStr = input.value();
    loadNewData();

}

function listArticles() {

if(globalData){
		background(255); 
    
		if(globalData.response.docs.length < 10){
			
            article = globalData.response.docs.length; 
		}
	
    else {
			article = 10; 
		}
		
		for(i = 0; i < globalData.response.docs.length; i++){
            
			var artPortion = globalData.response.docs[i].snippet;
            
			textSize(15);
			fill(170,15,90);
			text(artPortion, 100, 100+(75*i), 900);
			}
        }
}
    
//callback function
function gotData(myData) {
    globalData = myData;
}

function loadNewData() {

    keyword = queryStr;

    url = urlBase + "?api-key=" + apiKey + "&q=" + queryStr;

    myData = loadJSON(url, gotData);
    gotData;
}
