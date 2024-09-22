import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/input";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  }
})

export default function Create() {
  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando Dieta" />
    </View>
  );
}
