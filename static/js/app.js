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

        // Draw a horizontal chart using plotly and the json data

        let barChart = [
            {
                // add a .slice to grab only the top 10 otu_ids, values, and labels
                y: ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
                marker: {
                    color: 'rgba(217,97,73,.7)',
                }
            }
        ];

        let barLayout = {
            title: "Top 10 Operational Taxonomic Units (OTU)",
            xaxis: {gridcolor: 'rgb(255,255,255)'},
            margin: { t: 50, l: 100, b:50, r: 30},
            width: 600,
            height: 400,
            paper_bgcolor:'rgb(240, 240, 240)',
            plot_bgcolor:'rgb(240, 240, 240)',
        };

        Plotly.newPlot("bar", barChart, barLayout);

                // Build a Bubble Chart using the sample data

                let bubbleChart = [
                    {
                        x: ids,
                        y: values,
                        text: labels,
                        mode: "markers",
                        marker: {
                            color: ids, // the color is the same as the ids values number
                            size: values, // the size equals y values   
                        },
                        type: 'scatter'
                    }
                ];
                let bubbleLayout = {
                    title: "Individual's Demographic Information",
                    xaxis: {title: "OTU ID", gridcolor: 'rgb(255,255,255)'},
                    yaxis: {gridcolor: 'rgb(255,255,255)'},
                    hovermode: "closest",
                    showlegend: false,
                    paper_bgcolor:'rgb(240, 240, 240)',
                    plot_bgcolor:'rgb(240, 240, 240)',
                    margin: { t: 30, r: 30, l: 60 },
                };
        
                Plotly.plot("bubble", bubbleChart, bubbleLayout);




    });
}
buildCharts(940);