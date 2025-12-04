export const ScheduleCard = ({
  startTime,
  endTime,
  subject,
  teacher,
  classroom,
  color,
}) => {
  return (
    <div
      className="card mb-3 border-l-4 hover:shadow-md transition-shadow"
      style={{
        borderLeftColor: color,
      }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{subject}</h3>
          <p className="text-sm text-gray-600">Prof : {teacher}</p>
          <p className="text-sm text-gray-500 mt-2">Salle: {classroom}</p>
        </div>
        <div className="text-right">
          <span className="font-medium text-lg">
            {startTime} - {endTime}
          </span>
          <p className="text-xs text-gray-500 mt-1">1h30</p>
        </div>
      </div>
    </div>
  )
}
