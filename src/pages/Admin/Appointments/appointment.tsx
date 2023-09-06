import { DataTable } from "@nepMeds/components/DataTable";
import { appointmentColumn } from "@nepMeds/components/DataTable/adminAppointmentColumn";
import { useAdminAppointment } from "@nepMeds/service/nepmeds-appointment";

// const data = [
//     {
//         date: "2021-09-01",
//         time: "10:00 AM",
//         doctor_name: "Dr. John Doe",
//         specialization: [
//             { id: 1, name: 'General physician' },
//             { id: 2, name: 'Dermatologists' }
//         ],
//         patient_name: "John Doe",
//         payment_rate: "500",
//         status: '1',
//     },
//     {
//         date: "2022-10-01",
//         time: "11:00 AM",
//         doctor_name: "Dr. Nothing Person",
//         specialization: [
//             { id: 3, name: 'Urologist' },
//         ],
//         patient_name: "Alex Rider",
//         payment_rate: "200",
//         status: '2',
//     },
//     {
//         date: "2022-01-09",
//         time: "09:00 AM",
//         doctor_name: "Dr. Obvious Lastname",
//         specialization: [{ id: 4, name: 'Derma' }],
//         patient_name: "Unknown Test",
//         payment_rate: "900",
//         status: '3',
//     },
// ]
const Appointment = () => {
  const { isSuccess, data } = useAdminAppointment();
  return (
    <div>
      {isSuccess && (
        <DataTable columns={appointmentColumn()} data={data?.data?.results} />
      )}
    </div>
  );
};

export default Appointment;
