import { AppDropDown } from "./components/ui/AppDropDown";

// const socialMediaValues = [
//   { value: "twitter", label: "Twitter" },
//   { value: "facebook", label: "Facebook" },
//   { value: "instagram", label: "Instagram" },
// ];

// const CustomDropDown = ({ value, onChange }) => {
//   const [currentOption, setCurrentOption] = useState(value || "");
//   const [optionLabel, setOptionLabel] = useState(null);
//   const [isActive, setIsActive] = useState(false);

//   function handleSelectCurrentOption(e, reactNode) {
//     const newValue = e.currentTarget.value;
//     setCurrentOption(newValue);
//     setOptionLabel(reactNode);
//     setIsActive(false);
//     onChange(newValue); // Actualiza el valor en react-hook-form
//   }

//   return (
//     <div className="flex justify-center pt-[100px]">
//       <section className="relative h-[40px] w-[300px] bg-cyan-600">
//         <button
//           onClick={() => setIsActive(!isActive)}
//           type="button"
//           className="h-full w-full bg-red-500"
//         />
//         <input
//           type="hidden"
//           value={currentOption}
//           onChange={(e) => setCurrentOption(e.currentTarget.value)}
//         />
//         <div className="pointer-events-none absolute inset-0 flex items-center bg-gray-200">
//           {optionLabel && optionLabel}
//         </div>

//         {isActive && (
//           <div className="absolute flex h-fit w-full flex-col gap-1 bg-slate-700 text-white">
//             {socialMediaValues.map((op) => (
//               <div key={op.value} className="relative">
//                 <input
//                   className="bg w-full cursor-pointer bg-slate-800"
//                   type="button"
//                   value={op.value}
//                   onClick={(e) => handleSelectCurrentOption(e, op.label)}
//                 />

//                 <div
//                   className={`pointer-events-none absolute inset-0 flex justify-center ${
//                     op.value === currentOption
//                       ? "bg-purple-400"
//                       : "bg-slate-800"
//                   }`}
//                 >
//                   {op.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

const socialMediaValues = [
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
];

const App = () => {
  return (
    <>
      <AppDropDown options={socialMediaValues} />
      <input type="text" onChange={(e) => console.log(e.target.value)} />
    </>
  );
};
export default App;
