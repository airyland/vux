const currentYearMonth = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1
  return [year, month]
}

const lastYearMonth = (year, month) => {
  if (!year || !month) {
    year = currentYearMonth()[0]
    month = currentYearMonth()[1]
  }
  if (month === 1) {
    month = 12
    year = year - 1
  } else {
    month = month - 1
  }
  return [year, month]
}

const nextYearMonth = (year, month) => {
  if (!year || !month) {
    year = currentYearMonth()[0]
    month = currentYearMonth()[1]
  }
  if (month === 12) {
    month = 1
    year = year + 1
  } else {
    month = month + 1
  }
  return [year, month]
}

export {
  currentYearMonth,
  lastYearMonth,
  nextYearMonth
}
