import BigNumber from 'bignumber.js'
import assert from 'assert'
import indexBy from 'lodash.indexby'

export default function buildConverter(options) {
  const typesById = indexBy(options.types, 'id')

  options.types.forEach(t => {
    assert(t.id, `Type provided without an id`)
    assert(t.qty, `Type ${t.id} does not have an associated qty`)
    assert(typeof t.qty === 'number', `Type ${t.id} has an associated qty that is not numeric (${JSON.stringify(t.qty)})`)
  })

  function valConvertTo(count, type) {
    return new BigNumber(count).dividedBy(type.qty).toNumber()
  }

  function valConvertFrom(count, type) {
    return new BigNumber(count).times(type.qty).toNumber()
  }

  return {
    convertTo: function(count, typeId) {
      return valConvertTo(count, typesById[typeId])
    },

    strConvertTo: function(count, typeId) {
      const type = typesById[typeId]
      const value = valConvertTo(count, type)
      return `${value} x ${type.name}`
    },

    convertFrom: function(count, typeId) {
      return valConvertFrom(count, typesById[typeId])
    },

    strConvertFrom: function(count, typeId) {
      const value = valConvertFrom(count, typesById[typeId])
      return `${value} x ${options.baseUnitName}`
    }
  }
}
