// import React from 'react'

// const test = () => {
//   const handleSearch = (data: z.infer<typeof FormSchema>) => { const selectedDate = data?.reportDate ? format(data.reportDate, "yyyy-MM-dd") : ""; const reservationNo = data?.reservationNo; const status = data?.status; if (reservationNo) { dispatch( setPickupInformation( initialFilteredPickup?.filter( (item) => item?.reservationNo === reservationNo?.toString() ) ) ); return; } if (selectedDate) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item.adjustmentDate === selectedDate ) ) ); return; } if (status) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item?.status === status.toLocaleLowerCase() ) ) ); return; } console.log("data from handleSearch", reservationNo); if (selectedDate && reservationNo && status) { dispatch( setPickupInformation( pickupInformations?.filter( (item) => item?.reservationNo === reservationNo ) ) ); } console.log("data from handleSearch", data); }; give this properly ,
//   return (
//     <div>

//     </div>
//   )
// }

// export default test
