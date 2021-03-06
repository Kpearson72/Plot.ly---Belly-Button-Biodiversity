Draw a horizontal chart using plotly and the json data
function buildChart(name){
    d3.json("data/samples.json").then(data => {
        console.log(data)
        let labels = data.samples[0].otu_ids.slice(0,10).map(otuLabel=>`OTU ${otuLabel}`).reverse();
        let sampleValues=data.samples[0].sample_values.slice(0,10).reverse();
        let labelText = data.samples[0].otu_labels.slice(0,10).reverse();
        let trace1 = {
            y:labels,
            x:sampleValues,
            type: 'bar',
            name: 'Top 10 OTU',
            orientation: 'h',
            text:labelText
            
        }
    
        
        Plotly.newPlot('bar', [trace1]);
    
    });
}
// function buildChart(name){
//     d3.json("data/samples.json").then(data => {
//         // console.log(data)
//         // let labels = data.samples[].otu_ids.slice(0,10).map(otuLabel=>`OTU ${otuLabel}`).reverse();
//         // let sampleValues =data.samples[].sample_values.slice(0,10).reverse();
        // let labelText = data.samples[].otu_labels.slice(0,10).reverse();
//         let trace1 = {
//             y: dataset.y,
//             x: dataset.x,
//             type: 'bar',
//             name: 'Top 10 OTU',
//             orientation: 'h',
//             text: dataset.labelText
            
//         }

        
//         Plotly.newPlot('bar', [trace1]);

//     });
// }


// // function getdata() {
// //     // Use d3 library to read in samples.json
// //     d3.json("data/samples.json").then(function(json)=>{
        
// //     }
// // }


// buildChart(940);   

// let defaultDataset = d3.json("data/samples.json").then(data => {
//     console.log(data)
//     let y = data.samples[0].otu_ids.slice(0,10).map(otuLabel=>`OTU ${otuLabel}`).reverse();
//     let x = data.samples[0].sample_values.slice(0,10).reverse();
//     let labelText = data.samples[0].otu_labels.slice(0,10).reverse();
// }

    
//     Plotly.newPlot('bar', [trace1]);

// });

// Build a dropdown menu using the names array
buildChart(940);