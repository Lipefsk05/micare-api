export function computeGestationalAge(dum?: Date, referenceDate: Date = new Date()) {
  if (!dum) return null
  const start = new Date(dum)
  // normalize to UTC dates without time differences
  const msPerDay = 24 * 60 * 60 * 1000
  const diffMs = referenceDate.getTime() - start.getTime()
  if (diffMs < 0) return { weeks: 0, days: 0 }
  const totalDays = Math.floor(diffMs / msPerDay)
  const weeks = Math.floor(totalDays / 7)
  const days = totalDays % 7
  return { weeks, days, totalDays }
}

export function estimateDppFromDum(dum?: Date) {
  if (!dum) return null
  const d = new Date(dum)
  d.setDate(d.getDate() + 280)
  return d
}
