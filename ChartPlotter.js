class ChartPlotter {
    constructor() {
        this.populationChart = this.#createPopulationChart();
    }

    drawPopulationChart(currentPreys, currentPredators) {
        this.populationChart.data.datasets.forEach((dataset) => {
            if (dataset.label === "preys") {
                dataset.data.push(currentPreys);
            } else {
                dataset.data.push(currentPredators);
            }
        });
        this.populationChart.update();
    }

    #createPopulationChart() {
        const data = {

            datasets: [{
                label: "predators",
                borderColor: "red",
                fill: true
            },
            {
                label: "preys",
                borderColor: "blue",
                fill: true
            }]
        };
        const options = {
            legend: { display: false },

        };

        return new Chart("populationChart", {
            type: "line",
            data: data,
            options: options
        });
    }


}