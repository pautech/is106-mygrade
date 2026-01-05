import { useState } from 'react';
import { GradeResult } from './components/GradeResult';
import { supabase } from './supabaseClient';

// Define the shape of our student object locally
export interface Student {
  id: string;
  name: string;
  course: string;
  semester: string;
  status: 'Passed' | 'Intervention';
  // `displayGrade` should be provided by the server (sanitized). Frontend must not decide.
  displayGrade: string;
  instructor: string;
}

export default function App() {
  const [studentId, setStudentId] = useState('');
  const [result, setResult] = useState<Student | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckGrades = async () => {
    setError('');
    setResult(null);

    if (!studentId.trim()) {
      setError('Please enter an ID number');
      return;
    }

    try {
      setLoading(true);

      // 1. Fetch from Supabase
      // We look for a student where the 'ID' column matches the input
      console.log('Lookup ID:', studentId.trim());

      const { data, error } = await supabase
        .from('studentgradeDB')
        .select('*')
        .eq('ID', studentId.trim())
        .maybeSingle(); // .maybeSingle() returns null if not found, instead of an error

      console.log('Primary query result:', { data, error });

      if (error) throw error;

      if (data) {
        // 2. Map Database Columns to App Structure
        // Database: ID, LASTNAME, STATUS, Final Grade
        // App: id, name, status, grade
        // Expect the server to return a sanitized `display_grade` field.
        const studentRecord: Student = {
          id: data.ID,
          name: data.LASTNAME,
          status: data.STATUS,
          displayGrade: data.display_grade ?? data['Final Grade'] ?? 'INC',
          course: 'Information Security and Management',
          semester: 'Fall 2025',
          instructor: 'Paulo A. Duga'
        };

        setResult(studentRecord);
      } else {
        // Try a fallback case-insensitive / partial match to help debugging.
        console.log('No exact match found, trying fallback queries...');
        try {
          const idTrim = studentId.trim();
          const { data: fallback1, error: fbErr1 } = await supabase
            .from('studentgradeDB')
            .select('*')
            .ilike('ID', `%${idTrim}%`)
            .limit(1);

          console.log('Fallback ilike result:', { fallback1, fbErr1 });

          if (fbErr1) throw fbErr1;

          if (fallback1 && fallback1.length > 0) {
            const d = fallback1[0];
            const studentRecord: Student = {
              id: d.ID,
              name: d.LASTNAME,
              status: d.STATUS,
              grade: d['Final Grade'],
              course: 'Information Security and Management',
              semester: 'Fall 2025',
              instructor: 'Paulo A. Duga'
            };
            setResult(studentRecord);
            return;
          }

          // Also try lowercase 'id' column in case the DB uses a different column name
          const { data: fallback2, error: fbErr2 } = await supabase
            .from('studentgradeDB')
            .select('*')
            .ilike('id', `%${idTrim}%`)
            .limit(1);

          console.log('Fallback lowercase id result:', { fallback2, fbErr2 });

          if (fbErr2) throw fbErr2;

          if (fallback2 && fallback2.length > 0) {
            const d = fallback2[0];
            const studentRecord: Student = {
              id: d.id || d.ID,
              name: d.LASTNAME || d.lastName,
              status: d.STATUS || d.status,
              grade: d['Final Grade'] || d.final_grade,
              course: 'Information Security and Management',
              semester: 'Fall 2025',
              instructor: 'Paulo A. Duga'
            };
            setResult(studentRecord);
            return;
          }

        } catch (fbErr) {
          console.error('Fallback query error:', fbErr);
        }

        setError('Student ID not found. Please check your ID number and try again.');
      }

    } catch (err) {
      console.error('Error fetching grade:', err);
      setError('System error. Please try again later.');
    } finally {
      setLoading(false);
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
          <h1 className="text-center mb-6 text-2xl font-bold text-slate-800">Grade Checker</h1>
          
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
                disabled={loading}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-100"
              />
            </div>

            <button
              onClick={handleCheckGrades}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors disabled:bg-blue-400"
            >
              {loading ? 'Checking...' : 'Check Grades'}
            </button>

            {error && (
              <div className="text-red-600 text-center text-sm bg-red-50 py-2 px-4 rounded border border-red-100">
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