export interface Student {
  id: string;
  name: string;
  course: string;
  semester: string;
  status: 'Passed' | 'Intervention';
  grade: string;
  instructor: string;
}

// Raw student data from Excel file
// To update: Edit the data below (copy from /data/students.xlsx)
const rawStudentData = `ID	LASTNAME	STATUS	Final Grade
221-00295	ACIBAR	Passed	2
221-02059	BALE	Passed	2
221-00448	BARCIAL	Passed	1.5
221-00504	BEROU	Passed	1.75
221-00326	BONGATO	Passed	1.75
221-00156	BRANGAN	Passed	2
221-02245	BULAGSAC	Passed	1.75
221-02402	BURATO	Passed	2.25
221-02179	BURNEA	Passed	2.25
221-00274	CABUSAO	Passed	2
221-02360	CADENAS	Intervention	5
221-01486	CEMPRON	Passed	2
221-00153	CHUA	Passed	2
221-01603	CLAVEL	Passed	2.25
221-00355	COCON	Passed	2
221-00502	DE VILLA	Passed	2
211-01886	DELA PEÃ'A	Passed	2
221-02631	DESOLOC	Intervention	5
221-01068	DISPO	Passed	1.75
221-02218	DUMAGO	Passed	2
221-02632	ENERO	Passed	2.25
221-00310	ESTRADA	Passed	2
221-00248	EVANGELISTA	Intervention	2.25
221-02079	FRONTERAS	Passed	2
221-00523	GADOR	Passed	1.75
191-00699	GERONGCO	Intervention	3
221-02191	GERONGCO	Passed	2
221-02283	GORRES	Passed	2
221-00777	GRANZA	Passed	2
221-00155	GULAY	Passed	2
221-01460	MANCAO	Intervention	3
221-01593	MENION	Passed	1.5
221-01846	MERCADO	Passed	1.75
221-01921	NAVALLO	Intervention	2.75
221-00732	NICARIO	Passed	2
221-01296	OLAGUER	Intervention	2.5
221-01012	OSICO	Passed	2.25
221-00313	PADAS	Passed	2
191-02147	PELAYO	Passed	2
221-00510	PLAZA	Intervention	3
221-00152	RIVERA	Passed	1.75
221-01694	SENOC	Passed	2
221-00497	SEREÃ'INA	Intervention	5
221-00484	SUAREZ	Passed	2
221-02142	SUMALINOG	Intervention	2.5
221-01564	TRILLO	Passed	2.25
221-00619	TUBA-ON	Intervention	5
201-02145	VASQUEZ	Passed	2.5
211-01168	VERDAD	Intervention	5
`;

// Parse TSV data and convert to Student objects
function parseStudentData(): Record<string, Student> {
  const lines = rawStudentData.trim().split('\n');
  const students: Record<string, Student> = {};
  
  // Skip header row (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    const [id, name, status, grade] = line.split('\t');
    
    if (id && name && status && grade) {
      students[id] = {
        id,
        name,
        course: 'Information Security and Management',
        semester: 'Fall 2025',
        status: status as 'Passed' | 'Intervention',
        grade,
        instructor: 'Paulo A. Duga'
      };
    }
  }
  
  return students;
}

export const studentData: Record<string, Student> = parseStudentData();
