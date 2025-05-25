import { type SchemaTypeDefinition } from 'sanity'
import { committee } from './committee'
import { secretariat } from './secretariat'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [committee, secretariat],
}
