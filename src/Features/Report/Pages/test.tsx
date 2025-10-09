// import React from 'react'

// const test = () => {
//   const handleSearch = (data: z.infer<typeof FormSchema>) => { const selectedDate = data?.reportDate ? format(data.reportDate, "yyyy-MM-dd") : ""; const reservationNo = data?.reservationNo; const status = data?.status; if (reservationNo) { dispatch( setPickupInformation( initialFilteredPickup?.filter( (item) => item?.reservationNo === reservationNo?.toString() ) ) ); return; } if (selectedDate) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item.adjustmentDate === selectedDate ) ) ); return; } if (status) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item?.status === status.toLocaleLowerCase() ) ) ); return; } console.log("data from handleSearch", reservationNo); if (selectedDate && reservationNo && status) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item?.reservationNo === reservationNo ) ) ); } console.log("data from handleSearch", data); }; give this properly ,
//   return (
//     <div>

//     </div>
//   )
// }

// export default test

// ---  from AirportPickupDropoff page --

// const handleSearch = (data: z.infer<typeof FormSchema>) => {
//   const selectedDate = format(data.reportDate, "yyyy-MM-dd");
//   setFilteredPickup(
//     pickupInformations?.filter((item) => item.date === selectedDate)
//   );
//   setFilteredDrop(
//     dropOffInformation?.filter((item) => item.date === selectedDate)
//   );
// };a

// const handleClear = () => {
//   form.reset();
//   setFilteredPickup(pickupInformations);
//   setFilteredDrop(dropOffInformation);
// };

// ---  from BillAdjustmentReport page --
// useEffect(() => {
//   if (pickupInformation?.length === 0) {
//     dispatch(setPickupInformation(originalPickupInformation));
//   }
// }, [dispatch, originalPickupInformation, pickupInformation]);

//   const handleSearch = (data: z.infer<typeof FormSchema>) => {
//     const selectedDate = data.reportDate
//       ? format(data.reportDate, "yyyy-MM-dd")
//       : "";
//     const reservationNo = data.reservationNo;
//     const status = data.status?.toLowerCase();

//     let filtered = originalPickupInformation;

//     if (reservationNo) {
//       filtered = filtered.filter(
//         (item) => item?.reservationNo === reservationNo
//       );
//     } else if (selectedDate && status) {
//       filtered = filtered.filter(
//         (item) =>
//           item?.adjustmentDate === selectedDate && item.status === status
//       );
//     } else if (selectedDate) {
//       filtered = filtered.filter(
//         (item) => item?.adjustmentDate === selectedDate
//       );
//     } else if (status) {
//       filtered = filtered.filter((item) => item.status === status);
//     }

//     dispatch(setPickupInformation(filtered));
//     console.log("Filtered data:", filtered);
//   };

//   const handleClear = () => {
//     form.reset();
//     dispatch(setPickupInformation(originalPickupInformation));
//   };
// useEffect(() => {
//   if (pickupInformation?.length === 0) {
//     dispatch(setPickupInformation(originalPickupInformation));
//   }
// }, [dispatch, originalPickupInformation, pickupInformation]);

// Modified onSubmit function
//   async function onSubmit(values: z.infer<typeof FormSchema>) {
//     try {
//       if (submitAction === "search") {
//         // Handle Search
//         const selectedDate = values.reportDate
//           ? format(values.reportDate, "yyyy-MM-dd")
//           : "";
//         const reservationNo = values.reservationNo;
//         const status = values.status?.toLowerCase();

//         let filtered = originalPickupInformation;

//         if (reservationNo) {
//           filtered = filtered.filter(
//             (item) => item?.reservationNo === reservationNo
//           );
//         } else if (selectedDate && status) {
//           filtered = filtered.filter(
//             (item) =>
//               item?.adjustmentDate === selectedDate && item.status === status
//           );
//         } else if (selectedDate) {
//           filtered = filtered.filter(
//             (item) => item?.adjustmentDate === selectedDate
//           );
//         } else if (status) {
//           filtered = filtered.filter((item) => item.status === status);
//         }

//         dispatch(setPickupInformation(filtered));
//         console.log("Filtered data:", filtered);
//       } else if (submitAction === "clear") {
//         // Handle Clear
//         form.reset();
//         dispatch(setPickupInformation(originalPickupInformation));
//       }

//       // Reset action
//       setSubmitAction(null);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       throw error;
//     }
//   }

//   const handleSearch = (data: z.infer<typeof FormSchema>) => {
//     const fromDate = data.fromDate ? format(data.fromDate, "yyyy-MM-dd") : "";
//     const toDate = data.toDate ? format(data.toDate, "yyyy-MM-dd") : "";

//     let filtered = originalBillTransfers;

//     if (fromDate && toDate) {
//       filtered = filtered.filter(
//         (item) => item.date >= fromDate && item.date <= toDate
//       );
//     } else if (fromDate) {
//       filtered = filtered.filter((item) => item.date >= fromDate);
//     } else if (toDate) {
//       filtered = filtered.filter((item) => item.date <= toDate);
//     }

//     dispatch(setBillTransfer(filtered));
//     console.log("Filtered data:", filtered);
//   };

//   const handleClear = () => {
//     form.reset();
//     dispatch(setBillTransfer(originalBillTransfers));
//   };

//   async function onSubmit(values: z.infer<typeof FormSchema>) {
//     try {
//       if (submitAction === "search") {
//         // Handle Search
//         const selectedDate = format(values.reportDate, "yyyy-MM-dd");
//         setFilteredPickup(
//           pickupInformations?.filter((item) => item.date === selectedDate)
//         );
//         setFilteredDrop(
//           dropOffInformation?.filter((item) => item.date === selectedDate)
//         );
//       } else if (submitAction === "clear") {
//         // Handle Clear
//         form.reset();
//         setFilteredPickup(pickupInformations);
//         setFilteredDrop(dropOffInformation);
//       }

//       // Reset action
//       setSubmitAction(null);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       throw error;
//     }
//   }
// useEffect(() => {
//   if (data.length > 0) {
//     setOriginalBillTransfers(data);
//     if (!billTransfers || billTransfers.length === 0) {
//       dispatch(setBillTransfer(data));
//     }
//   }
// }, [data, dispatch, billTransfers]);

//   useEffect(() => {
//     if (billTransfers?.length === 0) {
//       dispatch(setBillTransfer(originalBillTransfers));
//     }
//   }, [billTransfers, dispatch, originalBillTransfers]);

// useEffect(() => {
//   if (data.length > 0) {
//     setOriginalPickupInformation(data);
//     if (!pickupInformation || pickupInformation.length === 0) {
//       dispatch(setPickupInformation(data));
//     }
//   }
// }, [data, dispatch, pickupInformation]);
