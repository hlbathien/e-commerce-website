import type { CollectionBeforeChangeHook } from 'payload'

export const initiateInventoryHook: CollectionBeforeChangeHook = async ({
  req,
  operation,
  data,
}) => {
  // Only update inventory on initial creation
  if (operation === 'create') {
    if (data.inventory === undefined || data.inventory === null) {
      data.inventory = 0
    }
  }
  return data
}
