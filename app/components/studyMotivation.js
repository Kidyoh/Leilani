"use client";

import React, { useState, useEffect } from 'react';
import { Heart, Coffee, Star, Sun, Moon, Book, Music, Timer, Gift, Camera, Volume2, Download, Brain, CheckCircle } from 'lucide-react';
import {
    Alert,
    AlertTitle,
    AlertDescription
} from '@/app/components/ui/components';
import { Button } from '@/app/components/ui/components';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/app/components/ui/components';

// Separate the data into its own constant
const STUDY_DATA = {
    musicLinks: [
        {
            name: "Peaceful Piano",
            description: "Relaxing piano music for studying",
            url: "https://www.youtube.com/embed/videoseries?list=PLMIbmfP_9vb8BCxRoraJpoo4q1yMFg4CE"
        },
        {
            name: "Lo-Fi Beats",
            description: "Chill beats to study to",
            url: "https://www.youtube.com/embed/videoseries?list=PLOzDu-MXXLliO9fBNZOQTBDddoA3FzZUo"
        },
        {
            name: "Classical Focus",
            description: "Classical masterpieces for concentration",
            url: "https://www.youtube.com/embed/videoseries?list=PLVXq77mXV53_3HqhCLGHh1XxlhBMhk9AV"
        }
    ],
    encouragingMessages: [
        "Leilani, your strength and resilience truly inspire me every day! 🌷",
        "I’ve seen how unstoppable you are when you set your mind to something – you’re amazing! 💥",
        "The way you handle challenges with grace makes me admire you even more. 💖",
        "Every step you take brings you closer to your dreams, and I’m so proud of you! 🌟",
        "Leilani, you’re so capable and brilliant – I hope you always remember that! 💫",
        "Your positivity and light shine so brightly, and it’s contagious! ✨",
        "I’m constantly inspired by everything you do, Leilani. 🌹",
        "You’ve already accomplished so much, and I can’t wait to see what you do next! 💪",
        "You are truly a force to be reckoned with, Leilani! 🔥",
        "Keep being the beautiful, strong person you are – the world needs more of you! 💖",
    ],
    rewards: [
        "🎉 Virtual hug incoming!",
        "⭐ You've earned a dinner date!",
        "🎁 Special surprise waiting for you!",
        "🌟 Movie night earned!",
        "💝 Massage voucher earned!"
    ],
    studyTipsByCategory: {
        general: [
            {
                title: "The Pomodoro Technique",
                content: "Study for 25 minutes, then take a 5-minute break. After 4 sessions, take a longer 15-30 minute break. This helps maintain focus and prevents burnout! 🍅"
            },
            {
                title: "Active Recall",
                content: "Instead of just reading, try to recall the information without looking at your notes. This strengthens memory and identifies gaps in understanding! 🧠"
            },
            {
                title: "Study Space Setup",
                content: "Create a clean, organized study space with good lighting and minimal distractions. Your environment affects your focus! ✨"
            }
        ],
        memory: [
            {
                title: "Mind Mapping",
                content: "Create colorful mind maps to connect related concepts. Visual connections help remember complex information! 🎨"
            },
            {
                title: "The Memory Palace",
                content: "Associate information with familiar places in your home. Walk through these places mentally to recall information! 🏰"
            },
            {
                title: "Chunking Information",
                content: "Break complex information into smaller, manageable chunks. It's easier to remember 3-4 key points than 20 random facts! 📚"
            }
        ],
        wellness: [
            {
                title: "Study Snacks",
                content: "Keep healthy snacks like nuts, fruits, or dark chocolate nearby. They boost brain power and maintain energy levels! 🍎"
            },
            {
                title: "Hydration Reminder",
                content: "Keep a water bottle at your desk and take regular sips. Staying hydrated improves concentration and memory! 💧"
            },
            {
                title: "Power Posture",
                content: "Sit up straight and roll your shoulders back. Good posture increases oxygen flow and helps you stay alert! 💪"
            }
        ],
        motivation: [
            {
                title: "Visualization",
                content: "Take a moment to visualize your goals and success. Picture yourself confidently answering exam questions! 🌟"
            },
            {
                title: "Celebrate Small Wins",
                content: "Acknowledge every chapter completed, every practice question solved. Small victories lead to big achievements! 🎉"
            },
            {
                title: "Progress Tracking",
                content: "Keep a study journal to track your progress. Seeing how far you've come is incredibly motivating! 📈"
            }
        ],
        focus: [
            {
                title: "The 2-Minute Rule",
                content: "If a task takes less than 2 minutes, do it now! Quick wins build momentum and prevent procrastination! ⚡"
            },
            {
                title: "Digital Detox",
                content: "Turn off phone notifications during study sessions. Each interruption costs valuable focus time! 📱"
            },
            {
                title: "Background Sounds",
                content: "Try white noise or nature sounds if music is too distracting. The right background noise can improve focus! 🎵"
            }
        ]
    }
};

// Utility functions
const getRandomTip = (category, tips) => {
    const categoryTips = tips[category];
    const randomIndex = Math.floor(Math.random() * categoryTips.length);
    return categoryTips[randomIndex];
};

const getRandomFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
};

// Sub-components
const TimerCard = ({ isDarkMode, timerMinutes, timerSeconds, completedSessions, isTimerRunning, onTimerToggle }) => (
    <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
            <CardTitle className="flex items-center justify-center">
                <Timer className="mr-2" />
                Study Timer
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-center">
                <p className="text-4xl font-bold mb-2">
                    {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
                </p>
                <p className="text-sm opacity-70 mb-4">Sessions completed: {completedSessions}</p>
                <Button
                    onClick={onTimerToggle}
                    className={`w-full ${isTimerRunning
                            ? 'bg-red-500 hover:bg-red-600'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
                </Button>
            </div>
        </CardContent>
    </Card>
);

const MusicCard = ({ isDarkMode, currentPlaylist, musicLinks, onPlaylistChange }) => (
    <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
            <CardTitle className="flex items-center justify-center">
                <Music className="mr-2" />
                Study Music
            </CardTitle>
            <CardDescription>
                {musicLinks[currentPlaylist].description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
                <iframe
                    width="100%"
                    height="100%"
                    src={musicLinks[currentPlaylist].url}
                    title="Study Music"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
            <Button
                onClick={onPlaylistChange}
                className="w-full"
            >
                Next Playlist
            </Button>
        </CardContent>
    </Card>
);

const LoveNotesCard = ({ isDarkMode, showMessage, messageIndex, encouragingMessages, onSendLove }) => (
    <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
            <CardTitle className="flex items-center justify-center">
                <Heart className="mr-2" />
                Love Notes
            </CardTitle>
        </CardHeader>
        <CardContent>
            <div className="text-center min-h-[100px] flex items-center justify-center mb-4">
                <p className="text-lg animate-fade-in">
                    {showMessage ? encouragingMessages[messageIndex] : "Click for a love note! ❤️"}
                </p>
            </div>
            <Button
                onClick={onSendLove}
                className="w-full bg-red-400 hover:bg-red-500"
            >
                <Heart className="mr-2" /> Send Love
            </Button>
        </CardContent>
    </Card>
);

const StudyTipsCard = ({ isDarkMode, currentTipCategory, currentTip, onCategorySelect, onNextTip }) => (
    <Card className={isDarkMode ? 'bg-gray-800 border-gray-700' : ''}>
        <CardHeader>
            <CardTitle className="flex items-center justify-center">
                <Book className="mr-2" />
                Study Tips
            </CardTitle>
            <CardDescription className="text-center">
                Choose a category for targeted study advice!
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.keys(STUDY_DATA.studyTipsByCategory).map((category) => (
                    <Button
                        key={category}
                        onClick={() => onCategorySelect(category)}
                        className={`${currentTipCategory === category
                                ? 'bg-pink-500 hover:bg-pink-600'
                                : 'bg-gray-500 hover:bg-gray-600'
                            }`}
                        variant="outline"
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                ))}
            </div>
            <div className="text-center min-h-[120px] flex flex-col items-center justify-center p-4 bg-opacity-50 rounded-lg mb-4">
                <h3 className="font-bold mb-2">{currentTip.title || 'Click a category!'}</h3>
                <p className="text-sm">{currentTip.content}</p>
            </div>
            <Button
                onClick={onNextTip}
                className="w-full bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500"
            >
                Next Tip <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
        </CardContent>
    </Card>
);

const RewardCard = ({ isDarkMode, reward, onClaim }) => (
    <Card className={`mt-6 ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}>
        <CardHeader>
            <CardTitle className="flex items-center justify-center">
                <Gift className="mr-2" />
                Special Reward Unlocked!
            </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
            <p className="text-lg mb-4">{reward}</p>
            <Button
                onClick={onClaim}
                className="bg-pink-500 hover:bg-pink-600"
            >
                Claim Reward
            </Button>
        </CardContent>
    </Card>
);

// Main component
const StudyMotivation = () => {
    // States
    const [isDarkMode, setIsDarkMode] = useState(null);
    const [mounted, setMounted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [messageIndex, setMessageIndex] = useState(0);
    const [timerMinutes, setTimerMinutes] = useState(25);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [completedSessions, setCompletedSessions] = useState(0);
    const [showReward, setShowReward] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ title: '', description: '' });
    const [currentTipCategory, setCurrentTipCategory] = useState('general');
    const [currentTip, setCurrentTip] = useState({ title: '', content: '' });

    // Effects
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(prefersDark);
            localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        if (isDarkMode !== null) {
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', isDarkMode);
        }
    }, [isDarkMode]);

    useEffect(() => {
        let interval;
        if (isTimerRunning) {
            interval = setInterval(() => {
                if (timerSeconds === 0) {
                    if (timerMinutes === 0) {
                        clearInterval(interval);
                        setIsTimerRunning(false);
                        setCompletedSessions(prev => prev + 1);
                        showCustomAlert("Session Complete! 🎉", "Great job! Time for a quick break!");
                        if (completedSessions % 4 === 3) {
                            setShowReward(true);
                        }
                        setTimerMinutes(25);
                    } else {
                        setTimerMinutes(prev => prev - 1);
                        setTimerSeconds(59);
                    }
                } else {
                    setTimerSeconds(prev => prev - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, timerMinutes, timerSeconds, completedSessions]);

    // Handlers
    const showCustomAlert = (title, description) => {
        setAlertMessage({ title, description });
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };
    // Continuing the StudyMotivation component...

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
        showCustomAlert(
            !isDarkMode ? "Dark Mode Enabled 🌙" : "Light Mode Enabled ☀️",
            "Your eyes will thank you!"
        );
    };

    const handleTimerToggle = () => {
        setIsTimerRunning(!isTimerRunning);
        showCustomAlert(
            isTimerRunning ? "Timer Paused ⏸️" : "Timer Started ▶️",
            isTimerRunning ? "Take a quick break!" : "You got this!"
        );
    };

    const handlePlaylistChange = () => {
        const nextPlaylist = (currentPlaylist + 1) % STUDY_DATA.musicLinks.length;
        setCurrentPlaylist(nextPlaylist);
        showCustomAlert(
            "Changed Playlist 🎵",
            STUDY_DATA.musicLinks[nextPlaylist].name
        );
    };

    const handleSendLove = () => {
        setShowMessage(true);
        setMessageIndex(prev => (prev + 1) % STUDY_DATA.encouragingMessages.length);
        showCustomAlert("New Love Note 💌", "A message from the heart!");
    };

    const handleCategorySelect = (category) => {
        setCurrentTipCategory(category);
        const newTip = getRandomTip(category, STUDY_DATA.studyTipsByCategory);
        setCurrentTip(newTip);
        showCustomAlert(`Study Tip: ${newTip.title} 📚`, newTip.content);
    };

    const handleNextTip = () => {
        const newTip = getRandomTip(currentTipCategory, STUDY_DATA.studyTipsByCategory);
        setCurrentTip(newTip);
        showCustomAlert(`Study Tip: ${newTip.title} 📚`, newTip.content);
    };

    const handleClaimReward = () => {
        setShowReward(false);
        showCustomAlert("Reward Claimed! 🎁", "You deserve it!");
    };

    // Prevent hydration issues by not rendering until mounted
    if (!mounted) return null;

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isDarkMode
                ? 'dark bg-gray-900 text-white'
                : 'bg-gradient-to-b from-pink-100 to-purple-100'
            }`}>
            <div className="p-8 max-w-6xl mx-auto" id="study-dashboard">
                {/* Header with Dark Mode Toggle */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`}>
                        Hey My Beautiful Leilani! 💖
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={toggleDarkMode}
                            className={isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : ''}
                        >
                            {isDarkMode ? <Sun className="h-4 w-4 text-black" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Alert System */}
                {showAlert && (
                    <Alert className={`mb-4 ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
                        }`}>
                        <AlertTitle>{alertMessage.title}</AlertTitle>
                        <AlertDescription>{alertMessage.description}</AlertDescription>
                    </Alert>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Timer Card */}
                    <TimerCard
                        isDarkMode={isDarkMode}
                        timerMinutes={timerMinutes}
                        timerSeconds={timerSeconds}
                        completedSessions={completedSessions}
                        isTimerRunning={isTimerRunning}
                        onTimerToggle={handleTimerToggle}
                    />

                    {/* Music Card */}
                    <MusicCard
                        isDarkMode={isDarkMode}
                        currentPlaylist={currentPlaylist}
                        musicLinks={STUDY_DATA.musicLinks}
                        onPlaylistChange={handlePlaylistChange}
                    />

                    {/* Love Notes Card */}
                    <LoveNotesCard
                        isDarkMode={isDarkMode}
                        showMessage={showMessage}
                        messageIndex={messageIndex}
                        encouragingMessages={STUDY_DATA.encouragingMessages}
                        onSendLove={handleSendLove}
                    />

                    {/* Study Tips Card */}
                    <StudyTipsCard
                        isDarkMode={isDarkMode}
                        currentTipCategory={currentTipCategory}
                        currentTip={currentTip}
                        onCategorySelect={handleCategorySelect}
                        onNextTip={handleNextTip}
                    />
                </div>

                {/* Rewards Alert */}
                {showReward && (
                    <RewardCard
                        isDarkMode={isDarkMode}
                        reward={getRandomFromArray(STUDY_DATA.rewards)}
                        onClaim={handleClaimReward}
                    />
                )}
            </div>
        </div>
    );
};

export default StudyMotivation;
