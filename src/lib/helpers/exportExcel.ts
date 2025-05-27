// import ExcelJS from 'exceljs';
// import { saveAs } from 'file-saver';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export const exportExcel = async (data: any[], fileName: string) => {

// 1. Create a new workbook
// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('Data Report');

// // 2. Define the table headers
// worksheet.columns = [
//   { header: 'ФИО Студента', key: 'user', width: 30 },
// ];

// // 3. Insert data into the worksheet
// data.forEach((item) => {
//   worksheet.addRow({
//     user: item.user,
//   });
// });

// // 4. Style the header
// worksheet.getRow(1).eachCell((cell) => {
//   cell.font = { bold: true };
//   cell.alignment = { horizontal: 'center' };
// });

// // 5. Save the workbook as an Excel file
// const buffer = await workbook.xlsx.writeBuffer();
// const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
// saveAs(blob, `${fileName}.xlsx`);
// }