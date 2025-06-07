export interface Patient {
    registrationId: number;
    fullName: string;
    age: number;
    admitDate: string;
    dischargeDate: string;
    address: string;
}


export interface PatientDetails {
    registrationId: number;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: Date;
    contactNumber: string;
    email?: string;
    address?: string;
    bloodGroup?: string;
    emergencyContact?: string;
    medicalHistory?: string;
    admitDate: Date;
    dischargeDate?: Date;
    isAdmitted: boolean;
    isDischarged: boolean;
    bedNumber?: string;


}

export interface PatientDTO {
    _id?: string;
    patientId: string; // unique identifier for the patient
    firstName: string;
    lastName: string;
    gender: string;
    priority: string;
    dateOfBirth: Date;
    contact?: string;           // optional because no Validators.required
    email?: string;             // optional
    address?: string;
    bloodGroup?: string;
    emergencyContact?: string;
    medicalHistory?: string;
    bedNumber: string;
}






