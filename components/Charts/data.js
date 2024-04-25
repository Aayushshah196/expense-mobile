// Sample data for the bar chart
const barChartData = {
  labels: ["Category A", "Category B", "Category C", "Category D"],
  datasets: [
    {
      data: [40, 60, 80, 100],
    },
  ],
};

// Sample data for the pie chart
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
];

export { barChartData, pieChartData };
