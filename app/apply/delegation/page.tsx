"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const ApplyDelegate = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    nationalId: '',
    gender: '',
    school: '',
    grade: '',
    city: '',
    motivationLetter: '',
    experience: '',
    committeePreferences: ['', '', ''],
    additionalInfo: '',
    englishLevel: '',
    dietaryPreferences: ''
  });

  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCommitteeChange = (index: number, value: string) => {
    const newPreferences = [...formData.committeePreferences];
    newPreferences[index] = value;
    setFormData(prev => ({
      ...prev,
      committeePreferences: newPreferences
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch('/api/apply/delegate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          name: formData.fullName,
          lang: 'en'
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit application');
      }

      setMessage({ text: result.message, isError: false });
      setVerificationModalOpen(true);
    } catch (error) {
      setMessage({ 
        text: error instanceof Error ? error.message : 'An unexpected error occurred',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch('/api/verify/delegation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: verificationCode,
          lang: 'en',
          ...formData
        })
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Verification failed');
      }

      setMessage({ text: result.message, isError: false });
      window.location.href = '/success';
    } catch (error) {
      setMessage({ 
        text: error instanceof Error ? error.message : 'Verification failed',
        isError: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='flex flex-col h-[80vh] justify-center items-center gap-10 max-sm:gap-6'>
        <h1 className="text-7xl max-sm:text-5xl text-center text-[#172D7F] font-bold">Coming Soon</h1>
        <Link href="/" className="w-fit">
          <button className="group max-sm:text-base text-xl hover:text-[#172D7F] cursor-pointer items-center transition-colors justify-center gap-4 max-sm:gap-2 inline-flex bg-[#0c0c0c] text-[#ffffff] rounded-full px-8 max-sm:px-6 max-sm:py-3 py-4">
            Home
            <Image
              src="/arrowWhite.svg" 
              width={20} 
              height={16} 
              alt=""
              className="transition-transform duration-400 max-sm:w-[15px] h-auto group-hover:translate-x-2"
            />
            
          </button>
        </Link>
      </div>
    </>
    /*
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl max-sm:text-3xl mt-16 mb-16 max-sm:mt-8 text-center text-[#172D7F] font-bold">
            Delegate Application Form
          </h1>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${message.isError ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-[#172D7F]">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Birth Date *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="0555 123 4567"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  National ID *
                </label>
                <input
                  type="text"
                  name="nationalId"
                  value={formData.nationalId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="12345678901"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer Not To Say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  name="school"
                  value={formData.school}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="Enter your school/university name"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Grade/Level *
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select grade/level</option>
                  <option value="Preparation Grade">Preparation</option>
                  <option value="9th Grade">9th Grade</option>
                  <option value="10th Grade">10th Grade</option>
                  <option value="11th Grade">11th Grade</option>
                  <option value="12th Grade">12th Grade</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="Enter your current city"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-[#172D7F]">
              Application Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Motivation Letter *
                </label>
                <textarea
                  name="motivationLetter"
                  value={formData.motivationLetter}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us why you want to be a delegate and what motivates you..."
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  placeholder="Describe your relevant experience, leadership roles, projects, etc..."
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Committee Preferences (Top 3) *
                </label>
                <div className="space-y-3">
                  {[0, 1, 2].map((index) => (
                    <div key={index}>
                      <select
                        value={formData.committeePreferences[index]}
                        onChange={(e) => handleCommitteeChange(index, e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        required={index === 0}
                      >
                        <option value="">{`${index + 1}. Choice`}</option>
                        <option value="unsc">UN Security Council (UNSC)</option>
                        <option value="unhrc">UN Human Rights Council (UNHRC)</option>
                        <option value="ecosoc">Economic and Social Council (ECOSOC)</option>
                        <option value="disec">Disarmament and International Security Committee (DISEC)</option>
                        <option value="specpol">Special Political and Decolonization Committee (SPECPOL)</option>
                        <option value="legal">Legal Committee</option>
                        <option value="crisis">Crisis Committee</option>
                        <option value="press">Press Corps</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  English Level *
                </label>
                <select
                  name="englishLevel"
                  value={formData.englishLevel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select your English level</option>
                  <option value="beginner">Beginner (A1-A2)</option>
                  <option value="intermediate">Intermediate (B1-B2)</option>
                  <option value="advanced">Advanced (C1-C2)</option>
                  <option value="native">Native/Bilingual</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Dietary Preferences
                </label>
                <select
                  name="dietaryPreferences"
                  value={formData.dietaryPreferences}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                >
                  <option value="">No specific preferences</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Halal">Halal</option>
                  <option value="Kosher">Kosher</option>
                  <option value="Gluten-free">Gluten-free</option>
                  <option value="Dairy-free">Dairy-free</option>
                  <option value="Other">Other (please specify in additional info)</option>
                </select>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                  placeholder="Anything else you'd like us to know..."
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-8 py-4 mb-8 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 bg-[#172D7F] ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>

        {verificationModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-[#172D7F]">Verify Your Email</h2>
              <p className="mb-4">We've sent a verification code to {formData.email}</p>
              
              <form onSubmit={handleVerificationSubmit}>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter verification code"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 cursor-pointer bg-[#172D7F] text-white rounded-lg ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#1a3a9e]'
                  }`}
                >
                  {isSubmitting ? 'Verifying...' : 'Verify'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
    */
  );
};

export default ApplyDelegate;