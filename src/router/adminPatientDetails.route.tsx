import { createRoute } from "@tanstack/react-router";
import { adminPatientsRoute } from "./adminPatients.route"
import { PatientDetailsPage } from "../features/admin/patients/PatientDetailsPage";

export const adminPatientDetailsRoute = createRoute({
  getParentRoute: () => adminPatientsRoute, 
  path: "/:patientId", 
  component: PatientDetailsPage,
});
