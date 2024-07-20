'use client';
import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const targetDate = new Date('2025-03-10T00:00:00').getTime();

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ days, hours, minutes, seconds });
            }
        };

        const timer = setInterval(updateTimer, 1000);
        return () => clearInterval(timer);
    }, []);

    const TimerBlock = ({ value, label }) => (
        <div className="flex flex-col items-center m-2">
            <span className="text-foreground font-bold text-lg sm:text-xl md:text-2xl tracking-normal">{label}</span>
            <div className="relative mt-2 w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px]">
                <div className="flex justify-center items-center w-full h-full rounded-2xl bg-secondary border-4 border-secondary overflow-hidden">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                        {value.toString().padStart(2, '0')}
                    </span>
                </div>
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-secondary/50"></div>
            </div>
        </div>
    );

    return (
        <section className="container mx-auto max-w-screen-xl px-4 sm:px-6 md:px-8 lg:px-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tighter text-center text-foreground font-mono">
                The <span className="text-accent underline">datathon</span> timer.
            </h1>
            <div className="rounded-[20px] flex flex-col items-center py-8 px-3 shadow-card mt-5 bg-card">
                <div className="flex flex-wrap justify-center text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter p-3 gap-3">
                    <TimerBlock value={timeLeft.days} label="Days" />
                    <TimerBlock value={timeLeft.hours} label="Hours" />
                    <TimerBlock value={timeLeft.minutes} label="Minutes" />
                    <TimerBlock value={timeLeft.seconds} label="Seconds" />
                </div>
                <h2 className="text-foreground font-bold text-xl sm:text-2xl md:text-3xl tracking-tight text-center mt-6 md:mt-8 lg:mt-12">
                    Till the hacking ends.
                </h2>
                <p className="mt-2 text-muted-foreground text-center text-sm sm:text-base"> Please make sure to submit your projects before the deadline!</p>
            </div>
        </section>
    );
};

export default CountdownTimer;