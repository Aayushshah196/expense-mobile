// Sample data for the bar chart
const barChartData = {
  labels: ["Category A", "Category B", "Category C", "Category D"],
  datasets: [
    {
      data: [40, 60, 80, 100],
    },
  ],
};

const pieChartData = [
  {
    name: "Category A",
    population: 40,
    color: "#FF6384",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category B",
    population: 60,
    color: "#36A2EB",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category C",
    population: 80,
    color: "#FFCE56",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category D",
    population: 50,
    color: "#4BC0C0",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category E",
    population: 70,
    color: "#9966FF",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category F",
    population: 100,
    color: "#FF9F40",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category G",
    population: 30,
    color: "#C9CBCF",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category H",
    population: 90,
    color: "#FF6384",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
  {
    name: "Category I",
    population: 110,
    color: "#36A2EB",
    legendFontColor: "#000000",
    legendFontSize: 14,
  },
];

const timeSeriesData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [830, 762, 810, 700, 723, 493, 677, 641, 509, 213, 335, 198, 29],
    },
  ],
};

const colors = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
  "#8E44AD",
  "#2ECC71",
];

// Function to convert input data to pie chart data
function convertToPieChartData(inputData) {
  return inputData.map((item, index) => {
    return {
      name: item.label, // Use the ledger as the name
      population: item.amount, // Use total_amount as the population
      color: colors[index % colors.length], // Cycle through the colors array
      legendFontColor: "#000000", // Set the legend font color
      legendFontSize: 14, // Set the legend font size
    };
  });
}

function convertToChartData(data) {
  return data.map((item) => {
    return {
      x: item.date, // Date as x-axis value
      y: item.total_amount, // Total amount as y-axis value
    };
  });
}

export {
  barChartData,
  pieChartData,
  timeSeriesData,
  colors,
  convertToPieChartData,
  convertToChartData,
};
