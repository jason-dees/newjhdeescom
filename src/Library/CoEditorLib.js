//feels like it's redux time

let fakeWords = "This is a fake get";
let fakePrevWords = ""; 
let fakeDocId = 25;
function fetch(request){
    let isGet = request.url.indexOf('getWords') > 0;
    let isSend = request.url.indexOf('sendWords') > 0;
    let isNew = request.url.indexOf('newWords') > 0;
    let executor = function(resolve, reject){
        if(isSend){

        }
        else {
            if(isNew){
                fakeWords = "This is a fake get";
                fakePrevWords = "";
                fakeDocId++;
            }
            else{
                fakeDocId = Number(request.url.split("=")[2]);
            }
            var json = JSON.stringify({
                docId: fakeDocId, 
                docWords: fakeWords, 
                prevWords: fakePrevWords
            });
            resolve(new Response(json));
        }
    };
    return new Promise(executor);
}

let CoEditor = function(){
    let self = this;
    let currentId = -1;
    let currentWords = "This is the default value";
    let refreshSeconds = 1;
    let checkTimeout = null;

    self.SetId = function(newId){
        currentId = newId;
        if(newId === null || newId === '' || newId === undefined){
            return;
        }
        if(isNaN(newId)){
            this.current("That's not a valid number...");
        }
        return getDocument(newId);
    }
    self.SetLatestWords = function(latestWords){

    }
    Object.defineProperty(self, 'LatestWords', { get: function() { return currentWords; } });
    Object.defineProperty(self, 'Id', { get: function() { return currentId; } });

    self.GetLatestWords = function(){
        return currentWords;
    }

    self.StartNewDocument = function(){

    }

    let baseUrl = '/Doc/?action='; 
    let newDocumentUrl = baseUrl + 'newWords';
    let newDocument = function(){
        let constructedUrl = newDocumentUrl;
        let request = new Request(constructedUrl, {method: 'POST'});
        fetch(request).then(response => {});
    }

    let getUrl = baseUrl + 'getWords&docId='; //get
    let getDocument = function(id){
        let constructedUrl = getUrl + id;
        let request = new Request(constructedUrl, {method: 'GET'});
        return fetch(request)
            .then(response => response.json())
            .then(json => {
                currentWords = json.docWords;
            });
    }

    let sendUrl = baseUrl + 'sendWords'; //post {docId: this.Id, words: words};
    let sendDocument = function(id, words){
        let constructedUrl = sendUrl + id;
        let init = { method: 'POST',
                     body: {docId: id, words: words} 
                   };
        let postRequest = new Request(constructedUrl, init);

        fetch(postRequest).then(response => {});
    }
};

export default CoEditor;