import { Text, Box, Image } from "native-base";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const loading = require("../assets/loading.gif");

export default function Loading() {
  return (
    <SafeAreaView style={styles.container}>
      <Box style={styles.textBox}>
        <Image stylt={styles.loading} source={loading} alt="progress" />
      </Box>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  textBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loading: {
    resizeMode:"cover"
  },

  profileBox: {
    marginHorizontal: 30,
  },
  inputBox: {
    marginHorizontal: 40,
    marginVertical: 20,
  },
});
