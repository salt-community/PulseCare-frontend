import { useParams } from "@tanstack/react-router";

export const PatientDetailsPage = () => {
  const { patientId } = useParams({ from: "/admin/patients/$patientId" });
    console.log("PatientDetailsPage rendered with patientId:", patientId);

  return <div>Patient Details for ID: {patientId}</div>;
};