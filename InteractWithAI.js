import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native';

export default function InteractWithAI({ navigation }) {

  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
  
    setLoading(true);
    setResponse('');
  
    try {
      const apiKey = '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';
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });
  
      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content.trim() || 'Nenhuma resposta gerada.');
    } catch (error) {
      console.error(error);
      setResponse('Erro ao se comunicar com a IA. Tente novamente.');
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.title}>Chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva seu prompt aqui..."
        value={prompt}
        onChangeText={setPrompt}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSendPrompt} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Enviar</Text>}
      </TouchableOpacity>
      <ScrollView style={styles.responseContainer}>
        <Text style={styles.responseText}>{response}</Text>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 100,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});
