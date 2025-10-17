export function calculateRiskScoring(patient) {
  return {
    patientId: patient.patient_id,
    ageRisk: calculateAgeRisk(patient.age),
    bpRisk: calculateBloodPressureRisk(patient.blood_pressure),
    temperatureRisk: calculateTemperatureRisk(patient.temperature),
  };

}

function calculateBloodPressureRisk(blood_pressure) {
  if (typeof blood_pressure !== 'string') return -1

  let blood_pressure_parts = blood_pressure.split('/')
  if (blood_pressure_parts.length != 2) return -1

  let systolic = parseInt(blood_pressure_parts[0], 10);
  let diastolic = parseInt(blood_pressure_parts[1], 10);

  if (isNaN(systolic) || isNaN(diastolic)) return -1


  if (systolic < 120 && diastolic < 80) return 0
  else if (systolic >= 120 && systolic <= 129 && diastolic < 80) return 1

  // Check Stages
  let systolicRisk = 0
  if (systolic >= 130 && systolic <= 139) systolicRisk = 2
  else if (systolic >= 140) systolicRisk = 3

  let diastolicRisk = 0
  if (diastolic >= 80 && diastolic <= 89) diastolicRisk = 2
  else if (diastolic >= 90) diastolicRisk = 3

  return Math.max(systolicRisk, diastolicRisk)
}
function calculateTemperatureRisk(temperature) {
  if (typeof temperature !== 'number' || isNaN(temperature)) return -1

  if (temperature <= 99.5) return 0;
  else if (temperature >= 99.6 && temperature <= 100.9) return 1
  else if (temperature >= 101.0) return 2

  return -1
}

function calculateAgeRisk(age) {
  if (typeof age !== 'number' || isNaN(age)) return -1;

  if (age < 40) return 0
  else if (age >= 40 && age <= 65) return 1
  else if (age > 65) return 2

  return -1
}