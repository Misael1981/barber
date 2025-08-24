import { daysOfOperation } from "@/app/_constants/operation"

const OperationHours = () => {
  return (
    <div className="space-y-3 py-5">
      {daysOfOperation.map((day, index) => (
        <div key={index} className="flex items-center justify-between">
          <span className="text-sm text-gray-600">{day.day}</span>
          <span className="text-sm font-medium">
            {day.status === "fechado" ? "Fechado" : day.hours}
          </span>
        </div>
      ))}
    </div>
  )
}

export default OperationHours
