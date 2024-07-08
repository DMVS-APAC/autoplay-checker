const $ = document.querySelector.bind(document);
let tests = [
    {selector: '.video', method: 'video', params: null},
    {selector: '.videoMuted', method: 'video', params: {muted: true}},
    {selector: '.videoInline', method: 'video', params: {inline: true}},
    {selector: '.videoInlineMuted', method: 'video', params: {inline: true, muted: true}},
    {selector: '.audio', method: 'audio', params: null},
    {selector: '.audioMuted', method: 'audio', params: {muted: true}}
];
const addAnchorlink = (text)=> {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
    return `<a href="${url}" target="_blank">${url}</a>`;
    })
}

const runTests = () => {


    tests.reduce((testSequence, test) => {
        let tempTr = $(test.selector);
        tempTr.getElementsByTagName("td")[1].innerHTML = "testing...";
        tempTr.getElementsByTagName("td")[2].innerHTML = "...";

        return testSequence
        .then(() => {
            
            let tr = $(test.selector);
            let tdStatus = tr.getElementsByTagName("td")[1];
            let tdError = tr.getElementsByTagName("td")[2];
        
            return canAutoplay[test.method](test.params).then(({result, error}) => {
                console.log("hello3");
                if(result === true){
                    tdStatus.innerHTML = '✅ Passed' ;
                    tdError.innerHTML = 'None' ;
                }else{
                    tdStatus.innerHTML = '🚫 Failed' ;
                    tdError.innerHTML = `<b>( Error "${error.name}</b>": ${addAnchorlink(error.message)}) ` ;
                }
            })
        })
        .then(() => {
            return new Promise(resolve => setTimeout(resolve, 1000))
        })
    }, Promise.resolve());
}

$('button').addEventListener('click', runTests);


runTests();