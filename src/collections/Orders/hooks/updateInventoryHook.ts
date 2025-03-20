import type { CollectionAfterChangeHook } from 'payload'

// This hook will update product inventory when an order is placed
export const updateInventoryHook: CollectionAfterChangeHook = async ({ req, operation, doc }) => {
  if (
    operation === 'create' &&
    doc.status === 'processing' &&
    doc.items &&
    Array.isArray(doc.items)
  ) {
    const { payload } = req

    // Update inventory for each product
    for (const item of doc.items) {
      if (item.product && item.quantity) {
        try {
          const product = await payload.findByID({
            collection: 'products',
            id: item.product,
          })

          if (product) {
            const newInventory = Math.max(0, product.inventory - item.quantity)
            await payload.update({
              collection: 'products',
              id: item.product,
              data: {
                inventory: newInventory,
              },
            })
          }
        } catch (err) {
          console.error(`Failed to update inventory for product ${item.product}:`, err)
        }
      }
    }
  }
  return doc
}
