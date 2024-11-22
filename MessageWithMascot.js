import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated, ScrollView, ActivityIndicator } from 'react-native';

export default function MessageWithMascot() {
    const [reaction, setReaction] = useState(null);
    const [response, setResponse] = useState('Selecione como você está se sentindo!');
    const [loading, setLoading] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('😴');
    const [showEmojis, setShowEmojis] = useState(false);

    const getIAResponse = async (reaction) => {
        try {
            setLoading(true);
            const prompt = `Estou me sentindo ${reaction}. O que você diria para me animar?`;

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
            setLoading(false)
            return data.choices?.[0]?.message?.content.trim() || 'Nenhuma resposta gerada.';
        } catch (error) {
            console.error('Erro ao obter resposta da IA', error);
            setLoading(false)
            return 'Desculpe, não consegui entender sua reação.';
        }
    };

    const handleReaction = async (type, emoji) => {
        setReaction(type);
        setSelectedEmoji(emoji);
        setShowEmojis(false);
        const iaMessage = await getIAResponse(type);
        setResponse(iaMessage);
    };

    const getMascotImage = () => {
        switch (reaction) {
            case 'feliz':
                return require('./assets/mascot_happy.png');
            case 'triste':
                return require('./assets/mascot_sad.png');
            case 'raiva':
                return require('./assets/mascot_angry.png');
            case 'fome':
                return require('./assets/mascot_hungry.png');
            case 'preguica':
                return require('./assets/mascot_lazy.png');
            case 'animado':
                return require('./assets/mascot_excited.png');
            default:
                return require('./assets/mascot_neutral.png');
        }
    };

    const toggleEmojis = () => {
        setShowEmojis(!showEmojis);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleEmojis} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>{<Text style={styles.emoji}>{selectedEmoji}</Text>}</Text>
            </TouchableOpacity>

            {showEmojis && (
                <View style={styles.emojisContainer}>
                    <TouchableOpacity onPress={() => handleReaction('feliz', '😀')}>
                        <Text style={styles.emoji}>😀</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('triste', '😢')}>
                        <Text style={styles.emoji}>😢</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('raiva', '😡')}>
                        <Text style={styles.emoji}>😡</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('fome', '🍔')}>
                        <Text style={styles.emoji}>🍔</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('preguica', '😴')}>
                        <Text style={styles.emoji}>😴</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleReaction('animado', '🎉')}>
                        <Text style={styles.emoji}>🎉</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.speechBubble}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.responseText}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#0000ff" />
                        ) : (
                            response
                        )}
                    </Text>
                </ScrollView>
            </View>
            <Image style={styles.mascot} source={getMascotImage()} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#6200ee',
        borderRadius: 20,
        marginBottom: 20,
    },
    toggleButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    emojisContainer: {
        top: '-22%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#eeeeee',
        padding: 10,
        width: '100%',
        zIndex: 1
    },
    emoji: {
        fontSize: 40,
        margin: 10,
    },
    responseText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
        padding: 10,
    },
    speechBubble: {
        position: 'absolute',
        top: '15%',
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: '100%',
        maxWidth: 350,
        alignItems: 'center',
        zIndex: 0,
        minHeight: 50,
        maxHeight: 400,
        overflow: 'hidden'
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingRight: 5,
    },
    mascot: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
});