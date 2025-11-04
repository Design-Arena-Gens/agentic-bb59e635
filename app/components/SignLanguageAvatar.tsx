'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { signLanguageDatabase } from '../data/signLanguageData';

interface SignLanguageAvatarProps {
  word: string;
}

export default function SignLanguageAvatar({ word }: SignLanguageAvatarProps) {
  const signData = signLanguageDatabase[word.toLowerCase()] || signLanguageDatabase['default'];

  if (!word) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-4"
        >
          👤
        </motion.div>
        <p className="text-lg">Waiting for input...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={word}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        {/* Avatar Head */}
        <motion.div
          animate={{
            rotate: signData.headRotation || 0,
            y: signData.headMovement || 0,
          }}
          transition={{ duration: 0.5 }}
          className="relative mb-4"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
            <motion.div
              animate={{ scale: signData.expressionScale || 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl"
            >
              {signData.expression}
            </motion.div>
          </div>
        </motion.div>

        {/* Avatar Body */}
        <div className="relative">
          <div className="w-16 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg" />
        </div>

        {/* Left Arm */}
        <motion.div
          animate={{
            rotate: signData.leftArmRotation || -45,
            x: signData.leftArmX || -30,
            y: signData.leftArmY || -60,
          }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="absolute"
          style={{ transformOrigin: 'top right' }}
        >
          <div className="w-12 h-3 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-md" />
          <motion.div
            animate={{
              rotate: signData.leftHandRotation || 0,
              scale: signData.leftHandScale || 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute -right-1 -top-1 text-3xl"
          >
            {signData.leftHand}
          </motion.div>
        </motion.div>

        {/* Right Arm */}
        <motion.div
          animate={{
            rotate: signData.rightArmRotation || 45,
            x: signData.rightArmX || 30,
            y: signData.rightArmY || -60,
          }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
          className="absolute"
          style={{ transformOrigin: 'top left' }}
        >
          <div className="w-12 h-3 bg-gradient-to-l from-blue-400 to-blue-600 rounded-full shadow-md" />
          <motion.div
            animate={{
              rotate: signData.rightHandRotation || 0,
              scale: signData.rightHandScale || 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute -left-1 -top-1 text-3xl"
          >
            {signData.rightHand}
          </motion.div>
        </motion.div>

        {/* Sign Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-28 text-center"
        >
          <p className="text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-md">
            {signData.description}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
