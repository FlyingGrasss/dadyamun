"use client"

import { useState } from 'react';

interface DelegateFormData {
  fullName: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  nationalId: string;
  gender: string;
  grade: string;
  city: string;
  accomodation: string;
  motivationLetter: string;
  experience: string;
  committeePreferences: string[];
  additionalInfo: string;
  englishLevel: string;
  dietaryPreferences: string;
}

const ApplyDelegation = () => {
  const [delegationInfo, setDelegationInfo] = useState({
    school: '',
    email: '',
    numberOfDelegates: 8
  });
  
  const [delegates, setDelegates] = useState<DelegateFormData[]>(
    Array(8).fill({
      fullName: '',
      birthDate: '',
      phoneNumber: '',
      email: '',
      nationalId: '',
      gender: '',
      grade: '',
      city: '',
      accomodation: '',
      motivationLetter: '',
      experience: '',
      committeePreferences: ['', '', ''],
      additionalInfo: '',
      englishLevel: '',
      dietaryPreferences: ''
    })
  );

  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formsGenerated, setFormsGenerated] = useState(false);

  const handleDelegationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDelegationInfo(prev => ({
      ...prev,
      [name]: name === 'numberOfDelegates' ? parseInt(value) : value
    }));
  };

  const handleGenerateForms = () => {
    if (delegationInfo.numberOfDelegates < 8) {
      setMessage({ text: 'Minimum number of delegates is 8', isError: true });
      return;
    }
    
    setDelegates(
      Array(delegationInfo.numberOfDelegates).fill({
        fullName: '',
        birthDate: '',
        phoneNumber: '',
        email: '',
        nationalId: '',
        gender: '',
        grade: '',
        city: '',
        accomodation: '',
        motivationLetter: '',
        experience: '',
        committeePreferences: ['', '', ''],
        additionalInfo: '',
        englishLevel: '',
        dietaryPreferences: ''
      })
    );
    
    setFormsGenerated(true);
    setMessage({ text: '', isError: false });
  };

  const handleDelegateChange = (index: number, field: string, value: string) => {
    const newDelegates = [...delegates];
    newDelegates[index] = {
      ...newDelegates[index],
      [field]: value
    };
    setDelegates(newDelegates);
  };

  const handleCommitteeChange = (delegateIndex: number, prefIndex: number, value: string) => {
    const newDelegates = [...delegates];
    const newPreferences = [...newDelegates[delegateIndex].committeePreferences];
    newPreferences[prefIndex] = value;
    
    newDelegates[delegateIndex] = {
      ...newDelegates[delegateIndex],
      committeePreferences: newPreferences
    };
    
    setDelegates(newDelegates);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: '', isError: false });

    try {
      const response = await fetch('/api/apply/delegation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          school: delegationInfo.school,
          email: delegationInfo.email,
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
          school: delegationInfo.school,
          email: delegationInfo.email,
          numberOfDelegates: delegationInfo.numberOfDelegates,
          delegates,
          code: verificationCode,
          lang: 'en'
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
    <div className="min-h-screen px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl max-sm:text-3xl mt-16 mb-16 max-sm:mt-8 text-center text-[#172D7F] font-bold">
            Delegation Application Form
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
              Delegation Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-white text-sm font-medium mb-2">
                  School Name *
                </label>
                <input
                  type="text"
                  name="school"
                  value={delegationInfo.school}
                  onChange={handleDelegationChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="Enter your school/university name"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Contact Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={delegationInfo.email}
                  onChange={handleDelegationChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  placeholder="delegation.email@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Number of Delegates * (Minimum 8)
                </label>
                <input
                  type="number"
                  name="numberOfDelegates"
                  value={delegationInfo.numberOfDelegates}
                  onChange={handleDelegationChange}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                  min="8"
                  required
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={handleGenerateForms}
                className="px-6 py-3 cursor-pointer bg-[#172D7F] text-white rounded-lg hover:bg-[#1a3a9e] transition-colors"
              >
                Generate Delegate Forms
              </button>
            </div>
          </div>

          {formsGenerated && (
            <div className="space-y-8">
              {delegates.map((delegate, index) => (
                <div key={index} className="bg-gray-800 rounded-xl p-8 shadow-2xl">
                  <h2 className="text-2xl font-semibold mb-6 text-[#172D7F]">
                    Delegate #{index + 1}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={delegate.fullName}
                        onChange={(e) => handleDelegateChange(index, 'fullName', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        placeholder="Enter delegate's full name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Birth Date *
                      </label>
                      <input
                        type="date"
                        value={delegate.birthDate}
                        onChange={(e) => handleDelegateChange(index, 'birthDate', e.target.value)}
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
                        value={delegate.phoneNumber}
                        onChange={(e) => handleDelegateChange(index, 'phoneNumber', e.target.value)}
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
                        value={delegate.email}
                        onChange={(e) => handleDelegateChange(index, 'email', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        placeholder="delegate.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        National ID *
                      </label>
                      <input
                        type="text"
                        value={delegate.nationalId}
                        onChange={(e) => handleDelegateChange(index, 'nationalId', e.target.value)}
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
                        value={delegate.gender}
                        onChange={(e) => handleDelegateChange(index, 'gender', e.target.value)}
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
                        Grade/Level *
                      </label>
                      <select
                        value={delegate.grade}
                        onChange={(e) => handleDelegateChange(index, 'grade', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select grade/level</option>
                        <option value="Secondary (Middle) School">Secondary (Middle) School</option>
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
                        value={delegate.city}
                        onChange={(e) => handleDelegateChange(index, 'city', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        placeholder="Enter delegate's current city"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Will you need accommodation? * (Will be provided in discounted apartments and will be charged) (Available space is limited)
                      </label>
                      <select
                        value={delegate.accomodation}
                        onChange={(e) => handleDelegateChange(index, 'accomodation', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Choose accommodation</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">
                        Motivation Letter *
                      </label>
                      <textarea
                        value={delegate.motivationLetter}
                        onChange={(e) => handleDelegateChange(index, 'motivationLetter', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                        placeholder="Tell us why this delegate should be selected..."
                        required
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">
                        Experience
                      </label>
                      <textarea
                        value={delegate.experience}
                        onChange={(e) => handleDelegateChange(index, 'experience', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                        placeholder="Describe delegate's relevant experience..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">
                        Committee Preferences (Top 3) *
                      </label>
                      <div className="space-y-3">
                        {[0, 1, 2].map((prefIndex) => (
                          <div key={prefIndex}>
                            <select
                              value={delegate.committeePreferences[prefIndex]}
                              onChange={(e) => handleCommitteeChange(index, prefIndex, e.target.value)}
                              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                              required={prefIndex === 0}
                            >
                              <option value="">{`${prefIndex + 1}. Choice`}</option>
                              <option value="UNICEF">UN Children's Found [Only Juniors] (UNICEF)</option>
                              <option value="UNODC">UN Office for Drugs and Crime (UNODC)</option>
                              <option value="TDT">Türkiye Devleteri Başkanı (TDT)</option>
                              <option value="CERN">Conseil Européen pour la Recherche Nucléaire (CERN)</option>
                              <option value="T-MKK">Fransa - Prusya Savaşı (T-MKK)</option>
                              <option value="H-UNSC">UN Security Council (H-UNSC)</option>
                              <option value="H-JCC">Ottoman - Safevid Wars (H-JCC)</option>
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
                        value={delegate.englishLevel}
                        onChange={(e) => handleDelegateChange(index, 'englishLevel', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select English level</option>
                        <option value="Beginner">Beginner (A1-A2)</option>
                        <option value="Intermediate">Intermediate (B1-B2)</option>
                        <option value="Advanced">Advanced (C1-C2)</option>
                        <option value="Native">Native/Bilingual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white text-sm font-medium mb-2">
                        Dietary Preferences
                      </label>
                      <select
                        value={delegate.dietaryPreferences}
                        onChange={(e) => handleDelegateChange(index, 'dietaryPreferences', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                      >
                        <option value="">No specific preferences</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Halal">Halal</option>
                        <option value="Kosher">Kosher</option>
                        <option value="Gluten-free">Gluten-free</option>
                        <option value="Dairy-free">Dairy-free</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white text-sm font-medium mb-2">
                        Additional Information
                      </label>
                      <textarea
                        value={delegate.additionalInfo}
                        onChange={(e) => handleDelegateChange(index, 'additionalInfo', e.target.value)}
                        rows={2}
                        className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none"
                        placeholder="Any additional information about this delegate..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {formsGenerated && (
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 mb-8 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-500 bg-[#172D7F] ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Delegation Application'}
              </button>
            </div>
          )}
        </form>

        {verificationModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 bg-black flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-[#172D7F]">Verify Your Email</h2>
              <p className="mb-4">We've sent a verification code to {delegationInfo.email}</p>
              
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
  );
};

export default ApplyDelegation;
