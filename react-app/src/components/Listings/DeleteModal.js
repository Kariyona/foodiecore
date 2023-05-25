// import React, { useState } from "react";
// import { useModal } from "../../context/Modal";
// import { useDispatch } from "react-redux";
// import { deleteListingById } from "../../store/listings";


// function DeleteListingModal({ listingId, onDelete }) {
//   const dispatch = useDispatch();
//   const { closeModal } = useModal();

//   const handleDelete = async () => {
//     await dispatch(deleteListingById(listingId));
//     onDelete()
//     closeModal();
//   };

//   return (
//     <div className="confirm-delete-box">
//       <h1>Confirm Delete</h1>
//       <p>Are you sure you want to remove this restaurant from the listings?</p>
//       <div className="button-class">
//         <button onClick={handleDelete}>
//           Yes (Delete)
//         </button>
//         <button onClick={closeModal}>
//           No (Keep)
//         </button>
//       </div>
//     </div>
//   );
// }

// export default DeleteListingModal;
