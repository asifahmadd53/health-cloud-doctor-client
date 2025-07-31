
// import type React from "react"

// interface FormInputProps {
//   label: string
//   value: string
//   onChangeText: (value: string) => void
//   placeholder?: string
//   multiline?: boolean
//   numberOfLines?: number
//   keyboardType?: string
//   autoCapitalize?: string
//   className?: string
//   type?: string
//   icon?: React.ReactNode
// }

// export default function FormInput({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   multiline = false,
//   numberOfLines = 1,
//   className = "",
//   type = "text",
//   icon,
//   ...props
// }: FormInputProps) {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     onChangeText(e.target.value)
//   }

//   return (
//     <div className={`mb-4 ${className}`}>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
//       <div className="relative">
//         {icon && <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</div>}
//         {multiline ? (
//           <textarea
//             value={value}
//             onChange={handleChange}
//             placeholder={placeholder}
//             rows={numberOfLines}
//             className={`w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 resize-none ${icon ? "pl-10" : ""}`}
//             {...props}
//           />
//         ) : (
//           <input
//             type={type}
//             value={value}
//             onChange={handleChange}
//             placeholder={placeholder}
//             className={`w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ${icon ? "pl-10" : ""}`}
//             {...props}
//           />
//         )}
//       </div>
//     </div>
//   )
// }
