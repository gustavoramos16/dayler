import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import PushNotification from 'react-native-push-notification';

export default function ScheduleNotification() {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');

  const scheduleNotification = () => {
    const hourInt = parseInt(hour, 10);
    const minuteInt = parseInt(minute, 10);

    if (isNaN(hourInt) || isNaN(minuteInt) || hourInt < 0 || hourInt > 23 || minuteInt < 0 || minuteInt > 59) {
      Alert.alert('Erro', 'Insira um horário válido (HH:MM).');
      return;
    }

    const now = new Date();
    const notificationTime = new Date();
    notificationTime.setHours(hourInt, minuteInt, 0, 0);

    // Se o horário já passou hoje, agenda para amanhã
    if (notificationTime <= now) {
      notificationTime.setDate(now.getDate() + 1);
    }

    PushNotification.localNotificationSchedule({
      message: 'Esta é sua mensagem diária!', // Mensagem enviada
      date: notificationTime, // Horário inicial
      repeatType: 'day', // Repetir diariamente
    });

    Alert.alert('Notificação Agendada', `Você receberá mensagens diariamente às ${hour}:${minute}.`);
    setHour('');
    setMinute('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendar Notificação Diária</Text>
      <TextInput
        style={styles.input}
        placeholder="Hora (HH)"
        keyboardType="numeric"
        value={hour}
        onChangeText={setHour}
      />
      <TextInput
        style={styles.input}
        placeholder="Minuto (MM)"
        keyboardType="numeric"
        value={minute}
        onChangeText={setMinute}
      />
      <TouchableOpacity style={styles.button} onPress={scheduleNotification}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
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
    textAlign: 'center',
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
});