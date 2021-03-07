function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("data/samples.json").then((data) => {
        let samples = data.samples;
        // creating arrays for 940 otu: otu_ids, otu_labels. and sample_values
        let resultsArr = samples.filter(sampleObject => sampleObject.id == sample);
        let result = resultsArr[0]
        console.log("resultsArr: ", resultsArr);
        let ids = result.otu_ids;
        console.log("940 out_ids: ", ids);
        let labels = result.otu_labels;
        console.log("940 out_labels: ", labels);
        let values = result.sample_values;
        console.log("940 sample_values: ",values);
        // Draw a horizontal chart using plotly and the json data

        let barChart = [
            {
                y: ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse(),
                x: values.slice(0, 10).reverse(),
                text: labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
                marker: {
                    color: 'rgba(222,70,38,0.5)',
                }
            }
        ];

        let barLayout = {
            title: "Top 10 Operational Taxonomic Units (OTU)",
            margin: { t: 50, l: 100, b:50, r: 30},
            width: 600,
            height: 400,
            paper_bgcolor:'rgb(243, 243, 243)',
            plot_bgcolor:'rgb(243, 243, 243)',
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
                            color: ids, // the color is the same as the id numbers
                            size: values, // the size equals y values 
                            
                        }
                    }
                ];
                let bubbleLayout = {
                    title: "Individual's Demographic Information",
                    xaxis: {title: "OTU ID"},
                    hovermode: "closest",
                    showlegend: false,
                    paper_bgcolor:'rgb(243, 243, 243)',
                    plot_bgcolor:'rgb(243, 243, 243)',
                    margin: { t: 30, r: 30, l: 60 },
                };
        
                Plotly.plot("bubble", bubbleChart, bubbleLayout);




    });
}
buildCharts(940);