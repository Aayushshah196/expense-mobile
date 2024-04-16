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

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
// } from "react-native";
// import { getExpenseSummary } from "../requests";

// const ExpenseSummaryChart = () => {
//   const [loading, setLoading] = useState(true);
//   const [expenseSummary, setExpenseSummary] = useState([]);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchExpenseSummary = async () => {
//       console.log("fetching expense summary");
//       res = await getExpenseSummary();
//       if (res.success) {
//         setExpenseSummary(res.data);
//         setLoading(false);
//       } else {
//         setLoading(false);
//         setError(res.error);
//       }
//     };

//     fetchExpenseSummary();
//   }, []);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={expenseSummary}
//       keyExtractor={(item, index) => index}
//       renderItem={({ item }) => (
//         <View style={styles.itemContainer}>
//           <Text style={styles.userId}>{item.user_id}</Text>
//           <Text>Total Paid: {item.total_paid_amount}</Text>
//           <Text>Total Expenditure: {item.total_expenditure}</Text>
//           <Text
//             style={{
//               color:
//                 item.to_pay < 0 ? "green" : item.to_pay > 0 ? "red" : "black",
//             }}
//           >
//             To Pay: {item.to_pay}
//           </Text>
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   itemContainer: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     padding: 10,
//   },
//   userId: {
//     fontWeight: "bold",
//   },
// });

// export default ExpenseSummaryChart;
