import { CURRENCY } from '../constants/design'

/**
 * Formate un prix en CFA
 * @param price - Prix à formater
 * @returns Prix formaté avec le symbole CFA
 */
export function formatPrice(price: number): string {
  const formattedNumber = new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)

  if (CURRENCY.position === 'before') {
    return `${CURRENCY.symbol}${CURRENCY.separator}${formattedNumber}`
  }

  return `${formattedNumber}${CURRENCY.separator}${CURRENCY.symbol}`
}

/**
 * Calcule le pourcentage de réduction
 * @param originalPrice - Prix original
 * @param discountedPrice - Prix réduit
 * @returns Pourcentage de réduction
 */
export function calculateDiscount(originalPrice: number, discountedPrice: number): number {
  if (originalPrice <= 0) return 0
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

/**
 * Formate un nombre avec des espaces pour les milliers
 * @param num - Nombre à formater
 * @returns Nombre formaté
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('fr-FR').format(num)
}

/**
 * Tronque un texte à une longueur donnée
 * @param text - Texte à tronquer
 * @param maxLength - Longueur maximale
 * @returns Texte tronqué avec "..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

/**
 * Génère un slug à partir d'un texte
 * @param text - Texte à convertir en slug
 * @returns Slug généré
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9]+/g, '-') // Remplace les caractères spéciaux par des tirets
    .replace(/^-+|-+$/g, '') // Supprime les tirets au début et à la fin
}
