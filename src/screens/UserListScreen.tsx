import { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, User } from "../types";
import { useUsers } from "../hooks/useUsers";

type Props = NativeStackScreenProps<RootStackParamList, "List">;

export default function UserListScreen({ navigation }: Props) {
  const [gender, setGender] = useState("");
  const [nat, setNat] = useState("");
  const [search, setSearch] = useState("");

  const { users, loading, refreshing, error, refresh, loadMore, reset } =
    useUsers({ gender, nat });

  useEffect(() => {
    reset();
  }, [gender, nat]);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter((u) =>
      `${u.name.first} ${u.name.last}`.toLowerCase().includes(q),
    );
  }, [users, search]);

  const handlePress = (user: User) => navigation.navigate("Profile", { user });

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryBtn} onPress={reset}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 15,
    textAlign: "center",
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: "#6c63ff",
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: { color: "#fff", fontWeight: "600" },
  emptyText: {
    textAlign: "center",
    marginTop: 60,
    color: "#aaa",
    fontSize: 15,
  },
});
