function getSampleNames(){
    var selector = document.getElementById('selDataset');
    var url = "/names";
    Plotly.d3.json(url, function(error, response) {
        if (error) return console.warn(error);
        var data = response;
        data.map(function(sample){
            var option = document.createElement('option')
            option.text = sample
            option.value = sample
            selector.appendChild(option)
        });
    });
};

getSampleNames();

function optionChanged(sample){
    updatePie(sample);
    updateBubble(sample);
    updateMetadata(sample);
};

//Create a PIE chart that uses data from your routes /samples/<sample> and /otu to display the top 10 samples.
function updatePie(sample){
    var sampleURL ='/samples/${sample}'
    Plotly.d3.json(sampleURL,funtion(error,response)
        if (error) return console,log(error);
        var labels =[]
        var values=[]
        var hovers = []
        for i=0;i<10;i++){
            var label = response[0].otu_ids[i]
            labels.push(label);
            var value = response[1].sample_values[i]
            values.push(value);
            var label = response[0].otu_ids[i]
            labels.push(label);
        }
    )
}

function updateBubble(sample){
    var sampleURL = `/samples/${sample}`
    Plotly.d3.json(sampleURL,function(error,response){
        if (error) return console.log(error);
        var otuIDs = response[0].otu_ids;
        var sampleValues = response[1].sample_values
        var otuDescriptions = [];
        for(i=0; i<otuIDs.length; i++) {
            otuDescriptions.push(response[2][otuIDs[i] - 1]);
        };
}};

function updateMetadata(sample){
    var sampleURL = `/metadata/${sample}`
    Plotly.d3.json(sampleURL,function(error,response){
        if (error) return console.log(error);
        console.log(response);
        var data = response[0];
        console.log(data)
        var metaList = document.getElementById('sampleMetadata');
        metaList.innerHTML = '';
        var metaItems = [["Sample","SAMPLEID"],["Ethnicity","ETHNICITY"],["Gender","GENDER"],["Age","AGE"],
            ["Weekly Wash Frequency","WFREQ"],["Type (Innie/Outie)","BBTYPE"],["Country","COUNTRY012"],["Dog Owner","DOG"],["Cat Owner","CAT"]];
        console.log(metaList)
        for(i=0; i<metaItems.length; i++){
            var newLi = document.createElement('li');
            newLi.innerHTML = `${metaItems[i][0]}: ${data[metaItems[i][1]]}`;
            metaList.appendChild(newLi);
        };
    });
};

//Resources:
//document.getElementById: https://stackoverflow.com/questions/19656581/use-of-document-getelementbyid-in-javascript
//   https://stackoverflow.com/questions/15182402/javascript-document-createelement-or-html-tags
// https://plot.ly/javascript/plotlyjs-function-reference/