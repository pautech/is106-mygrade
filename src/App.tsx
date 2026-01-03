import { useState } from 'react';
import { GradeResult } from './components/GradeResult';
import { studentData, Student } from './data/studentData';

export default function App() {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState<Student | null>(null);
  const [error, setError] = useState('');

  const handleCheckGrades = () => {
    setError('');
    setResult(null);

    if (!studentId.trim()) {
      setError('Please enter an ID number');
      return;
    }

    const student = studentData[studentId];
    
    if (student) {
      setResult(student);
    } else {
      setError('Student ID not found. Please check your ID number and try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheckGrades();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Search Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <h1 className="text-center mb-6">Grade Checker</h1>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="studentId" className="block mb-2 text-slate-700">
                Student ID Number
              </label>
              <input
                id="studentId"
                type="text"
                placeholder="Enter ID Number (e.g., 221-00295)"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={handleCheckGrades}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
            >
              Check Grades
            </button>

            {error && (
              <div className="text-red-600 text-center text-sm bg-red-50 py-2 px-4 rounded">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* Grade Result */}
        {result && <GradeResult student={result} />}
      </div>
    </div>
  );
}