import clsx from "clsx";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// const Breadcrumb = ({ data }) => {
//   return data?.length > 0 && (
//     <div className="breadcrumb-dash">
//       <div className="container">
//         <div className="row">
//           <div className="col-12">
//             <nav aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 {data.map((item, index) => {
//                   if (item?.to) {
//                     return (
//                       <li key={index} className="breadcrumb-item">
//                         <Link to={item.to}>{item.title}</Link>
//                       </li>
//                     );
//                   }
//                   if (item?.title && !item?.to) {
//                     return (
//                       <li key={index} className="breadcrumb-item active">
//                         {item.title}
//                       </li>
//                     );
//                   }
//                 })}
//               </ol>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const Breadcrumb = ({ data }) => {
  if (!(data?.length > 0)) return <></>;
  return (
    <nav aria-label="breadcrumb" className="overflow-hidden">
      <ol className="flex gap-2 text-gray-400">
        {data.map((item, index) => {
          return (
            <>
              <li key={index} className={clsx({ "text-gray-700 overflow-hidden text-ellipsis whitespace-nowrap": !item.to })}>
                {item.to ? <Link to={item.to}>{item.title}</Link> : item.title}
              </li>
              {index < data?.length - 1 && <span>/</span>}
            </>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
