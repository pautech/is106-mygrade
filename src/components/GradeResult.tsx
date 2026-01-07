import { CheckCircle, AlertTriangle } from 'lucide-react';
// Import the interface we defined in App.tsx
import { Student } from '../App';

interface GradeResultProps {
  student: Student;
}

export function GradeResult({ student }: GradeResultProps) {
  const { status, displayGrade, name, course, instructor } = student;

  // Normalize status check to be case-insensitive just in case
  const isPassed = status === 'Passed';
  const isIntervention = status === 'Intervention';

  if (isPassed) {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="space-y-1">
            <div className="text-green-900 font-bold text-lg">{name}</div>
            <div className="text-green-700 text-sm">{course}</div>
          </div>

          <div className="space-y-2">
            <div className="text-green-700">Final Grade</div>
            <div className="text-green-900 text-5xl font-bold">{displayGrade}</div>
          </div>

          <div className="pt-2">
            <p className="text-green-800 font-medium">
              Congratulations, you have passed!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isIntervention) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-500 rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-red-500 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="space-y-1">
            <div className="text-red-900 font-bold text-lg">{name}</div>
            <div className="text-red-700 text-sm">{course}</div>
          </div>

          {/* Do not display the numeric grade for non-passed statuses */}

          <div className="pt-2 space-y-2 w-full">
            <p className="text-red-800 font-bold">
              Needs Intervention
            </p>
            <p className="text-red-700 text-sm">
              Please contact your instructor immediately.
            </p>
            <div className="mt-4 pt-4 border-t border-red-200 text-sm space-y-3">
              <div className="text-red-800">Instructor: {instructor}</div>
              <div>
                <a 
                  href="https://m.me/j/AbYDXRl2Dp4px5-y" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors shadow-sm"
                >
                  Join Group Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback for unexpected status
  return (
    <div className="text-center text-gray-500 bg-white p-4 rounded shadow">
        Status Unknown: {status}
    </div>
  );
}