import BigNumber from 'bignumber.js'
import assert from 'assert'
import indexBy from 'lodash.indexby'

export default converter
module.exports = converter

function convertFrom({count, unitQty}) {
  return new BigNumber(count).times(unitQty).toNumber()
}

function convertTo({count, unitQty}) {
  return new BigNumber(count).dividedBy(unitQty).toNumber()
}

function converter(options) {
  const typesById = indexBy(options.types, 'id')

  options.types.forEach(t => {
    assert(t.id, `Type provided without an id`)
    assert(t.qty, `Type ${t.id} does not have an associated qty`)
    assert(typeof t.qty === 'number', `Type ${t.id} has an associated qty that is not numeric (${JSON.stringify(t.qty)})`)
  })


  return {
    convertTo: function(count, typeId) {
      const type = typesById[typeId]
      return convertTo({count, unitQty: type.qty})
    },

    strConvertTo: function(count, typeId) {
      const type = typesById[typeId]
      const value = convertTo({count, unitQty: type.qty})
      return `${value} x ${type.name}`
    },

    convertFrom: function(count, typeId) {
      const type = typesById[typeId]
      return convertFrom({count, unitQty: type.qty})
    },

    strConvertFrom: function(count, typeId) {
      const type = typesById[typeId]
      const value = convertFrom({count, unitQty: type.qty})
      return `${value} x ${options.baseUnitName}`
    }
  }
}

converter.convertFromUnitQty = convertFrom
converter.convertToUnitQty = convertTo
