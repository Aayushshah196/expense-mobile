import React from "react";
import { View, ScrollView } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

// Import chart kit and other necessary packages
import { barChartData, pieChartData } from "./data"; // Import sample data

// Define screen width
const screenWidth = Dimensions.get("window").width;

const ChartComponent = () => {
  return (
    <ScrollView style={{ padding: 20 }}>
      {/* Bar Chart */}
      <View style={{ marginBottom: 20 }}>
        <BarChart
          data={barChartData}
          width={screenWidth - 40}
          height={300}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{ borderRadius: 16 }}
        />
      </View>

      {/* Pie Chart */}
      <View style={{ marginBottom: 20 }}>
        <PieChart
          data={pieChartData}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute // Display values as absolute numbers
        />
      </View>
    </ScrollView>
  );
};

export default ChartComponent;
