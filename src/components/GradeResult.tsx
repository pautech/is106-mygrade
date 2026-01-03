import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Student } from '../data/studentData';

interface GradeResultProps {
  student: Student;
}

export function GradeResult({ student }: GradeResultProps) {
  const { status, grade, name, course, instructor } = student;

  if (status === 'Passed') {
    return (
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-green-500 rounded-full p-4">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="space-y-1">
            <div className="text-green-900">{name}</div>
            <div className="text-green-700 text-sm">{course}</div>
          </div>

          <div className="space-y-2">
            <div className="text-green-700">Grade</div>
            <div className="text-green-900 text-5xl">{grade}</div>
          </div>

          <div className="pt-2">
            <p className="text-green-800">
              Congratulations, you have passed!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'Intervention') {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-500 rounded-lg shadow-lg p-8 animate-fadeIn">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="bg-red-500 rounded-full p-4">
            <AlertTriangle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          
          <div className="space-y-1">
            <div className="text-red-900">{name}</div>
            <div className="text-red-700 text-sm">{course}</div>
          </div>

          <div className="space-y-2">
            <div className="text-red-700">Grade</div>
            <div className="text-red-900 text-5xl">INC</div>
          </div>

          <div className="pt-2 space-y-2">
            <p className="text-red-800">
              Need of Intervention
            </p>
            <p className="text-red-700 text-sm">
              Please contact your instructor asap
            </p>
            <div className="mt-4 pt-4 border-t border-red-200 text-sm space-y-2">
              <div className="text-red-800">Instructor: {instructor}</div>
              <div>
                <a 
                  href="https://m.me/j/AbaBsE4F_DRp-Z5O/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
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

  return null;
}