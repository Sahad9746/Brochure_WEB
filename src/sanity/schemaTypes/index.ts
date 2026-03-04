import { type SchemaTypeDefinition } from 'sanity'
import { pricingTierType } from './pricingTierType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pricingTierType],
}
