"use client";
import React from 'react';

interface WelcomeHeaderProps {
  username: string;
}

export default function WelcomeHeader({ username }: WelcomeHeaderProps) {
  return <h1 className="text-3xl font-bold mb-8">Welcome, {username}</h1>;
}