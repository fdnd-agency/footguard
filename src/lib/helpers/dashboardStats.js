export const getDaysLeftClass = (days) =>
  !Number.isFinite(days)
    ? 'badge-no-deadline'
    : days <= 3
      ? 'badge-intense'
      : days <= 6
        ? 'badge-medium'
        : 'badge-light'

export const generateDashboardStats = (articles) => {
  const counts = { total: articles.length, notStarted: 0, inProgress: 0, graded: 0, finalized: 0 }

  for (const a of articles) {
    switch (a.grading_status) {
      case 'not_started':
        counts.notStarted++
        break
      case 'in_progress':
        counts.inProgress++
        break
      case 'completed':
        counts.graded++
        break
      case 'finalized':
        counts.finalized++
        break
    }
  }

  return [
    { id: 1, title: 'Total papers', value: counts.total, variant: 'primary' },
    { id: 2, title: 'Not started', value: counts.notStarted, variant: 'not-started' },
    { id: 3, title: 'In progress', value: counts.inProgress, variant: 'progress' },
    { id: 4, title: 'Graded papers', value: counts.graded, variant: 'graded' },
    { id: 5, title: 'Total Finalized', value: counts.finalized, variant: 'finalized' }
  ]
}
