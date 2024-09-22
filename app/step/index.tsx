import { Text, View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../../constants/colors";
import { Header } from "../../components/header";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/input";

const schema = z.object({
  name: z.string().min(1, { message: 'O nome é obrigatório'}),
  weight: z.string().min(1, { message: 'O nome é obrigatório'}),
  age: z.string().min(1, { message: 'A idade é obrigatório'}),
  height: z.string().min(1, { message: 'A altura é obrigatório'}),
})

type FormData = z.infer<typeof schema>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },

  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8
  }
})

export default function Step(){
  const { control, handleSubmit, formState: { errors, isValid }} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  return(
    <View style={styles.container}>
      <Header step="Passo 1" title="Vamos começar"/>
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input name="name" control={control} placeholder="Digite o seu nome..." error={errors.name?.message} keyboardType="numeric"/>
      </ScrollView>
    </View>
  )
}
