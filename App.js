import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InteractWithAI from './InteractWithAI';
import ScheduleNotification from './ScheduleNotification';
import MessageWithMascot from './MessageWithMascot';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Settings() {
  return (
    <View style={styles.centered}>
      <Text>Configurações (futuramente)</Text>
    </View>
  );
}

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'MessageWithMascot') {
            const mascotImage = focused
              ? require('./assets/mascot_selected.png')
              : require('./assets/mascot_neutral.png');
            return (
              <View style={styles.mascotContainer}>
                <Image style={styles.mascotImage} source={mascotImage} />
              </View>
            );
          } else if (route.name === 'InteractWithAI') {
            return <Icon name="chatbubbles" size={size} color={color} />;
          } else if (route.name === 'Settings') {
            return <Icon name="settings" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#007BFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="InteractWithAI"
        component={InteractWithAI}
        options={{
          tabBarLabel: 'Conversa',
        }}
      />
      <Tab.Screen
        name="MessageWithMascot"
        component={MessageWithMascot}
        options={{
          tabBarLabel: 'Dayler',
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Configurações',
        }}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={({ navigation }) => ({
            title: 'App Dayler',
            
            headerRight: () => (
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => navigation.navigate('ScheduleNotification')}
              >
                <Icon name="settings" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="InteractWithAI"
          component={InteractWithAI}
          options={({ navigation }) => ({
            title: 'Interação com IA',
            headerRight: () => (
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => navigation.navigate('ScheduleNotification')}
              >
                <Icon name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ScheduleNotification"
          component={ScheduleNotification}
          options={({ navigation }) => ({
            title: 'Agendar Notificação',
            headerRight: () => (
              <TouchableOpacity
                style={styles.roundButton}
                onPress={() => navigation.navigate('MessageWithMascot')}
              >
                <Icon name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    backgroundColor: '#007BFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mascotContainer: {
    top: '8%',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotImage: {
    width: 30,
    height: 30,
  },
});
