function buildCharts(sample) {

    // Use `d3.json` to fetch the sample data for the plots
    d3.json("data/samples.json").then((data) => {
        let samples = data.samples;
        let resultsArr = samples.filter(sampleObject => sampleObject.id == sample);
        let result = resultsArr[0]

        let ids = result.otu_ids;
        console.log(ids);
        let labels = result.otu_labels;
        console.log(labels);
        let values = result.sample_values;
        console.log(values);
        // Draw a horizontal chart using plotly and the json data

        let barData = [
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
            title: "Top 10 OTU",
            margin: { t: 50, l: 125, b:50},
            width: 600,
            height: 400,
            
        };

        Plotly.newPlot("bar", barData, barLayout);

                // Build a Bubble Chart using the sample data

                let DataBubble = [
                    {
                        x: ids,
                        y: values,
                        text: labels,
                        mode: "markers",
                        marker: {
                            color: ids,
                            size: values,
                            
                        }
                    }
                ];
                let LayoutBubble = {
                    margin: { t: 0 },
                    xaxis: { title: "OTU ID" },
                    hovermode: "closest",
                    showlegend: false
                };
        
                Plotly.plot("bubble", DataBubble, LayoutBubble);




    });
}
buildCharts(940);