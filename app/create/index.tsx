import { Text, View, Image, StyleSheet, ScrollView, Pressable } from "react-native";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from "@/components/input";
import { colors } from "@/constants/colors";
import { Header } from "@/components/header";
import { Select } from "@/components/input/select";
import { useDataStore } from "../store/data";
import { router } from "expo-router";


const schema = z.object({
  gender: z.string().min(1, { message: 'O sexo é obrigatório'}),
  objective: z.string().min(1, { message: 'O objetivo é obrigatório'}),
  level: z.string().min(1, { message: 'Selecione o seu nivel'}),
})

type FormData = z.infer<typeof schema>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 8
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: colors.green,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  }
})

export default function Create() {
  const { control, handleSubmit, formState: { errors, isValid }} = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageTwo = useDataStore(state => state.setPageTwo)

  const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
  ]

  const levelOptions = [
    { label: 'Sedentário (pouco ou nenhuma atividade fisíca)', value: 'Sedentário' },
    { label: 'Levemente ativo (exercicios 1 a 3 vezes na semana)', value: 'Levemente ativo (exercicios 1 a 3 vezes na semana)' },
    { label: 'Moderadamente ativo (exercicios 3 a 5 vezes na semana)', value: 'Moderadamente ativo (exercicios 3 a 5 vezes na semana)' },
    { label: 'Altamente ativo (exercicios 5 a 7 dia por semana)', value: 'Altamente ativo (exercicios 5 a 7 dia por semana)' },
  ]

  const objectiveOptions = [
    { label: 'Emagrecer', value: 'Emagrecer' },
    { label: 'Hipertrofia', value: 'Hipertrofia' },
    { label: 'Definição', value: 'Definição' },
    { label: 'Hipertrofia + Definição', value: 'Hipertrofia + Definição' },
  ]

  function handleCreate(data: FormData) {
    console.log(data)
    setPageTwo({
      level: data.level,
      gender: data.gender,
      objective: data.objective
    })

    router.push('/nutrition')
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando Dieta" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          name="gender"
          control={control}
          placeholder="Selecione o seu sexo"
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Selecione o nível de atividade fisica:</Text>
        <Select
          name="level"
          control={control}
          placeholder="Selecione o seu nível de atividade fisica"
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          name="objective"
          control={control}
          placeholder="Selecione o seu objetivo"
          error={errors.objective?.message}
          options={objectiveOptions}
        />
        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
