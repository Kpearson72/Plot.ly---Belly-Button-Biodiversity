// Function to construct data to be used in Demographic Info Panel
function buildMetadata(sample) {
    // Use d3 to read samples.json
    d3.json("data/samples.json").then((data) => {
        let metadata = data.metadata;
        let resultsArr = metadata.filter(sampleObject => sampleObject.id == sample);
        console.log(`resultsArr: ${resultsArr}`);
        let result = resultsArr[0];
        console.log(resultsArr[0]);
        let PANEL = d3.select("#sample-metadata");
        // empty the panel in html before appending key, value pairs
        PANEL.html("");
        Object.entries(result).forEach(([key, value]) => {
            d3.select("#sample-metadata").append("h4").text(`${key}: ${value}`);
        });
    });
}
function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("data/samples.json").then(data => {
        let samples = data.samples;
        // creating arrays for 940 otu: otu_ids, otu_labels. and sample_values
        let samplesArr = samples.filter(sampleObject => sampleObject.id == sample);
        let singleResult = samplesArr[0]
        console.log("samplesArr: ", samplesArr);
        let ids = singleResult.otu_ids;
        console.log("940 otu_ids: ", ids);
        let labels = singleResult.otu_labels;
        console.log("940 out_labels: ", labels);
        let values = singleResult.sample_values;
        console.log("940 sample_values: ",values);
        let datasets = data.metadata;
        let metaArr = datasets.filter(metaObject=> metaObject.id == sample);
        let singleDataset = metaArr[0]
        console.log("940 metadata id: ", singleDataset);
        let washFreq = singleDataset.wfreq;
        console.log("single wfreq: ", washFreq);
        

        // Draw a horizontal chart using plotly and the json data

        let trace1= 
            {
                // add a .slice to grab only the top 10 otu_ids, values, and labels
                y: ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
                marker: {
                    color: 'rgba(217,97,73,.7)',
                    line: {
                        color: 'rgb(255,255,255)',
                        width: 1.5
                    }
                }
            };


        let barLayout = {
            title: "Top 10 Operational Taxonomic Units (OTU)",
            xaxis: {gridcolor: 'rgb(255,255,255)', gridwidth: 1.4},
            margin: { t: 50, l: 100, b:50, r: 0},
            width: 400,
            height: 400,
            paper_bgcolor:'rgb(238, 238, 238)',
            plot_bgcolor:'rgb(238, 238, 238)',
        };
        

        Plotly.newPlot("bar", [trace1], barLayout);

                // Build a Bubble Chart using the sample data

        let trace2 = 
            {
                x: ids,
                y: values,
                text: labels,
                mode: "markers",
                marker: {
                    color: ids, // uses the ids for color - loved it so kept it as color theme
                    size: values, // the size equals y values   
                },
                type: 'scatter',
                
            };

        let bubbleLayout = {
            title: "Individual's Demographic Information",
            xaxis: {title: "OTU ID", gridcolor: 'rgb(255,255,255)',gridwidth: 1.4},
            yaxis: {gridcolor: 'rgb(255,255,255)',gridwidth: 1.4},
            hovermode: "closest",
            showlegend: false,
            paper_bgcolor:'rgb(238, 238, 238)',
            plot_bgcolor:'rgb(238, 238, 238)',
            margin: { t: 50, r: 30, l: 60, b: 50},
            
        };

        Plotly.newPlot("bubble", [trace2], bubbleLayout);


        // Gauge
        let gauge = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                title: { text: "Belly Button Washes Per Week", font: {size:15} },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9],tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "rgb(74, 132, 146)" },
                    steps: [
                        {range: [0, 1], color: "rgba(217,97,73,.3)" },
                        {range: [1, 2], color: "rgba(217,97,73,.7)" },
                        {range: [2, 3], color: "rgba(217,97,73,.3)" },
                        {range: [3, 4], color: "rgba(217,97,73,.7)" },
                        {range: [4, 5], color: "rgba(217,97,73,.3)" },
                        {range: [5, 6], color: "rgba(217,97,73,.7)" },
                        {range: [6, 7], color: "rgba(217,97,73,.3)" }, 
                        {range: [7, 8], color: "rgba(217,97,73,.7)" }, 
                        {range: [8, 9], color: "rgba(217,97,73,.3)" }
                    ],
                
                },
            },
        ];

        var gaugeLayout = { width: 300, 
            height: 200, 
            margin: { t:25, b:0 , l:30, r:25},
            paper_bgcolor:'rgb(238, 238, 238)',
            font: {size:15},
        };
        Plotly.newPlot('gauge', gauge, gaugeLayout);
    });
    var config = {responsive: true}

}

// Function to Collect names of OTU/Bind names to Section tag with options using id selDataset 
function init() {
    // Use a list of names from names
    d3.json("data/samples.json").then((data) => {
        let sampleNames = data.names;
        console.log("sampleNames", sampleNames);
        // bind - data to well under select with id selDataset
        sampleNames.forEach((sample)=>{
            d3.select("#selDataset")
                .append("option")
                .text(sample)
                .property("value", sample); 

        });
        // Use the first sample from the list to build the initial plots
        // have sample1 as a constant variable to keep when initiated
        const sample1 = sampleNames[0];
        console.log("sample1",sample1);
        buildCharts(sample1);
        buildMetadata(sample1);
    });
}

// Function to change data each time to update charts
function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
}
init();