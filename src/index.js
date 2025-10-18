import { getPatientsByPagination } from './api/patients.js';
import { submitAssessment } from './api/client.js';
import { calculateRiskScoring } from './logic/riskScoringCalculator.js';

(async () => {
  try {
    const results = {
      high_risk_patients: [],
      fever_patients: [],
      data_quality_issues: []
    };

    let page = 1
    const pageSize = 20
    let hasNext = true
    let patientsWereProcessed = false

    while (hasNext) {
      const { data: patients, pagination } = await getPatientsByPagination(page, pageSize);

      if (patients?.length) {
        patientsWereProcessed = true
        processPatients(patients, results)
      }

      hasNext = pagination?.hasNext ?? (patients.length === pageSize);

      page++
    }
    if (patientsWereProcessed) {
      submitAssessment(results)
    }
  } catch (err) {
    console.error('Error fetching patients:', err.message)
  }
})();

function processPatients(patients, results) {

  patients.forEach(p => {
    const { patientId, ...risks } = calculateRiskScoring(p);

    const totalRisk = Object.values(risks)
      .reduce((acc, val) => (val >= 0 ? acc + val : acc), 0);

    if (totalRisk >= 4) results.high_risk_patients.push(patientId)
    if (risks.temperatureRisk >= 1) results.fever_patients.push(patientId)
    if (Object.values(risks).some(v => v === -1)) results.data_quality_issues.push(patientId)

  });
}