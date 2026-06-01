export const EXAM_TYPES = [
  'GS', 'COOMBS_IND', 'HB_HT', 'GL', 'PLAQ', 'HIV', 'HBSAG',
  'VDRL', 'ANTI_HCV', 'TOXOPLASMOSE', 'RUBEOLA', 'CVM', 'ANTI_HBS',
  'GLICOSE_J', 'GPD', 'HTLV', 'TSH_T4L', 'EAS', 'UROCULTURA',
  'STREP_B', 'PREVENTIVO', 'FERRITINA', 'VITAMINA_D', 'VITAMINA_B12',
] as const

export type ExamTypeValue = typeof EXAM_TYPES[number]
