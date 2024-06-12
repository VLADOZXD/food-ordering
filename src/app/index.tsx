import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect } from "expo-router";
import { useAuth } from "@/provider/AuthProvider";
import { supabase } from "@/lib/supabase";

const index = () => {
  const { session, loading, isAdmin, profile } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  if (!session) {
    return <Redirect href={"/sign-in"} />;
  }

  if (profile?.group !== "ADMIN") {
    console.log(profile?.group !== "ADMIN");
    return <Redirect href={"/(user)"} />;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(user)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign out" />
    </View>
  );
};

export default index;
