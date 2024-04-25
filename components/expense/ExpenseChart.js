import { View, Text, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
import { ChartData } from "react-native-chart-kit/dist/HelperTypes";

const data = {
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

export default function ExpenseSummaryChart() {
  return (
    <View>
      <Text>My Line Chart</Text>
      <LineChart
        data={data}
        width={Dimensions.get("window").width}
        height={200}
        yAxisLabel={"$"}
        chartConfig={{
          backgroundGradientFrom: "darkblue",
          backgroundGradientTo: "blue",
          color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
        }}
      />
    </View>
  );
}
