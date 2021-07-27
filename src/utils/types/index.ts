export interface DataTimesheet {
  date: Date;
  id: string;
  idUser: string;
  arrivalTime: string;
  lunchExitTime: string;
  lunchArrivalTime: string;
  exitTime: string;
  undertimeHours: string;
  overtimeHours: string;
  workedHours: string;
  createdAt: string;
}

export type DataTimesheetInput = Omit<
  DataTimesheet,
  | "id"
  | "idUser"
  | "undertimeHours"
  | "overtimeHours"
  | "workedHours"
  | "createdAt"
>;
