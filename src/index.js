import { getPatientsByPagination } from './api/patients.js';
import { calculateRiskScoring } from './logic/riskScoringCalculator.js';

(async () => {
  try {
    const { data: patients } = await getPatientsByPagination(1, 4);
    if (patients) {
      console.log(patients);
      patients.forEach(p => console.log(calculateRiskScoring(p))
      );
    }


  } catch (err) {
    console.error('Error fetching patients:', err.message);
  }
})();
