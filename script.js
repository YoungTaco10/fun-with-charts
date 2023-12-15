let allStatesAndTerritories = [];


async function getData() {
    const response = await fetch("Educationv.csv");
    const data = await response.text();
    const rows = data.split("\n").slice(1);
    let states = [];
    rows.forEach((elem) => {
        const row = elem.split(",");
        const state = row[1].substring(row[1].length-2);
            if(!(states.includes(state)))
            {
                states.push(state);
            }
    });
    states.forEach(state => {
        let territory = {
            "name": state,
            "college": 0,
            "highSchool": 0,
            "none": 0
        }
        allStatesAndTerritories.push(territory);
    });
    rows.forEach((elem) => {
        const row = elem.split(",");
        if(row[0] === "2020")
        {
            const name = row[1].substring(row[1].length-2);
            allStatesAndTerritories.forEach(i => {
                if(name === i.name)
                {
                    i.college = i.college + parseInt(row[2]);
                    i.highSchool = i.highSchool + parseInt(row[3]);
                    i.none = i.none + parseInt(row[4]);
                }
            });
        }
    });
    allStatesAndTerritories.forEach(elem => {
        const pop = elem.college + elem.highSchool + elem.none;
        elem.college = (elem.college/pop)*100;
        elem.highSchool = (elem.highSchool/pop)*100;
        elem.none = (elem.none/pop)*100;
        console.log(elem.name, elem.college, elem.highSchool, elem.none);
    });
}


function createChart(title, div, labels, data, colors)
{
    const chartData =
    {
        labels: labels,
        datasets:
        [{
            label: title,
            backgroundColor: colors,
            data: data
        }]
    };
    const config =
    {
        type: 'bar',
        data: chartData,
        options:
        {
            responsive: true,
            scales:
            {
                x:
                {
                    beginAtZero: true
                }
            }
        },
    };
    const ctx = document.getElementById(div);
    new Chart(ctx, config);
}


const colors = [
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(255, 0, 0)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(0, 0, 255)',
    'rgb(255, 0, 0)'
];


const labels = 'HIDE';


async function fetchDataAndCreateCharts() {
    await getData();


    console.log(allStatesAndTerritories);


    createChart(
        labels,
        "ba",
        allStatesAndTerritories.map((item) => item.name),
        allStatesAndTerritories.map((item) => item.college),
        colors
    );


    createChart(
        labels,
        "hs",
        allStatesAndTerritories.map((item) => item.name),
        allStatesAndTerritories.map((item) => item.highSchool),
        colors
    );


    createChart(
        labels,
        "na",
        allStatesAndTerritories.map((item) => item.name),
        allStatesAndTerritories.map((item) => item.none),
        colors
    );
}


fetchDataAndCreateCharts();




