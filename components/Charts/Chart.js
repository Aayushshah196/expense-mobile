import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { BarChart, PieChart, LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import {
  getSummaryByLedger,
  getSummaryByDate,
  getSummaryByType,
} from "../../requests";
import { convertToPieChartData, convertToChartData } from "./utils";

// Import chart kit and other necessary packages
import { barChartData, pieChartData, timeSeriesData } from "./utils"; // Import sample data

// Define screen width
const screenWidth = Dimensions.get("window").width;

const ChartComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [ledgerSummary, setLedgerSummary] = useState([]);
  const [typeSummary, setTypeSummary] = useState([]);
  const [dateSummary, setDateSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch data each time the page is focused
  useFocusEffect(
    useCallback(() => {
      const fetchLedgerData = async () => {
        setLoading(true);
        try {
          const res = await getSummaryByLedger(currentUser.id);
          if (res.success) {
            const pieChartData = convertToPieChartData(res.data);
            console.log("Ledger data: ", pieChartData);
            setLedgerSummary(pieChartData);
          }
        } catch (error) {
          setError(error.message);
        }
      };
      const fetchTypeData = async () => {
        setLoading(true);
        try {
          const res = await getSummaryByType(currentUser.id);
          if (res.success) {
            const pieChartData = convertToPieChartData(res.data);
            console.log("Type data: ", pieChartData);
            setTypeSummary(pieChartData);
          }
        } catch (error) {
          setError(error.message);
        }
      };
      const fetchDateData = async () => {
        setLoading(true);
        try {
          const res = await getSummaryByDate(currentUser.id);
          if (res.success) {
            const pieChartData = convertToChartData(res.data);
            setDateSummary(pieChartData);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchLedgerData();
      fetchTypeData();
      fetchDateData();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Text>Expense Time Series</Text>
        <LineChart
          data={{
            datasets: [
              {
                data: dateSummary.map((item) => item.y),
                strokeWidth: 2, // Thickness of the line
              },
            ],
            labels: dateSummary.map((item) => item.x),
          }}
          width={screenWidth}
          height={250}
          yAxisLabel="$"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{ marginVertical: 8, borderRadius: 16 }}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Ledger Expense Summary</Text>
        <PieChart
          data={ledgerSummary}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
            // Customize data label appearance
            dataLabelColor: () => `rgba(0, 0, 0, 0.7)`, // Set data label color
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute={true} // Display values as absolute numbers
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <Text>Expense Type Summary</Text>
        <PieChart
          data={typeSummary}
          width={screenWidth - 40}
          height={250}
          chartConfig={{
            backgroundColor: "#1cc910",
            backgroundGradientFrom: "#eff3ff",
            backgroundGradientTo: "#efefef",
            color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
            strokeWidth: 2,
            // Customize data label appearance
            dataLabelColor: () => `rgba(0, 0, 0, 0.7)`, // Set data label color
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute={true} // Display values as absolute numbers
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChartComponent;

{
  /* Bar Chart */
}
// <View style={{ marginBottom: 20 }}>
//   <BarChart
//     data={barChartData}
//     width={screenWidth - 40}
//     height={300}
//     chartConfig={{
//       backgroundColor: "#e26a00",
//       backgroundGradientFrom: "#fb8c00",
//       backgroundGradientTo: "#ffa726",
//       decimalPlaces: 2,
//       color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//       style: {
//         borderRadius: 16,
//       },
//     }}
//     style={{ borderRadius: 16 }}
//   />
// </View>
